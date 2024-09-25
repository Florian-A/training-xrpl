import { TrustSet, convertStringToHex, TrustSetFlags, Payment } from "xrpl";

async function createToken({ issuer, receiver, client, tokenCode }: any) {
  
// create a trustline
  const trustSet: TrustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: tokenCode,
      issuer: issuer.address,
      value: "500000000", // 500M tokens
    },
    Flags: TrustSetFlags.tfClearNoRipple,
  };
  console.log(trustSet);
  const result = await client.submitAndWait(trustSet, { autofill: true, wallet: receiver });
  console.log(result);

  // send the token to the receiver

  const sendPayment: Payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: receiver.address,
    Amount: {
      currency: tokenCode,
      issuer: issuer.address,
      value: "200000000", // 200M tokens
    },
  };

  console.log(sendPayment);

  const resultPayment = await client.submitAndWait(sendPayment, { autofill: true, wallet: issuer });
  console.log(resultPayment);
}

export default createToken;