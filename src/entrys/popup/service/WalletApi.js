import { LANG_DEFAULT } from './LangData';

/**
 * call backend service
 * @param {String} action
 * @param {Object} params
 */
const callBackend = (action, params = {}) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ from: 'popup', action, data: params }, response => {
      const { success, data, error } = response || {};
      if (success) {
        resolve(data);
      } else {
        reject(error);
      }
    });
  });
};

export function callContentCallback(actionId, data, error) {
  return callBackend('callContentCallback', { actionId, data, error });
}

export function getDefaultAccount(extra) {
  return callBackend('getDefaultAccount', extra);
}
/**
 * State of wallet
 *
 * network
 * wallet
 */
export function getState() {
  return callBackend('getState');
}

export function setLang(lang) {
  return callBackend('setLang', { lang });
}

export async function getLang() {
  const lang = await callBackend('getLang');
  return lang || LANG_DEFAULT;
}

/**
 * Operate lock time
 */
export function setLockTime(time) {
  return callBackend('setLockTime', { time });
}

export function getLockTime() {
  return callBackend('getLockTime');
}

/**
 * Operate wallet
 */
export function unlock(password) {
  return callBackend('unlock', { password });
}

export function importNewAccount(name, privateKey, mnemonic, password) {
  return callBackend('importNewAccount', { name, privateKey, mnemonic, password });
}

export function createNewAccount(name, privateKey, publicKey, password) {
  return callBackend('createNewAccount', { name, privateKey, publicKey, password });
}

export function changeAccountSelected(id) {
  return callBackend('changeAccountSelected', { id });
}

export function removeAccountById(id) {
  return callBackend('removeAccountById', { id });
}

export function getPrivateKeyById(id, password) {
  return callBackend('getPrivateKeyById', { id, password });
}

export function validatePassword(password) {
  return callBackend('validatePassword', { password });
}

export function changePassword(password, newPassword) {
  return callBackend('changePassword', { password, newPassword });
}

export function logout() {
  return callBackend('logout');
}

/**
 * Operate network
 */
export function removeNetworkById(id) {
  return callBackend('removeNetworkById', { id });
}

export function modifyNetwork(network) {
  return callBackend('modifyNetwork', { network });
}

export function changeNetworkSelected(id) {
  return callBackend('changeNetworkSelected', { id });
}

export function addNetwork(network) {
  return callBackend('addNetwork', { network });
}

/**
 * Operate Dapp white list
 */
export function getDappWhiteList() {
  return callBackend('getDappWhiteList');
}

export function addDappWhiteList(domain, contract, method) {
  return callBackend('addDappWhiteList', { domain, contract, method });
}

export function removeDappWhiteListById(id) {
  return callBackend('removeDappWhiteListById', { id });
}

export function isInDappWhiteList(domain, contract) {
  return callBackend('isInDappWhiteList', { domain, contract });
}

/**
 * Some API method in Cosjs SDK
 */
export function addAccount(name, privateKey) {
  return callBackend('addAccount', { name, privateKey });
}

export function generateKeysFromMnemonic(words) {
  return callBackend('generateKeysFromMnemonic', { words });
}

export function generateKeysWithMonemonic() {
  return callBackend('generateKeysWithMonemonic');
}

export function accountInfo(name) {
  return callBackend('accountInfo', { name });
}

export function bpInfo(bp) {
  return callBackend('bpInfo', { bp });
}

export function transactionInfo(trxId) {
  return callBackend('transactionInfo', { trxId });
}

export function chainInfo() {
  return callBackend('chainInfo');
}

export function blockProducerList(start = 0, limit = 100, lastBlockProducer = null) {
  return callBackend('blockProducerList', { start, limit, lastBlockProducer });
}

export function createAccount(creator, newAccount, pubkey) {
  return callBackend('createAccount', { creator, newAccount, pubkey });
}

export function transfer(sender, receiver, amount, memo, extra) {
  return callBackend('transfer', { ...extra, sender, receiver, amount, memo });
}

export function cosToVest(account, amount) {
  return callBackend('cosToVest', { account, amount });
}

export function vestToCos(account, amount) {
  return callBackend('vestToCos', { account, amount });
}

export function cosToStake(account, amount, toAccount) {
  return callBackend('cosToStake', { account, amount, toAccount });
}

export function stakeToCos(account, amount, toAccount) {
  return callBackend('stakeToCos', { account, amount, toAccount });
}

export function post(sender, title, content, tagsStr, extra) {
  return callBackend('post', { ...extra, sender, title, content, tagsStr });
}

export function contractCall(caller, owner, contract, method, args, payment, extra) {
  return callBackend('contractCall', { ...extra, caller, owner, contract, method, args, payment });
}

export function voteToBlockProducer(voterValue, bpValue, cancel, extra) {
  return callBackend('voteToBlockProducer', { ...extra, voterValue, bpValue, cancel });
}

export function queryTable(owner, contract, table, field, begin, limit, reverse) {
  return callBackend('queryTable', { owner, contract, table, field, begin, limit, reverse });
}

export function userTrxList(name, limit = 100) {
  return callBackend('userTrxList', { name, limit });
}

export function signMessage(account, message, extra) {
  return callBackend('signMessage', { ...extra, account, message });
}
