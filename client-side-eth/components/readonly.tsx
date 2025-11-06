"use client"
import { useState } from "react"
import { useReadContract } from "wagmi"
import { wagmiContractConfig } from "@/lib/abi"

export default function ReadBalance() {
  const [walletAddress, setWalletAddress] = useState("")

  const addr =
    walletAddress.startsWith("0x")
      ? (walletAddress as `0x${string}`)
      : undefined

  const { data: balance,
    isLoading,
    isError,
    error
   } = useReadContract({
    ...wagmiContractConfig,
    functionName: "balanceOf",
    args: addr ? [addr] : undefined
  })

  console.log("walletAddress: ", walletAddress);
  console.log("balance: ", balance);
  console.log("loading:", isLoading)
  console.log("error:", isError ? error : null)
  console.log("balance:", balance)

  return (
    <div className="bg-blue">
      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        className="bg-white text-black"
      />

      <div>
        Balance: {balance?.toString()}
      </div>
    </div>
  )
}
