---
id: programInstallation
title: Program Installation
sidebar_label: Program Installation
---

**Method A: download the executor**

1.  Download the binary executor of the node：

download link：[<u>https://github.com/aresprotocols/ares/releases/tag/v1.0.7</u>](https://github.com/aresprotocols/ares/releases/tag/v1.0.7)

**First Step:**

![](assets/build/114.png)

As the above photo showed, executable gladios-node binary coded files:
```
wget -c https://github.com/aresprotocols/ares/releases/download/v1.0.7/gladios-node-linux-amd64-1.0.7-379058b
)
```
**Second Step:**
![](assets/build/115.png)

As shown above, add executor permission

```
chmod +777  gladios-node-linux-amd64-1.0.7-379058b
```

**Third Step**
![](assets/build/116.png)
As shown above, execute node

```
./gladios-node-linux-amd64-1.0.7-379058b --base-path data   --name Ares_Emily0626_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11   --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
```

Please fill out in form of (Ares_username in telegram node miner group_bsc address).

for example:
Ares_Emily0626（username in telegram node miner group) _ 0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（bsc address）;
Please ensure information are valid to enable evaluation and distribution of rewards.

![](assets/build/117.png)

When the server displays in the above screen, the deployment is successful. Don’t forget to log into Polkadot Telemetry to check the node running status.



**Method B：**

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

2.  Open the command line tool, run the command to execute the node program

```
docker run -d --name ares_gladios aresprotocollab/ares_gladios:beta gladios-node --name your-name --chain gladios --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'

```
In the above command：aresprotocollab/ares_gladios:beta It can be changed to a different version such as：

aresprotocollab/ares_gladios:alpha；More versions please check：

https://hub.docker.com/r/aresprotocollab/ares_gladios/tags

3. View the program running log:


```
docker logs -f ares_gladio -n 1000

```

4.  Stop and delete the node program:



```
docker stop ares_gladios

docker rm ares_gladios

```


**Method C: source code compilation**
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
