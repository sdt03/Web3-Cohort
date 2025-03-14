import {Connection, LAMPORTS_PER_SOL, clusterApiUrl, PublicKey} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl('devnet'));

async function airdrop(publicKey, amount) {
    const airdropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount);
    await connection.confirmTransaction({signature: airdropSignature})
}

airdrop("F58BkGWh4gYudVE3zUrkJYWT7dkNZda9ryS3LWNxeQTY", LAMPORTS_PER_SOL).then(signature => {
    console.log('Airdrop signature:', signature);
});