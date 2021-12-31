---
id: StarOracleService
title: Start the Oracle Service
sidebar_label: Start the Oracle Service
---

1、启动价格获取节点。

2、通过 --ares-keys 启动 gladios-node 节点（需要事先配置好 ares-keys 文件）。

```javascript
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
--telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \  --warehouse http://YOURIP:PORT \  
--validator \  
```


如果不使用 ares-keys 加载私钥，可以通过RPC author_insertKey 的方式插入私钥，参考：https://docs.substrate.io/tutorials/v3/private-network/#generate-your-own-keys

