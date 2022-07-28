---
id: odysseyValidateValidator
title: Odyssey Validate Validator
sidebar_label: Odyssey Validate Validator
---

## 运行验证人节点

![](assets/build/323.png)
![](assets/build/324.png)

进入Staking页面并点击Accounts这个标签页；选中您需要操作的账户，点击Validate，在弹出页面设置出块奖励的佣金比例(reward commission percentage)以及是否允许提名(allow new nominations)。
* 佣金比例(reward commission percentage)

设置出块奖励佣金百分比；例如10%，那么出块奖励中的10%是自己所得，剩余部分是按比例分配给到提名人。佣金设置建议不要过高，合适的佣金才能让更多人提名，从而在竞争中胜出成为验证人(出块节点)
* 是否允许提名(allow new nominations)

默认是允许提名。如果不允许提名，就只能单靠自己质押的金额与别人一起竞争。完成以上操作后，如果从竞选中胜出就可以参与出块了。

## 查询验证人审核情况

每个era（4小时）都会收集一次验证人节点的报价测试数据，等待中的验证人此时会提交一次审核。如果您的配置没有问题则在下次选举时成为验证人节点。若是Validators上限人数已满（如：24/24），则需要技术委员会成员提高Validators上限值（如：提升至26）。

其他则考虑自身的配置出现问题，可以在AresScan浏览器上查询验证人审核情况。

验证人审计页面

https://aresscan.aresprotocol.io/ares/onchain/validator

当您的验证人审计结果为「review」，您需要点击「unpass」按钮，查询您的host key所对应的未通过信息。

## 如何查询host key
### 使用CLI
````
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "offchain_localStorageGet", "params": ["PERSISTENT", "0x6172652d6f63773a3a6c6f63616c5f686f73745f6b6579"]}' http://localhost:9933
````

输出示例
````
{"jsonrpc":"2.0","result":"0xf9c395a5","id":1}
````
则0xf9c395a5，为您的host key。

### 使用docker
````
docker exec -it ares_odyssey bash -c "apt update && apt install -y curl && curl -H \"Content-Type: application/json\" -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"offchain_localStorageGet\", \"params\": [\"PERSISTENT\", \"0x6172652d6f63773a3a6c6f63616c5f686f73745f6b6579\"]}' http://localhost:9933"
````

输出示例
````
{"jsonrpc":"2.0","result":"0xf9c395a5","id":1}
````
则0xf9c395a5，为您的host key。


## 查询未通过原因
1. 「结果：验证人设置不匹配」

本地设置的验证人与链上设置的不匹配，建议用户重新设置Session Key。
2. 「结果：设置时间不超过1era」

本地设置Authority与链上匹配，但设置但时间不超过1era，请用户耐心等待系统提交数据。
3. 「结果：向项目方反馈数据」

本地设置Authority与链上匹配，设置时间超过1era，请用户向项目方反馈数据。

### 反馈数据示例
请反馈节点的完整调试信息，包括节点的角色、请求返回的状态和JSON格式等。在大多数情况下，运行这个命令来了解节点情况。

#### CLI
````
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_getInfos"}' http://localhost:9933
````
````
{
    "jsonrpc": "2.0",
    "result": {
        "node_role": "Authority",
        "request_body_checked": "Ok",
        "request_scheme_checked": "Ok",
        "request_status_checked": "Ok",
        "warehouse": "https://api.aresprotocol.io",
        "xray": 0xf9c395a5
    },
    "id": 1
}
````


#### 用docke
````
docker exec -it ares_odyssey bash -c "apt update && apt install -y curl && curl http://localhost:9933 -H \"Content-Type: application/json\" -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"ares_getInfos\"}'"
````



