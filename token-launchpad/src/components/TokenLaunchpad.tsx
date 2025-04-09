import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
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
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();

        if(!wallet?.publicKey){
            throw new Error("Wallet not connected");
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: keypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId: TOKEN_PROGRAM_ID,
                }),
                createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
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