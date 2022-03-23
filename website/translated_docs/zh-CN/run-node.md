---
id: runNode
title: Run Node
sidebar_label: Run Node
---

### 运行节点
#### 方法一：Docker运行节点程序

1.拉取程序最新镜像
````
docker pull aresprotocollab/ares_gladios:latest
````

2.打开命令行工具，运行命令执行节点程序

````
docker run -d --name ares_gladios aresprotocollab/ares_gladios:latest gladios-node --name your-name --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
````

your-name请以Ares_TelegramUsername_bsc地址的方式填写。请如实填写，方便进行奖励计算与发放。

如: 
````
name Ares_Emily0626（节点tg群username）_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（BSC地址）。
````
以上命令中： `aresprotocollab/ares_gladios:latest`可以换成不同的版本如: `aresprotocollab/ares_gladios:alpha`；
更加多版本请查看：https://hub.docker.com/r/aresprotocollab/ares_gladios/tags 

3.查看程序运行日志

````
docker logs -f ares_gladios  -n 1000
````

4.停止并删除节点程序

````
docker stop ares_gladios
docker rm ares_gladios
````

#### 方法二：下载节点执行程序
下载节点的二进制执行程序：

下载地址：gladios-node-linux-amd64-1.2.1-ba392b0

1. 可执行的 gladios-node 二进制文件
````
wget -c https://github.com/aresprotocols/ares/releases/download/v1.2.1/gladios-node-linux-amd64-1.2.1-ba392b0
````

![](assets/build/288.png)


2. 添加执行权限

````
chmod +777  gladios-node-linux-amd64-1.2.1-ba392b0
````

![](assets/build/289.png)

3. 执行节点

````
./gladios-node-linux-amd64-1.2.1-ba392b0 --base-path data   --name your-name --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
````

your-name请以Ares_TelegramUsername_bsc地址的方式填写。请如实填写，方便进行奖励计算与发放。

例如: 
````
name Ares_Emily0626（节点tg群username）_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（BSC地址）
````

![](assets/build/290.jpeg)

#### 方法三：源码编译

1.安装Rust

````
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
````

2. 安装依赖库

````
sudo apt install make clang pkg-config libssl-dev build-essential
````

3. 下载Ares代码

````
git clone https://github.com/aresprotocols/ares.git
````

4. 切换到release1.2.1分支

````
git checkout release1.2.1
````

5. 编译源码

````
cargo build --release
````
请注意，如果您遇到编译错误，您可能必须切换到最近的 nightly。这可以通过运行来完成：
````
rustup install nightly-2021-06-09
rustup target add wasm32-unknown-unknown --toolchain nightly-2021-06-09
cargo +nightly-2021-06-09 build --release
````

### 验证部署状态

登录Polkadot Telemetry
https://telemetry.polkadot.io/#list/0xcc07acbee59e89a8bc99d87a24364b514d6ae657551338547b713444583eaac2

![](assets/build/291.jpeg)

如果您的名字显示在此页面上，那么恭喜您，您已成功在测试网络上部署节点

登录 polkadot.js 查看更多区块更新。
http://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer
