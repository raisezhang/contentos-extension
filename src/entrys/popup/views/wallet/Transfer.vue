<template>
  <div class="transfer-page">
    <form @submit.prevent="goSubmit" action="#" method="post">
      <div class="form-items">
        <div class="form-item">
          <div class="item-title">{{ $t('transfer.fromAccount') }}</div>
          <input disabled :value="currentAccount.account" class="item-input disabled" />
        </div>
        <div class="form-item">
          <div class="item-title">{{ $t('transfer.toAccount') }}</div>
          <input spellcheck="false" v-model="toAccount" :placeholder="$t('exchange.recipientAccount')" class="item-input" />
        </div>
        <div class="form-item">
          <div class="item-title">
            {{ $t('transfer.amount') }}
            <div class="title-brief">{{ $t('contract.balance') }}{{ $root.userData.balance }} COS</div>
          </div>
          <input spellcheck="false" v-model="amount" :placeholder="$t('exchange.inputAmount')" class="item-input" />
          <div class="item-unit">COS</div>
        </div>
        <div class="form-item">
          <div class="item-title">{{ $t('transfer.memo') }}</div>
          <input spellcheck="false" v-model="memo" :placeholder="$t('transfer.optional')" class="item-input" />
        </div>
      </div>
      <div class="buttons">
        <button :class="`common-button${operating ? ' disabled' : ''}`" type="submit">{{ $t('transfer.confirm') }}</button>
      </div>
    </form>
  </div>
</template>
<script>
import { formatDecimal } from '../../../../util/Format';
import { transfer } from '../../service/WalletApi';

export default {
  data() {
    return {
      toAccount: '',
      amount: '',
      memo: '',
      operating: false,
    };
  },
  created() {
    this.eventBus.$emit('refreshAccountInfo');
  },
  mounted() {},
  components: {},
  methods: {
    async goSubmit() {
      if (this.operating) {
        return;
      }
      if (!this.toAccount) {
        this.toast(this.$t('exchange.amountTips'));
        return;
      }
      const amount = parseFloat(this.amount, 10) || 0;
      if (!amount || amount <= 0) {
        this.toast(this.$t('exchange.enterAmount'));
        return;
      }
      this.operating = true;
      this.startLoading(true);
      const result = await transfer(this.currentAccount.account, this.toAccount, formatDecimal(amount, 6), this.memo);
      if (result && result.invoice && result.invoice.status === 200) {
        const { trxId } = result.invoice;
        this.$root.dialogData = {
          title: this.$t('transfer.success'),
          content: `TxHash：${trxId}`,
          cancelText: this.$t('common.cancel'),
          confirmText: this.$t('exchange.openExplorer'),
          onConfirm: () => {
            this.openUrl(`/#/tx/${trxId}`);
            return Promise.resolve(true);
          },
        };
        this.amount = '';
        this.memo = '';
        this.toAccount = '';
      } else {
        this.showErrorDialog(this.$t('transfer.failed'), result);
      }
      this.operating = false;
      this.stopLoading();
      this.eventBus.$emit('refreshAccountInfo');
    },
  },
};
</script>

<style lang="less" scoped>
.transfer-page {
  padding: 0.8rem 1rem;
  .buttons {
    padding-top: 0.6rem;
  }
}
</style>
