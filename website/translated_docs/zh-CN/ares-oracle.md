---
id: aresOracle
title: Ares Oracle
sidebar_label: Ares Oracle
---

## Tx 方法 ##
### submit_local_xray
一个离线方法，将验证器节点的本地公开数据提交并保存到链上用于调试。

这个调用的调度源必须是None。

```text
host_key: 一个节点的随机u32
request_domain: 节点当前设置的仓库参数
authority_list: 本地存储的ares-authority公钥列表
network_is_validator: 是否是验证节点
```
* submit_local_xray的字段
```text
host_key: u32
request_domain: RequestBaseVecU8
authority_list: AuthorityAresVec<T>
network_is_validator: bool
```

### submit_ask_price

提交一个ares-price请求，该请求由所有在线验证器处理，并立即返回汇总的结果。

该调用的调度来源必须是签名。
```text
max_fee: 发送人接受的最高要价。
request_keys: 交易对的列表，如果有多个交易对，用逗号隔开，如：eth-usdt，dot-sudt等。
```
* submit_ask_price的字段
```text
max_fee: BalanceOf<T>
request_keys: Vec<u8>
```

### submit_forced_clear_purchased_price_payload_signed
一个离线方法，提交并保存购买结果数据。如果由purchase-id提交的验证器的数量已经达到阈值要求，那么平均价格将被汇总并标记为PURCHASED_FINAL_TYPE_IS_PARTICIPATE

这个调用的调度源必须是None

```text
– price_payload: 提交的数据
```

* submit_forced_clear_purchased_price_payload_signed的字段
```text
price_payload: PurchasedForceCleanPayload<T::Public, T::BlockNumber, T::AuthorityAres>
signature: OffchainSignature<T>
```

### submit_purchased_price_unsigned_with_signed_payload
一个离线方法，提交并保存购买结果数据。如果所有验证者都提交价格结果，那么平均价格将被汇总，并标记为PURCHASED_FINAL_TYPE_IS_ALL_PARTICIPATE。

这个调用的调度源必须是None
```text
– price_payload: 提交的数据
```

* submit_purchased_price_unsigned_with_signed_payload的字段
```text
price_payload: PurchasedPricePayload<T::Public, T::BlockNumber, T::AuthorityAres>
signature: OffchainSignature<T>
```

### submit_price_unsigned_with_signed_payload
一种离线方法，提交并保存免费的ares-price结果

这个调用的调度源必须是None
```text
price_payload: 要上传的Ares-price数据
```
* submit_price_unsigned_with_signed_payload的字段
```text
price_payload: PricePayload<T::Public, T::BlockNumber, T::AuthorityAres>
signature: OffchainSignature<T>
```

### submit_create_pre_check_task

提交一个预检查任务。当一个新的验证人被选出时，在特定的时期内，将通过这个方法提交一个pre_check_task任务。

该任务用于确保验证节点的ares-price响应功能可以正常使用。

这个调用的调度源必须是None
```text
precheck_payload: 预先检查任务数据，包括验证人和他们的授权账户数据。
```
* submit_create_pre_check_task的字段
```text
precheck_payload: PreCheckPayload<T::Public, T::BlockNumber, T::AccountId, T::AuthorityAres>
signature: OffchainSignature<T>
```
### submit_offchain_pre_check_result
当验证人对pre-check任务作出回应时，pre-check结果数据就会提交给链。如果被批准，它将在下一个选举周期通过，而不是立即通过。

这个调用的调度源必须是None
```text
preresult_payload: 审查响应结果数据，这将在链上进行比较
```
* submit_offchain_pre_check_result的字段
```text
preresult_payload: PreCheckResultPayload<T::Public, T::BlockNumber, T::AccountId, T::AuthorityAres>
signature: OffchainSignature<T>
```

### submit_offchain_http_err_trace_result
当链外http请求出现错误时，错误数据将通过这个请求提交到链上。

这个调用的调度源必须是None
```text
err_payload: Http错误数据.
```
* submit_offchain_http_err_trace_result的字段
```text
err_payload: HttpErrTracePayload<T::Public, T::BlockNumber, T::AuthorityAres, T::AccountId>
signature: OffchainSignature<T>
```

### update_purchased_param
更新与采购有关的参数设置需要技术委员会的签字才能执行。

这个调用的调度源必须是技术委员会的签名。
```text
submit_threshold: 聚合的阈值(百分比)
max_duration: 等待全节点响应的最大延迟
avg_keep_duration: 保存汇总结果的最大长度
```
* update_purchased_param的字段
```text
submit_threshold: Percent
max_duration: u64
avg_keep_duration: u64
```

### update_ocw_control_setting
更新Ares-oracle的控制参数

这个调用的调度源必须是技术委员会的签名。

```text
need_verifier_check: 是否启动验证器检查程序
open_free_price_reporter: 是否启用了免费价格模式
open_paid_price_reporter: 是否启用了问价模式
```

* update_ocw_control_setting的字段
```text
need_verifier_check: bool
open_free_price_reporter: bool
open_paid_price_reporter: bool
```

### revoke_update_request_propose
撤销请求令牌列表上的密钥对。

这个调用的调度源必须是技术委员会的签名。
```text
price_key: 一个价格对，如btc-usdt
```

* revoke_update_request_propose的字段
```text
price_key: Vec<u8>
```
### update_request_propose
修改或添加一个价格对到请求列表。

这个调用的调度源必须是技术委员会的签名。
```text
price_key: 一个价格对，如btc-usdt
price_token: 一个价格代币，如btc
parse_version: 解析版本，目前只支持参数2。
fraction_num: 解析数字时的分数
request_interval: 验证者在链上提交价格的时间间隔
```

* update_request_propose的字段
```text
price_key: Vec<u8>
price_token: Vec<u8>
parse_version: u32
fraction_num: FractionLength
request_interval: RequestInterval
```

### update_allowable_offset_propose
更新允许偏移参数的值，以确定提交价格的异常范围

这个调用的调度源必须是技术委员会的签名。
```text
offset: 一个百分比值
```
* update_allowable_offset_propose的字段
```text
offset: Percent
```

### update_pool_depth_propose
更新价格池的深度。当价格池达到最大值时，平均价格将被汇总并放在链上。

这个调用的调度源必须是技术委员会的签名。
```text
depth: 深度
```
* update_pool_depth_propose的字段
```text
depth: u32
```

### update_pre_check_token_list
更新用于检查验证器价格功能的预选交易对列表

这个调用的调度源必须是技术委员会的签名。
```text
token_list: 交易对列表
```

* update_pre_check_token_list的字段
```text
token_list: TokenList
```

### update_pre_check_session_multi
session-multi表示轮换era前的触发预检查时段

这个调用的调度源必须是技术委员会的签名。

```text
multi: integer
```

* update_pre_check_session_multi的字段
```text
multi: T::BlockNumber
```

### update_pre_check_allowable_offset
验证时允许预检的最大偏移量

这个调用的调度源必须是技术委员会的签名。

```text
offset: 百分比
```

* update_pre_check_allowable_offset的字段
```text
offset: Percent
```

## 工作流程

### 验证人审计
1. Ares-oracle通过IStakingNpos::pending_npos特质获得新选出的验证器，并通过submit_create_pre_check_task交易将预检查任务提交给链。
2. 使用`IStakingNpos::near_era_change`特质来确定是否已达到接近选举的会话期，如果是，则通过`submit_offchain_pre_check_result`交易向链提交新的验证任务。
3. 没有通过审查的验证人将不会出现在选举对象的名单中。

### 免费交易价格
1. 当offchain工作时，将根据`authorship`提供的数据获得当前区块的作者。
2. 如果区块作者对应的 `authority-id `与本地 `keystore `一致，获得区块对应的 `交易对`列表，并发送http请求以获得其价格，然后调用 "submit_price_unsigned_with_signed_payload "交易，将结果上传至链。
3. 链将验证提交的内容是否与当前区块的区块作者相匹配，如果是，结果将被存储在`价格`池中。 
4. 当 `价格`池达到指定的深度（这个深度可以通过交易 `update_pool_depth_propose` 修改）。平均价格聚集事件`Event::AggregatedPrice`发生，这将产生一个平均价格给链。
5. 与 "trade pairs "相关的价格可以通过 "aresOracle.aresAvgPrice"存储读取。

### 付费的交易价格
1. 用户可以提交一个`submit_ask_price`交易，让链上的所有节点进行报价。但这需要支付一些费用，这比免费获得价格更有时效性。
2. 如果成功提交任务，你需要从`Event::NewPurchasedRequest`事件中获得`purchase_id`。这将被用作其他查询的相关键值。支付的金额与`交易对`请求的数量有关。如果参与响应的节点少于响应阈值。任务将失败，费用将不会被扣除。(这个阈值可以通过交易`update_purchased_param`修改）。
3. 一旦价格被成功汇总，将产生一个`Event::PurchasedAvgPrice`事件。并且相关的费用将从 "源 "账户中扣除。用户也可以通过`aresOracle.purchedAvgPrice`存储读取相应的结果数据。

### 出块人提交验证
1. 当`offchain_worker`被执行时，它将获得当前区块的作者，如果其对应的`ares-authority`在本地`keystore`存在。它将获得提交价格的权利。
2. 价格提交后，`validate_unsigned`方法将确认作者在验证器集合中。
3. 通过Runtime的`apply_extrinsic`和`validate_transaction`中的`AresOracleFilter`完成第三次验证。这一点非常重要，如果没有这一层检查，可能会在分叉过程中产生多余的提交，或者无法避免旧块攻击。
