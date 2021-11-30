---
id: buildFileStoringWithGWDemo
title: 程序安装
sidebar_label: 程序安装
---

**程序安装**

**方法一：下载节点执行程序**

1.  下载节点的二进制执行程序：

下载地址：[<u>https://github.com/aresprotocols/ares/releases/tag/v1.0.5</u>](https://github.com/aresprotocols/ares/releases/tag/v1.0.5)

尽量选择最新的版本下载，如下例子是 v211028 版本

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/9.png?raw=true) 

可执行的 gladios-node 二进制文件：
```
wget -c [<u>https://github.com/aresprotocols/ares/releases/download/v1.0.5/gladios-node</u>](https://github.com/aresprotocols/ares/releases/download/v1.0.5/gladios-node)
```

添加执行权限
```
chmod +777 [**<u>gladios-node</u>**](https://user_cancel/)
```

执行节点
```
./gladios-node --base-path /tmp/aura/one --name Ares_OCW5 --chain gladios --port 30334 --ws-port 9945 --rpc-port 9933 --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --bootnodes /ip4/158.247.224.166/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```

**方法二：源码编译**
```
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
```


方法三：Docker运行节点程序

1.  安装docker

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

1.  打开命令行工具，运行命令执行节点程序

```
docker run -d --name ares_gladios aresprotocollab/ares_gladios:beta gladios-node --name your-name --chain gladios --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'

```
以上命令中：aresprotocollab/ares_gladios:beta 可以换成不同的版本如：

aresprotocollab/ares_gladios:alpha；更加多版本请查看：

https://hub.docker.com/r/aresprotocollab/ares_gladios/tags

1.  查看程序运行日志：


```
docker logs -f ares_gladio -n 1000

```

1.  停止并删除节点程序



```
docker stop ares_gladios

docker rm ares_gladios

```
