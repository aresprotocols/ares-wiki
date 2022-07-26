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

获取当前 `Staking Pallet` 的 era

### near_era_change

```rust
fn near_era_change(period_multiple: BlockNumber) -> bool
```

用于确定 `era` 是否即将发生变化。

```text
period_multiple: 表示`era`变化前第几个session周期触发 `near_era_change`
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

获得旧验证人名单列表

### pending_npos

```rust
fn pending_npos() -> Vec<(Self::StashId, Option<AuthorityId>)>
```

获得新验证人名单列表（不包括旧的）

## 工作流程

### 适配器的执行

1. `Staking Config`的`ElectionProvider`需要设置为`staking_extend::elect::OnChainSequentialPhragmen`，`GenesisElectionProvider`需设置为`staking_extend::elect:OnChainSequentialPhragmenGenesis`。
2. `frame_election_provider_support::onchain::Config`的`DataProvider`需设置为`staking_extend::data::DataProvider`。
3. `pallet_election_provider_multi_phase::Config`的`DataProvider`需设置为`staking_extend::data::DataProvider<Self>`。 
4. 然后选举的请求将被发送到`staking_extend`。选举模块也将从`staking_extend`获得候选人名单，此时适配器就连接成功了。
5. 调用`pending_npos`方法以获得新当选的列表，然后通过`IAresOraclePreCheck::get_pre_check_status`判断验证人是否经过审计，如果是则让其参与选举。