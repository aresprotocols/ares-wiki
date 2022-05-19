---
id: oracleFinance
title: Oracle Finance
sidebar_label: Oracle Finance
---


## Methods

### current_era_num
```rust
fn current_era_num() -> EraIndex
```
为了得到当前的era，你需要考虑，如果era长度发生变化，你仍然需要保证时区的矢量增加

### get_earliest_reward_era
```rust
fn get_earliest_reward_era() -> Option<EraIndex>
```
获得最早的奖励era

### calculate_fee_of_ask_quantity
```rust
fn calculate_fee_of_ask_quantity(price_count: u32) -> BalanceOf<T>
```
输入一个price_count来计算购买的费用

* params
```text
price_count: 预期的交易对总数
```

### reserve_for_ask_quantity
```rust
fn reserve_for_ask_quantity(
    who: T::AccountId,
    p_id: PurchaseId,
    price_count: u32
) -> OcwPaymentResult<BalanceOf<T>, PurchaseId>
```
保留余额用于支付

* params
```text
who: 源账户id.
p_id: 支付订单id.
price_count: 预期的交易对总数
```

### unreserve_ask
```rust
fn unreserve_ask(p_id: PurchaseId) -> Result<(), Error<T>>
```

释放为购买保留的资金，在询问价格失败之后。

```text
p_id: 支付的订单ID
```

### pay_to_ask
```rust
fn pay_to_ask(p_id: PurchaseId, agg_count: usize) -> Result<(), Error<T>>
```
执行支付，这将把用户的余额转移到Pallet上。

```text
p_id: 支付的订单ID
price_count: 实际交易对总数的计数
```

### record_submit_point
```rust
fn record_submit_point(
    who: T::AccountId,
    p_id: PurchaseId,
    bn: T::BlockNumber,
    ask_point: AskPointNum
) -> Result<(), Error<T>>
```

记录一个订单下验证人的积分

```text
who: 一个验证人的ID
p_id: 支付订单ID
bn: 订单生成时的相应区块
ask_point: 一个U32数字
```

### get_record_point
```rust
fn get_record_point(
    ask_era: u32,
    who: T::AccountId,
    p_id: PurchaseId
) -> Option<AskPointNum>
```

获取记录的积分

```text
ask_era：收益的era
who: 一个验证节点
p_id: 支付的订单ID
```

### take_reward
```rust
fn take_reward(
    ask_era: EraIndex,
    who: T::AccountId
) -> Result<BalanceOf<T>, Error<T>>
```

在一个特定的era下申请所有的奖励

```text
ask_era： era.
who: 验证节点ID.
```

### get_era_income
```rust
fn get_era_income(ask_era: EraIndex) -> BalanceOf<T>
```

获得一个era的总收入

```text
ask_era： era.
```

### get_era_point
```rust
fn get_era_point(ask_era: EraIndex) -> AskPointNum
```
获取一个era的总余额

```text
ask_era： era.
```

### check_and_slash_expired_rewards
```rust
fn check_and_slash_expired_rewards(ask_era: EraIndex) -> Option<BalanceOf<T>>
```
检查过期的奖励，如果过期就销毁

## Tx method ##

### take_purchase_reward

验证人在某个era获得的奖励

注意: 一个era不能是当前未完成的era，而且奖励不会被永久地储存。如果奖励超过了T::HistoryDepth所定义的深度，你将无法获取它。

这个调用的调度源必须签名

Earliest reward Era = Current-Era - T::HistoryDepth

```text
ask_era: era
```

* take_purchase_reward的字段
```text
ask_era: EraIndex
```

### take_all_purchase_reward

验证者获得奖励，它将帮助验证者获得所有可用的奖励

注意: 一个era不能是当前未完成的era，而且奖励不会被永久地储存。如果奖励超过了T::HistoryDepth所定义的深度，你将无法获取它。

这个调用的调度源必须签名

Earliest reward Era = Current-Era - T::HistoryDepth


## 工作流程


### 存款奖励

1. 支付是通过`IForPrice`提供的`Trait`。有必要调用`reserve_for_ask_quantity`来保留要价人的部分余额，并将其与订单ID相关联

2. 通过`IForReporter`提供的`Trait`实现，调用`record_submit_point`来保存该点。块的高度需要被传入，Pallet将把它转换为相应的era，并记录在一个订单ID下。

3. 在价格响应成功后，调用`pay_to_ask`来释放上面保留的余额，并向oracle-finance pallet支付实际的请求费。

### 提取奖励

1. 奖励是按era领的，未完成的era不能获得奖励。你需要计算出与相应era的每个点对应的`余额`。算法: `单点奖励=总收入/总积分 ` 在一个era内。
2. 验证者需要使用`控制者`账户来执行提取操作，这是出于安全考虑。收到的总金额等于`验证人积分 *单点奖励`。
3. 奖励通过`oracle-finance` Pallet转移到验证者的Stash账户。

