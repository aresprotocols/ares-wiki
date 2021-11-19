---
id: buildCrossChainSolution
title: KSM卡槽竞拍支持规则及步骤
sidebar_label: KSM卡槽竞拍支持规则及步骤
---

## Introduction

KSM card slot auction support rules and procedures Why do I need to conduct slot auctions?

The infrastructure of the Polkadot network includes: Relay Chain: the main communication hub between the parachain and the Polkadot "backbone". Parachains: Independent blockchains that run on top of the relay chain and are bound and reserved through auctions. Transfer bridge: modules and contracts connected to other blockchains, such as Bitcoin and Ethereum. Parallel threads: For developers who just want to try Polkadot, this is a lighter alternative, and the "pay as you go" model is offered to them. If the Polkadot main chain (relay chain) is regarded as a power strip, the different electrical appliances on the power strip are parallel chains. These electrical appliances can be refrigerators, TVs, and so on. Polkadot's main chain is a relay chain based on Substrate; Polkadot's parachain can have many types, such as Bitcoin, Ethereum, TRON, and so on. Due to the limitation of network resources, it is not possible to access the parachain without restriction. Polkadot has designed 100 slots for the parachain to use, and the way of obtaining it is auction. Only by acquiring a slot can you stably access the Polkadot network and enjoy the security of the main network. The essence of the slot is the right to use the Polkadot network. The slot is issued for 6 months, and one auction can get the right to use it for up to 2 years. Each chain can design its own structure according to needs, and at the same time can enjoy the same security of Polkadot's main network. Many parachains have been designed as smart contract platforms to attract project parties who do not want to bid on their own parachains to build applications on their own chains, thus forming their own small ecology within the Polkadot ecology. At this level, the importance of slots is even more prominent. Because the slot may allow the parachain to form its own ecology and realize its own network effect.

The steps of a slot auction

1. Launch the Rococo v1 testnet and wait for it to run stably;

2. The public welfare parachain of Kusama Xianxing Network is launched;

3. Open Kusama's first online slot auction;

4. Launch Kusama Pioneer Network Parachain; "Currently, the first 5 ksm slots have been auctioned and are in the state of access testing."

5. Complete the audit work and launch the public welfare parachain of the Polkadot mainnet;

6. Open the slot auction on the Polkadot mainnet;

7. Launch the Polkadot mainnet parachain.


The Kusama mentioned above is Polkadot's pioneering network, which has an independent organization and community, and is an independent blockchain with real value. Kusama is Polkadot's pioneering network, and all new functions and features appearing on Polkadot will be launched on Kusama first, and the same is true for slot auctions. Because the slot auction will be conducted on Kusama first, it is expected that Kusama's secondary market will perform well under the blessing.


What is a Parachain Slot Auction?
Parachain slot auctions, a more accurate statement should be parachain slot lease auctions. Parachain slots are actually only rented but not sold. Each lease period of the parachain slots on Polkadot is 6 months. Four lease periods can be bid for at auction, which means that only one or more projects can be sold. The lease period, the parachain slot lease period on KSM will be shorter. Parachain slot auctions use candlestick auctions. Candle auction originated from ship auctions in the 16th century. After the auction started, the executor of the auction lit a fixed-length candle. At the moment the candle was extinguished, whoever made the highest bid won the auction item. Parachain slot auctions will simulate this process on the blockchain. It is divided into two stages: a security period and a random period. During the security period, the auction will proceed freely and will not end. The random number will drop the hammer at any time. At the moment the hammer falls, whoever pledges a large number of DOT/KSM can rent this slot. When the project party is bidding, due to cost considerations, it is impossible to buy DOT/KSM on the secondary market and pledge it to itself, but will introduce related incentive mechanisms, such as Token rewards for the project, to incentivize others Users pledge DOT/KSM to themselves. After the user pledges to the project party, these pledged DOT/KSM are locked. If the project party takes the parachain slot, it will be unlocked after the slot lease period expires. If the project party does not take the slot, auction Unlock and release after the end. It is important to note that the pledged DOT/KSM is still in the hands of the user, but liquidity is lost. The project party cannot privately misappropriate the user's pledged DOT/KSM. This is similar to EOS node voting. After users pledge EOS, they can exercise their voting rights and vote for supporting nodes. The pledged EOS just loses its liquidity, but it is still in the hands of users. In addition to the parallel chain slot, the Polkadot system also introduced parallel threads. In simple terms, parallel threads can be understood as "shared parachains", supporting multiple projects to share certain parachain slots in units of blocks. Therefore, the parallel thread is specially designed by Polkadot for those projects that cannot afford the slot auction fees, or the business model does not require long-term slot leases.


Ares detailed bidding rules and steps (to be announced)