---
id: programInstallation
title: Program Installation
sidebar_label: Program Installation
---

**程序安装**

**方法一：下载节点执行程序**

下载节点的二进制执行程序：

下载地址：[<u>https://github.com/aresprotocols/ares/releases/tag/v1.0.7</u>](https://github.com/aresprotocols/ares/releases/tag/v1.0.7)

![](assets/build/114.png)

1.可执行的 gladios-node 二进制文件：
```
wget -c https://github.com/aresprotocols/ares/releases/download/v1.0.7/gladios-node-linux-amd64-1.0.7-379058b
```
![](assets/build/115.png)

2.添加执行权限
```
chmod +777  gladios-node-linux-amd64-1.0.7-379058b
```
![](assets/build/116.png)

3.执行节点
```
./gladios-node-linux-amd64-1.0.7-379058b --base-path data   --name Ares_Emily0626_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11   --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
```

**方法二：Docker运行节点程序**

1.安装docker

*   Ubuntu：

https://docs.docker.com/engine/install/ubuntu/

*   CentOs

https://docs.docker.com/engine/install/centos

*   RedHat

https://docs.docker.com/engine/install/rhel/

*   Mac

https://docs.docker.com/desktop/mac/install/

*   Windows

https://docs.docker.com/desktop/windows/install/

2.打开命令行工具，运行命令执行节点程序

```
docker run -d --name ares_gladios aresprotocollab/ares_gladios:beta gladios-node --name your-name --chain gladios --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
```

以上命令中：aresprotocollab/ares_gladios:beta 可以换成不同的版本如：

aresprotocollab/ares_gladios:alpha；更加多版本请查看：

https://hub.docker.com/r/aresprotocollab/ares_gladios/tags

3.查看程序运行日志：


```
docker logs -f ares_gladio -n 1000
```

4.停止并删除节点程序


```
docker stop ares_gladios

docker rm ares_gladios
```




**方法三：源码编译**

1.安装Rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2.安装依赖库
```
sudo apt install make clang pkg-config libssl-dev build-essential
```

3.下载Ares代码
```
git clone [https://github.com/aresprotocols/ares.git</u>](https://github.com/aresprotocols/ares.git)
```

4.编译源码

cargo build --release

Note if you run into compile errors, you may have to switch to a less recent nightly. This can be done by running:

```
rustup install nightly-2021-06-09

rustup target add wasm32-unknown-unknown --toolchain nightly-2021-06-09

cargo +nightly-2021-06-09 build --release
```
