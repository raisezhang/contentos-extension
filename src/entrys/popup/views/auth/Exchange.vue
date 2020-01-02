<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('exchange.account') }}</div>
        <div class="item-input">{{ account }}</div>
      </div>
      <div v-if="exchangeType" class="form-item form-item-preview">
        <div class="item-title">{{ $t('exchange.type') }}</div>
        <div class="item-input">{{ $t(`exchange.${exchangeType}`) }}</div>
      </div>

      <div v-if="isStakeMode" class="form-item form-item-preview">
        <div class="item-title">{{ $t('transfer.toAccount') }}</div>
        <div class="item-input">{{ toAccount }}</div>
      </div>

      <template v-if="exchangeType == 'cosToVest'">
        <div class="form-item form-item-preview">
          <div class="item-title">
            {{ $t('transfer.amount') }}
            <div class="title-brief">{{ $t('contract.balance') }}{{ $root.userData.balance }} COS</div>
          </div>
          <div class="item-input">{{ amount }}</div>
          <div class="item-unit">COS</div>
        </div>
      </template>
      <template v-else-if="exchangeType == 'vestToCos'">
        <div class="form-item form-item-preview">
          <div class="item-title">
            {{ $t('transfer.amount') }}
            <div class="title-brief">{{ $t('exchange.vestBalance') }}{{ $root.userData.vest }} VEST</div>
          </div>
          <div class="item-input">{{ amount }}</div>
          <div class="item-unit">VEST</div>
        </div>
      </template>
      <template v-else-if="exchangeType == 'cosToStake'">
        <div class="form-item form-item-preview">
          <div class="item-title">
            {{ $t('transfer.amount') }}
            <div class="title-brief">{{ $t('contract.balance') }}{{ $root.userData.balance }} COS</div>
          </div>
          <div class="item-input">{{ amount }}</div>
          <div class="item-unit">COS</div>
          <div class="item-brief">{{ $t('exchange.stamina') }}{{ $root.userData.stamina }}</div>
        </div>
      </template>
      <template v-else-if="exchangeType == 'stakeToCos'">
        <div class="form-item form-item-preview">
          <div class="item-title">
            {{ $t('transfer.amount') }}
            <div class="title-brief">{{ $t('exchange.chickenBalance') }}{{ $root.userData.stake }} VEST</div>
          </div>
          <div class="item-input">{{ amount }}</div>
          <div class="item-unit">VEST</div>
          <div class="item-brief">{{ $t('exchange.stamina') }}{{ $root.userData.stamina }}</div>
        </div>
      </template>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
    <div v-if="exchangeType == 'vestToCos'" class="extra-brief">
      <div class="brief-item">
        {{ $t('exchange.remainVest') }}：
        <div>{{ $root.userData.withdrawRemains }} VEST</div>
      </div>
      <div class="brief-item">
        {{ $t('exchange.eachTimeVest') }}:
        <div>{{ $root.userData.withdrawEachTime }} VEST</div>
      </div>
      <div class="brief-item">
        {{ $t('exchange.nextTime') }}:
        <div>{{ $root.userData.nextWithdraw }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDecimal } from '../../../../util/Format';
import { cosToVest, vestToCos, cosToStake, stakeToCos } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      account: '',
      amount: '',
      toAccount: '',
      exchangeType: '',
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    const { account, amount, toAccount, exchangeType } = this.contentParams;
    this.account = account;
    this.amount = formatDecimal(amount, 6);
    this.toAccount = toAccount || '';
    this.exchangeType = exchangeType;
    this.getCurrentAccountInfo();
  },
  computed: {
    isStakeMode() {
      return this.exchangeType === 'cosToStake' || this.exchangeType === 'stakeToCos';
    },
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
        if (!this.isStakeMode) {
          await (this.exchangeType === 'cosToVest' ? cosToVest : vestToCos)(this.account, this.amount, { actionId: this.actionId });
        } else {
          await (this.exchangeType === 'cosToStake' ? cosToStake : stakeToCos)(this.account, this.amount, this.toAccount, { actionId: this.actionId });
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
.auth-preview-page {
  .extra-brief {
    padding-top: 1rem;
    font-size: 0.72rem;
    color: @gray-color;
    .brief-item {
      margin-top: 0.4rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
