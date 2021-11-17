---
id: newBond
title: New Bond
sidebar_label: New Bond
---
# 使用cumulus进化跨链 不同pallet测试



## 编译启动中继链

```bash
#编译
git clone -b release-v0.9.9 https://github.com/paritytech/polkadot
cd polkadot
cargo build --release
#导出链配置文件
./target/release/polkadot build-spec --chain=rococo-local --disable-default-bootnode --raw > rococo-local.json
#运行两个节点
./target/release/polkadot --name alice --chain rococo-local --alice -d ./data/alice --ws-external --rpc-external --rpc-cors all  --node-key 0000000000000000000000000000000000000000000000000000000000000001

./target/release/polkadot --name bob --chain rococo-local --bob -d ./data/bob --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```



## 下载跨pallet测试代码

```BASH
git clone https://github.com/aresprotocols/mars.git
git checkout bridge
```



## 编译

```bash
#编译
cd mars
cargo build 
#导出genesis state和wasm文件
./target/debug/polkadot-collator export-genesis-wasm > genesis-wasm
./target/debug/polkadot-collator export-genesis-state --parachain-id 2000 > genesis-state-2000
./target/debug/polkadot-collator export-genesis-state --parachain-id 2001 > genesis-state-2001
#启动两条平行链
RUST_LOG=runtime=debug ./target/debug/polkadot-collator -d ./data/alice --collator --alice --force-authoring --port 40557 --ws-port 9951 --parachain-id 2000 --ws-external --rpc-cors all --rpc-methods=unsafe -- --execution wasm --chain ../polkadot/rococo-local.json --port 40558 --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

RUST_LOG=runtime=debug ./target/debug/polkadot-collator -d ./data/bob --collator --bob --force-authoring --port 40777 --ws-port 9971 --parachain-id 2001 --ws-external --rpc-cors all --rpc-methods=unsafe -- --execution wasm --chain ../polkadot/rococo-local.json --port 40778 --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```







## 向中继链注册两条平行链

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/sudo

![image-20210901120051289](/Users/xjz/Library/Application Support/typora-user-images/image-20210901120051289.png)

parasSudoWrapper->sudoScheduleParaInitialize



https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/parachains

过段时间能看到平行链有2000 和 2001



## 建立平行链hrmp通道

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/sudo

![image-20210901120515626](/Users/xjz/Library/Application Support/typora-user-images/image-20210901120515626.png)

parasSudoWrapper->sudoEstablishHrmpChannel

建立两次，参数：

2000 2001 7 1000

2001 2000 7 1000



## 2001节点发送getprice消息

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9971#/sudo

GetPrice->Getprice 参数

2000 btc



## 查看事件发送结果

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9971#/explorer

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9951#/explorer 

