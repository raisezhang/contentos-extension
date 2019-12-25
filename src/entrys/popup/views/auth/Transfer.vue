<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('transfer.fromAccount') }}</div>
        <div class="item-input">{{ sender }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('transfer.toAccount') }}</div>
        <div class="item-input">{{ receiver }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">
          {{ $t('transfer.amount') }}
          <div class="title-brief">{{ $t('contract.balance') }}{{ $root.userData.balance }} COS</div>
        </div>
        <div class="item-input">{{ amount }}</div>
        <div class="item-unit">COS</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('transfer.memo') }}</div>
        <div class="item-textarea">{{ memo || '&nbsp;' }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { formatDecimal } from '../../../../util/Format';
import { transfer } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      sender: '',
      receiver: '',
      amount: '',
      memo: '',
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    const { sender, receiver, amount, memo } = this.contentParams;
    this.sender = sender;
    this.receiver = receiver;
    this.amount = formatDecimal(amount, 6);
    this.memo = memo || '';
    this.getCurrentAccountInfo();
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
        await transfer(this.sender, this.receiver, this.amount, this.memo, { actionId: this.actionId });
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
