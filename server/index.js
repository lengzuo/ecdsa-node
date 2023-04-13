const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

function hashMessage(message) {
  // convert message to bytes for hash algorithm
  const bytes = utf8ToBytes(message);

  // return hashed message
  return keccak256(bytes);
}

async function recoverKey(message, signature, recoveryBit) {
  // hash message
  const hashMsg = hashMessage(message);
  // recover the public key by passing in the hash message, signature, and recovery bit
  return await secp.recoverPublicKey(hashMsg, signature, recoveryBit);
}

function getPublicKey(recoverPublicKey) {
  return toHex(recoverPublicKey.slice(-20));
}

const balances = {
  "0a8aaee53aac3eba88b359b31c32742c9aeb861b": 100,
  "54e95ef657ac0fe8ac119401b30d6e922c6c08ee": 50,
  "352fea06df3288b3b9d5d0a82581f6237d7fc3ec": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sign, recoveryBit, message } = req.body;
  const { amount, recipient } = message;

  const recoverPublicKey = await recoverKey(JSON.stringify(message), sign, recoveryBit);
  const sender = getPublicKey(recoverPublicKey);
  console.log(`public key: ${sender}`)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
