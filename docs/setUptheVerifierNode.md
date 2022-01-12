---
id: setUpVerifierNode
title: Set Up the Verifier Node
sidebar_label: Set Up the Verifier Node
---


**Set Up the Verifier Node**  
Instal code compile tool  
Install rust

```
# Install
curl https://sh.rustup.rs -sSf | sh
# Configure
source ~/.cargo/env
```

Configure the Rust toolchain to default to the latest stable version, and add nightly and nightly WASM compilation targets.  
```
rustup default stable
rustup update
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```
Installation dependencies (for example, Ubuntu 18.04) For other operating systems, refer to the underlying developer documentation  
```
sudo apt update
sudo apt install make clang pkg-config libssl-dev build-essential
```

**Obtain the node executable file**

Obtain Gladios project resource code and compile.
```
git clone git@github.com:aresprotocols/ares.git ares-chain
cd ares-chain
cargo build --release
```
Obtain Gladios project resource code and compile ares-chain/target/release/gladios-node


**Starting a Data Node**

Start the data node and connect to the network.   
Execute the following command in the directory you just compiled.  
```
./target/release/gladios-node \
  --base-path data \
  --name ARES_DATA_NODE \
  --chain .gladios \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
```

Start the verifier node
Start the authenticator node and connect to the network.
Execute the following command in the directory you just compiled.
```
./target/release/gladios-node \
  --base-path data \
  --name ARES_VALIDATOR_NODE \
  --chain gladios \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --warehouse http://api.aresprotocol.io \
  --validator \
```
- Warehouse parameter: supports the server request address and port number of the authenticator.


**View the node**
https://telemetry.polkadot.io/#list/0xcc07acbee59e89a8bc99d87a24364b514d6ae657551338547b713444583eaac2
