---
id: StarOracleService
title: Start the Oracle Service
sidebar_label: Start the Oracle Service
---
1、 Start price acquisition node.

2、Start gladios-node node via --warehouse .

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


Using RPC author_insertKey, refer to : https://docs.substrate.io/tutorials/v3/private-network/#generate-your-own-keys
