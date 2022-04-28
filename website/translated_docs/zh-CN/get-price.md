---
id: getPrice
title: Get Price
sidebar_label: Get Price
---

目前链上有两种获取交易的方式,一个是普通的价格查询,一个是提交预付款获取价格。下列的文档将介绍Javascript如何获取价格


## 普通查询

````javascript
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import BigNumber from "bignumber.js";

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider);
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
        const res = await polkaAPI.query.aresOracle.aresPrice(symbol);
        const price = res.toHuman();
        console.log(`======fetch ${symbol} price finished======`);
        console.log("symbol price:", price);
        console.log(`========================`);
    }
}

async function runGetAresPrice(){
    await init()
    await getAresPrice("eth-usdt");
}

````
## 提交预付款获取

### 提交预付款

````javascript
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import BigNumber from "bignumber.js";

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider);
}



async function init() {
    const keyring = new Keyring({ type: 'sr25519' });
    const dave = await keyring.createFromUri('//Dave');
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
        maxFee = new BigNumber(maxFee).shiftedBy(12).toNumber();
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
                    console.log("Add Success")
                }

                events.map(item => {
                    const result = item.event.toHuman();

                    if (result.method === "NewPurchasedRequest") {
                        console.log("submit ask price order ID:", result.data[0]);
                    }
                })

                if (status.isInBlock) {
                    console.log(`submitAskPrice Transaction included at blockHash ${status.asInBlock}`);
                } else if (status.isFinalized) {
                    console.log(`submitAskPrice Transaction finalized at blockHash ${status.asFinalized}`);
                    unsub();
                }
            });
        console.log(`========================`);
    }
}

async function runSubmitAskPrice(){
    await init()
    await submitAskPrice(dave, 200, 'doge-usdt');
}

````

### 预付款价格

````javascript
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import BigNumber from "bignumber.js";

let polkaAPI = null;
const url = "wss://gladios.aresprotocol.io";
async function initProvider(url) {
    const provider = new WsProvider(url);
    return await ApiPromise.create({provider);
}



async function init() {
    const keyring = new Keyring({ type: 'sr25519' });
    const dave = await keyring.createFromUri('//Dave');
    polkaAPI = await initProvider(url);
}

/**
 * 预付款价格
 * orderID 预付款订单ID
 * symbol 交易对名称如： btc-usdt
 */
async function getPurchasedAvgPrice(orderID, symbol) {
    if(polkaAPI) {
        console.log("get purchasedAvgPrice");
        const res = await polkaAPI.query.aresOracle.purchasedAvgPrice(orderID, symbol);
        const price = res.toHuman();
        console.log(`======Fetch ${orderID} price finished======`);
        console.log("order price:", price);
        console.log(`========================`);
    }
}

async function runGetPurchasedAvgPrice(){
    const testOrderID = "0x306721211d5404bd9da88e0204360a1a9ab8b87c66c1bc2fcdd37f3c2222cc20fb0817000000000000";
    await init()
    await getPurchasedAvgPrice(testOrderID, "doge-usdt");

}

````
