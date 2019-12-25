<template>
  <account-layout>
    <div class="lock-page">
      <form @submit.prevent="goUnlock" action="#" method="post">
        <div class="form-items">
          <div class="form-item">
            <input type="password" v-model="password" :placeholder="$t('lock.enterPassword')" class="item-input" />
          </div>
        </div>
        <div class="buttons">
          <button class="common-button" type="submit">{{ $t('lock.unlock') }}</button>
        </div>
      </form>
    </div>
  </account-layout>
</template>
<script>
import AccountLayout from '../../components/layout/AccountLayout';
import MixinAccount from '../../plugins/MixinAccount';
import { unlock, getDefaultAccount } from '../../service/WalletApi';

export default {
  data() {
    return {
      password: '',
    };
  },
  created() {
    this.restoreContentParams();
  },
  components: {
    AccountLayout,
  },
  mixins: [MixinAccount],
  methods: {
    async goUnlock() {
      if (!this.password) {
        this.toast(this.$t('lock.enterPassword'));
        return;
      }
      if (this.password.length < 6 || this.password.length > 20) {
        this.toast(this.$t('components.passwordRule'));
        return;
      }
      try {
        await unlock(this.password);
        await this.getState();
        const { redirectPath, redirectQuery } = this.$route.query;
        if (redirectPath) {
          let redirectQueryData = {};
          try {
            redirectQueryData = JSON.parse(redirectQuery);
          } catch (ex) {
            // TODO
          }
          this.$router.replace({
            path: redirectPath,
            query: redirectQueryData,
          });
        } else if (this.contentParams && this.contentParams.getDefaultAccount) {
          await getDefaultAccount({ actionId: this.actionId });
          this.closePopup();
        } else {
          await this.showHomePage();
        }
      } catch (ex) {
        this.toast(ex.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lock-page {
  padding: 1.6rem 1.6rem;
  .buttons {
    padding-top: 0.4rem;
  }
}
</style>
