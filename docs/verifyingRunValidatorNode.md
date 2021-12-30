---
id: verifyingRunValidatorNode
title: Verify & Run Validator Nodes
sidebar_label: Verify & Run Validator Nodes
---

### Verifying Deployment Status
**Log in Polkadot Telemetry**

https://telemetry.polkadot.io/#/0x1ff9888c17c1e30395e0abc7071f5e607d231528375dce789c95fe67850a3ef7

![](assets/build/95.png)

If your name is shown on this page, then congratulations, you are successfully deployed nodes on the test network — gladios. Next, let’s make efforts together for the development of the project to gain common prosperity.
Log into polkadot.js to check more block updates

https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io/#/explorer


**Run validator node**

**Staking**

*Step 1*

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/23.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/24.png?raw=true) 

As shown above, enter the Staking page, click "Account Actions", then click the Stash button.

*Step 2*

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/25.png?raw=true) 

Select the stash account to be pledged and the corresponding controller account. Stash and the controller can be the same account, but it is strongly not recommended in practice. Fill in the amount to be pledged (value bonded) according to the demand, and the pledge deposit amount is deducted from the stash account.

* A stash account could be imaged as your cold wallet, and the operations of funds are controlled by the stash account.
* controller account, all other non-financial operations are done by controller account (for example: set session keys, set commission, vote, release staking, etc)
* staking amount, don't use all available balance to the stake, you need to reserve some for transaction fees.

After filling in the above information, click the Bond button to complete the staking operation.

**Block out (become a validator)**

*Step 1*

Run node：

```
./target/release/gladios-node --base-path /tmp/aura/one --name ocw_one --port 30333 --ws-port 9945 --rpc-port 9933 --ws-external --rpc-external --rpc-cors=all --rpc-methods=Unsafe --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse https://api.aresprotocol.io/ --bootnodes /ip4/158.247.224.166/tcp/30333/p2p/12D3KooWEyoppNCUx8Yx66oV9fJnriXwCcXwDDUA2kj6vnc6iDEp --validator
```

Parameter: (required) --warehouse to specify the IP address of ares quotation server.

Parameter: (optional) --ares-keys to load the corresponding key-strore via a private key file.

--ares-keys file format internal format：

aura:(Mnemonic phrase)//1//aura

gran:(Mnemonic phrase)//1//grandpa
Parameters: (required) --validator is used to start a validator node.

Parameters: (required) --bootnodes is used to connect to the startup node.

ares-keyscould be altered to author.rotateKeys

1.  Generate Aura key: Need to specify sr25519 format.
2.  Generate GRANDPA key: Need to develop ed25519 format.

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/26.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/27.png?raw=true) 

Enter the RPC Calls page, call the method author.rotateKeys, click the button Submit RPC Call, and then the server will return the public key (publicKey); copying the public key is needed in the second step.

Note⚠️: The above operation (first step) should be performed on the node you deployed or trusted node. Because the private key (privateKey) corresponding to the generated public key will be stored in the keystore of the node.

CLI[<u>​</u>](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#option-2-cli)

curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933

*Step 2*

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/28.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/29.png?raw=true) 

Go to the Staking page and click the Account actions tab; select the account you need to operate, click Change session keys, paste the public key obtained in the first step in the input box of the pop-up page, and click the Set Session Key button to confirm the submission.

*Step 3*

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/30.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/31.png?raw=true) 

Enter Staking page and click "Account actions" bookmark page; choose the account you need to operate, click "Validate",  set block out reward commission percentage and whether allow new nominations in the pop-up page.

* reward commission percentage

Set the block reward commission percentage; for example, 10%, then 10% of the block reward is your own income, and the remaining part is proportionally distributed to the nominator. It is recommended that the commission setting is not too high. Only with a suitable commission can more people be nominated and win the competition and become a validator (block producers)

* whether allow new nominations

The default is to allow nominations. If the nomination is not allowed, you can only compete with others on the amount you pledged.

After completing the above operations, if you win the election, you can participate in the block production.
