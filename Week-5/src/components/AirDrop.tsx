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
        <div className="flex flex-col justify-center items-center gap-y-5">
            <div className="flex flex-col justify-center items-center gap-y-5">
            <h1 className="text-purple-500 font-semibold text-2xl p-3">
                SOL Faucet
            </h1>
            <h2 className="text-green-400"> This is a Faucet for Solana Devnet</h2>
            <h2 className="text-red-500 font-semibold text-xl p-3 pb-6 flex justify-center items-center">NOTE: This tool does *NOT* give real $SOL or Solana tokens. </h2>
            </div>
        <div className="flex flex-col border border-black-300 w-125 p-5 rounded-lg shadow-lg shadow-black items-center justify-center">
            <div className="flex space-between items-center gap-40">
                <h1 className="font-bold text-2xl pb-3 text-white">Request an AirDrop</h1>
                <div className="text-gray-500 border border-gray-500 p-1 rounded-lg pr-3 pl-3 ">
                    devnet
                </div>
            </div>
            <div className="pl-10 p-5">
            <input 
                type="number" 
                placeholder="Amount in SOL" 
                className="border border-gray-500 w-50 p-2 rounded-lg bg-white text-black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button 
                onClick={sendAirDrop} 
                className="cursor-pointer hover:bg-black-400 bg-white text-black p-2 ml-2 rounded-lg"
            >
                Send Airdrop
            </button>
            </div>
        </div>
        </div>
    );
}
