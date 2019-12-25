import { uuid } from 'uuidv4';
import PostMessageStream from 'post-message-stream';

const services = (() => {
  const promises = {};
  return {
    save(resolve, reject) {
      if (typeof resolve !== 'function') {
        return null;
      }
      const actionId = uuid();
      promises[actionId] = { resolve, reject };
      return actionId;
    },
    trigger(actionId, success, data, error) {
      const { resolve, reject } = promises[actionId];
      if (success && typeof resolve === 'function') {
        resolve(data);
      } else if (!success && typeof reject === 'function') {
        reject(error);
      }
      delete promises[actionId];
    },
  };
})();

const send = (() => {
  const pageStream = new PostMessageStream({
    name: 'contentos_inpage',
    target: 'contentos_contentscript',
  });
  pageStream.on('data', ({ success, data, error, actionId }) => {
    if (!actionId) {
      return;
    }
    services.trigger(actionId, success, data, error);
  });
  return (action, data) => {
    pageStream.write({ from: 'content', action, data });
  };
})();

function wrapperPromise(action, data) {
  return new Promise((resolve, reject) => {
    const actionId = services.save(resolve, reject);
    send(action, {
      ...data,
      actionId,
    });
  });
}

const WalletApi = {
  getDefaultAccount() {
    return wrapperPromise('getDefaultAccount');
  },
  accountInfo(name) {
    return wrapperPromise('accountInfo', { name });
  },
  transfer(sender, receiver, amount, memo) {
    return wrapperPromise('transfer', { sender, receiver, amount, memo });
  },
  contractCall(caller, owner, contract, method, args, payment) {
    const domain = (typeof window !== 'undefined' && window.location.host) || '';
    return wrapperPromise('contractCall', { caller, owner, contract, method, args, payment, domain });
  },
  voteToBlockProducer(voterValue, bpValue, cancel) {
    return wrapperPromise('voteToBlockProducer', { voterValue, bpValue, cancel });
  },
  post(sender, title, content, tagsStr) {
    return wrapperPromise('post', { sender, title, content, tagsStr });
  },
  signMessage(account, message) {
    return wrapperPromise('signMessage', { account, message });
  },
};

window.ContentosWallet = WalletApi;
