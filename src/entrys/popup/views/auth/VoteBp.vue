<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('vote.voter') }}</div>
        <div class="item-input">{{ voterValue }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('vote.bpName') }}</div>
        <div class="item-input">{{ bpValue }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('vote.operate') }}</div>
        <div class="item-input">{{ cancel ? $t('vote.cancelVote') : $t('vote.title') }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { voteToBlockProducer } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      voterValue: '',
      bpValue: '',
      cancel: false,
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    const { voterValue, bpValue, cancel } = this.contentParams;
    this.voterValue = voterValue;
    this.bpValue = bpValue;
    this.cancel = cancel;
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
        await voteToBlockProducer(this.voterValue, this.bpValue, this.cancel, { actionId: this.actionId });
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
