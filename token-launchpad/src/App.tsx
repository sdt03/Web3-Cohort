import { TokenLaunchPad } from "./components/TokenLaunchpad"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton
} from "@solana/wallet-adapter-react-ui"
import '@solana/wallet-adapter-react-ui/styles.css'
function App() {

  return (
    <div className="bg-black flex flex-col h-screen gap-3">
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/mky5zGxdo0X_AyQYBcwfygXClc6YRVoh">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton></WalletMultiButton>
          <TokenLaunchPad />
        
        </WalletModalProvider>
      </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}

export default App
