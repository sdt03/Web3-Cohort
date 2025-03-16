import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from 'bs58';


export function MessageSignature() {
    const { publicKey, signMessage } = useWallet();
    const [input, setInput] = useState("");

    async function signatue(){
        if(!publicKey) throw new Error("Wallet not connected");
        if(!signMessage) throw new Error("Wallet does not support signing a message");

        const message = new TextEncoder().encode(input);
        const signature = await signMessage(message);

        if(!ed25519.verify(signature, message, publicKey.toBytes())) throw new Error("Invalid Signature");
        alert(`Message Signature: ${bs58.encode(signature)}`);
    }

    return (
        <div className="text-white gap-3">
            <input 
                type="text"
                placeholder="Type a message"
                onChange={(e)=>setInput(e.target.value)}
                className="w-100 rounded-xl border border-gray-500 p-2"
            />
            <button onClick={signatue} className="bg-black rounded-xl text-white p-2 ml-3 cursor-pointer">Sign Message</button>
        </div>
    )
}