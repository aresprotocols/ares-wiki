---
id: aresOracleProviderSupport
title: Ares Oracle Provider Support
sidebar_label: Ares Oracle Provider Support
---

## Methods

### has_pre_check_task

```rust
fn has_pre_check_task (stash: AccountId) -> bool
```
确定是否有通过储藏室账户对验证人进行预检的任务。

### get_pre_task_by_authority_set
```rust
fn get_pre_task_by_authority_set(
    auth_list: Vec<AuthorityId>
) -> Option<(AccountId, AuthorityId, BlockNumber)>
```
获取与某个ares-authority集合相关的预检查信息，具体匹配的authority-id、account-id和任务提交的块。

预先检查只匹配第一个ares-authority的任务

### check_and_clean_obsolete_task
```rust
fn check_and_clean_obsolete_task(maximum_due: BlockNumber) -> Weight
```
在一个特定的周期内触发这个方法，以清理太旧的和已通过的任务

### take_price_for_pre_check
```rust
fn take_price_for_pre_check(check_config: PreCheckTaskConfig) -> PreCheckList
```

根据check_config指定的交易对获得PreCheckList结果数据

### save_pre_check_result
```rust
fn save_pre_check_result(
    stash: AccountId,
    bn: BlockNumber,
    pre_check_list: PreCheckList
) -> PreCheckStatus
```
将根据PreCheckList的结果验证链上的数据，并将PreCheckStatus作为结果返回。

### get_pre_check_status
```rust
fn get_pre_check_status(
    stash: AccountId
) -> Option<(BlockNumber, PreCheckStatus)>
```
获取一个验证器所存储的预检查状态，这个状态将影响它是否会被添加到验证器列表中。

### clean_pre_check_status
```rust
fn clean_pre_check_status(stash: AccountId)
```
删除验证器存储的预检状态

### create_pre_check_task
```rust
fn create_pre_check_task(
    stash: AccountId,
    auth: AuthorityId,
    bn: BlockNumber
) -> bool
```
创建一个预检查任务，如果创建成功则返回true，否则返回false

## 工作流程

### KeyTypeId of Ares
1. 将`scrypto`模块提供的`sr25519 AuthorityId`的定义配置到`ares-oracle::AuthorityAres`中
2. 如果会话被启用，`ares-oracle`需要被配置到SessionKey中。

### 预审任务流程
1. 使用`has_pre_check_task`来确定一个验证器是否有预检查任务。
2. 如果有预审任务，通过`take_price_for_pre_check`获得相应的价格响应
3. 通过`save_pre_check_result`检查并保存结果数据。返回的结果包括`PreCheckStatus::Prohibit`和`PreCheckStatus::Pass`。
4. 将块的高度传递给`check_and_clean_obsolete_task`函数，以删除过时的预检任务和预检结果，防止过度膨胀。
