import PostMessageStream from 'post-message-stream';

function injectContentScript() {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', false);
    scriptTag.setAttribute('src', chrome.extension.getURL('static/js/content.js'));
    container.insertBefore(scriptTag, container.children[0]);
    container.removeChild(scriptTag);
  } catch (e) {
    // eslint-disable-next-line
    console.error('injection contentjs wallet failed', e);
  }
}

const writeMessage = (() => {
  const messageStream = new PostMessageStream({
    name: 'contentos_contentscript',
    target: 'contentos_inpage',
  });

  const responseSuccess = (data, actionId) => {
    messageStream.write({
      success: true,
      data,
      actionId,
    });
  };
  const responseError = (error, actionId) => {
    messageStream.write({
      success: false,
      error,
      actionId,
    });
  };

  messageStream.on('data', message => {
    if (!message || message.from !== 'content') {
      responseError({
        message: 'Unknown message source',
      });
      return;
    }
    chrome.runtime.sendMessage(message, response => {
      const { success, actionId } = response || {};
      if (success) {
        responseSuccess(response.data, actionId);
      } else {
        responseError(response.error, actionId);
      }
    });
  });

  return message => {
    messageStream.write(message);
  };
})();

function startMessageListener() {
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.tab) {
      return;
    }
    const { error, data, actionId } = message || {};
    if (!actionId) {
      return;
    }
    writeMessage({ success: !!data, actionId, data, error });
  });
}

injectContentScript();
startMessageListener();
