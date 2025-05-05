import { TokenLaunchPad } from "./components/TokenLaunchpad"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton
} from "@solana/wallet-adapter-react-ui"
import '@solana/wallet-adapter-react-ui/styles.css'
import { CreateMint } from "./components/Createmint"
function App() {

  return (
    <div className="bg-gray-900 flex flex-col h-screen gap-4">
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/mky5zGxdo0X_AyQYBcwfygXClc6YRVoh">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton></WalletMultiButton>
        
            <TokenLaunchPad />
            <CreateMint />
        
        </WalletModalProvider>
      </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
