---
id: odysseyUpgradeOrDeployNode
title: Upgrade Or Deploy Odyssey Node
sidebar_label: Upgrade Or Deploy Odyssey Node
---

## 方法一：下载节点执行程序

如果使用的节点程序，请使用如下命令更新


1. 可执行的 ares-node 二进制文件

````
wget -c https://github.com/aresprotocols/ares/releases/download/v1.4.1/ares-node-linux-amd64-1.4.1-5d36ce5
````


2. 添加执行权限

````
chmod 777 ares-node-linux-amd64-1.4.1-5d36ce5
````


3. 执行节点

````
./ares-node-linux-amd64-1.4.1-5d36ce5 --base-path data --name Ares_Emily0626_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11 --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````

* 请使用之前指定的base-path目录
* your-name请以Ares_TelegramUsername_bsc地址的方式填写。如：name Ares_Emily0626（节点tg群username）_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（BSC地址）
* --warehouse参数 （必选）： 用来指定 ares 报价服务器的IP地址。
* --validator参数（必选）： 用来表示启动一个验证人节点。


## 方法二：运行Docker节点程序


1. 停止Docker先前程序及数据

````
docker stop ares_odyssey
````

2. 移除Docker先前程序

````
docker rm ares_odyssey && docker rmi aresprotocollab/ares_node:latest
````

3. Docker运行新的节点程序
````
docker run -d --name ares_odyssey -p 9944:9944 aresprotocollab/ares_node:latest ares-node --name your-name --chain odyssey --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````


* your-name请以Ares_TelegramUsername_bsc地址的方式填写。如：name Ares_Emily0626（节点tg群username）_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（BSC地址）
* --warehouse参数 （必选）： 用来指定 ares 报价服务器的IP地址。
* --validator参数（必选）： 用来表示启动一个验证人节点。
* -p： 指定docker端口映射
* -v: 指定docker存储映射

4. 查看程序运行日志
````
docker logs -f ares_odyssey  -n 1000
````