<template>
  <div class="dapp-white-list-page">
    <ul class="slide-list slide-small-list">
      <li v-for="(item, index) in dataList" :key="index" class="slide-item sitem-hide-icon sitem-hide-arrow">
        <a>
          {{ item.domain }}
          <div>{{ $t('contract.title') }}{{ item.contract }}</div>
          <div>{{ $t('post.account') }}{{ item.account }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('whitelist.network') }}{{ item.network }}</div>
        </a>
        <span v-tooltip="$t('common.delete')" @click="deleteItem(item.id)" class="icon icon-delete">{{ $t('common.delete') }}</span>
        <div class="halfline"></div>
      </li>
    </ul>
    <div v-if="dataList.length == 0" class="empty-view">
      {{ $t('whitelist.noRecords') }}
    </div>
  </div>
</template>
<script>
import { getDappWhiteList, removeDappWhiteListById } from '../../service/WalletApi';

export default {
  data() {
    return {
      dataList: [],
    };
  },
  created() {
    this.initData();
  },
  components: {},
  mounted() {},
  methods: {
    async initData() {
      this.dataList = await getDappWhiteList();
    },
    async deleteItem(id) {
      await removeDappWhiteListById(id);
      this.initData();
    },
  },
};
</script>

<style lang="less" scoped>
.dapp-white-list-page {
  .slide-list .slide-item a {
    padding-right: 3rem !important;
    padding-left: 1rem !important;
    word-break: break-all;
    div {
      color: @gray-color;
      &:nth-child(1) {
        margin-top: 0.3rem;
      }
      font-size: 0.68rem;
    }
  }
  .icon {
    left: auto !important;
    right: 1rem !important;
    cursor: pointer;
  }
  .icon-delete {
    text-indent: -999em;
    background-image: url('../../assets/images/icon/icon-delete.png');
  }
  .empty-view {
    padding: 3rem 0;
    color: @gray-color;
    text-align: center;
  }
}
</style>
