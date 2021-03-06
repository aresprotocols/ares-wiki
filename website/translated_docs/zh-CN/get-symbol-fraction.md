---
id: getSymbolFraction
title: Get Symbol Fraction
sidebar_label: Get Symbol Fraction
---

## 获取链上支持的交易对列表
* 通过获取存储结构`aresOracle.symbolFraction`，来获取链上具体支持那些交易对，后期可以通过这些交易对进行[查询](getPrice)。

````javascript
/// 代码参考

import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import { cryptoWaitReady } from '@polkadot/util-crypto';
await cryptoWaitReady();

// import BigNumber from "bignumber.js";

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
 * 获取支持的交易对
 */
async function getSymbolFraction(symbol) {
    if(polkaAPI) {
        console.log("Get symbol list:");
        const exposures = await polkaAPI.query.aresOracle.symbolFraction.entries();
        exposures.forEach(([key, exposure]) => {
            console.log(`Symbol = ${key.toHuman()[0]}`);
        })
    }
}

await init()
getSymbolFraction();

````
* 调用结果
```shell
Get symbol list:
Symbol = stx-usdt
Symbol = grt-usdt
Symbol = icx-usdt
Symbol = xtz-usdt
Symbol = snx-usdt
Symbol = ren-usdt
...
```