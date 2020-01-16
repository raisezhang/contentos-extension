# How is the client wallet compatible

客户端钱包需要模拟 ```contentos-extension```，在网页加载完成后注入Javascript 脚本来实现与钱包的交互.

## 🔡 注入脚本接口列表

``` javascript

// 每个 API 的返回值请参考接入dApp文档

window.ContentosWallet = {
  getDefaultAccount() {},
  accountInfo(name) {},
  transfer(sender, receiver, amount, memo) {},
  contractCall(caller, owner, contract, method, args, payment) {},
  voteToBlockProducer(voterValue, bpValue, cancel) {},
  post(sender, title, content, tagsStr) {},
  reply(sender, parent_uuid, content) {},
  vote(sender, idx) {},
  cosToVest(account, amount) {},
  vestToCos(account, amount) {},
  cosToStake(account, amount, toAccount) {},
  stakeToCos(account, amount, toAccount) {},
  signMessage(account, message) {},
};
```


## 📱 iOS 示例代码

``` java

// TODO

```

## 🍭 Android 示例代码

``` java

// TODO

```

