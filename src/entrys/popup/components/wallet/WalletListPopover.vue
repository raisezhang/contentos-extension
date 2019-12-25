<template>
  <div v-if="$root.wallet" class="common-popover-list">
    <div
      v-close-popover
      v-for="(item, index) in $root.wallet.accounts"
      :key="index"
      @click="changeAccount(item.id)"
      :class="`popover-item${index == $root.wallet.selected ? ' selected' : ''}`"
    >
      <a href="javascript:;">{{ item.account }}</a>
    </div>
    <div class="popover-item item-space item-operate">
      <router-link to="/account/create">{{ $t('nav.createAccount') }}</router-link>
    </div>
    <div class="popover-item item-operate">
      <router-link to="/account/import">{{ $t('nav.importAccount') }}</router-link>
    </div>
  </div>
</template>

<script>
import { changeAccountSelected } from '../../service/WalletApi';

export default {
  data() {
    return {};
  },
  props: {},
  computed: {},
  mounted() {},
  methods: {
    async changeAccount(id) {
      try {
        await changeAccountSelected(id);
      } catch (ex) {
        this.toast(ex.message);
        return;
      }
      this.startLoading();
      await this.getState();
    },
  },
};
</script>
