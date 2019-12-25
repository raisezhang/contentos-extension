import WalletApi from './wallet/index';
import PageApi from './popup/PageApi';
import { callContentCallback, addContentCallback, removeContentCallback, mergeContentParams, removeContentParams } from './content/Service';

function handleResponseSuccess(data, handler, actionId) {
  return handler({ success: true, data, actionId });
}

function handleResponseError(error, handler, actionId) {
  return handler({ success: false, error, actionId });
}

function generateErrorInfo(error) {
  const { message, code } = error || {};
  return {
    message: message || '',
    code: code || '',
  };
}

/**
 * Handle message from content or popup
 * @param {Object} message
 * @param {Object} sender
 * @param {Function} sendResponse
 */
function handleMessage(message, sender, sendResponse) {
  if (!message || typeof message !== 'object') {
    handleResponseError(
      {
        message: 'message is not allow empty.',
      },
      sendResponse
    );
    return false;
  }
  if (!message.from || !message.action) {
    return false;
  }
  const { from, action, data = {} } = message;
  const { actionId } = data;
  if (from === 'content') {
    if (actionId && sender.tab) {
      addContentCallback(actionId, {
        tabId: sender.tab.id,
        frameId: sender.frameId,
      });
    }
    if (actionId) {
      mergeContentParams(actionId, data);
    }
    PageApi.handleMessage(action, data).then(
      res => {
        const { pending } = res || {};
        // const { pending, windowId } = res || {};
        // if (actionId && windowId) {
        //   mergeContentParams(actionId, { windowId });
        // }
        handleResponseSuccess(res, sendResponse, pending ? '' : actionId);
        if (!pending && actionId) {
          removeContentCallback(actionId);
          removeContentParams(actionId);
        }
      },
      error => {
        handleResponseError(generateErrorInfo(error), sendResponse, actionId);
        if (actionId) {
          removeContentCallback(actionId);
          removeContentParams(actionId);
        }
      }
    );
    return true;
    // eslint-disable-next-line
  } else if (from === 'popup') {
    if (sender.id !== chrome.runtime.id) {
      handleResponseError(
        {
          message: 'message.from is invalid',
        },
        sendResponse
      );
      return false;
    }
    if (action === 'callContentCallback') {
      removeContentParams(actionId);
      callContentCallback(actionId, data.data, data.error);
      handleResponseError(data.error, sendResponse);
      return false;
    }

    WalletApi.handleMessage(action, data).then(
      res => {
        if (actionId) {
          callContentCallback(actionId, res, null);
          removeContentParams(actionId);
        }
        handleResponseSuccess(res, sendResponse);
      },
      error => {
        const err = generateErrorInfo(error);
        if (actionId) {
          callContentCallback(actionId, null, err);
          removeContentParams(actionId);
        }
        handleResponseError(err, sendResponse);
      }
    );
    return true;
  } else {
    handleResponseError(
      {
        message: 'Unknown message source',
      },
      sendResponse
    );
    return false;
  }
}

chrome.runtime.onMessage.addListener(handleMessage);
