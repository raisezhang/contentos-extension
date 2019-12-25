const TAB_CALLBACK_MAP = {};

export function removeContentCallback(actionId) {
  delete TAB_CALLBACK_MAP[actionId];
}

export function addContentCallback(actionId, sender) {
  TAB_CALLBACK_MAP[actionId] = sender;
}

/**
 * Send message to content
 * @param {String} actionId
 * @param {Object} data
 * @param {Object} error
 */
export function callContentCallback(actionId, data, error) {
  const sender = TAB_CALLBACK_MAP[actionId] || {};
  const { tabId, frameId } = sender;
  return new Promise(resolve => {
    try {
      chrome.tabs.sendMessage(tabId, { actionId, data, error }, { frameId }, () => {
        removeContentCallback(actionId);
        resolve();
      });
    } catch (ex) {
      // TODO
    }
  });
}

export function mergeContentParams(actionId, params) {
  const dataStr = localStorage.getItem(actionId);
  let result = null;
  if (dataStr) {
    try {
      result = JSON.parse(dataStr);
    } catch (ex) {
      // TODO
    }
    result = {
      ...result,
      ...params,
    };
  } else {
    result = params;
  }
  localStorage.setItem(actionId, JSON.stringify(result));
}

export function removeContentParams(actionId) {
  localStorage.removeItem(actionId);
}
