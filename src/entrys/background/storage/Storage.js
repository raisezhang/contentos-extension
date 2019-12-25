const storage = chrome.storage.local;

export default {
  set(key, value) {
    return new Promise(resolve => {
      storage.set({ [key]: value }, () => {
        resolve();
      });
    });
  },
  get(key) {
    return new Promise(resolve => {
      storage.get(key, res => {
        resolve(res[key]);
      });
    });
  },
};
