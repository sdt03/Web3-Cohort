import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react"

export function SendSolana() {
    const [amount, setAmount] = useState<string>("");
    const [receiver, setReceiver] = useState<string>("");
    const wallet = useWallet();
    const {connection} = useConnection();

    async function sendTokens() {
        if (!wallet.publicKey) return;
        
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(receiver),
            lamports: parseFloat(amount) * LAMPORTS_PER_SOL
        }));
        await wallet.sendTransaction(transaction, connection);
        alert(`Send Sol to ${receiver}`);
    }
    

    return(
        <div>
            <input id="to"
                type="text"
                placeholder="To"
                className="w-100 border border-gray-500 rounded-xl p-2"
                onChange={(e)=> setReceiver(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Amount"
                className="w-30 border border-gray-500 rounded-xl p-2 ml-3 mr-3"
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
            />
            <div className="flex justify-center p-5">
                <button onClick={sendTokens} disabled={!receiver} className="bg-black text-white p-3 rounded-xl cursor-pointer">Transfer</button>
            </div>
        </div>
    )
}