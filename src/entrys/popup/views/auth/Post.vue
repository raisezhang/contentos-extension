<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('post.account') }}</div>
        <div class="item-textarea">{{ sender }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('post.title') }}</div>
        <div class="item-textarea">{{ title }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('post.content') }}</div>
        <div class="item-textarea">{{ fmtContent }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('post.tags') }}</div>
        <div class="item-textarea">{{ tagsStr }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { post } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      sender: '',
      title: '',
      content: '',
      fmtContent: '',
      tagsStr: '',
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    const { sender, title, content, tagsStr } = this.contentParams;
    this.sender = sender;
    this.title = title;
    this.content = content;
    this.fmtContent = content.length > 200 ? `${content.slice(0, 200)}...` : content;
    this.tagsStr = tagsStr;
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
        await post(this.sender, this.title, this.content, this.tagsStr, { actionId: this.actionId });
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
