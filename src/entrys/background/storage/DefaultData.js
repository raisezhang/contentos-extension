export const LOCK_TIME_DEFAULT = 0;

export const NETWORK_DATA_DEFAULT = {
  list: [
    {
      id: 1,
      title: 'MainNet',
      key: 'main',
      url: 'https://mainnode.contentos.io',
      explorer: 'https://explorer.contentos.io',
      createAccountUrl: 'https://wallet.contentos.io',
      canModify: false,
    },
    {
      id: 2,
      title: 'TestNet',
      key: 'test',
      url: 'https://testnode.contentos.io',
      explorer: 'https://testexplorer.contentos.io',
      createAccountUrl: 'http://testwallet.contentos.io',
      canModify: false,
    },
  ],
  selected: 0,
};

export const DAPP_WHITE_LIST_DEFAULT = [];
