---
id: runValidatorNode
title: Run Validator Node
sidebar_label: Run Validator Node
---

### 质押

#### 第一步：

打开 https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer

![](assets/build/292.jpeg)

![](assets/build/293.jpeg)

如上图：进入Staking页面，点击 “Account actions” 后点击Stash按钮。

#### 第二步：

![](assets/build/294.jpeg)


选择需要质押的账户(stash account)以及对应的控制账户(controller account)。stash跟controller可以是同一个账户，但是实际操作中强烈不建议这样做。根据需求填入需要质押的金额(value bonded)，质押金额从质押的账户(stash account)上扣除。

* stash账户可以想象成您的冷钱包，资金的操作都是由stash账户来控制。
* controller账户，其它非资金操作都由controller来做(如：设置sessionKeys、设置佣金、参与投票、解除质押等)
* 质押金额，不要把所有可用余额都用来质押，需留部分来做交易的手续费。

填写完以上信息后，点击Bond按钮完成质押操作。

### 出块(成为验证人)

#### 第一步：运行节点

使用Docker:
````
docker run -d --name ares_gladios aresprotocollab/ares_gladios:latest gladios-node --name your-name --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````

使用CLI:
````
./target/release/gladios-node --base-path data --name your-name  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````

参数：（必选） --warehouse 用来指定 ares 报价服务器的IP地址。

参数：（必选） --validator 用来表示启动一个验证人节点。

#### 第二步：设置 Session Keys

使用Docker:
````
docker exec -it ares_gladios bash -c "apt update && apt install -y curl && curl -X POST http://localhost:9933 -H 'Content-Type: application/json' -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"author_rotateKeys\"}'"
````

使用CLI:
````
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
````
![](assets/build/295.jpeg)

输出

````
{"jsonrpc":"2.0","result":"0x865cec2b50d8a16bff955c3f83501d7ed178a769f410c8557920964227cf55262be48db19f5ec8fc30706f68c7949768d9f9e943b5e4d019295b4da579618848b68b116b6e42dfd62162971efed83729f09582abd729b935a35dece66fb34615","id":1}
````

![](assets/build/296.jpeg)

「result」即为你的「rotateKeys」，保存好它们，在设置「session key」里将会使用。


打开 https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer

进入Staking页面并点击Account actions这个标签页；选中您需要操作的账户，点击Change session keys，输入复制的结果「rotateKeys」，并点击Set Session Key按钮确认提交。

![](assets/build/297.jpeg)

![](assets/build/298.jpeg)

#### 第三步：成为验证人

打开 https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer

进入Staking页面并点击Account actions这个标签页；选中您需要操作的账户，点击Validate，在弹出页面设置出块奖励的佣金比例(reward commission percentage)以及是否允许提名(allow new nominations)。

![](assets/build/299.jpeg)

![](assets/build/300.jpeg)

* 佣金比例(reward commission percentage)

  设置出块奖励佣金百分比；例如10%，那么出块奖励中的10%是自己所得，剩余部分是按比例分配给到提名人。佣金设置建议不要过高，合适的佣金才能让更多人提名，从而在竞争中胜出成为验证人(出块节点)
* 是否允许提名(allow new nominations)

  默认是允许提名。如果不允许提名，就只能单靠自己质押的金额与别人一起竞争。

完成以上操作后，如果从竞选中胜出就可以参与出块了。

