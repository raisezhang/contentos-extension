import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { LANG_LIST } from '../service/LangData';

Vue.use(VueI18n);

export default function createI18n(context) {
  const messages = {};
  LANG_LIST.forEach(item => {
    messages[item.locale] = item.messages;
  });
  return new VueI18n({
    locale: context.lang,
    messages,
  });
}
