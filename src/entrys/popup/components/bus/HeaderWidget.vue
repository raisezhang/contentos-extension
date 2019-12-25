<template>
  <div v-if="!isHeaderNone" :class="`header-widget${isHeaderAccount ? ' white-mode' : ''}${isHeaderTitle ? ' blue-mode' : ''}`">
    <div class="header-inner fixed-header">
      <div class="title-view">
        <router-link v-if="isHeaderAccount" class="btn-wallet" to="/wallet/list">{{ $t('components.account') }}</router-link>
        <a v-else-if="!isHeaderTitle" @click="goBack" class="btn-back">{{ $t('common.back') }}</a>
        <div class="title-text">
          <template v-if="isHeaderAccount">
            <v-popover @show="flagShowPopover = true" @hide="flagShowPopover = false" placement="top" offset="-4">
              <div class="account-info">{{ (currentAccount && currentAccount.account) || '' }}<span :class="`arrow ${flagShowPopover ? 'arrow-down' : ''}`"></span></div>
              <wallet-list-popover slot="popover"></wallet-list-popover>
            </v-popover>
          </template>
          <template v-else>
            {{ $t($route.meta.title) }}
          </template>
        </div>
        <router-link v-if="isHeaderAccount" class="btn-menu" to="/setting">{{ $t('nav.setting') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as HeaderType from '../../enums/HeaderType';
import WalletListPopover from '../wallet/WalletListPopover';

export default {
  data() {
    return {
      flagShowPopover: false,
    };
  },
  props: {
    headerType: {
      type: String,
      default: HeaderType.none,
    },
  },
  computed: {
    isHeaderAccount() {
      return this.headerType === HeaderType.account;
    },
    isHeaderTitle() {
      return this.headerType === HeaderType.title;
    },
    isHeaderNone() {
      return this.headerType === HeaderType.none;
    },
  },
  components: {
    WalletListPopover,
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.header-widget,
.header-widget .header-inner {
  height: 2.6rem;
  line-height: 2.6rem;
}
.header-widget {
  background: #fff;
  z-index: 10;
  position: relative;
  left: 0;
  width: 100%;
  .header-inner {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    text-align: center;
    border-bottom: solid 1px @border-color;
    background: #fff;
    li:nth-last-child(1) a::after {
      display: none;
    }
  }
  .title-view {
    position: relative;
    padding: 0 3rem;
    box-sizing: border-box;
    .btn-wallet,
    .btn-menu,
    .btn-back {
      cursor: pointer;
      position: absolute;
      height: 100%;
      width: 3rem;
      box-sizing: border-box;
      text-align: left;
      font-size: 0.72rem;
      color: @light-black-color;
      top: 0;
      text-indent: -999em;
      background-repeat: no-repeat;
      background-position: center;
    }
    .btn-back {
      left: 0;
      background-image: url('../../assets/images/icon/icon-back.png');
      background-size: 46%;
    }
    .btn-wallet {
      left: 0;
      background-image: url('../../assets/images/icon/icon-wallet.png');
      background-size: 48%;
    }
    .btn-menu {
      right: 0;
      background-image: url('../../assets/images/icon/icon-setting.png');
      background-size: 50%;
    }
    .title-text {
      font-weight: bold;
      color: @light-black-color;
      overflow: hidden;
      white-space: nowrap;
    }
    .account-info {
      cursor: pointer;
      display: inline-block;
      user-select: none;
      .arrow {
        display: inline-block;
        border: solid 2px #909090;
        width: 0.6rem;
        height: 0.6rem;
        border-top: 0 none;
        border-left: 0 none;
        transform: scale(0.6) rotate(45deg) translateY(-0.1rem) translateX(0);
        margin-left: 0.5rem;
        transition: transform ease 0.2s;
      }
      .arrow-down {
        transform: scale(0.6) rotate(225deg) translateY(-0.3rem) translateX(-0.3rem);
      }
    }
  }
  &.white-mode {
    background-color: transparent;
    position: absolute;
    .header-inner {
      background-color: transparent;
      border-bottom-color: rgba(255, 255, 255, 0.14);
      .btn-wallet {
        background-image: url('../../assets/images/icon/icon-wallet-white.png');
      }
      .btn-menu {
        background-image: url('../../assets/images/icon/icon-setting-white.png');
      }
      .account-info {
        color: #fff;
        .arrow {
          border-color: #fff;
        }
      }
    }
  }
  &.blue-mode {
    .header-inner {
      background: linear-gradient(90deg, #2263e6, #1b46d3);
      .title-text {
        color: #fff;
      }
    }
  }
}
</style>
