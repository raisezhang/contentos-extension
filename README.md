# contentos-extension

A Contentos Wallet in your Browser

## ✨ Introduction

Main functions of wallet:

- Create and import wallet, support mnemonic and private key import, support multiple accounts
- Switch wallet network and add custom network
- Support transfer and mutual exchange of COS to VEST / Chicken
- Vote for BP, cancel voting
- View recent transactions
- Set wallet automatic lock time flexibly

Interface provided to dApp developers:

- Get current account information
- Transfer and exchange COS to VEST / Chicken through interface
- Vote for BP, cancel voting
- Execute contract, add contract to white list
- Post content, comment, like
- Sign message

## 📦 Downloads

- [Download from Chrome Store](https://chrome.google.com/webstore/detail/contentos-wallet/fdlphmindllconhbcmlpdiildicodcjm)
- [Download zip file](https://github.com/raisezhang/contentos-extension/releases)

## 📖 Docs

- [Dapp example on CodePen](https://codepen.io/raisezhang/full/oNgWMLB/)
- [How does dApp access contentos-extension](https://github.com/raisezhang/contentos-extension/blob/master/docs/how-to-access-wallet-in-dapp.md)
- [How to sign and verify message](https://github.com/raisezhang/contentos-extension/blob/master/docs/how-to-sign-and-verify-message.md)
- [How is the client wallet compatible with the protocol of contenos-extension](https://github.com/raisezhang/contentos-extension/blob/master/docs/how-is-the-client-wallet-compatible.md)

## 🛠️ Build

- Install

  ``` bash
  $ git clone git@github.com:raisezhang/contentos-extension.git
  $ cd contentos-extension
  $ yarn install # or npm install
  ```

- Development

  ``` bash
  $ yarn watch:dev
  ```

- Production

  ``` bash
  $ yarn build
  $ yarn build-zip # package the build files
  ```

## 🔗 Links

- [Offical Website](https://www.contentos.io/)
- [Contentos Js SDK](https://github.com/coschain/cosjs/)
- [Explorer](https://explorer.contentos.io/)

## 🔑 License

contentos-extension is released under the MIT license.
