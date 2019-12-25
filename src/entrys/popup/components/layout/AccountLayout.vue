<template>
  <div class="account-layout">
    <div class="layout-header">
      <div class="header-logo">Contentos Wallet</div>
    </div>
    <div class="layout-inner">
      <slot></slot>
    </div>
    <div class="entrys">
      <router-link class="entry-item" to="/setting/network">{{ currentNetwork }}</router-link>
      <router-link class="entry-item" to="/setting/language">{{ $t('common.language') }}</router-link>
      <router-link class="entry-item" to="/setting/about-us">{{ $t('nav.aboutUs') }}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentNetwork() {
      const { list, selected } = this.$root.network;
      return list[selected].title;
    },
  },
  created() {},
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style lang="less" scoped>
.account-layout {
  background-color: #fff;
  height: 100%;
  .layout-header {
    height: 9rem;
    position: relative;
    background-color: @primary-color;
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-image: url('../../assets/images/header/header-background.png');
    background-position: 0 50%;
    animation: roll-background 18s linear infinite;
    animation-direction: alternate;
    .header-logo {
      text-indent: -999em;
      background-image: url('../../assets/images/header/header-logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      height: 4rem;
      width: 12rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  .entrys {
    position: absolute;
    bottom: 1.2rem;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.72rem;
    .entry-item {
      border-left: solid 1px #ddd;
      line-height: 1;
      display: inline-block;
      padding: 0 1rem;
      color: @primary-color;
      &:nth-child(1) {
        border-left: 0 none;
      }
    }
  }
}
@keyframes roll-background {
  0% {
    background-position: 0 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
