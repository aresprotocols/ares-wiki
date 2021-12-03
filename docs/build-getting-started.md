---
id: buildGettingStarted
title: Obtain Price Through Cross-Chain
sidebar_label: Obtain Price Through Cross-Chain
---

Cumulus was used to test different pallets across the chain
Compile and launch relay chain

```
## compile

git clone -b release-v0.9.9 https://github.com/paritytech/polkadot

cd polkadot

cargo build --release

## Export the chain configuration file

./target/release/polkadot build-spec --chain=rococo-local --disable-default-bootnode --raw > rococo-local.json

## Run two nodes

./target/release/polkadot --name alice --chain rococo-local --alice -d ./data/alice --ws-external --rpc-external --rpc-cors all  --node-key 0000000000000000000000000000000000000000000000000000000000000001

./target/release/polkadot --name bob --chain rococo-local --bob -d ./data/bob --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

```

### Download the cross-tray test code
```
git clone https://github.com/aresprotocols/mars.git

git checkout bridge

# Compile

cd mars

cargo build 

# Export genesis state and wasm files

./target/debug/polkadot-collator export-genesis-wasm > genesis-wasm

./target/debug/polkadot-collator export-genesis-state --parachain-id 2000 > genesis-state-2000

./target/debug/polkadot-collator export-genesis-state --parachain-id 2001 > genesis-state-2001

# Activate two parallel chains

RUST_LOG=runtime=debug ./target/debug/polkadot-collator -d ./data/alice --collator --alice --force-authoring --port 40557 --ws-port 9951 --parachain-id 2000 --ws-external --rpc-cors all --rpc-methods=unsafe -- --execution wasm --chain ../polkadot/rococo-local.json --port 40558 --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

RUST_LOG=runtime=debug ./target/debug/polkadot-collator -d ./data/bob --collator --bob --force-authoring --port 40777 --ws-port 9971 --parachain-id 2001 --ws-external --rpc-cors all --rpc-methods=unsafe -- --execution wasm --chain ../polkadot/rococo-local.json --port 40778 --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp

```



### Register parallel chains to relay chains

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/sudo

![](assets/build/57.png)

parasSudoWrapper->sudoScheduleParaInitialize

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/parachains

And it will show in some time that the parallel chains are 2000 and 2001

### establish parachains hrmp channel

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/sudo

![](assets/build/58.png)

parasSudoWrapper->sudoEstablishHrmpChannel

original produced，parameters：

2000 2001 7 1000

2001 2000 7 1000

### send get price message in 2001 node

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9971#/sudo

GetPrice->GetPrice parameters

2000 bitcoin

View the event sending result
check out the 

![](assets/build/59.png)

https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9971#/explorer


https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9951#/explorer 