<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('vote.voter') }}</div>
        <div class="item-input">{{ sender }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('vote.identity') }}</div>
        <div class="item-input">{{ idx }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { vote } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      sender: '',
      idx: '',
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    const { sender, idx } = this.contentParams;
    this.sender = sender;
    this.idx = idx;
  },
  mixins: [MixinAccount],
  methods: {
    async goSubmit() {
      if (this.operating) {
        return;
      }
      this.operating = true;
      this.startLoading(true);
      try {
        await vote(this.sender, this.idx, { actionId: this.actionId });
      } catch (error) {
        // TODO
      }
      this.operating = false;
      this.stopLoading();
      this.closePopup();
    },
  },
};
</script>

<style lang="less" scoped></style>
