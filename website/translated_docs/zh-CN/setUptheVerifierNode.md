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
  --base-path data \
  --name ARES_DATA_NODE \
  --chain .gladios \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
```

### 启动验证人节点

* 启动验证人节点并连接到网络。（Aura共识）
```
./target/release/gladios-node \
  --base-path data \
  --name ARES_VALIDATOR_NODE \
  --chain gladios \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --warehouse http://api.aresprotocol.io \
  --validator \
```

– 仓库参数，支持指定验证人的服务器请求地址及端口。

**节点查看**
https://telemetry.polkadot.io/#list/0xcc07acbee59e89a8bc99d87a24364b514d6ae657551338547b713444583eaac2
