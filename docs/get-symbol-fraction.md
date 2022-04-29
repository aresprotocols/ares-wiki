---
id: getSymbolFraction
title: Get Symbol Fraction
sidebar_label: Get Symbol Fraction
---

## Get the list of supported symbol fraction on the chain
* By getting the storage structure `aresOracle.symbolFraction`, we can get the specific symbol fraction supported in the chain, and later we can [query](getPrice) by these symbol fraction.

````javascript
/// Example

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
 * Get supported symbol fraction
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
* Call Result
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