<template>
  <div class="exchange-page">
    <form @submit.prevent="goExchange" action="#" method="post">
      <div class="form-items">
        <div class="form-item">
          <div class="item-title">{{ $t('exchange.account') }}</div>
          <input disabled :value="currentAccount.account" class="item-input disabled" />
        </div>
        <div class="form-item">
          <div class="item-title">{{ $t('exchange.type') }}</div>
          <select class="item-select" v-model="exchangeType">
            <option :value="item.value" v-for="(item, index) in exchangeList" :key="index">{{ $t(item.title) }}</option>
          </select>
          <span class="item-select-arrow"></span>
        </div>
        <template v-if="exchangeType == 'cosToVest'">
          <div class="form-item">
            <div class="item-title">
              {{ $t('transfer.amount') }}
              <div class="title-brief">{{ $t('contract.balance') }}{{ $root.userData.balance }} COS</div>
            </div>
            <input spellcheck="false" v-model="amount" :placeholder="$t('exchange.inputAmount')" class="item-input" />
            <div class="item-unit">COS</div>
          </div>
        </template>
        <template v-else-if="exchangeType == 'vestToCos'">
          <div class="form-item">
            <div class="item-title">
              {{ $t('transfer.amount') }}
              <div class="title-brief">{{ $t('exchange.vestBalance') }}{{ $root.userData.vest }} VEST</div>
            </div>
            <input spellcheck="false" v-model="amount" :placeholder="$t('exchange.inputAmount')" class="item-input" />
            <div class="item-unit">VEST</div>
          </div>
        </template>
        <template v-else-if="exchangeType == 'cosToStake'">
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
            <div class="item-brief">{{ $t('exchange.stamina') }}{{ $root.userData.stamina }}</div>
          </div>
        </template>
        <template v-else-if="exchangeType == 'stakeToCos'">
          <div class="form-item">
            <div class="item-title">{{ $t('transfer.toAccount') }}</div>
            <input spellcheck="false" v-model="toAccount" :placeholder="$t('exchange.recipientAccount')" class="item-input" />
          </div>
          <div class="form-item">
            <div class="item-title">
              {{ $t('transfer.amount') }}
              <div class="title-brief">{{ $t('exchange.chickenBalance') }}{{ $root.userData.stake }} VEST</div>
            </div>
            <input spellcheck="false" v-model="amount" :placeholder="$t('exchange.inputAmount')" class="item-input" />
            <div class="item-unit">VEST</div>
            <div class="item-brief">{{ $t('exchange.stamina') }}{{ $root.userData.stamina }}</div>
          </div>
        </template>
      </div>
      <div class="buttons">
        <button :class="`common-button${operating ? ' disabled' : ''}`" type="submit">{{ $t('exchange.convert') }} {{ $t(exchangeList[exchangeTypeIndex].title) }}</button>
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
    </form>
  </div>
</template>
<script>
import { formatDecimal } from '../../../../util/Format';
import * as WalletApi from '../../service/WalletApi';

export default {
  data() {
    return {
      exchangeList: [
        {
          title: 'exchange.cosToVest',
          value: 'cosToVest',
        },
        {
          title: 'exchange.vestToCos',
          value: 'vestToCos',
        },
        {
          title: 'exchange.cosToStake',
          value: 'cosToStake',
        },
        {
          title: 'exchange.stakeToCos',
          value: 'stakeToCos',
        },
      ],
      exchangeType: 'cosToVest',
      toAccount: '',
      amount: '',
      operating: false,
    };
  },
  computed: {
    exchangeTypeIndex() {
      return this.exchangeList.findIndex(item => item.value === this.exchangeType);
    },
  },
  created() {
    const { type } = this.$route.query;
    this.exchangeType = type || this.exchangeType;
    this.eventBus.$emit('refreshAccountInfo');
  },
  components: {},
  mounted() {},
  methods: {
    async goExchange() {
      if (this.operating) {
        return;
      }
      if (this.exchangeType === 'cosToStake' || this.exchangeType === 'stakeToCos') {
        if (!this.toAccount) {
          this.toast(this.$t('exchange.amountTips'));
          return;
        }
      }
      const amount = parseFloat(this.amount, 10) || 0;
      if (!amount || amount <= 0) {
        this.toast(this.$t('exchange.enterAmount'));
        return;
      }
      if (this.exchangeType === 'vestToCos' && amount <= 1) {
        this.toast(this.$t('exchange.convertRule'));
        return;
      }
      this.operating = true;
      this.startLoading(true);
      const result = await WalletApi[this.exchangeType](this.currentAccount.account, formatDecimal(amount, 6), this.toAccount);
      if (result && result.invoice && result.invoice.status === 200) {
        const { trxId } = result.invoice;
        this.$root.dialogData = {
          title: this.$t('exchange.success'),
          content: `TxHash：${trxId}`,
          cancelText: this.$t('common.cancel'),
          confirmText: this.$t('exchange.openExplorer'),
          onConfirm: () => {
            this.openUrl(`/#/tx/${trxId}`);
            return Promise.resolve(true);
          },
        };
        this.amount = '';
        this.toAccount = '';
      } else {
        this.showErrorDialog(this.$t('exchange.failed'), result);
      }
      this.operating = false;
      this.stopLoading();
      this.eventBus.$emit('refreshAccountInfo');
    },
  },
};
</script>

<style lang="less" scoped>
.exchange-page {
  padding: 0.8rem 1rem;
  .buttons {
    padding-top: 0.6rem;
  }
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
