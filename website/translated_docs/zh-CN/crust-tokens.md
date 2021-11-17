---
id: crustTokens
title: Crust Tokens
sidebar_label: Crust Tokens
---
报价功能
1. 数据源
   
   * 搭建数据源提供服务器，并通过链外rpc或启动命令配置数据源访问IP地址。
   * 数据源会缓存聚合多个交易所的价格数据。
   * 可设置交易价格在计算平均数时的权重。
   * 单次可请求多个交易所价格
   
2. 验证人提交价格
   
   * 启动验证人节点，并在启动命令中通`--warehouse=http://xxx.xxx.xxx`的参数提供报价的数据源地址。
   * 启动后如果要修改request-base可以通过“curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "offchain_localStorageSet", "params":["PERSISTENT", "0x746172652d6f63773a3a70726963655f726571756573745f646f6d61696e", "IP地址的16进制码"]}'”的形式进行注入修改。
   * 通过RPC的形式通过“author_insertKey”注入“ares”验证人私钥数据，该私钥需要与验证人“stash”保持一致。
   * 区块链验证人节点出块时会检查当前出块人的AccountId 是否与当前注入的“ares”账户一致，如果不一致将不允许价格提交。
   * 报价配置除了在创世配置中配置以外，还可以通过“request_propose”方式提交修改议案，由经技术委员会审批后进行链上升级。
   * 价格提交后会先进入“报价池 AresPrice”中进行存储，当报价池达到设定的最大深度时，开始输出该价格池的平均值到“AresAvgPrice”存储中。
   * 不同价格获取可以指定不同的获取频率，最快的频率是1表示每个区块提价都会获取该价格，该频率可以通过治理等方式在链上修改“RequestInterval”进行升级。
   * 验证人提交价格会受到报价偏移量的检测，如果偏移超过阈值，将不会参与平均值计算，另外会被纳入到abnormal列表中。

3. 验证人提交询问式报价价格
   
   * 验证人通过链下工作机检查是否有`询价请求`。
   * 一旦发现询价请求，则迅速获取价格并提交。
   * 当所有验证人均报价后则计算最终的均价并放到链上。
   * 如果有个别验证人无法提交报价，那么超过延迟区块的最终限定值后，会判断是否大于提交报价的门槛，如果大于则提交报价。
   * 如果因为验证人门槛数量不达标导致价格无法提交则会产生退费，退还问价人的费用。


4. 链上交易方法
   
   * 价格存储池深度治理方法 pool_depth_propose 参数： depth: u32 （报价数据最大容量）
   * 报价Token请求信息修改与添加的治理方法 request_propose 参数 price_key: Vec<u8> （请求标识）, request_url: Vec<u8> （解析标识）, parse_version: u32, （解析版本目前可用为2）fraction_num: FractionLength （精度u32）, request_interval: RequestInterval) （请求间隔u32）
   * 报价请求信息删除的治理方法 revoke_request_propose 参数 price_key: Vec<u8> （请求标识）
   * 价格上链的方法 submit_price_unsigned_with_signed_payload 需要提供验证人的签名数据。
   
5. 技术委员会
   
   * 新增报价 Token，通过 request_propose 提交草案。
   * 修改删除价格精度、解析标识，通过 request_propose、 revoke_request_propose 提交草案。
   * 修改价格池深度，通过 pool_depth_propose 提交草案。
   * 修改价格更新频率，通过 request_propose 提交同名请求Token数据实现。
   * 修改区间价格允许的最大偏移量值，通过 allowable_offset_propose 提交草案。
   * 更新价格偏差比例
   
6. 议会
   
   * **审核用户提交的挑战提案**
     * 验证者币价数据
     * 正确的价格数据
     * 用户支持的挑战费用
   * **审核完成**
     * 通过则惩罚验证人（扣除挑战费用的7倍），奖励挑战用户（奖励挑战费用的5倍）另外2份分别支付给议会和国库
     * 关注则惩罚用户，扣除用户费用给议会

7. 链上存储

  * AresPrice 存储报价信息
  * AresAvgPrice 存储平均价格
  * PricePoolDepth 存储价格池深度
  * PricesRequests 存储请求Token
  * RequestBaseOnchain 存储链上请求的 BaseKey 主要用于测试。
  * PriceAllowableOffset 存储在某个区间中，价格上链允许的偏移量。
  * AresAbnormalPrice 用于存储偏移值过大的报价数据池。
  * JumpBlockNumber 用来存储某个价格具体的跳块值的数据存储，主要作用是在 Arua 共识下防止同一验证人连续对某一价格报价。
  * LastPriceAuthor 用于记录某一价格最后更新的提交人，配合 JumpBlockNumber 完成跳块操作。
  * OcwControlSetting 让OCW的一些常规控制参数可以通过链上治理进行修改。
  * PriceAllowableOffset 价格允许的最大偏移百分比 0~100 取值
  * PurchasedAvgPrice 问价后生成的平均值数据。
  * PurchasedDefaultSetting 存储问价相关默认设置数据的存储结构，通过链上治理可以在线进行更新配置。
  * PurchasedOrderPool 用来存储已经提交问价报价订单的存储结构。
  * PurchasedPricePool 存储问价报价信息的存储结构。
  * PurchasedRequestPool 保存问价的请求池。
  

6. 事件
  
    * NewPrice 报价更新
    * RevokePriceRequest 删除币价 Token
    * AddPriceRequest 新增币价 Token
    * UpdatePriceRequest 币价Token 更新
    * PricePoolDepthUpdate 报价池深度更新
    * PriceAllowableOffsetUpdate 报价允许偏移量更新

    * PurchasedRequestWorkHasEnded 询价请求工作已经结束，一般来讲此时验证人节点提交报价过晚会产生此事件。 
    * NewPurchasedPrice 新的询问式报价更新。
    * NewPurchasedRequest 产生的新的询问式报价请求，需要关注这里面的第一个 Vec<u8> 这是 purchased_id 用于后期查询平均报价使用。
    * PurchasedAvgPrice 询问式平均价格更新，一旦该事件发生意味着该 purchased_id 对应的询问式报价工作结束。
    * UpdatePurchasedDefaultSetting 询问式报价统一配置数据更新。
    * UpdateOcwControlSetting OCW工作机统一参数配置更新。
    * InsufficientCountOfValidators 询问式价格最终验证判定为，验证人数量不足，造成平均价格无法正常提交。


7. 错误
   
    * UnknownAresPriceVersionNum 未知的价格解析版本，目前只支持版本2，也就是并集报价解析。
