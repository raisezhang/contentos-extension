# How to access wallet in dApp

本文档介绍了一款dApp如何接入 Contentos 钱包.

## 💻 环境描述

- Content Wallet 会在当前网页加载之前注入 ```ContentosWallet``` 全局变量
- 所有的 API 将会注入到 ```ContentosWallet``` 全局对象中，比如 ```window.ContentosWallet.getDefaultAccount()``` 获取当前账户

## 🔢 错误码描述

| key | 错误码 | 捕获方式 | 描述 |
| --- | --- | --- | --- |
| ```result.code``` | 10001 | catch | 用户取消操作 |
| ```result.invoice.status``` | 200 | then | 操作成功 |
| ```result.invoice.status``` | 201 | then| 操作失败但体力已消耗 |

> 当操作失败后可通过 ```result.invoice.errorInfo``` 获取错误详情


## 🔌 接口描述

- ```getDefaultAccount``` 获取当前账户

  ``` javascript
  const result = await window.ContentosWallet.getDefaultAccount();
  ```

  ``` javascript
  // result

  {
    "locked": false,
    "walletCreated": true,
    "network": "test",
    "account": "raisezhang",
    "publicKey": "COS5FtcjUQX7igwjunWjuikvM7Uejh6oNwW1ikRVXJp4ae4NDks8M"
  }
  ```
  
- ``` accountInfo ``` 获取账户详情

  ``` javascript
  const result = await window.ContentosWallet.accountInfo(name);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | name | ```string``` | 账户名称 | - |

  ``` javascript
  // result

  {
    "info": {
      "accountName": {
        "value": "raisezhang"
      },
      "coin": {
        "value": "8970093"
      },
      "vest": {
        "value": "1273701287"
      },
      // ...
    }
  }
  ```

- ```transfer``` 转账

  ``` javascript
  const result = await window.ContentosWallet.transfer(sender, receiver, amount, memo);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | sender | ```string``` | 转出账户 | - |
  | receiver | ```string``` | 接收账户 | - |
  | amount | ```string``` | 金额 | - |
  | memo | ```string``` | 备注 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```contractCall``` 合约调用

  ``` javascript
  const result = await window.ContentosWallet.contractCall(caller, owner, contract, method, args, payment);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | caller | ```string``` | 调用者 | - |
  | owner | ```string``` | 合约拥有者 | - |
  | contract | ```string``` | 合约 | - |
  | method | ```string``` | 合约方法 | - |
  | args | ```string``` | 参数，需要对参数进行 JSON.stringify | - |
  | payment | ```string``` | 金额 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```voteToBlockProducer```

  ``` javascript
  const result = await window.ContentosWallet.voteToBlockProducer(voterValue, bpValue, cancel);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | voterValue | ```string``` | 投票用户 | - |
  | bpValue | ```string``` | Bp 名称 | - |
  | cancel | ```boolean``` | 是否取消投票 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```post```

  ``` javascript
  const result = await window.ContentosWallet.post(sender, title, content, tagsStr);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | sender | ```string``` | 发布者 | - |
  | title | ```string``` | 标题 | - |
  | content | ```string``` | 内容 | - |
  | tagsStr | ```string``` | 标签 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```reply```

  ``` javascript
  const result = await window.ContentosWallet.reply(sender, parent_uuid, content);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | sender | ```string``` | 评论者 | - |
  | parent_uuid | ```string``` | 评论对象标识 | - |
  | content | ```string``` | 评论内容 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```vote```

  ``` javascript
  const result = await window.ContentosWallet.vote(sender, idx);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | sender | ```string``` | 投票者 | - |
  | idx | ```string``` | 投票对象标识 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```cosToVest```

  ``` javascript
  const result = await window.ContentosWallet.cosToVest(account, amount);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | account | ```string``` | 当前账户 | - |
  | amount | ```string``` | 置换金额 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```vestToCos```

  ``` javascript
  const result = await window.ContentosWallet.vestToCos(account, amount);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | account | ```string``` | 当前账户 | - |
  | amount | ```string``` | 置换金额 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```cosToStake```

  ``` javascript
  const result = await window.ContentosWallet.cosToStake(account, amount, toAccount);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | account | ```string``` | 当前账户 | - |
  | amount | ```string``` | 置换金额 | - |
  | toAccount | ```string``` | 接收账户 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```stakeToCos```

  ``` javascript
  const result = await window.ContentosWallet.stakeToCos(account, amount, toAccount);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | account | ```string``` | 当前账户 | - |
  | amount | ```string``` | 置换金额 | - |
  | toAccount | ```string``` | 接收账户 | - |

  ``` javascript
  // result

  {
    "invoice": {
      "status": 200,
      "trxId": "...",
      // ...
    },
    // ...
  }
  ```

- ```signMessage``` 消息签名

  ``` javascript
  const result = await window.ContentosWallet.signMessage(account, message);
  ```

  | 参数名 | 类型 | 描述 | 默认值 |
  | --- | --- | --- | --- |
  | account | ```string``` | 当前账户 | - |
  | message | ```string``` | 签名内容 | - |

  ``` javascript
  // result

  {
    "signature": "...",
    "message": messsage
  }
  ```
