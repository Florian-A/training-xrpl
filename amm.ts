import { Client, Wallet, Payment, xrpToDrops } from "xrpl";
const client = new Client("wss://s.altnet.rippletest.net:51233");
const issuer = "sEdVhia4AjRt9PMzqqpxzfBcgrfhq7q";
const eceiver = "sEdVRrSTFJBNnb51zSMeejttKtjoCuG";

const main = async () => {
  // Connect to the ledger
  await client.connect();
  console.log("connected");

  // Create a wallet
  const wallet1 = Wallet.fromSeed(issuer);
  const wallet2 = Wallet.fromSeed(eceiver);
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
