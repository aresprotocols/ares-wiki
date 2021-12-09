---
id: setUptheVerifierNode
title: Set Up the Verifier Node
sidebar_label: Set Up the Verifier Node
---

Set Up the Verifier Node
Instal code compile tool
Install the rust
# Install
curl https://sh.rustup.rs -sSf | sh
# Configure
```
source ~/.cargo/env
Configure the Rust toolchain to default to the latest stable version, and add nightly and nightly WASM compilation targets.
rustup default stable
rustup update
rustup update nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
Installation dependencies (for example, Ubuntu 18.04) For other operating systems, refer to the underlying developer documentation
sudo apt update
sudo apt install make clang pkg-config libssl-dev build-essential
```

Obtain the node executable file
Obtain Gladios project resource code and compile

```
git clone git@github.com:aresprotocols/ares.git ares-chain
cd ares-chain
cargo build --release
After compiling, you will get an executable file ares-chain/target/release/gladios-node
```
Starting a Data Node
Start the data node and connect to the network.

#  Execute the following command in the directory you just compiled.
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

Start the verifier node
Start the authenticator node and connect to the network.

# Execute the following command in the directory you just compiled.
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

- Warehouse parameter: supports the server request address and port number of the authenticator.

- The ares-keys parameter specifies ARES and other energy information that may need to be started, such as Aura Gran.

**ares-keys Specifies an example of a file. Note that the file cannot include comments and is split by newline, in most cases ares The key correspondence is consistent with the block producer.**

ares:finger treat seven sign army beauty album zebra fiction office planet tragic
aura:finger treat seven sign army beauty album zebra fiction office planet tragic
gran:ensure usage check coast suspect warrior extend young frequent track can cloud

View the node
visit：https://telemetry.polkadot.io/#list/0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3