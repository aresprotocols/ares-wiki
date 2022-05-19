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

获取当前era值，需要考虑到如果 era 长度发生变化，仍然可以保证 era 是可以正增长的。

### get_earliest_reward_era
```rust
fn get_earliest_reward_era() -> Option<EraIndex>
```

获取当前最早的奖励 era

### calculate_fee_of_ask_quantity
```rust
fn calculate_fee_of_ask_quantity(price_count: u32) -> BalanceOf<T>
```

输入一个price_count来计算购买的费用

* params

```text
price_count: 交易对数量
```

### reserve_for_ask_quantity
```rust
fn reserve_for_ask_quantity(
    who: T::AccountId,
    p_id: PurchaseId,
    price_count: u32
) -> OcwPaymentResult<BalanceOf<T>, PurchaseId>
```

保留一部分余额用于完成报价后的支付动作

* params
```text
who: 付款人账户id.
p_id: 支付订单id.
price_count: 预计请求的交易对儿的数量
```

### unreserve_ask

```rust
fn unreserve_ask(p_id: PurchaseId) -> Result<(), Error<T>>
```

释放为了购买付费报价而保留的资金。

```text
p_id: 支付的订单ID
```

### pay_to_ask
```rust
fn pay_to_ask(p_id: PurchaseId, agg_count: usize) -> Result<(), Error<T>>
```

执行支付，这会把保留支付的资金转移到 oracle-finance 的 pallet 账户中。

```text
p_id: 支付的订单ID
price_count: 实际完成报价对的数量
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

记录某个订单对应验证人的积分

```text
who: 一个验证人的ID
p_id: 支付订单ID
bn: 订单生成时的相应区块
ask_point: 一个U32数字，表示记录的积分值
```

### get_record_point
```rust
fn get_record_point(
    ask_era: u32,
    who: T::AccountId,
    p_id: PurchaseId
) -> Option<AskPointNum>
```

获取某个era下某个人某个订单的积分。

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

申领对应era下的奖励

```text
ask_era： era.
who: 验证节点ID.
```

### get_era_income
```rust
fn get_era_income(ask_era: EraIndex) -> BalanceOf<T>
```

获得一个`era`周期内的总收入

```text
ask_era： era.
```

### get_era_point

```rust
fn get_era_point(ask_era: EraIndex) -> AskPointNum
```

获取某个`era`的总点数。

```text
ask_era： era.
```

### check_and_slash_expired_rewards
```rust
fn check_and_slash_expired_rewards(ask_era: EraIndex) -> Option<BalanceOf<T>>
```

如果存在过期的未领取的奖励就将其销毁。（根据配置可能是转移到财务模块中。）

## Tx method ##

### take_purchase_reward

获取验证人某个era获得的奖励

注意: 一个 `era` 不能是当前未完成的 `era`，而且奖励不会被永久地储存。如果奖励超过了T::HistoryDepth所定义的深度，
你将无法领取。

需要调用者签名

Earliest reward Era = Current-Era - T::HistoryDepth

```text
ask_era: era
```

* take_purchase_reward的字段
```text
ask_era: EraIndex
```

### take_all_purchase_reward

帮助验证者获得所有可用的奖励

注意: 一个 `era` 不能是当前未完成的 `era`，而且奖励不会被永久地储存。如果奖励超过了T::HistoryDepth所定义的深度，
你将无法领取。

需要调用者签名

Earliest reward Era = Current-Era - T::HistoryDepth


## 工作流程


### 奖励生成

1. 付款需要调用`IForPrice Trait`提供的`reserve_for_ask_quantity`保留一部分问价人的资金，并且给其分配一个order-id
2. 通过`IForReporter Trait`提供的`record_submit_point`保存点数，需要传入一个区块高度，之后pallet会将其转换为对应era进行存储。
3. 在价格响应成功后，调用`pay_to_ask`来释放上面保留的余额，并向oracle-finance pallet支付实际的请求费。

### 提取奖励

1. 奖励是按era领取的，未完成的era不能获得奖励。你需要计算出与相应era的每个点对应的`单点奖金`。算法: 在每个era中，`单点奖励=era总收入/era总积分`
2. 验证者需要使用`controller`账户来执行提取操作，这是出于安全考虑。收到的总金额等于`验证人点数总和 * 单点奖励`。
3. 奖励通过`oracle-finance`Pallet发送到验证人的Stash账户中。

