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


export function TokenLaunchPad(){
    const wallet = useWallet();

    const { connection } = useConnection();
    const [pubKey, setPubKey] = useState("");
    const [amount, setAmount] = useState(0);
    const [url, setUrl] = useState("");
    const [symbol, setSymbol] = useState("");

    async function createToken(){
        const keypair = Keypair.generate();

        const metadata: TokenMetadata = {
            updateAuthority: keypair.publicKey,
            mint: keypair.publicKey,
            name: "DTcoin",
            symbol: "OPOS",
            uri: "https://raw.githubusercontent.com/solana-developers/opos-asset/main/assets/DeveloperPortal/metadata.json",
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
            <div className="bg-black flex flex-col max-w-100">
                <input className="border border-gray-500 p-3 m-3 text-white rounded-lg" onChange={e => setPubKey(e.target.value)} placeholder="Solana Public Key" type="text" />
                <input className="border border-gray-500 p-3 m-3 text-white rounded-lg" onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" type="number" />
                <input className="border border-gray-500 p-3 m-3 text-white rounded-lg" onChange={e => setUrl(e.target.value)} placeholder="Enter url" type="text" />
                <input className="border border-gray-500 p-3 m-3 text-white rounded-lg" onChange={e => setSymbol(e.target.value)} placeholder="Token Symbol" type="text" />
                <button onClick={createToken} className="bg-white text-black p-3 rounded-lg cursor-pointer">Create Token</button>
            </div>
        </div>
    )

}  