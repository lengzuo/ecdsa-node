import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function hashMessage(message) {
  // convert message to bytes for hash algorithm
  const bytes = utf8ToBytes(message);

  // return hashed message
  return keccak256(bytes);
}

async function signMessage(msg, privateKey) {
  // hash the message
  const hashMsg = hashMessage(msg);
  // sign the hash message with the private key and set recovered to true to get the recovered bit
  return secp.sign(hashMsg, privateKey, {recovered: true});
}

function Transfer({ setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const message = {
      amount: parseInt(sendAmount),
      recipient,
    }
    const [sign, recoveryBit] = await signMessage(JSON.stringify(message), privateKey);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sign: toHex(sign), 
        recoveryBit, 
        message
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
