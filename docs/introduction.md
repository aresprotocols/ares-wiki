---
id: introduction
title: Introduction
sidebar_label: Introduction
---
## Background

Mankind has experienced the agricultural revolution, industrial revolution, and is experiencing the information revolution. With the development and innovation of digital economy infrastructures such as artificial intelligence, blockchain, cloud computing, and big data in the new round of scientific and technological revolution, digital information has become a key production factor of the digital economy. It empowers the development of the digital economy. As a key factor of production, data should be stored safely, priced accurately, and transmitted reliably before entering into production and circulation. The idea behind Web 3.0 is to bring identity, assets, and data back to the individual through blockchain technology in a decentralized network based on trust and the exchange of value. And through cross-chain technology, trust can flow over different decentralized networks so that assets and data can be better transferred and integrated, hence doubling data productivity.

The mechanism by which information outside the blockchain is written into the blockchain is called an oracle. The oracle is the link between the blockchain and the real world. Real-world information is safely, credibly, and efficiently transmitted to the chain, so that heterogeneous chains, contracts, DAPPs, etc., can obtain off-chain data without trust, which is the basis for building a digital economy. Ares’ vision is to become a decentralized cross-chain oracle service protocol in the Web 3.0 ecosystem and to provide secure and reliable data services for the interconnection of the chain and the digital economy.

### Existing Plan
As a bridge between on-chain and off-chain, oracle machines are the core of decentralization and data security and credibility. The oracles currently on the market include oracle security, public chain security, and cross-chain security. The 21 nodes previously used by Chainlink to provide data can be called oracle security, while Band and Dos use consensus algorithms to achieve oracle data security and credibility can be called public chain security.

Ares conducts on-chain verification of the oracle data by introducing challengers and reputation committees and achieves the data’s finalization. Its principles are similar to the block production mechanism of Babe in Polkadot and Grandpa finalization, and it can be achieved through on-chain verification of data at a high level of safety.

### Ares Protocol Introduction
Ares is a decentralized hybrid oracle that fully realizes the on-chain and on-chain verification of oracle data. By using VRF to discover the random selection of aggregators, data centralization is solved, and a very low participation threshold is guaranteed. However, the random selection of the aggregator cannot guarantee the accuracy of the data. In order to solve the problem of data valuable, Ares innovatively adopts a challenger model. When the verification node in the network discovers that there is a problem with the data of the aggregator during the process of verifying the data, it only needs to pay a certain amount of Gas to initiate a challenge. The data will be passed to the arbitration organization, composed of honest aggregators and token holders. Under normal circumstances, it does nothing except there is a challenge in the network. Each member of the arbitration organization will initiate a BFT vote on the challenge. If the verification passes, the aggregator will be punished and the challenger will be rewarded.

As an open-source decentralized cross-chain oracle service protocol, Ares builds a decentralized data transaction ecosystem by introducing a token model and community governance. Data demanders can safely and effectively obtain off-chain data and allow high-quality Data providers to profit through on-chain governance and data transactions.

Ares is built under the Polkadot ecology. And it is built through Substrate, as a parachains link to the Polkadot ecology, sharing Polkadot’s security consensus; secondly, Ares is a scalable two-layer oracle network, which is Polkadot’s other parachains and provides decentralized data oracle services with mainstream blockchain networks.

