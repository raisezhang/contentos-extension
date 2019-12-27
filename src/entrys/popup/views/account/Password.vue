<template>
  <div class="password-page">
    <form @submit.prevent="goConfirm" action="#" method="post">
      <div class="warn-tips">
        {{ $t('password.warnTips') }}
      </div>
      <div class="form-items">
        <div class="form-item">
          <div class="item-title">{{ $t('password.title') }}</div>
          <input maxlength="20" type="password" v-model="password" :placeholder="$t('password.placeholder')" class="item-input" />
        </div>
        <div class="form-item">
          <div class="item-title">{{ $t('password.confirmTitle') }}</div>
          <input maxlength="20" type="password" v-model="confirmPassword" :placeholder="$t('password.repeatPassword')" class="item-input" />
        </div>
      </div>
      <div class="buttons">
        <button class="common-button" type="submit">{{ $t('common.confirm') }}</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
    };
  },
  created() {},
  components: {},
  mounted() {},
  methods: {
    goConfirm() {
      if (!this.password) {
        this.toast(this.$t('password.passwordTips'));
        return;
      }
      if (this.password.length < 6 || this.password.length > 20) {
        this.toast(this.$t('components.passwordRule'));
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.toast(this.$t('password.inconsistent'));
        return;
      }
      const { callbackPathName } = this.$route.params;
      if (!callbackPathName) {
        return;
      }
      this.$router.replace({
        name: callbackPathName,
        params: {
          password: this.password,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.password-page {
  padding: 0.8rem 1rem;
}
.warn-tips {
  color: @red-color;
  padding: 0.4rem 0 1.2rem;
  font-size: 0.78rem;
}
.buttons {
  padding-top: 0.6rem;
}
</style>
