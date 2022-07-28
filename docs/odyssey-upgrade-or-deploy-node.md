---
id: odysseyUpgradeOrDeployNode
title: Validator node program upgrade/deployment
sidebar_label: Validator node program upgrade/deployment
---
After you complete the staking, you need to upgrade/deploy the validator node. The validator nodes who have participated in the test should be notified that the current upgraded version of the node program is no longer compatible with the old version, and historical data needs to be cleared.

## Node program update/deployment

### Method 1: Download the node executor program
If you are using the node program, please use the following command to update
1. The executable ares-node binary document

````
wget -c https://github.com/aresprotocols/ares/releases/download/v1.4.1/ares-node-linux-amd64-1.4.1-5d36ce5
````


2. Add execute permission
````
chmod 777 ares-node-linux-amd64-1.4.1-5d36ce5
````


3. Execute the node
````
./ares-node-linux-amd64-1.4.1-5d36ce5 --base-path data --name Ares_Emily0626_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11 --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````



* Please use the previously-specified base-path directory
* Please fill in your-name in the form of Ares_TelegramUsername_bsc address. For example: name Ares_Emily0626 (node ​​tg group username) _0xA86ed7899330DF48316E2A2842D5aD13F031Ab11 (BSC address)
* warehouse parameter (required): used to specify the IP address of ares quotation server
* validator parameter (required): used to start a validator node


### Method 2: Run the Docker node program
1. Stop the previous Docker program and data
````
docker stop ares_odyssey
````

2. Remove the previous Docker program
````
docker rm ares_odyssey && docker rmi aresprotocollab/ares_node:latest
````

3. Docker run the new node program
````
docker run -d --name ares_odyssey -p 9944:9944 -p 9933:9933 aresprotocollab/ares_node:latest ares-node --name your-name --chain odyssey --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io  --validator
````


* Please fill in your-name in the form of Ares_TelegramUsername_bsc address. For example: name Ares_Emily0626 (node ​​tg group username) _0xA86ed7899330DF48316E2A2842D5aD13F031Ab11 (BSC address)
* warehouse parameter (required): used to specify the IP address of ares quotation server
* validator parameter (required): used to start a validator node
* -p: specify the docker port mapping
* -v: specify the docker storage mapping

4. View the program running log
````
docker logs -f ares_odyssey  -n 1000
````