import { 
    createInitializeMetadataPointerInstruction,
    createInitializeMintInstruction,
    ExtensionType,
    getMintLen, 
    LENGTH_SIZE, 
    TOKEN_2022_PROGRAM_ID, 
    TYPE_SIZE 
} from "@solana/spl-token";
import { pack, TokenMetadata, createInitializeInstruction } from "@solana/spl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Button } from "../ui/button";


export function TokenLaunchPad(){
    const wallet = useWallet();

    const { connection } = useConnection();
    const [pubKey, setPubKey] = useState("");
    const [amount, setAmount] = useState(0);
    const [url, setUrl] = useState("");
    const [symbol, setSymbol] = useState("");
    const [name, setName] = useState("");

    async function createToken(){
        const keypair = Keypair.generate();

        const metadata: TokenMetadata = {
            updateAuthority: keypair.publicKey,
            mint: keypair.publicKey,
            name: name,
            symbol: symbol,
            uri: url,
            additionalMetadata: [["description", "Only on Solana"]]
        };

        const metadataExtension = TYPE_SIZE + LENGTH_SIZE;

        const metadataLen = pack(metadata).length;
        const mintLen = getMintLen([ExtensionType.MetadataPointer]);

        const lamports = await connection.getMinimumBalanceForRentExemption(
            mintLen + metadataLen + metadataExtension
        )

        if(!wallet?.publicKey){
            throw new Error("Wallet not connected");
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: keypair.publicKey,
                    space: mintLen,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),
                createInitializeMetadataPointerInstruction(keypair.publicKey, wallet.publicKey, keypair.publicKey, TOKEN_2022_PROGRAM_ID),
                createInitializeMintInstruction(keypair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    metadata: keypair.publicKey,
                    updateAuthority: wallet.publicKey,
                    mint: keypair.publicKey,
                    mintAuthority: wallet.publicKey,
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: metadata.uri
                })
            ); 

            

            const recentBlockhash = await connection.getLatestBlockhash();
            transaction.recentBlockhash = recentBlockhash.blockhash;
            transaction.feePayer = wallet.publicKey;

            transaction.partialSign(keypair);

            const respone = wallet.sendTransaction(transaction, connection);
            console.log(respone);
        } catch (error) {
            console.error("Something went wrong");
        }
        
    }
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center bg-black p-5 gap-3 rounded-lg shadow-lg">
                    <div>
                        <h1 className="text-white font-semibold text-xl">Create a New Token</h1>
                    </div>
                    <div className="flex flex-col w-100 text-white gap-2">
                        <input
                            type="text"
                            placeholder="Name of the Token"
                            className="border border-bg-gray-500 p-2 rounded-lg"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Symbol"
                            className="border border-bg-gray-500 p-2 rounded-lg"
                            value={symbol}
                            onChange={e => setSymbol(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="URI"
                            className="border border-bg-gray-500 p-2 rounded-lg"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button onClick={createToken} variant="primary" size="md" text="Create Token" />
                    </div>
                </div>
            </div>
        </div>
    )

}  