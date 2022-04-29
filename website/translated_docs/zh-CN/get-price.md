---
id: getPrice
title: Get Price
sidebar_label: Get Price
---

* 目前链上有两种获取交易的方式,一个是普通的价格查询,一个是提交预付款获取价格。
* 链上支持的交易对可以通过此[文档](getSymbolFraction)获取  
* 下列的文档将介绍Javascript如何获取价格

## 查询免费聚合均价
* 通过获取存储位置`aresOracle.aresAvgPrice`的数据来查询均价，交易对格式`TOKEN标识-usdt`，比如`eth-usdt`。
````javascript
/// 代码参考

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
 * 获取价格
 * symbol 交易对名称如： btc-usdt
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
* 调用结果
```shell
get symbol price
======fetch eth-usdt price finished======
symbol price: 28879675/(10000) =  2887.9675
========================
```

## 提交要指定聚合的价格查询对并支付预付款
* 上面获取的链上均价，延迟时间相对较长，对于价格获取实时性较高的需求还可以使用付费聚合的方式获取价格。
* 需要注意该操作要保证对应账户存有足够的Balance，用于支付查询费用。
* 此流程分为两步：
  第一步提交查询请求并支付预付款（如果聚合失败预付款会被释放），从提交预付款后的Event中获取对应的order-id用于之后查询结果。
  第二步通过订单查询聚合的价格数据。
* 接下来介绍通过代码实现的举例：  
### 提交预付款并获取订单ID

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
 * 提交预付款
 * maxFee
 * requestKeys 交易对数组  如："btc-usdt,eth-usdt,doge-usdt"
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
* 调用结果，其中 `0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000` 用来查询链上聚合的最新结果，这些结果由现有在线验证人集体报价聚合得出。
```shell
============submit ask price==============
submit ask price order ID: 0xaaf0c45982a423036601dcacc67854b38b854690d8e15bf1543e9a00e660e0195ff717000000000000
submitAskPrice Transaction finalized at blockHash 0x43b28c4f0e7de434a4dfc86a1d8f4dbad0e4d7d33f46ac611c12fbe0e3e13271

```

### 通过订单ID查询制定价格数据
* 需要订单id

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
 * 获取预付款价格
 * orderID 预付款订单ID
 * symbol 交易对名称如： btc-usdt
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

* 调用结果，其中`Reached type`为1表示全量聚合，也就是所有验证人均参与报价，为2表示部分验证人没有提供报价，但是总体报价数量仍然大于报价门槛要求。
* 报价门槛要求可以通过`aresOracle.purchasedDefaultSetting`的`submitThreshold`参数获得，60表示大于60%节点参与报价。
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