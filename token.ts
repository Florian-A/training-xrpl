import xrpl from "xrpl";
import convertStringToHexPadded from "./convertStringToHexPadded";
import createToken from "./createToken";

const serverURL = "wss://s.altnet.rippletest.net:51233"; // Serveur Testnet

const main = async () => {
  // Connexion au serveur XRP Ledger
  const client = new xrpl.Client(serverURL);
  await client.connect();
  console.log("Connecté au XRP Ledger testnet.");

  // Génération automatique du portefeuille émetteur (issuer)
  const issuerWallet = xrpl.Wallet.generate();
  console.log("Portefeuille émetteur généré automatiquement :");
  console.log("Adresse émetteur :", issuerWallet.address);

  // Portefeuille récepteur (receiver) basé sur la seed fournie
  const receiverSeed = "sEdTT7fpC1Pyf3qd2sotHn861e15hkk"; // < ---- FREE XRP
  const receiverWallet = xrpl.Wallet.fromSeed(receiverSeed);
  console.log("Portefeuille récepteur chargé :");
  console.log("Adresse récepteur :", receiverWallet.address);

  // Ajouter des fonds au portefeuille émetteur via le faucet
  console.log("Financement du portefeuille émetteur...");
  await client.fundWallet(issuerWallet);
  console.log("Portefeuille émetteur financé.");

  // Convertir le nom du token en HEX
  const tokenName = "MYTOKEN"; // Remplace par ton nom de token
  const tokenCodeHex = convertStringToHexPadded(tokenName);
  console.log(`Nom du token : ${tokenName} | Code HEX : ${tokenCodeHex}`);

  // Appeler la fonction createToken pour créer et transférer les tokens
  console.log("Création et transfert du token...");
  await createToken({
    issuer: issuerWallet,
    receiver: receiverWallet,
    client: client,
    tokenCode: tokenCodeHex,
  });

  // Vérifier les balances du récepteur
  const balances = await client.request({
    command: "account_lines",
    account: receiverWallet.address,
  });
  console.log("Balances du récepteur :", balances);

  // Déconnexion du client
  await client.disconnect();
  console.log("Déconnecté du XRP Ledger.");
};

main().catch((err) => {
  console.error("Erreur :", err);
});