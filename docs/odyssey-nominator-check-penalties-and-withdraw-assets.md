---
id: odysseyNominatorCheckPenaltiesAndWithdrawAssets
title: Check penalties & withdraw assets
sidebar_label: Check penalties & withdraw assets
---

It is essential to remind nominators that when selecting nodes for nomination, they should not only consider the revenue situation but also need to choose nodes that run smoothly based on the operation of the “points” node. The drop of the node will also cause the nominator to lose the same percentage of the stake money.

## Verifier Penalty

When a verifier is reported to be punished, a slashing score is calculated and used to punish the verifier. This score is obtained through the Imonline module. When the number of verifiers drops is within 10%, there is no penalty; over 10%, there is a penalty, which grows linearly according to the number of verifiers offline, deducting up to 7% of the stake money.

Imonline penalty formula

> // basically, 10% can be offline with no slash, but after that, it linearly climbs up to 7%
>
> // when 13/30 are offline (around 5% when 1/3 are offline).

Nominators will also bear the same percentage of loss as supported nodes. You can check the penalties related to “slashes” for details. The rewards obtained need to be withdrawn within 84 eras (i.e., 84 days). Otherwise, they will be destroyed.

ARES withdrawn to the Odyssey account can be mapped to ERC20/BEP20 ARES via a cross-chain bridge.

For more details, please see the Wiki:

[https://docs.aresprotocol.io/docs/zh-CN/odysseySlashAndWithdraw.](https://docs.aresprotocol.io/docs/zh-CN/odysseySlashAndWithdraw.)

