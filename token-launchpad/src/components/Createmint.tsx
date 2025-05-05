import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CreateMint(){
    const [pubKey, setPubkey] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);

    function generateMint(){
        console.log(pubKey);
        console.log(amount);
    }

    return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-black p-5 gap-3 rounded-lg shadow-lg">
            <div>
                <h1 className="text-xl text-white font-semibold">Mint Tokens</h1>
            </div>
            <div className="flex flex-col w-100 text-white gap-2">
                <Input
                    type="text"
                    placeholder="Token Mint Address"
                    value={pubKey}
                    onChange={e => setPubkey(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Amount"
                    onChange={e => setAmount(Number(e.target.value))}
                />
                <Button
                    variant="primary"
                    size="md"
                    text="Mint"
                    onClick={generateMint}
                />
            </div>
        </div>
    </div>
    )
}