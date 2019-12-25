import Storage from './Storage';
import * as Keys from './StorageKeys';
import { LOCK_TIME_DEFAULT, NETWORK_DATA_DEFAULT, DAPP_WHITE_LIST_DEFAULT } from './DefaultData';

export default {
  getWalletBlob() {
    return Storage.get(Keys.wallet);
  },
  setWalletBlob(blob) {
    return Storage.set(Keys.wallet, blob);
  },
  getLang() {
    return Storage.get(Keys.lang);
  },
  setLang(lang) {
    return Storage.set(Keys.lang, lang);
  },
  async getLockTime() {
    return (await Storage.get(Keys.lockTime)) || LOCK_TIME_DEFAULT;
  },
  setLockTime(time) {
    return Storage.set(Keys.lockTime, time);
  },
  async getNetwork() {
    return (await Storage.get(Keys.network)) || NETWORK_DATA_DEFAULT;
  },
  setNetwork(networkData) {
    return Storage.set(Keys.network, networkData);
  },
  async getDappWhiteList() {
    return (await Storage.get(Keys.dappWhiteList)) || DAPP_WHITE_LIST_DEFAULT;
  },
  setDappWhiteList(list) {
    return Storage.set(Keys.dappWhiteList, list);
  },
  async getLockedTimestamp() {
    return (await Storage.get(Keys.lockedTimestamp)) || 0;
  },
  setLockedTimestamp(timestamp) {
    return Storage.set(Keys.lockedTimestamp, timestamp);
  },
};
