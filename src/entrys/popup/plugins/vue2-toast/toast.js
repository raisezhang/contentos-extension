/**
 * Updated by linxin on 2017/7/27.
 */
const Toast = {};
let showToast = false; // 存储toast显示状态
let showLoad = false; // 存储loading显示状态
let toastVM = null; // 存储toast vm
let loadNode = null; // 存储loading节点元素
let timerId = -1;

Toast.install = function installToast(Vue, options) {
  const opt = {
    defaultType: 'bottom',
    duration: '2000',
    wordWrap: false,
    ...options,
  };

  // eslint-disable-next-line
  Vue.prototype.$toast = function toast(tips, type) {
    if (type === 'close') {
      if (showToast) {
        clearTimeout(timerId);
      }
      if (toastVM) {
        showToast = false;
        toastVM.show = showToast;
      }
      return;
    }
    const curType = type || opt.defaultType;

    if (showToast) {
      clearTimeout(timerId);
    }

    if (!toastVM) {
      const ToastTpl = Vue.extend({
        data() {
          return {
            show: false,
            tip: tips,
            wordWrap: opt.wordWrap,
            type: opt.type,
            extStyle: opt.width
              ? {
                  width: opt.width,
                }
              : {},
          };
        },
        render(h) {
          if (!this.show) return '';
          return h('div', {
            class: ['lx-toast', `lx-toast-${this.type}`, this.wordWrap ? 'lx-word-wrap' : ''],
            style: this.extStyle,
            show: this.show,
            domProps: { innerHTML: this.tip },
          });
        },
      });
      toastVM = new ToastTpl();
      const tpl = toastVM.$mount().$el;
      document.body.appendChild(tpl);
    }
    toastVM.type = `lx-toast-${curType}`;
    toastVM.tip = tips;
    showToast = true;
    toastVM.show = showToast;

    timerId = setTimeout(() => {
      showToast = false;
      toastVM.show = showToast;
    }, opt.duration);
  };
  ['bottom', 'center', 'top', 'close'].forEach(type => {
    // eslint-disable-next-line
    Vue.prototype.$toast[type] = function(tips) {
      return Vue.prototype.$toast(tips, type);
    };
  });

  // eslint-disable-next-line
  Vue.prototype.$loading = function loading(tip, type) {
    if (type === 'close') {
      if (loadNode) {
        showLoad = false;
        loadNode.show = showLoad;
      }
    } else {
      if (showLoad && loadNode) {
        loadNode.tip = tip;
        return;
      }
      const LoadTpl = Vue.extend({
        data() {
          return {
            show: false,
            tip,
          };
        },
        render(h) {
          if (!this.show) return '';
          return h('div', { attrs: { class: 'lx-load-mark' }, show: this.show }, [
            h('div', { attrs: { class: 'lx-load-box' } }, [
              h('div', { attrs: { class: 'lx-loading' } }),
              h('div', { attrs: { class: 'lx-load-content' }, domProps: { innerHTML: this.tip } }),
            ]),
          ]);
        },
      });
      loadNode = new LoadTpl();
      const tpl = loadNode.$mount().$el;
      document.body.appendChild(tpl);
      showLoad = true;
      loadNode.show = showLoad;
    }
  };

  ['open', 'close'].forEach(type => {
    // eslint-disable-next-line
    Vue.prototype.$loading[type] = function(tips) {
      return Vue.prototype.$loading(tips, type);
    };
  });
};
export default Toast;
