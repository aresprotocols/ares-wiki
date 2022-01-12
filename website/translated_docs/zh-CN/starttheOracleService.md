---
id: StarOracleService
title: Start the Oracle Service
sidebar_label: Start the Oracle Service
---

1、启动价格获取节点。

2、通过 --warehouse 启动 gladios-node 节点。

```javascript
./target/release/gladios-node \  
--base-path data \  
--name Ares_Emily0626_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11 \  
--chain gladios \  
--port 30334 \  
--ws-port 9946 \  
--rpc-port 9934 \
--telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \ 
--warehouse http://api.aresprotocol.io \
--validator \  
```

* 请以Ares_TelegramUsername_bsc地址的方式填写。name Ares_Emily0626（节点Telegram群username)

通过RPC author_insertKey 的方式插入私钥，参考：https://docs.substrate.io/tutorials/v3/private-network/#generate-your-own-keys

