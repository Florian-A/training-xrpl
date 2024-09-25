import { AMMCreate } from "xrpl";

async function createAMM({ issuer, receiver, client, tokenCode }: any) {

    let createAmm: AMMCreate = {
        TransactionType: "AMMCreate",
        Account: receiver.address,
        TradingFee: 600,
        Amount: {
          currency: tokenCode,
          issuer: issuer.classicAddress,
          value: "2000000", // 2M tokens
        },
        Amount2: "50000000", // 50 XRP in drops
      };

      console.log(createAmm);

      const result = await client.submitAndWait(createAmm, { autofill: true, wallet: receiver });
      console.log(result);
      console.log("Create amm tx: ", result,result.hash);
       
}

export default createAMM;