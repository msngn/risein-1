const {
  Keypair,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');

const fs = require('fs');

const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');

const createWallet = async () => {
  const wallet = Keypair.generate();
  const walletData = {
    publicKey: wallet.publicKey.toString(),
    secretKey: [...wallet.secretKey],
  };
  fs.writeFileSync('wallet.json', JSON.stringify(walletData));

  console.log('Wallet created:', wallet.publicKey.toString());
  await getBalance(wallet.publicKey.toString());
};

const requestAirdrop = async (amount: number = 1) => {
  const walletData = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
  const wallet = Keypair.fromSecretKey(Uint8Array.from(walletData.secretKey));
  const airdropSignature = await connection.requestAirdrop(
    wallet.publicKey,
    amount * LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airdropSignature);
  console.log(`${amount} SOL airdrop done.`);
  await getBalance(wallet.publicKey.toString());
};

const getBalance = async (publicKeyStr: string) => {
  const walletData = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
  const wallet = Keypair.fromSecretKey(Uint8Array.from(walletData.secretKey));

  const balance = await connection.getBalance(wallet.publicKey);
  console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
  return balance / LAMPORTS_PER_SOL;
};

const transferSOL = async (toPublicKeyStr: string, amount: number) => {
  const walletData = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
  const fromWallet = Keypair.fromSecretKey(
    Uint8Array.from(walletData.secretKey)
  );
  const toPublicKey = new PublicKey(toPublicKeyStr);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromWallet.publicKey,
      toPubkey: toPublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    fromWallet,
  ]);
  console.log(`Transfer completed: ${signature}`);
};

const main = async () => {
  await createWallet();
  await requestAirdrop();
  await transferSOL(Keypair.generate().publicKey.toString(), 0.1);
};

main();
