import { useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Airdrop } from './components/AirDrop';
import { MessageSignature } from './components/MessageSignature';
import { SendSolana } from './components/SendSol';
import { SolanaIcon } from './components/icons/SolanaIcon';

function App() {
  const [activeComponent, setActiveComponent] = useState("faucet");

  return (
    <>
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="flex w-screen bg-black-300 text-white top-0 p-5 fixed justify-between items-center">
        <div className="flex gap-5 pl-4">
          <button onClick={() => setActiveComponent("faucet")} className={`cursor-pointer pl-3 pr-3 ${activeComponent === "faucet" ? "text-yellow-400" : ""}`}
          >
            Faucet
          </button>
          <button onClick={() => setActiveComponent("message")} className={`cursor-pointer pl-3 pr-3 ${activeComponent === "message" ? "underline text-yellow-400" : ""}`}
          >
            Sign a Message
          </button>
          <button onClick={() => setActiveComponent("solana")} className={`cursor-pointer pl-3 pr-3 ${activeComponent === "solana" ? "underline text-yellow-400" : ""}`}>
            Send Solana
          </button>
        </div>
        <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/mky5zGxdo0X_AyQYBcwfygXClc6YRVoh">
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider> 
              <div className="flex gap-3 pr-10">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
      <div className='flex-1 bg-black-400 w-full flex justify-center items-center'>
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/mky5zGxdo0X_AyQYBcwfygXClc6YRVoh">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider> 
            <div className='flex justify-center relative mt-20'>
              {activeComponent === "faucet" && <Airdrop />}
              {activeComponent === "message" && <MessageSignature />}
              {activeComponent === "solana" && <SendSolana />}
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      </div>
    </div>
    </>
  );
}

export default App;
