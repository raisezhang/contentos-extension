<template>
  <div class="password-page">
    <form @submit.prevent="goConfirm" action="#" method="post">
      <div class="form-items">
        <div class="form-item">
          <div class="item-title">{{ $t('changepassword.currentPassword') }}</div>
          <input type="password" v-model="oldPassword" :placeholder="$t('changepassword.enterPassword')" class="item-input" />
        </div>
        <div class="form-item">
          <div class="item-title">{{ $t('changepassword.newPassword') }}</div>
          <input type="password" v-model="newPassword" :placeholder="$t('password.placeholder')" class="item-input" />
        </div>
        <div class="form-item">
          <div class="item-title">{{ $t('changepassword.confirmPassword') }}</div>
          <input type="password" v-model="confirmPassword" :placeholder="$t('changepassword.repeatPassword')" class="item-input" />
        </div>
      </div>
      <div class="buttons">
        <button class="common-button" type="submit">{{ $t('changepassword.change') }}</button>
      </div>
    </form>
  </div>
</template>
<script>
import { changePassword } from '../../service/WalletApi';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  },
  created() {},
  components: {},
  mounted() {},
  methods: {
    async goConfirm() {
      if (!this.oldPassword) {
        this.toast(this.$t('changepassword.passwordTips'));
        return;
      }
      if (this.oldPassword.length < 6 || this.oldPassword.length > 20) {
        this.toast(this.$t('changepassword.passwordRule'));
        return;
      }
      if (!this.newPassword) {
        this.toast(this.$t('changepassword.newPasswordTips'));
        return;
      }
      if (this.newPassword.length < 6 || this.newPassword.length > 20) {
        this.toast(this.$t('changepassword.newPasswordRule'));
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.toast(this.$t('changepassword.inconsistent'));
        return;
      }
      try {
        await changePassword(this.oldPassword, this.newPassword);
      } catch (ex) {
        this.toast(ex.message);
        return;
      }
      await this.getState();
      this.toast(this.$t('changepassword.success'));
      this.$router.replace({
        path: '/account/lock',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.password-page {
  padding: 0.8rem 1rem;
}
.buttons {
  padding-top: 0.6rem;
}
</style>
