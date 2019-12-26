<!--

How To Use:

this.$root.dialogData = {
  title: 'Warning',
  content: 'Please enter your password!',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  inputFields: [{
    type: 'input',
    placeholder: 'Please Enter Username',
    name: 'username',
    value: '123',
  }, {
    type: 'password',
    placeholder: 'Please Enter Password',
    name: 'password',
    value: 'abc',
  }],
  onConfirm: (data) => {
    let result = true;
    if (!data.username) {
      this.toast('Please Enter Username');
      result = false;
    } else if (!data.password) {
      this.toast('Please Enter Password');
      result = false;
    }
    console.log(data);
    return Promise.resolve(result);
  },
};

-->
<template>
  <common-bus-dialog
    v-if="dialogData"
    @onConfirm="onDialogConfim"
    @onCancel="onDialogCancel"
    @onClose="onDialogClose"
    :title="dialogData.title"
    :content="dialogData.content"
    :inputFields="dialogData.inputFields"
    :cancelText="dialogData.cancelText"
    :confirmText="dialogData.confirmText"
    :clipboardData="dialogData.clipboardData"
  >
  </common-bus-dialog>
</template>
<script>
import CommonBusDialog from '../common/CommonBusDialog';

export default {
  data() {
    return {};
  },
  computed: {
    dialogData() {
      return this.$root.dialogData;
    },
  },
  components: {
    CommonBusDialog,
  },
  methods: {
    async onDialogConfim(data) {
      let canBeClose = true;
      if (typeof this.dialogData.onConfirm === 'function') {
        canBeClose = await this.dialogData.onConfirm(data);
      }
      if (canBeClose) {
        this.onDialogClose(true);
      }
    },
    onDialogCancel() {
      if (typeof this.dialogData.onCancel === 'function') {
        this.dialogData.onCancel();
      }
      this.onDialogClose(true);
    },
    onDialogClose(triggerByOperate) {
      if (triggerByOperate !== true && typeof this.dialogData.onClose === 'function') {
        this.dialogData.onClose();
      }
      this.$root.dialogData = null;
    },
  },
};
</script>
