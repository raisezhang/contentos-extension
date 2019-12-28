<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('contract.caller') }}</div>
        <div class="item-input">{{ caller }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('contract.owner') }}</div>
        <div class="item-input">{{ owner }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('contract.title') }}</div>
        <div class="item-input">{{ contract }} -> {{ method }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">
          {{ $t('contract.payment') }}
          <div class="title-brief">{{ $t('contract.balance') }}{{ $root.userData.balance }} COS</div>
        </div>
        <div class="item-input">{{ payment }}</div>
        <div class="item-unit">COS</div>
      </div>
      <div v-if="args" class="form-item form-item-preview">
        <div class="item-title">{{ $t('contract.arguments') }}</div>
        <div class="item-textarea">{{ args }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
    <div class="extra-info">
      <input v-model="inWhitelist" id="checkbox" type="checkbox" /><label for="checkbox">{{ $t('contract.enableWhitelist') }}</label>
      <div v-if="inWhitelist" class="warn-tips">
        {{ $t('contract.whitelistTips') }}
      </div>
    </div>
  </div>
</template>
<script>
import { formatDecimal } from '../../../../util/Format';
import { contractCall, addDappWhiteList, isInDappWhiteList } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      caller: '',
      owner: '',
      contract: '',
      method: '',
      args: '',
      payment: '',
      inWhitelist: false,
      operating: false,
      domain: '',
    };
  },
  created() {
    this.restoreContentParams();
    const { caller, owner, contract, method, args, payment, domain } = this.contentParams;
    this.caller = caller;
    this.owner = owner;
    this.contract = contract;
    this.method = method;
    this.args = args;
    this.domain = domain;
    this.payment = formatDecimal(payment, 6);
    this.getCurrentAccountInfo();
    this.detectContract();
  },
  mixins: [MixinAccount],
  methods: {
    async detectContract() {
      const result = await isInDappWhiteList(this.domain, this.contract);
      if (result) {
        this.toast(this.$t('contract.whitelistTips1'));
        this.goSubmit();
      }
    },
    async goSubmit() {
      if (this.operating) {
        return;
      }
      this.operating = true;
      this.startLoading(true);
      try {
        await contractCall(this.caller, this.owner, this.contract, this.method, this.args, this.payment, { actionId: this.actionId });
        if (this.inWhitelist) {
          await addDappWhiteList(this.domain, this.contract, this.method);
        }
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
.extra-info {
  padding: 1.2rem 0.4rem 0.6rem;
  font-size: 0.72rem;
  label {
    margin-left: 0.4rem;
    color: @gray-color;
    -webkit-user-select: none;
  }
  .warn-tips {
    color: @red-color;
    padding: 0.4rem 0 0;
  }
}
</style>
