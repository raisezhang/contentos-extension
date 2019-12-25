import zhHans from '../i18n/zh-Hans.json';
import enUS from '../i18n/en-US.json';

export const LANG_LIST = [
  {
    locale: 'zh-Hans',
    locales: ['zh-CN'],
    messages: zhHans,
    title: '简体中文',
  },
  {
    locale: 'en-US',
    locales: ['en-US'],
    messages: enUS,
    title: 'English',
  },
];

export const LANG_DEFAULT = (function getDefaultLang() {
  let locale = '';
  try {
    locale = chrome.i18n.getUILanguage();
  } catch (ex) {
    /**/
  }
  const langList = LANG_LIST.filter(item => item.locales.indexOf(locale) >= 0);
  return langList.length > 0 ? langList[0].locale : 'en-US';
})();
