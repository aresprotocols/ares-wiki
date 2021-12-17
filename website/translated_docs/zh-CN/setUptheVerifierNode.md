---
id: setUpVerifierNode
title:  Set Up the Verifier Node
sidebar_label:  Set Up the Verifier Node
---


**安装代码编译工具**

安装 rust

```
# Install
curl https://sh.rustup.rs -sSf | sh
# Configure
source ~/.cargo/env
```

配置 Rust 工具链默认为最新的稳定版本，添加 nightly 和 nightly wasm 编译目标。
```
rustup default stable
rustup update
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```
安装依赖项（举例 Ubuntu 18.04）其他操作系统的安装，可以参考底层开发者文档
```
sudo apt update
sudo apt install make clang pkg-config libssl-dev build-essential
```

**获取节点可执行文件**

获取Gladios项目资源代码并编译。
```
git clone git@github.com:aresprotocols/ares.git ares-chain
cd ares-chain
cargo build --release
```
编译后会获得可执行文件 ares-chain/target/release/gladios-node


### 启动数据节点

* 启动数据节点并连接到网络。
```
./target/release/gladios-node \
  --base-path /tmp/gladios-data \
  --name ARES_DATA_NODE \
  --chain ./chain-data-ares-aura.json \
  --port 30334 \
  --ws-port 9946 \ 
  --rpc-port 9934 \
  --ws-external \
  --rpc-external \
  --rpc-cors=all \
  --rpc-methods=Unsafe \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```

### 启动验证人节点

* 启动验证人节点并连接到网络。（Aura共识）
```
./target/release/gladios-node purge-chain --base-path /tmp/aura/two --chain gladios -y
./target/release/gladios-node \
  --base-path /tmp/gladios-data \
  --name ARES_VALIDATOR_NODE \
  --chain ./chain-data-ares-aura.json \
  --port 30335 \
  --ws-port 9947 \
  --rpc-port 9935 \
  --ws-external \
  --rpc-external \
  --rpc-cors=all \
  --rpc-methods=Unsafe \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --warehouse http://141.164.58.241:5566 \
  --ares-keys ./your_ares_key_file.curl \
  --validator \
  --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```

– 仓库参数，支持指定验证人的服务器请求地址及端口。

–ares-keys 参数，指定 ares 以及其他可能需要启动的能源信息，例如 aura gran。
```
#ares-keys Specifies an example of a file. Note that the file cannot include comments and is split by newline, in most cases ares the key correspondence is consistent with the block producer.**
ares:finger treat seven sign army beauty album zebra fiction office planet tragic
aura:finger treat seven sign army beauty album zebra fiction office planet tragic
gran:ensure usage check coast suspect warrior extend young frequent track can cloud
```

**节点查看**
https://telemetry.polkadot.io/#list/0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3
