<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('post.account') }}</div>
        <div class="item-input">{{ account }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('sign.message') }}</div>
        <div class="item-textarea">{{ message }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { signMessage } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      account: '',
      message: '',
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    const { account, message } = this.contentParams;
    this.account = account;
    this.message = message;
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
        await signMessage(this.account, this.message, { actionId: this.actionId });
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

<style lang="less" scoped>
.form-item {
  .item-textarea {
    min-height: 5rem;
  }
}
</style>
