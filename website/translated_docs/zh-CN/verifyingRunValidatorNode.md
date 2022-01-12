---
id: verifyingRunValidatorNode
title: Verify & Run Validator Nodes
sidebar_label: Verify & Run Validator Nodes
---


### 验证部署状态
**登录Polkadot Telemetry**

https://telemetry.polkadot.io/#list/0xcc07acbee59e89a8bc99d87a24364b514d6ae657551338547b713444583eaac2

![](assets/build/95.png)

如果您的名字显示在此页面上，那么恭喜您，您已成功在测试网络上部署节点——gladios。 接下来，让我们共同为项目的发展而努力，实现共同繁荣。
登录 polkadot.js 查看更多区块更新

https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io/#/explorer


### 运行验证人节点

#### **质押**

**第一步：**

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/23.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/24.png?raw=true) 

如上图：进入Staking页面，点击 “Account actions” 后点击Stash按钮

**第二步：**

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/25.png?raw=true) 

选择需要质押的账户(stash account)以及对应的控制账户(controller account)。stash跟controller可以是同一个账户，但是实际操作中强烈不建议这样做。根据需求填入需要质押的金额(value bonded)，质押金额从质押的账户(stash account)上扣除。

*   stash账户可以想象成你的冷钱包，资金的操作都是由stash账户来控制。
*   controller账户，其它非资金操作都由controller来做(如：设置sessionKeys、设置佣金、参与投票、解除质押等)
*   质押金额，不要把所有可用余额都用来质押，需留部分来做交易的手续费

填写完以上信息后，点击Bond按钮完成质押操作。

#### **出块(成为验证人)**

**第一步：**

运行节点：

```shell
./target/release/gladios-node --base-path data --name ocw_one --port 30333 --ws-port 9945 --rpc-port 9933 --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io/ --validator
```

参数：（必选） --warehouse 用来指定 ares 报价服务器的IP地址。
参数：（必选）--validator 用来表示启动一个验证人节点。

**第二步：设置 Session Keys**

进入RPC Calls页面，调用方法author.rotateKeys，点击按钮Submit RPC Call，然后服务端返回公钥(publicKey)；复制该公钥在第二步需要用到。

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/26.png?raw=true)

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/27.png?raw=true)

注意⚠️：以上的操作(第一步)请在**自己部署的节点或者信任的节点**进行。因为生成的公钥所对应的私钥(privateKey)会存储到该节点keystore下。

**CLI**[<u>​</u>](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#option-2-cli)

```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

**输出**
```json
{"jsonrpc":"2.0","result":"0x58ccb645829bad32a700595d74246c16bf0b981b23367d638c5cef7d31860b65e9bf2c72bc5d46e0d11c57e68b16ac087b487497495984e19a05a6a317da064edc818436afabf30dd0b523ee8440160bc97b25e264d1d054d7d6d342b9ecf353","id":1}
```

**第三步：**

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/28.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/29.png?raw=true) 

进入Staking页面并点击Account actions这个标签页；选中你需要操作的账户，点击Change session keys，在弹出页面的输入框中粘贴第一步拿到的公钥，并点击Set Session Key按钮确认提交。

**第四步**

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/30.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/31.png?raw=true) 

进入Staking页面并点击Account actions这个标签页；选中你需要操作的账户，点击Validate，在弹出页面设置出块奖励的佣金比例(reward commission percentage)以及是否允许提名(allow new nominations)。

*   佣金比例(reward commission percentage)

设置出块奖励佣金百分比；例如10%，那么出块奖励中的10%是自己所得，剩余部分是按比例分配给到提名人。佣金设置建议不要过高，合适的佣金才能让更多人提名，从而在竞争中胜出成为验证人(出块节点)

*   是否允许提名(allow new nominations)

默认是允许提名。如果不允许提名，就只能单靠自己质押的金额与别人一起竞争。

完成以上操作后，如果从竞选中胜出就可以参与出块了。
