---
id: stakingExtend
title: Staking Extend
sidebar_label: Staking Extend
---


## Methods

### current_staking_era

```rust
fn current_staking_era() -> u32
```
获取当前抵押Pallet的era

### near_era_change

```rust
fn near_era_change(period_multiple: BlockNumber) -> bool
```
用于确定是否即将发生era变化。
```text
period_multiple: 表示轮换era前的触发预检查时段

```

### calculate_near_era_change

```rust
fn calculate_near_era_change(
    period_multiple: BlockNumber,
    current_bn: BlockNumber,
    session_length: BlockNumber,
    per_era: BlockNumber
) -> bool
```

### old_npos

```rust
fn old_npos() -> Vec<Self::StashId>
```
获得选举前的验证人名单

### pending_npos

```rust
fn pending_npos() -> Vec<(Self::StashId, Option<AuthorityId>)>
```

获取当前选举后的新验证者列表，不包括上届的验证者。

## 工作流程

### 适配器的执行

1. `Staking Config`的`ElectionProvider`被设置为`staking_extend::elect::OnChainSequentialPhragmen`。 `GenesisElectionProvider`被设置为`staking_extend::elect:OnChainSequentialPhragmenGenesis`。
2. `frame_election_provider_support::onchain::Config`的`DataProvider`被设置为`staking_extend::data::DataProvider`。
3. `pallet_election_provider_multi_phase::Config`的`DataProvider`被设置为`staking_extend::data::DataProvider<Self>`。 
4. 然后竞选请求将被发送到`staking_extend`。然后，选举模块也将从`staking_extend`获得候选人名单。适配器连接就成功了。
5. 调用`pending_npos`方法以获得新当选的列表。然后与`IAresOraclePreCheck::get_pre_check_status`特质的实现合作，阻止新当选的验证器。