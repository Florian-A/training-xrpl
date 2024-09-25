import { Client, Wallet, AccountSet, AccountSetAsfFlags } from "xrpl";
import convertStringToHexPadded from "./convertStringToHexPadded"; 
import createToken from "./createToken";
import createAMM from "./createAMM";

const client = new Client("wss://s.altnet.rippletest.net:51233");
const issuerSeed = "sEdVhia4AjRt9PMzqqpxzfBcgrfhq7q";
const receiverSeed = "sEdVRrSTFJBNnb51zSMeejttKtjoCuG";


const main = async () => {
  // Connect to the ledger
  await client.connect();
  console.log("connected");

  // Create a wallet
  const issuer = Wallet.fromSeed(issuerSeed);
  const receiver = Wallet.fromSeed(receiverSeed);
  
  console.log(issuer, receiver);


  // const accountSet: AccountSet = {
  //   TransactionType: "AccountSet",
  //   Account: issuer.address,
  //   SetFlag: AccountSetAsfFlags.asfDefaultRipple,
  // };

  // const result = await client.submitAndWait(accountSet, { autofill: true, wallet: issuer });
  // console.log(result);

  //await createToken({ issuer, receiver, client, tokenCode: convertStringToHexPadded("Kayp") });

  // console.log("Issuer balance: ", await client.getBalances(issuer.address));
  // console.log("Receiver balance: ", await client.getBalances(receiver.address));

  // createAMM

  const result = await createAMM({ issuer, receiver, client, tokenCode: convertStringToHexPadded("Kayp") });

  console.log(result);

  // Discounect to the ledger
  await client.disconnect();
  console.log("discounect");
};

main();
