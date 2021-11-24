---
id: buildRockyGuidance
title: Ares gladios 1.01 testnet mannual
sidebar_label: Ares gladios 1.01 testnet mannual
---


**概要**

在本手册中，我们将为您详细地介绍如何成为一个报价节点，从而在 Ares gladios 网络上，获得出块和报价收益。该教程包括硬件设备的配置、程序系统的安装、各项应用的启动和APPS的操作步骤等。相信通过阅读该手册，将帮助您成功地加入 Ares gladios 1.01 测试网。

**硬件环境**
|Ares 节点硬件环境参数|    |
|:----|:----|
|硬盘|100GB及以上|
|CPU|4~8核心|
|内存|4~8G|
|带宽|3M及以上，要求稳定|
|操作系统|Ubuntu18.04（及以上）|

**云服务器**

配置满足以上硬件条件的云服务器。市面上有很多，可以自己搜寻攻略。以下为其中一种，仅供参考，不做推荐。

第一步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/图1.png?raw=true) 

打开 [https://my.vultr.com/deploy/</u>](https://my.vultr.com/deploy/) ，注册进入首页。左侧点击“Products”栏目，选择“Cloud Computer”服务。

第二步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/2.png?raw=true) 

选择“Ubuntu 18.04 x64”版本，选择满足上述硬件条件的云服务器。点击“Deploy Now”进行付款。

第三步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/3.png?raw=true) 

付款完成后，左侧点击“Products”栏目，选择对应的账号。点击“Overview”，获取IP、用户名及密码，保存好它们用于后期登录。

第四步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/4.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/5.png?raw=true) 

下载程序 [<u>http://www.hostbuf.com/downloads/finalshell_install.pkg</u>](http://www.hostbuf.com/downloads/finalshell_install.pkg)，右击“打开”进行程序安装。选择安装位置，点击“安装”即可完成。

第五步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/6.png?raw=true) 

打开下载好的程序“FinalShell”，如上图，点击文件符号，选择“SSH连接（Linux）”

第六步

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/8.png?raw=true) 

输入自定义名称，之前保存的IP账号、用户名及密码，点击“确定”。云服务器就连接成功啦！

**程序安装**

**方法一：下载节点执行程序**

1.  下载节点的二进制执行程序：

下载地址：[<u>https://github.com/aresprotocols/ares/releases/tag/v1.0.5</u>](https://github.com/aresprotocols/ares/releases/tag/v1.0.5)

尽量选择最新的版本下载，如下例子是 v211028 版本

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/9.png?raw=true) 

可执行的 gladios-node 二进制文件：

wget -c [<u>https://github.com/aresprotocols/ares/releases/download/v1.0.5/gladios-node</u>](https://github.com/aresprotocols/ares/releases/download/v1.0.5/gladios-node)

添加执行权限

**chmod +777** [**<u>gladios-node</u>**](https://user_cancel/)

执行节点

./gladios-node --base-path /tmp/aura/one --name Ares_OCW5 --chain gladios --port 30334 --ws-port 9945 --rpc-port 9933 --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --bootnodes /ip4/158.247.224.166/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

**方法二：源码编译**

安装Rust

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

安装依赖库

sudo apt install make clang pkg-config libssl-dev build-essential

下载Ares代码

git clone [https://github.com/aresprotocols/ares.git</u>](https://github.com/aresprotocols/ares.git)

编译源码

cargo build --release

Note if you run into compile errors, you may have to switch to a less recent nightly. This can be done by running:

rustup install nightly-2021-06-09

rustup target add wasm32-unknown-unknown --toolchain nightly-2021-06-09

cargo +nightly-2021-06-09 build --release

方法三：Docker运行节点程序

1.  安装docker

*   Ubuntu：

[<u>https://docs.docker.com/engine/install/ubuntu/</u>](https://docs.docker.com/engine/install/ubuntu/)

*   CentOs

[<u>https://docs.docker.com/engine/install/centos/</u>](https://docs.docker.com/engine/install/centos/)

*   RedHat

[<u>https://docs.docker.com/engine/install/rhel/</u>](https://docs.docker.com/engine/install/rhel/)

*   Mac

[<u>https://docs.docker.com/desktop/mac/install/</u>](https://docs.docker.com/desktop/mac/install/)

*   Windows

[<u>https://docs.docker.com/desktop/windows/install/</u>](https://docs.docker.com/desktop/windows/install/)

1.  打开命令行工具，运行命令执行节点程序

docker run -d --name ares_gladios aresprotocollab/ares_gladios:beta gladios-node --name your-name --chain gladios --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'

以上命令中：aresprotocollab/ares_gladios:beta 可以换成不同的版本如：

aresprotocollab/ares_gladios:alpha；更加多版本请查看：

[<u>https://hub.docker.com/r/aresprotocollab/ares_gladios/tags</u>](https://hub.docker.com/r/aresprotocollab/ares_gladios/tags)

1.  查看程序运行日志：

docker logs -f ares_gladio -n 1000

1.  停止并删除节点程序

docker stop ares_gladios

docker rm ares_gladios

**操作步骤**

**创建Ares账户**

**Accounts**

**如何打开如下的界面，访问**

[<u>https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer/</u>](https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer)

创建账户

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

./target/release/gladios-node --base-path /tmp/aura/one --name ocw_one --port 30333 --ws-port 9945 --rpc-port 9933 --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse https://api.aresprotocol.io/ --bootnodes /ip4/158.247.224.166/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp --validator

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

**价格竞猜**

1.  创建价格竞猜

第一步：进入 Developer --> Extrinsics 页面

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/32.png?raw=true) 

![arch](https://github.com/aresprotocols/documentation/blob/master/assets/img/33.png?raw=true)


第二步：选中模块estimates 方法：newEstimates

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/34.png?raw=true) 

根据的需求创建价格价格预测：

参数：

*   symbol: 交易对的名称
*   start： 价格竞猜开始的区块高度
*   length：价格竞猜结束的区块高度大于或等于：start + length
*   delay：价格竞猜发放奖励区块高度大于或等于：start + length + delay
*   deviation：价格偏差范围。最大值是：1000000；如：设置50%的价格浮动(竞猜结束时中奖价格的浮动范围是上下50%)，可以填500000，如果是1‰(千分之一)的价格浮动，那么可以填1000(100万的千分一)，其它以此类推。
*   price： 参与竞猜需要的金额

填写好以上的参数，点击 Submit Transition 按钮。

1.  参与价格竞猜

第一步： 进入页面 Developer --> Chain state 页面; 并选中模块estimates，方法 allEstimates.

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/图片2.png?raw=true) 

输入参数：

*   Bytes: 交易对的名称：btc-usdt
*   Option<u64>: 价格竞猜的ID，可以不填(在页面右边的 include_option 按钮来控制)

填写好参数，点击 + 这个按钮(在页面右边)，会出现当前交易对的所有价格竞猜。

第二步：进入 Developer --> Extrinsics 页面; 并选中模块estimates，方法 participateEstimates.

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/图片3.png?raw=true) 

填写需要参与的价格竞猜参数：

*   symbol： 交易对名称
*   estimatesId: 在上一步中查询交易对显示的结果中，选其中一个价格竞猜的ID值
*   estimatedPrice: 竞猜结束时的交易对的价格。estimatesId对应价格竞猜的 start + end 就是结束的区块高度
*   ethAddress：接收奖励的eth地址。

1.  查看竞猜结果

进入页面 Developer --> Chain state 页面; 并选中模块 estimates，方法 winners.

输入参数：

*   Bytes: 交易对的名称：btc-usdt
*   Option<u64>: 价格竞猜的ID，可以不填(不填会显示历史所有的中奖名单)

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/图片4.png?raw=true) 

**启动 Ares 预言机服务**

启动命令、启动状态、监控、修改

1、启动价格获取节点。

2、通过 --ares-keys 启动 gladios-node 节点（需要事先配置好 ares-keys 文件）。

./target/release/gladios-node \

--base-path /tmp/aura/two \

--name ocw_two \

--chain ./chain-data-ares-aura.json \

--port 30334 \

--ws-port 9946 \

--rpc-port 9934 \

--ws-external \

--rpc-external \

--rpc-cors=all \

--rpc-methods=Unsafe \

--telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \

--warehouse http://YOURIP:PORT \

--ares-keys ./ares_key_file_02.curl \

--validator \

--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

如果不使用 ares-keys 加载私钥，可以通过RPC author_insertKey 的方式插入私钥，参考：https://docs.substrate.io/tutorials/v3/private-network/#generate-your-own-keys

**价格上链**

**节点重启**

./target/release/polkadot purge-chain
