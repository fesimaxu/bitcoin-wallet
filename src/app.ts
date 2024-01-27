import { networks, payments } from "bitcoinjs-lib";
import fs from "fs";
import { ECPairFactory, ECPairAPI } from "ecpair";
import * as ecc from "tiny-secp256k1";

const ECPair: ECPairAPI = ECPairFactory(ecc);

const TESTNET = networks.testnet;

const createBitcoinPubkeyWallet = async (testnet: any) => {
  try {
    const keyPair = ECPair.makeRandom({ network: testnet });
    const { address } = payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: testnet,
    });

    const privateKey = keyPair.toWIF();

    const walletDetails = {
      address: address,
      privateKey: privateKey,
    };

    const walletJSON = JSON.stringify(walletDetails, null, 4);

    fs.writeFileSync("wallet.json", walletJSON);

    console.log(
      `Congratulations 🔥 your bitcoin wallet address is ${address} on the bitcoin testnet 🚀`
    );
    console.log(
      `Congratulations 🔥 your bitcoin wallet private key is ${privateKey} on the bitcoin testnet 🚀`
    );
    console.log(`Wallet created and saved to wallet.json 🥂`);
  } catch (error) {
    console.log(error);
  }
};

createBitcoinPubkeyWallet(TESTNET);
