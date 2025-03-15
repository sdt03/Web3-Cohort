import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './components/AirDrop';



function App() {
  

  return (
    <div className='flex flex-col justify-center gap-y-5 items-center h-screen'>
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/mky5zGxdo0X_AyQYBcwfygXClc6YRVoh">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider> 
          <div className="flex gap-3 justify-center">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <div className='flex justify-center relative'>
            <Airdrop />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
  )
}

export default App
