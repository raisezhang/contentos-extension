// TODO fixed
import { Buffer } from 'buffer';
import { createHash } from 'crypto';
import bs58 from 'bs58';

// eslint-disable-next-line
import { grpc, crypto, raw_type, grpc_service } from 'cos-grpc-js';
// eslint-disable-next-line
const { ApiService } = grpc_service;

export default {
  privKeyFromWIF(privateKey) {
    return crypto.privKeyFromWIF(privateKey);
  },
  userTrxList({ name, limit, provider, cosInstance }) {
    const getUserTrxListByTimeRequest = new grpc.GetUserTrxListByTimeRequest();
    // eslint-disable-next-line
    const accountName = new raw_type.account_name();
    accountName.setValue(name);
    getUserTrxListByTimeRequest.setName(accountName);
    getUserTrxListByTimeRequest.setLimit(limit);
    return new Promise((resolve, reject) => {
      cosInstance.grpc.unary(ApiService.GetUserTrxListByTime, {
        request: getUserTrxListByTimeRequest,
        host: provider,
        onEnd: res => {
          const { status, statusMessage, message } = res;
          if (status === cosInstance.grpc.Code.OK && message) {
            const list = [];
            message.getTrxListList().forEach(item => {
              const trxObject = item
                .getTrxWrap()
                .getSigTrx()
                .getTrx()
                .toObject();

              const [opItem] = trxObject.operationsList;
              const [key] = Object.keys(opItem).filter(sItem => opItem[sItem]);
              let amount = '0';
              if (opItem[key].amount) {
                amount = opItem[key].amount.value;
              }
              const statusType = item
                .getTrxWrap()
                .getReceipt()
                .getStatus();
              const actions = item
                .getTrxWrap()
                .getSigTrx()
                .getTrx()
                .getAllActions()
                .join('，');
              const hash = item.getTrxId().getHexHash();
              const utcSeconds = item.getBlockTime().getUtcSeconds();

              list.push({
                hash,
                amount,
                actions,
                utc_seconds: utcSeconds,
                status_type: statusType,
              });
            });
            resolve(list);
          } else {
            reject(new Error(statusMessage));
          }
        },
      });
    });
  },
  getCosInstanceChainId(chain) {
    // eslint-disable-next-line
    const chainId = new raw_type.chain_id();
    chainId.setChainEnv(chain);
    return chainId;
  },
  signMessage(message, privateKey) {
    const hash = createHash('sha256');
    hash.update(Buffer.from(message));
    const { signature } = privateKey.sign(hash.digest());
    return bs58.encode(signature);
  },
};
