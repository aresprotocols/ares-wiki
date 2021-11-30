---
id: aresRelated
title: Liquidity mining
sidebar_label: Liquidity mining
---

## 1. What is a blockchain oracle oracle (Oracle)?

The mechanism by which information outside the blockchain is written into the blockchain. Or it can be understood as a bridge connecting the off-chain and on-chain worlds, feeding off-chain prices into the on-chain blockchain system. First of all, why does a decentralized blockchain need to be supplemented by information outside the blockchain? This is related to the development of the entire blockchain. In the Bitcoin era, everyone did not have a clear understanding of the blockchain concept, and there was no complicated application on it. In the era of Ethereum, due to the programmable EVM (Ethereum Virtual Machine), applications with simple functions began to appear on the chain. Ethereum enthusiasts encountered a problem when building complex applications: under the ETH ecosystem, They try to complete a certain transaction by constructing a contract. When other nodes in the distributed network verify the transaction, they will call this API interface, and subsequent calls may cause other nodes to get different results due to price changes or hacker attacks. This means that it may No node agrees on the actual state of the blockchain. Once uncertain data is reported to the blockchain, the data will be an immutable part of the history of the blockchain. Then the smart contract based on this data not only fails to perform its expected task, but may cause irreparable damage. Therefore, it is necessary to record off-chain information on the chain through a separate transaction. Secondly, a simple and straightforward solution you might think of is to use a reliable external source of information for processing. But we take a step back and think: Why do we want to construct a chain? Isn't an important reason decentralization? And "centralization" is the problem. "centralization" means a single point of risk, and experience tells us that it is very difficult to maintain the long-term reliability and accuracy of centralized information sources. In order to obtain fair data, a multi-party submission mechanism is introduced, which is the origin of the blockchain oracle.

## 2. What are the types of oracles?
What are the advantages of Ares? Oracles have no hosts, and can be divided into parasitic oracles and independent blockchain network oracles. The oracles on Ethereum are all parasitic oracles, while the oracles built on Cosmos or Polkadot have independent blockchain networks. A parasitic oracle refers to an oracle that is parasitic in the host blockchain network. It does not need to run nodes, and the development speed is very fast, but it is easily affected by the host network itself. It is particularly obvious that the current high GAS fee of the Ethereum network, presumably many projects do not want to obtain the asset price on the chain when the GAS fee is high, which seriously hinders the development of DeFi and oracles. At the same time, when the amount of business on the host is large, such as the black swan event that occurred in 312 last year, a large number of transactions were not packaged by miners and could not be processed, resulting in a 6-hour ETH/USD price failure in Chainlink. The independent blockchain network oracle refers to the oracle network built independently based on the development tools provided by Polkadot or Cosmos, called Substrate and Cosmos SDK, respectively. Its development speed is slower, and it needs to establish its own nodes, but its network is more stable and less vulnerable to attacks due to independent development, data response speed is faster, and the required handling fee is lower. The oracle machine can also be classified from the consensus algorithm, which is divided into: POA (Proof of authority), DPOS (Delegated Proof Of Stake), and POS (Proof Of Stake). Among them, the number of nodes and the degree of decentralization: POA <DPOS <POSPOA is generally composed of several institutions. Only members of the alliance can change the data in the blockchain, and the frequency of institutional updates is relatively low. DPOS is a delegated proof of stake, which allows some currency holders to entrust a node operator to obtain block rewards. The implementation method is based on the Byzantine consensus of BFT. Due to the Byzantine fault tolerance and the need for dense network communication, DPOS's block generation node There is a certain upper limit, which can be seen from the network nodes of EOS and Cosmos. Typical oracle projects are: BandPOS exercises power according to the proportion of equity. It is a relatively complex blockchain network and requires a large number of node operators. Node operators determine the right to produce blocks through random selection algorithms. It does not require Byzantine fault tolerance and a large amount of communication data. Because there can be a large number of nodes, this makes the network More fair and decentralized. Typical oracle projects include: Ares popular oracles in the market today, Chainlink in the Ethereum ecosystem, Nest, and Band in the Cosmos ecosystem. The following is a list of specific function points and function comparisons used in Ares Protocol: Ares advantage and openness Ares introduces the RPOS mechanism (Reputation POS), allowing ordinary users to become an aggregator node of the Ares network as long as they pledge a certain amount of $ARES. 

In order to ensure the widespread and distributed characteristics of the data source. At the same time, the increase in reputation value can obtain more block weights, and the security of the node network can be ensured through a set of POS processes. Fairness The Ares network randomly selects aggregator nodes to provide data through VRF, which effectively guarantees the fairness and decentralization of nodes. Any node may be randomly selected as the data provider. The Ares network accumulates the reputation value for each node, and the reputation value can be used as an important reference indicator for applying for members of the governance committee. Ares Network’s first compensation solution. When data demanders use the Ares network to verify the data provided by the multi-layer security mechanism and suffer business losses, they can initiate a proposal to the Ares Treasury to apply for certain compensation. After the proposal is approved by the governance committee, the compensation will be allocated to the data demander. This adds another service guarantee to data demanders. Security Synthetix, bZx protocol and other oracles have experienced quotation errors, and many have allowed trading robots to arbitrage more than $1 billion in an hour. Ensuring the safety and reliability of data is of utmost importance. Ares uses the following methods to ensure data security. Aggregating multiple data sources is conducive to removing abnormal data and weighted average other data. When the aggregation chain submits the price to the chain, it will perform on-chain aggregation to prevent individual aggregators from doing evil, so as to ensure the true validity of the data. After the selected aggregator node provides data, any node can initiate a challenge by paying a certain GAS fee, questioning the authenticity of the data, and the arbitration committee will deal with the challenger's queries in a timely manner. Successful initiating a challenge will receive a reward, otherwise, it will accept a penalty to lose the GAS fee. Fully ensure that the data provided by the node is true and effective. Real-time Ares ensures that the data demander can quickly receive feedback results in real time after initiating a request by verifying and sharing the security consensus of the Polkadot network on the data chain. In order to avoid Chainlink's 6-hour ETH/USD price failure.

## 3. Why did Ares choose Polkadot?
Ares has seen a series of problems such as high gas fees, vulnerability to attacks, and price feed failures in the Ethereum oracle. I want to provide the market with a new generation of cross-chain oracle service agreements in the form of an independent blockchain network oracle.

● Technical adaptability
At this time, choosing whether to develop on Polkadot or Cosmos has become the main point of consideration for the entire founding team. In the end, the team chose the Polkadot Polkadot development tool Substrate, which is more powerful and easier to develop.

Substrate supports any language that can be compiled into WASM (Web Assembly), giving developers more flexibility. It not only supports the WASM virtual machine, but is also compatible with the EVM (Ethereum Virtual Machine) contract engine, which is currently available online.

Based on the construction of the Substrate framework, the Ares project will complete a series of technical implementations: "①Bound miners and bidders deeply to effectively solve the MEV problem of miners; ②Using Polkadot's latest Offchain Worker can efficiently and securely submit off-chain prices On the chain; ③For the miners’ quotations, Babe’s random lottery will be used to submit the prices to the chain to ensure that the nodes cannot falsify; ④The challengers and reputation committees are introduced to punish malicious quotations through on-chain governance. Miners."

● Ecological prosperity
What is Polkadot
Polkadot is one of the most popular public chain projects in the world this year. Its founder, Gavin Wood, was the co-founder of Ethereum and the author of the Ethereum Yellow Paper. In addition to the strong strength of the core founder Lin Jiawen, the other team members have also been in the industry for many years and have rich development experience.

Polkadot was created by the Web3 Foundation in 2016 and aims to link different blockchains through a blockchain network to achieve cross-chain interoperability and become the next-generation blockchain network infrastructure. Through Polkadot, different blockchains can be linked to each other to achieve cross-chain interaction.

How is Polkadot's current development?
Some teams are already building effective solutions for a range of applications for Polkadot, including finance, gaming, digital identity, the Internet of Things, supply chain management, social networking, and cloud technology. The Web3 Foundation is the organization responsible for managing the development of Polkadot. It provides funding for many of these teams to fund projects at all levels of the Web3 technology stack, from the underlying infrastructure to ecosystem components such as wallets, parachains, bridges, and tools. .

As more and more teams realize the benefits and efficiency of deploying projects on Polkadot, the Polkadot ecosystem has grown stronger. Compared with previous blockchain networks, Polkadot's unique design provides more innovation and flexible iterations for the project. According to PolkaProject's real-time statistics, there are currently about 500 projects that have joined the Polka Ecosystem. With the support of such a prosperous ecosystem, Ares’ oracle market has a large enough prospect.

4. Ares technical framework

How does Ares build a decentralized, real-time, safe and accurate decentralized cross-chain oracle? Participants 1. Aggregator The aggregator obtains external request data through the scanner, and sends the request to the processor to process all oracle requests. The aggregator is randomly selected through the VRF algorithm. It calls the processor to aggregate data from multiple data sources and submits it to the block, and broadcasts it to the Ares network through the block propagation protocol. 2. Challenger The challenger verifies the integrity and validity of the data submitted by the aggregator, and submits fraudulent aggregator transactions and correct data to the Reputation Committee for rewards. 3. The Reputation Committee ensures the security of the regional network by motivating challengers and punishing malicious aggregators. The reputation committee is fully self-governed by the community, running for the reputation committee through token mortgage and reputation weighting. The internal arbitration of the reputation committee requires voting through fraudulent security protocols and only runs when a dispute occurs on the chain. 4. Data consumers Data consumers can be objects that need to obtain external data in smart contracts, parachains, and DAPPs. They can provide a variety of credible and valid data for DEFI, market forecasts and gambling. Because Ares's on-chain data has a certain data challenge period, data consumers should obtain on-chain data in accordance with certain security regulations. 5. Node operator As a full node of the Ares network, the node operator verifies the data by comparing it with the data stored locally to ensure the security of the Ares network and provide oracle remote invocation services. The Polkadot ecological parachain is designed in detail, and the data request is submitted by integrating the Ares oracle tray; the scanner obtains the external request data and submits it to the aggregator; the Ares Chain randomly selects an aggregator through the VRF algorithm; the aggregator calls the processor to aggregate from multiple The data of the data source is submitted to the Ares blockchain; the verification node will verify the data of the aggregator and the challenge; the reputation committee will verify and arbitrate the data submitted by the challenger. If you get something, just like it

## 5. Ares token economy
Total supply: 1 billion
Initial circulation: 57 million

Proportion of Ares tokens (from high to low)
Mining 20%: used for pledge mining and liquidity mining. Any third party can access the Ares network by mortgage a small amount of ARES tokens as a node, provide oracle services, and enjoy mining rewards. The total amount of initial tokens in the mining pool accounts for 20%. Every year, 10% of the remaining mining pools are mined and allocated to nodes. Mining rewards are decreasing year by year, but mining has never been completed.

Parachain auction 20%: rewards and leases for slot auctions. At present, Kusama's slot auction has launched the Mars Parachain network and successfully deployed the crowd loan module. The reward rules will be announced soon.

20% of team members: locked for 3 months, unlocked every month, and released for a total of two years or more.

Ares Ecological Fund 10%: Set up Ink Ecological Funds, Ares Ecological Marathon, etc., and cooperate with more projects to make Ares Ecological stronger.

Private placement round 9.5%: The private placement price is $0.006. 20% is not locked, and will be released at 30%, 30%, and 20% every 3 months. 7.30, 10.30, and 1.30 are all unlocking dates.

5.44% of the listed liquidity: will provide support for the listing of the exchange and the provision of liquidity.

Project consultant 5%: locked for 3 months, unlocked every month, for a total of two years or more.

Community building 5%: used for community activities and construction, rewarding community ambassadors and core contributors.

3.4% of the public offering round: IDO/ICO price is $0.03, unlocked at one time.

Community round 1.66%: 20% is not locked, and will be released at 30%, 30%, and 20% every 3 months. 7.30, 10.30, and 1.30 are all unlocking dates.

## 6. Project progress and future route
Project completed process

● Release of White Paper 1.0

● Core protocol design

● WEB3 Foundation Grant Application

● Prototype development based on pallet and offchain work

● Release of Technical Yellow Book

● Improve the cross-chain interaction of oracle users

● Realize random selection of aggregators and on-chain aggregation

● Improve the challenger and arbitration council model

● Troy pledge mining has exceeded 60% of the circulation

● Ink contract calls the asset quotation module to get the price

● Access to Recoco test and conduct Kusama slot auction


Project future development route

● Community Volunteer Program

● Improve economic model design

● Online test network

● Access to ecological partner testing

● Mainnet launches Ethereum network

● Carry out multi-channel service cooperation

● Formal cooperation with enterprises

● The main network is on the Polkadot network

● Eco-marathon developer activities

