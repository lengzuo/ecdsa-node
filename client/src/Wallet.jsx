import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey  }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const newAddress = toHex(secp.getPublicKey(privateKey).slice(-20));
    setAddress(newAddress);

    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${newAddress}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your privateKey" value={privateKey} onChange={onChange}></input>
      </label>
      <div className="balance">Address: {address || `Empty`}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
