import { Client, Wallet, Payment, xrpToDrops } from "xrpl";
const client = new Client("wss://s.altnet.rippletest.net:51233");
const wallet1Seed = "sEdVhia4AjRt9PMzqqpxzfBcgrfhq7q";
const wallet2Seed = "sEdVRrSTFJBNnb51zSMeejttKtjoCuG";

const main = async () => {
  // Connect to the ledger
  await client.connect();
  console.log("connected");

  // Create a wallet
  const wallet1 = Wallet.fromSeed(wallet1Seed);
  const wallet2 = Wallet.fromSeed(wallet2Seed);
  //console.log(wallet1, wallet2);

  const tx: Payment = {
    TransactionType: "Payment",
    Account: wallet1.classicAddress,
    Destination: wallet2.classicAddress,
    Amount: xrpToDrops("100"),
  };

  const result = await client.submitAndWait(tx, {
    autofill: true,
    wallet: wallet1,
  });

  console.log(result);

  // Discounect to the ledger
  await client.disconnect();
  console.log("discounect");
};

main();
