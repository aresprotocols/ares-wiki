---
id: runValidatorNodeQAndA
title: Run Validator Node Q&A
sidebar_label: Run Validator Node Q&A
---

我们收到反馈在接入的过程中，节点也会碰到无法调取数据源、设置Session Key出现问题等情况。从而导致节点一直在等候区，无法通过审核。下面将系统地为你梳理使用Docker和CLI，分别如何运行节点、设置Session Key、以及自查本地的Session Key是否存在、数据源配置是否出现问题。


## 重点步骤提醒

### 方式一：使用Docker

#### Docker运行节点程序

````
docker run -d --name ares_gladios aresprotocollab/ares_gladios:latest gladios-node --name Ares_amor_4UaAfJ7EX9UsCtnUkVsbAqshH3EDN4h6Co7t8P5jPRTvLjqh --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'  --warehouse http://api.aresprotocol.io  --validator
````

your-name请以Ares_TelegramUsername_bsc地址的方式填写。如：Ares_amor（节点tg群username）_4UaAfJ7EX9UsCtnUkVsbAqshH3EDN4h6Co7t8P5jPRTvLjqh（BSC地址）请如实填写，方便进行奖励计算与发放。

例如：
````
Ares_amor(username in telegram node miner group)_4UaAfJ7EX9UsCtnUkVsbAqshH3EDN4h6Co7t8P5jPRTvLjqh(BSC address)
````

#### Docker设置 Session Key

````
docker exec -it ares_gladios bash -c "apt update && apt install -y curl && curl -X POST http://localhost:9933 -H 'Content-Type: application/json' -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"author_rotateKeys\"}'"
````

输出

````
{“jsonrpc”:”2.0",”result”:”0x74ed2791ab818797bc4a2caa78b01180cc52a5e95c8cd5286d2642b671c3986d00a93e91eaedd838f275f4c49f1c9a9c2525f7f34577c556f02bc357eddaa4dbf28ab5102be4fa22b6b8115765d290de0c6c91f37a265acecdf3782746bff32b”,”id”:1}
````

生成的结果用于在gladios上设置Session Key。

#### Docker查询Session key本地是否存在

在aresscan上找到设置session key的交易，例如：

https://aresscan.aresprotocol.io/ares/transaction/0x95795ea49e908e0b8c8cf88a3e56f91ede63ac0795ed97b45eb345eeae833c24

![](assets/build/301.png)

session是由aura,grandpa,ares 3种key组成，如果搜索不到相应值，可以找官方技术人员帮助。

如图：
`0x88f2c7b89e7dd7fa6fe29569c320a4fefc0ccc7abf630b24b133be80ae37a31f+667c44c75e42497e9a61752d9ec1c4277fcce68fb4336da37d9bb88c44a06295+50032c6fc2fde02d4374822c9b01e99af7b7891aaddcbd2bc895fb223305b725`

grandpa和ares需要把前面的0x去掉，既是：
`0x88f2c7b89e7dd7fa6fe29569c320a4fefc0ccc7abf630b24b133be80ae37a31f667c44c75e42497e9a61752d9ec1c4277fcce68fb4336da37d9bb88c44a0629550032c6fc2fde02d4374822c9b01e99af7b7891aaddcbd2bc895fb223305b725`

````
docker exec -it ares_gladios bash -c "apt update && apt install -y curl && curl -X POST http://localhost:9933 -H 'Content-Type: application/json' -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"author_hasSessionKeys\", \"params\": [\"0x88f2c7b89e7dd7fa6fe29569c320a4fefc0ccc7abf630b24b133be80ae37a31f667c44c75e42497e9a61752d9ec1c4277fcce68fb4336da37d9bb88c44a0629550032c6fc2fde02d4374822c9b01e99af7b7891aaddcbd2bc895fb223305b725\"]}'"
````

查询结果如下，代表配置正确

{“jsonrpc”:”2.0",”result”:true,”id”:1}

#### 使用Docker检查数据源配置情况

````
docker exec -it ares_gladios bash -c "apt update && apt install -y curl && curl -X POST http://localhost:9933 -H 'Content-Type: application/json' -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"offchain_localStorageGet\", \"params\": [\"PERSISTENT\",\"0x6172652d6f63773a3a70726963655f726571756573745f646f6d61696e\"]}'"
````

输出

````
{“jsonrpc”:”2.0",”result”:”0x68687474703a2f2f6170692e6172657370726f746f636f6c2e696f”,”id”:1}
````

如果结果为：

0x68687474703a2f2f6170692e6172657370726f746f636f6c2e696f

则为官方数据源并且运行准确（若是自行搭建，也会出现相应字符串，不会报错。）

如果结果为：null

则报价数据源为空，请检查操作步骤及时调整。


### 方式二：使用CLI

#### CLI运行节点程序

1. 可执行的 gladios-node 二进制文件

````
wget -c https://github.com/aresprotocols/ares/releases/download/v1.1.2/gladios-node-linux-amd64-1.1.2-39df776
````
2. 添加执行权限

````
chmod +777  gladios-node-linux-amd64-1.1.2-39df776
````

3. 执行节点

````
./gladios-node-linux-amd64-1.1.2-39df776 --base-path data --name Ares_amor_4UaAfJ7EX9UsCtnUkVsbAqshH3EDN4h6Co7t8P5jPRTvLjqh --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````

your-name请以Ares_TelegramUsername_bsc地址的方式填写。如：Ares_amor（节点tg群username）_4UaAfJ7EX9UsCtnUkVsbAqshH3EDN4h6Co7t8P5jPRTvLjqh（BSC地址）请如实填写，方便进行奖励计算与发放

例如：
````
Ares_amor(username in telegram node miner group）_4UaAfJ7EX9UsCtnUkVsbAqshH3EDN4h6Co7t8P5jPRTvLjqh(BSC address)
````

#### CLI设置 Session Key
````
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
````

输出

````
{“jsonrpc”:”2.0",”result”:”0x88a16ebcbb47c4c466416bf62a412910a8eee74c9b9b7fa3fe922f5f2f6b3a256ec28920cf2811088090b45c1c7faf9f5434a32929a4251667b38dcd530b9934f2fb357cf4ac2f8b024e3db8946e2ce185b8bc66f0f03d2cf5c94fa293e29f23",”id”:1}
````

生成的结果用于在gladios上设置Session Key。

#### CLI查询Session key本地是否存在

在aresscan上找到设置session key的交易，例如：

https://aresscan.aresprotocol.io/ares/transaction/0x95795ea49e908e0b8c8cf88a3e56f91ede63ac0795ed97b45eb345eeae833c24

![](assets/build/301.png)

session是由aura,grandpa,ares 3种key组成，如果搜索不到相应值，可以找官方技术人员帮助。

`0x88f2c7b89e7dd7fa6fe29569c320a4fefc0ccc7abf630b24b133be80ae37a31f+667c44c75e42497e9a61752d9ec1c4277fcce68fb4336da37d9bb88c44a06295+50032c6fc2fde02d4374822c9b01e99af7b7891aaddcbd2bc895fb223305b725`

grandpa和ares需要把前面的0x去掉，既是

`0x88f2c7b89e7dd7fa6fe29569c320a4fefc0ccc7abf630b24b133be80ae37a31f667c44c75e42497e9a61752d9ec1c4277fcce68fb4336da37d9bb88c44a0629550032c6fc2fde02d4374822c9b01e99af7b7891aaddcbd2bc895fb223305b725`

````
curl -H “Content-Type: application/json” -d ‘{“id”:1, “jsonrpc”:”2.0", “method”: “author_hasSessionKeys”, “params”:[“0x88f2c7b89e7dd7fa6fe29569c320a4fefc0ccc7abf630b24b133be80ae37a31f667c44c75e42497e9a61752d9ec1c4277fcce68fb4336da37d9bb88c44a0629550032c6fc2fde02d4374822c9b01e99af7b7891aaddcbd2bc895fb223305b725”]}’ http://localhost:9933
````

查询结果如下，代表配置正确

````
{“jsonrpc”:”2.0",”result”:true,”id”:1}
````

#### 使用CLI检查数据源配置情况

````
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "offchain_localStorageGet", "params":["PERSISTENT","0x6172652d6f63773a3a70726963655f726571756573745f646f6d61696e"]}' http://localhost:9933
````

输出
````
{“jsonrpc”:”2.0",”result”:”0x68687474703a2f2f6170692e6172657370726f746f636f6c2e696f”,”id”:1}
````
如果结果为：

`0x68687474703a2f2f6170692e6172657370726f746f636f6c2e696f`

则为官方数据源并且运行准确（若是自行搭建，也会出现相应结果，不会报错。）

如果结果为：null

则报价数据源为空，请检查操作步骤及时调整。


## Q&A

Q: 参与了验证人报价竞选，需要等待多久？

A:
* 一般为 1-2 era，即1-2小时，如果您的配置没有问题即可以成为验证人节点。
* 若是Validators上限人数已满（如：24/24），则需要技术委员会成员提高Validators上限值（如：提升至26）。
* 其他则考虑自身的配置出现问题。

Q: 为什么节点容易出现掉线情况？

A: 使用电脑运维，在不使用云服务的情况下，当电脑处于待机或关机状态，则会出现掉线情况。在使用云服务器的前提下，可以打开一个screen会话进行设定，将程序在后台运行，这样就可以解决节点掉线问题。
