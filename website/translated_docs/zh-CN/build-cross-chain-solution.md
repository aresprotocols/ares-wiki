---
id: buildCrossChainSolution
title: 运行节点程序
sidebar_label: 运行节点程序
---
**操作步骤**

**创建Ares账户**

**Accounts**

**如何打开如下的界面，访问** 

[<u>https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer/</u>](https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer)

### 创建账户

第一步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/11.png?raw=true) 

进入 Ares APPS, 点击窗口顶部导航栏中的“账户”，点击“添加账户”，如上图。

第二步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/12.png?raw=true) 

此帐户的**助记种子**值。确保您将**助记词种子保存**在安全的地方并勾选“我已安全保存我的助记词种子”

第三步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/14.png?raw=true) 

输入您的帐户名和密码，然后单击“下一步”

第四步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/15.png?raw=true) 

单击“保存”，该帐户将默认备份到您的设备上。请保管好您的备份文件。

转账

第一步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/16.png?raw=true) 

生成账户，点击“发送”，如上图。

第二步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/18.png?raw=true) 

输入站内转账地址以及数量，点击“进行交易”，如上图

第三步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/19.png?raw=true) 

保存本次交易的“调用哈希”，点击“签名及提交”，进行下一步

第四步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/21.png?raw=true) 

输入您账户的密码，点击“交易签名”，本次转账就完成了。快通知您的交易用户，及时查收吧！

运行验证人节点

**Staking**

1.  质押

第一步：

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/23.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/24.png?raw=true) 

如上图：进入Staking页面，点击 “Account actions” 后点击Stash按钮

第二步：

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/25.png?raw=true) 

选择需要质押的账户(stash account)以及对应的控制账户(controller account)。stash跟controller可以是同一个账户，但是实际操作中强烈不建议这样做。根据需求填入需要质押的金额(value bonded)，质押金额从质押的账户(stash account)上扣除。

*   stash账户可以想象成你的冷钱包，资金的操作都是由stash账户来控制。
*   controller账户，其它非资金操作都由controller来做(如：设置sessionKeys、设置佣金、参与投票、解除质押等)
*   质押金额，不要把所有可用余额都用来质押，需留部分来做交易的手续费

填写完以上信息后，点击Bond按钮完成质押操作。

1.  出块(成为验证人)

第一步：

运行节点：

```
./target/release/gladios-node --base-path /tmp/aura/one --name ocw_one --port 30333 --ws-port 9945 --rpc-port 9933 --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse https://api.aresprotocol.io/ --bootnodes /ip4/158.247.224.166/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp --validator
```

参数：（必选） --warehouse 用来指定 ares 报价服务器的IP地址。

参数：（可选）--ares-keys 用来通过一个私钥文件加载对应的 key-strore。

--ares-keys 文件格式内部格式：

aura:(Mnemonic phrase)//1//aura

gran:(Mnemonic phrase)//1//grandpa

参数：（必选）--validator 用来表示启动一个验证人节点。

参数：（必选）--bootnodes 用来连接启动节点。

ares-keys可用author.rotateKeys代替

1.  生成 Aura key： 需要指定 sr25519 格式。
2.  生成 GRANDPA key：需要制定 ed25519 格式。

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/26.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/27.png?raw=true) 

进入RPC Calls页面，调用方法author.rotateKeys，点击按钮Submit RPC Call，然后服务端返回公钥(publicKey)；复制该公钥在第二步需要用到。

注意⚠️：以上的操作(第一步)请在**自己部署的节点或者信任的节点**进行。因为生成的公钥所对应的私钥(privateKey)会存储到该节点keystore下。

CLI[<u>​</u>](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#option-2-cli)

curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933

第二步：

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/28.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/29.png?raw=true) 

进入Staking页面并点击Account actions这个标签页；选中你需要操作的账户，点击Change session keys，在弹出页面的输入框中粘贴第一步拿到的公钥，并点击Set Session Key按钮确认提交。

第三步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/30.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/31.png?raw=true) 

进入Staking页面并点击Account actions这个标签页；选中你需要操作的账户，点击Validate，在弹出页面设置出块奖励的佣金比例(reward commission percentage)以及是否允许提名(allow new nominations)。

*   佣金比例(reward commission percentage)

设置出块奖励佣金百分比；例如10%，那么出块奖励中的10%是自己所得，剩余部分是按比例分配给到提名人。佣金设置建议不要过高，合适的佣金才能让更多人提名，从而在竞争中胜出成为验证人(出块节点)

*   是否允许提名(allow new nominations)

默认是允许提名。如果不允许提名，就只能单靠自己质押的金额与别人一起竞争。

完成以上操作后，如果从竞选中胜出就可以参与出块了。