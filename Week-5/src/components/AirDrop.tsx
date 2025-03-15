import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState<number>(0);

    async function sendAirDrop() {
        if (!wallet.publicKey || !amount) return;

        try {
            const lamports = parseFloat(amount) * 1000000000;
            await connection.requestAirdrop(wallet.publicKey, lamports);
            alert(`Airdropped ${amount} SOL!`);
        } catch (error) {
            alert("Airdrop failed: " + error);
        }
    }

    async function getBalance() {
        if(wallet.publicKey){
            const balance = await connection.getBalance(wallet.publicKey);
            const balanceInSol = balance/10 ** 9;
            setBalance(balanceInSol);
        }
    }

    getBalance();


    return (
        <div>
            <input 
                type="number" 
                placeholder="Amount in SOL" 
                className="border border-gray-500 w-100 p-2 rounded-xl"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button 
                onClick={sendAirDrop} 
                className="cursor-pointer bg-black text-white p-2 ml-2 rounded-xl"
            >
                Send Airdrop
            </button>

            <div className="flex justify-center">
                {balance} Sol    
            </div>
        </div>
    );
}
