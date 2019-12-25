import { getState } from '../service/WalletApi';

const MixinPlugin = {
  install(Vue) {
    Vue.mixin({
      computed: {
        currentAccount() {
          const { accounts, selected } = this.$root.wallet || {};
          if (accounts && accounts.length > 0) {
            return accounts[selected];
          }
          return null;
        },
      },
      methods: {
        async getState() {
          const state = await getState();
          const { network, wallet, locked, walletCreated } = state;
          this.$root.network = network;
          this.$root.wallet = wallet;
          this.$root.locked = locked;
          this.$root.walletCreated = walletCreated;
          this.eventBus.$emit('refreshAccountInfo');
        },
        startLoading(flagOperate) {
          this.$loading(flagOperate === true ? this.$t('common.toastOperateLoading') : this.$t('common.toastLoading'));
        },
        stopLoading() {
          this.$loading.close();
        },
        toast(...args) {
          this.$toast.apply(null, args);
        },
        showErrorDialog(title, result) {
          let content = '';
          let inputFields = [];
          if (typeof result === 'string') {
            content = result;
          } else {
            if (result && result.invoice && result.invoice.status) {
              content = `status：${result.invoice.status}，${result.invoice.errorInfo || ''}`;
            } else if (result && result.msg) {
              content = result.msg;
            }
            inputFields = [
              {
                type: 'privateKey',
                value: JSON.stringify(result),
              },
            ];
          }
          this.$root.dialogData = {
            title,
            content,
            inputFields,
          };
        },
        openUrl(urlString) {
          if (!urlString) {
            return;
          }
          let url = urlString;
          if (url.slice(0, 1) === '/') {
            const { list, selected } = this.$root.network;
            url = (list[selected].explorer || list[0].explorer) + url;
          }
          if (typeof chrome !== 'undefined' && typeof chrome.tabs !== 'undefined') {
            chrome.tabs.create({ url });
          } else {
            window.open(url);
          }
        },
      },
    });
  },
};
export default MixinPlugin;
