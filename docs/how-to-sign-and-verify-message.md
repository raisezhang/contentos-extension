# How to sign and verify message

## 🔌 Tools

``` javascript
import { crypto } from 'cos-grpc-js';
import { Buffer } from 'buffer'
import { createHash } from 'crypto';
import bs58 from 'bs58';
import secp256k1 from 'secp256k1';


function getMessageData(message) {
  const hash = createHash('sha256');
  hash.update(Buffer.from(message));
  return hash.digest();
}
```

## 🔐 Sign Message

``` javascript
function signMessage(message, privateKeyWIF) {
  const data = getMessageData(message);
  const privateKey = crypto.privKeyFromWIF(privateKeyWIF);
  const { signature } = privateKey.sign(data);
  return bs58.encode(signature);
}
```

## 🔑 Verify Message

``` javascript
function verifyMessage(message, signature, publicKeyWIF) {
  const data = getMessageData(message);
  const decodeData = bs58.decode(signature);
  const publicKey = crypto.pubKeyFromWIF(publicKeyWIF).data;
  return secp256k1.verify(data, decodeData, publicKey);
}
```
