---
id: odysseyNominatorCheckPenaltiesAndWithdrawAssets
title: Check penalties & withdraw assets
sidebar_label: Check penalties & withdraw assets
---
需要提醒的是提名人在选择节点进行提名时，不能只考虑收益情况，也需要根据「points」节点的运行情况，选择平稳运行的节点进行提名。节点的掉线，也会使提名人损失同等比例的质押金。

## **验证人惩罚**

被举报验证人受到惩罚，会计算一个slash的分数，用于对验证人进行惩罚，这个分数通过Imonline模块计算获得，当验证人掉线人数的在10%内，没有惩罚；超过10% 会有惩罚，惩罚会根据验证人离线的数量线性增长，扣除最多不超过7%的质押金。

Imonline惩罚公式

> // basically, 10% can be offline with no slash, but after that, it linearly climbs up to 7%  
>
> // when 13/30 are offline (around 5% when 1/3 are offline).

提名人也会与支持的节点承担同等比例的损失。具体可以查看「slashes」相关的惩罚情况。获取的奖励，需要在84 eras（即84天）内提取，否则将会销毁。

提取至Odyssey账户的ARES，可以通过跨链桥映射为 ERC20/BEP20 ARES。

详情请见Wiki：https://docs.aresprotocol.io/docs/zh-CN/odysseySlashAndWithdraw