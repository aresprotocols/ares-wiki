---
id: StarttheOracleService
title: Start the Oracle Service
sidebar_label: Start the Oracle Service
---
1、 Start price acquisition node.

2、Start gladios-node node via --ares-keys (Need to configure ares-keys file in advance).

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
--ares-keys ./ares_key_file_02.curl \  
--validator \  
--bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```


If loading private key not using ares-keys, you may insert private key using RPC author_insertKey, refer to : https://docs.substrate.io/tutorials/v3/private-network/#generate-your-own-keys