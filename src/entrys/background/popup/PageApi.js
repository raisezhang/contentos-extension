import WalletApi from '../wallet/index';
import { mergeContentParams } from '../content/Service';

const PAGE_PATHS = {
  welcome: '/',
  lock: '/account/lock',
  transfer: '/auth/transfer',
  contract: '/auth/contract',
  post: '/auth/post',
  vote: '/auth/vote',
  signMessage: '/auth/sign',
};

function openWindow(type, actionId, config) {
  const path = PAGE_PATHS[type];
  if (!path) {
    return Promise.reject(new Error(`Unknown page ${type}`));
  }
  const pageUrl = `pages/popup.html#${path}?actionId=${encodeURIComponent(actionId)}`;
  return new Promise(resolve => {
    chrome.windows.create(
      {
        url: chrome.extension.getURL(pageUrl),
        type: 'popup',
        height: 660,
        width: 360,
        ...config,
      },
      win => {
        resolve({ windowId: win.id, pending: true });
      }
    );
  });
}

function detectAutoLocked() {
  return WalletApi.operateAutoLocked();
}

const methods = {
  async getDefaultAccount({ actionId }) {
    const defaultAccount = await WalletApi.getDefaultAccount();
    const { account, locked, walletCreated } = defaultAccount;
    if (!walletCreated) {
      openWindow('welcome', actionId);
      return defaultAccount;
    }
    const isAutoLocked = await detectAutoLocked();
    if (locked || isAutoLocked) {
      mergeContentParams(actionId, { getDefaultAccount: 1 });
      const data = await openWindow('lock', actionId);
      return data;
    }
    if (!account) {
      openWindow('welcome', actionId);
    }
    return defaultAccount;
  },
  async transfer({ sender, receiver, amount, actionId }) {
    if (!sender) {
      throw new Error('sender is required.');
    }
    if (!receiver) {
      throw new Error('receiver is required.');
    }
    if (!amount) {
      throw new Error('amount is required.');
    }
    const fmtAmount = parseFloat(amount, 10);
    if (fmtAmount <= 0) {
      throw new Error('amount is invalid.');
    }
    const data = await openWindow('transfer', actionId);
    return data;
  },
  async contractCall({ caller, owner, contract, method, args, payment, domain, actionId }) {
    if (!caller) {
      throw new Error('caller is required.');
    }
    if (!owner) {
      throw new Error('owner is required.');
    }
    if (!contract) {
      throw new Error('contract is required.');
    }
    if (!method) {
      throw new Error('method is required.');
    }
    const isWhiteList = await WalletApi.isInDappWhiteList({ domain, contract });
    if (isWhiteList) {
      const result = await WalletApi.contractCall({ caller, owner, contract, method, args, payment });
      return result;
    }
    const data = await openWindow('contract', actionId);
    return data;
  },
  async post({ sender, title, content, actionId }) {
    if (!sender) {
      throw new Error('sender is required.');
    }
    if (!title) {
      throw new Error('title is required.');
    }
    if (!content) {
      throw new Error('content is required.');
    }
    const data = await openWindow('post', actionId);
    return data;
  },
  async voteToBlockProducer({ voterValue, bpValue, cancel, actionId }) {
    if (!voterValue) {
      throw new Error('voterValue is required.');
    }
    if (!bpValue) {
      throw new Error('bpValue is required.');
    }
    if (typeof cancel !== 'boolean') {
      throw new Error('cancel is invalid.');
    }
    const data = await openWindow('vote', actionId);
    return data;
  },
  async signMessage({ account, message, actionId }) {
    if (!account) {
      throw new Error('account is required.');
    }
    if (!message) {
      throw new Error('message is required.');
    }
    const data = await openWindow('signMessage', actionId);
    return data;
  },
  async accountInfo({ name }) {
    const data = await WalletApi.accountInfo(name);
    return data;
  },
};

export default {
  handleMessage(action, data) {
    if (typeof methods[action] !== 'function') {
      return Promise.reject(new Error(`Unknown action ${action}`));
    }
    let result = null;
    try {
      result = methods[action](data);
      if (result && typeof result.then === 'function') {
        return result;
      }
      return Promise.resolve(result);
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
};
