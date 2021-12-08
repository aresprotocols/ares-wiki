---
id: programInstallation
title: Program Installation
sidebar_label: Program Installation
---

**Method A: download the executor**

1.  Download the binary executor of the node：

download link：[<u>https://github.com/aresprotocols/ares/releases/tag/v1.0.5</u>](https://github.com/aresprotocols/ares/releases/tag/v1.0.5)

Try to choose the latest version to download, the following example is the v211028 version

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/9.png?raw=true) 

Executable gladios-node binary file:
```
wget -c [<u>https://github.com/aresprotocols/ares/releases/download/v1.0.5/gladios-node</u>](https://github.com/aresprotocols/ares/releases/download/v1.0.5/gladios-node)
```

Add execute permission
```
chmod +777 [**<u>gladios-node</u>**](https://user_cancel/)
```

Execution node
```
./gladios-node --base-path /tmp/aura/one --name Ares_OCW5 --chain gladios --port 30334 --ws-port 9945 --rpc-port 9933 --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --bootnodes /ip4/158.247.224.166/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp
```

**Method two: source code compilation**
```
Install Rust

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh


Install dependent libraries

sudo apt install make clang pkg-config libssl-dev build-essential

Download the Ares code

git clone [https://github.com/aresprotocols/ares.git</u>](https://github.com/aresprotocols/ares.git)

Compile the source code

cargo build --release

Note if you run into compile errors, you may have to switch to a less recent nightly. This can be done by running:

rustup install nightly-2021-06-09

rustup target add wasm32-unknown-unknown --toolchain nightly-2021-06-09

cargo +nightly-2021-06-09 build --release
```


Method 3: Docker runs the node program

1.  Install docker

*   Ubuntu：

https://docs.docker.com/engine/install/ubuntu/

*   CentOs

https://docs.docker.com/engine/install/centos

*   RedHat

https://docs.docker.com/engine/install/rhel/

*   Mac

https://docs.docker.com/desktop/mac/install/

*   Windows

https://docs.docker.com/desktop/windows/install/

1.  Open the command line tool, run the command to execute the node program

```
docker run -d --name ares_gladios aresprotocollab/ares_gladios:beta gladios-node --name your-name --chain gladios --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'

```
In the above command：aresprotocollab/ares_gladios:beta It can be changed to a different version such as：

aresprotocollab/ares_gladios:alpha；More versions please check：

https://hub.docker.com/r/aresprotocollab/ares_gladios/tags

1. View the program running log:


```
docker logs -f ares_gladio -n 1000

```

1.  Stop and delete the node program:



```
docker stop ares_gladios

docker rm ares_gladios

```
