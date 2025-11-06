"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient" 
import { ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/config"

export function Providers({ children }: {children: ReactNode}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>    
    )
}