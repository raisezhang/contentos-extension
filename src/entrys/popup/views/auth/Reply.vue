<template>
  <div class="auth-preview-page">
    <div class="form-items">
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('post.account') }}</div>
        <div class="item-textarea">{{ sender }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('reply.identity') }}</div>
        <div class="item-textarea">{{ parent_uuid }}</div>
      </div>
      <div class="form-item form-item-preview">
        <div class="item-title">{{ $t('reply.content') }}</div>
        <div class="item-textarea">{{ fmtContent }}</div>
      </div>
    </div>
    <div class="buttons">
      <button @click="onUserCancel" plain :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.cancel') }}</button>
      <button @click="goSubmit" :class="`common-button${operating ? ' disabled' : ''}`">{{ $t('common.confirm') }}</button>
    </div>
  </div>
</template>
<script>
import { reply } from '../../service/WalletApi';
import MixinAccount from '../../plugins/MixinAccount';

export default {
  data() {
    return {
      sender: '',
      parent_uuid: '',
      content: '',
      fmtContent: '',
      operating: false,
    };
  },
  created() {
    this.restoreContentParams();
    // eslint-disable-next-line
    const { sender, parent_uuid, content } = this.contentParams;
    this.sender = sender;
    // eslint-disable-next-line
    this.parent_uuid = parent_uuid;
    this.content = content;
    this.fmtContent = content.length > 200 ? `${content.slice(0, 200)}...` : content;
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
        await reply(this.sender, this.parent_uuid, this.content, { actionId: this.actionId });
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
