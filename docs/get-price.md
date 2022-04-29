---
id: getPrice
title: Get Price
sidebar_label: Get Price
---

* Currently there are two ways to get the price on the chain, one is a general price inquiry, and the other is to submit an advance payment to get the price.
* The symbol fraction supported on the chain can be obtained via this [document](getSymbolFraction)

## Query the free aggregated average price
* The average price is queried by getting data from the storage location `aresOracle.aesAvgPrice` in the symbol fraction format `TOKEN-usdt`, e.g. `eth-usdt`.
````javascript
/// Example

import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider});
}

async function init() {
    const keyring = new Keyring({ type: 'sr25519' });
    const dave = await keyring.createFromUri('//Dave');
    polkaAPI = await initProvider(url);
}

/**
 * Query Price
 * symbol eg symbol fraction ： btc-usdt
 */
async function getAresPrice(symbol) {
    if(polkaAPI) {
        console.log("get symbol price");
        const res = await polkaAPI.query.aresOracle.aresAvgPrice(symbol);
        const price = res.toJSON();// res.toHuman();
        console.log(`======fetch ${symbol} price finished======`);
        console.log(`symbol price: ${price[0]}/(${10 ** price[1]}) = `, price[0]/(10 ** price[1]) );
        console.log(`========================`);
    }
}

async function runGetAresPrice(){
    await init()
    await getAresPrice("eth-usdt");
}

runGetAresPrice();
````
* Call Result
```shell
get symbol price
======fetch eth-usdt price finished======
symbol price: 28879675/(10000) =  2887.9675
========================
```

## Submit a price inquiry symbol fraction to be specified for aggregation and make an advance payment
* The average price on the chain obtained above, the delay time is relatively long, for price access to real-time demand can also use paid aggregation to obtain prices
* Please note that this operation requires that the corresponding account has enough Balance to cover the cost of the inquiry.
* This process is divided into two steps：
  * The first step submits the query request and pays the prepayment (the prepayment will be released when the aggregation fails), and gets the corresponding order-id from the Event after submitting the prepayment to be used for querying the results later.
  * The second step queries the aggregated price data by order.
* The following is an example of implementation by code.  

### Submit prepayment and get order ID

````javascript
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
const keyring = new Keyring({ type: 'sr25519' });
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider});
}

async function init() {
    polkaAPI = await initProvider(url);
}

/**
 * Submit ask price
 * maxFee
 * requestKeys symbol fraction array  eg："btc-usdt,eth-usdt,doge-usdt"
 */
async function submitAskPrice(sender, maxFee, requestKeys) {
    if(polkaAPI) {
        console.log("============submit ask price==============");
        const unsub = await polkaAPI.tx.aresOracle.submitAskPrice(maxFee, requestKeys)
            .signAndSend(sender, {}, ({status, events, dispatchError}) => {
                if (dispatchError) {
                    if (dispatchError.isModule) {
                        const decoded = polkaAPI.registry.findMetaError(dispatchError.asModule);
                        const { docs, name, section } = decoded;
                        console.log(`${section}.${name}: ${docs.join(' ')}`);
                    }
                    console.log(`${dispatchError}`);
                } else if (status.isFinalized) {
                    events.map(item => {
                        const result = item.event.toHuman();
                        if (result.method === "NewPurchasedRequest") {
                            console.log("submit ask price order ID:", result.data[0]);
                        }
                    })
                    console.log(`submitAskPrice Transaction finalized at blockHash ${status.asFinalized}`);
                    unsub();
                }
            });
    }
}

const userPair = keyring.addFromUri('替换成提交用用户的Seed');
await init()
await submitAskPrice(userPair, BigInt(`${200}000000000000`), 'doge-usdt,dot-usdt');
````
* Call results, where `0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000` is used to query the latest results of the aggregation on the chain, which are derived from the aggregation of collective quotes from existing online validators.
```shell
============submit ask price==============
submit ask price order ID: 0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000
submitAskPrice Transaction finalized at blockHash 0x43b28c4f0e7de434a4dfc86a1d8f4dbad0e4d7d33f46ac611c12fbe0e3e13271

```

### Query specified price data by Order ID
* Order ID required

````javascript

import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
  const provider = new WsProvider(url);
  return await ApiPromise.create({provider});
}

async function init() {
  polkaAPI = await initProvider(url);
}

/**
 * Get Advance Pricing
 * orderID Order ID
 * symbol symbol fraction eg： btc-usdt
 */
async function getPurchasedAvgPrice(orderID, symbol) {
  if(polkaAPI) {
    console.log("Get purchasedAvgPrice");
    const res = await polkaAPI.query.aresOracle.purchasedAvgPrice(orderID, symbol);
    const price = res.toJSON();
    console.log(`======Fetch ${orderID} =====`);
    console.log(`Symbol: ${symbol}, Create block number: ${price.createBn}, Reached type: ${price.reachedType}, Value = ${price.priceData[0]/(10 ** price.priceData[1])}`);
    console.log(`========================`);
  }
}

let orderID = '0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000';
await init()
await getPurchasedAvgPrice(orderID, 'doge-usdt');
await getPurchasedAvgPrice(orderID, 'dot-usdt');

````

* Call result, where a `Reached type` of 1 means full aggregation, i.e., all validators participate in the offer, and a 2 means that some validators do not provide an offer, but the overall number of offers is still greater than the offer threshold requirement.
* The quote threshold requirement can be obtained through the `submitThreshold` parameter of `aresOracle.purchasedDefaultSetting`, 60 means more than 60% of nodes participate in the quote.
```shell
Get purchasedAvgPrice
======Fetch 0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000 =====
Symbol: doge-usdt, Create block number: 1570676, Reached type: 2, Value = 0.1397
========================
Get purchasedAvgPrice
======Fetch 0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000 =====
Symbol: dot-usdt, Create block number: 1570676, Reached type: 2, Value = 16.9368
========================
```