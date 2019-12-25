<template>
  <div class="setting">
    <ul class="slide-list">
      <li class="slide-item">
        <router-link to="/wallet/list"> <i class="icon icon-account"></i>{{ $t('setting.account') }} </router-link>
        <div class="halfline"></div>
      </li>
    </ul>
    <ul class="slide-list">
      <li class="slide-item">
        <router-link to="/setting/network"> <i class="icon icon-network"></i>{{ $t('setting.network') }} </router-link>
        <div class="halfline"></div>
      </li>
      <li class="slide-item">
        <router-link to="/setting/dapp-white-list"> <i class="icon icon-dapp"></i>{{ $t('setting.dappWhitelist') }} </router-link>
        <div class="halfline"></div>
      </li>
      <li class="slide-item">
        <router-link to="/setting/bp-vote"> <i class="icon icon-vote"></i>{{ $t('setting.bpVote') }} </router-link>
        <div class="halfline"></div>
      </li>
    </ul>
    <ul class="slide-list">
      <li class="slide-item">
        <router-link to="/setting/language"> <i class="icon icon-language"></i>{{ $t('setting.language') }} </router-link>
        <div class="halfline"></div>
      </li>
      <li class="slide-item">
        <router-link to="/setting/password"> <i class="icon icon-security"></i>{{ $t('setting.password') }} </router-link>
        <div class="halfline"></div>
      </li>
      <li class="slide-item">
        <router-link to="/setting/lock-time"> <i class="icon icon-lock"></i>{{ $t('setting.lockTime') }} </router-link>
        <div class="halfline"></div>
      </li>
    </ul>
    <ul class="slide-list">
      <li class="slide-item">
        <router-link to="/setting/about-us"> <i class="icon icon-about"></i>{{ $t('setting.aboutUs') }} </router-link>
        <div class="halfline"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  activated() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.setting {
  .slide-list {
    margin-top: 0.6rem;
    .red-text {
      color: #fff;
      background: @red-color;
      padding: 0.1rem 0.4rem;
      margin-top: -0.06rem;
      border-radius: 0.1rem;
      margin-right: 1.2rem;
    }
  }
  .icon-account {
    background-image: url('../../assets/images/icon/icon-wallet-list.png');
  }
  .icon-network {
    background-image: url('../../assets/images/icon/icon-network.png');
  }
  .icon-dapp {
    background-image: url('../../assets/images/icon/icon-dapp-white-list.png');
  }
  .icon-vote {
    background-image: url('../../assets/images/icon/icon-vote.png');
  }
  .icon-language {
    background-image: url('../../assets/images/icon/icon-language.png');
    background-size: 86% !important;
    background-position: 50% 90% !important;
  }
  .icon-security {
    background-image: url('../../assets/images/icon/icon-security.png');
  }
  .icon-lock {
    background-image: url('../../assets/images/icon/icon-lock-time.png');
  }
  .icon-about {
    background-image: url('../../assets/images/icon/icon-about-us.png');
  }
  .slide-list {
    .slide-item {
      a {
        font-size: 0.72rem;
      }
      .sitem-tip {
        font-size: 0.64rem;
      }
      &::after {
        width: 0.9rem;
        right: 0.6rem;
      }
    }
  }
}
</style>
