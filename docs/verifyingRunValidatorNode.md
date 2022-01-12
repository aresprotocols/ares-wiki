---
id: verifyingRunValidatorNode
title: Verify & Run Validator Nodes
sidebar_label: Verify & Run Validator Nodes
---

### Verifying Deployment Status
**Log in Polkadot Telemetry**

https://telemetry.polkadot.io/#list/0xcc07acbee59e89a8bc99d87a24364b514d6ae657551338547b713444583eaac2

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
./target/release/gladios-node --base-path data --name ocw_one --port 30333 --ws-port 9945 --rpc-port 9933 --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' --warehouse http://api.aresprotocol.io/ --validator
```

Parameter: (required) --warehouse to specify the IP address of ares quotation server.

Parameters: (required) --validator is used to start a validator node.

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/26.png?raw=true) 

![image](https://github.com/aresprotocols/documentation/blob/master/assets/img/27.png?raw=true) 

Enter the RPC Calls page, call the method author.rotateKeys, click the button Submit RPC Call, and then the server will return the public key (publicKey); copying the public key is needed in the second step.

Note⚠️: The above operation (first step) should be performed on the node you deployed or trusted node. Because the private key (privateKey) corresponding to the generated public key will be stored in the keystore of the node.

**CLI**[<u>​</u>](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#option-2-cli)

```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
```

**Output**
```json
{"jsonrpc":"2.0","result":"0x58ccb645829bad32a700595d74246c16bf0b981b23367d638c5cef7d31860b65e9bf2c72bc5d46e0d11c57e68b16ac087b487497495984e19a05a6a317da064edc818436afabf30dd0b523ee8440160bc97b25e264d1d054d7d6d342b9ecf353","id":1}
```

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
