---
id: apis
title: JSON-RPC APIS
sidebar_label: JSON-RPC APIS
---

## 配置

interval 取价格间隔，单位为秒

port 监听端口号

insertInterval 数据插入数据库的间隔，单位为interval次数

maxMemTime 内存最大保留时间，单位为秒

pageSize 每页返回条数

retryCount http请求出错的请求次数

user  特定接口访问需要的用户名

password 特定接口访问需要的密码

proxy 代理设置

symbols 需要请求的交易对

[mysql] mysql相关配置

[exchange] 交易所相关配置



## 接口功能

 getprice 获取交易所相关交易对价格

 url = baseurl + symbol + exchange

 example:

 url = http://127.0.0.1:5566/api/getprice/btcusdt/huobi

 baseurl = http://127.0.0.1:5566/api/getprice

 symbol = btcusdt

 exchange = huobi

 返回值结构 :

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data    type PRICE_INFO struct {

    	 Price     float64 `json:"price"`

 ​    	Timestamp int64   `json:"timestamp"`

 ​	} `json:"data"`

 }  



  getPartyPrice 获取交易对聚合后价格

 聚合:多个交易所相同时间段排序后去掉两端价格，剩余价格按权重算出

 price = (p1 * w1 + p2 * w2 + p3 * w3)/(w1 + w2 + w3)

 url = baseurl + symbol

 url = http://127.0.0.1:5566/api/getPartyPrice/btcusdt

 baseurl = http://127.0.0.1:5566/api/getPartyPrice

 symbol = btcusdt

 返回值结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data    type PartyPriceInfo struct {

 ​    Price     float64      `json:"price"`

 ​    Timestamp int64        `json:"timestamp"`

 ​    Infos     []type WeightInfo struct {

    	 Price        float64 `json:"price"`

 ​	    Weight       int64   `json:"weight"`

 ​	    ExchangeName string  `json:"exchangeName"`

 ​		} `json:"infos"`

    } `json:"data"`

 }  

 getPriceAll 获取当前配置的所有交易所价格，不排除两端价格

 url = baseurl + symbol

 url = http://127.0.0.1:5566/api/getPriceAll/btcusdt

 baseurl = http://127.0.0.1:5566/api/getPriceAll

 symbol = btcusdt

 返回值结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data    []type PriceAllInfo struct {

    	 Name      string  `json:"name"`

    	 Symbol    string  `json:"symbol"`

    	 Price     float64 `json:"price"`

    	 Timestamp int64   `json:"timestamp"`

 ​		}`json:"data"`

 }  



  getHistoryPrice 获取代币历史价格，按照入参向前取最近，如价格不在缓存则取数据库保存价格

 url = baseurl + symbol + queryparam

 url = http://127.0.0.1:5566/api/getHistoryPrice/btcusdt?timestamp=1629341127

 baseurl = http://127.0.0.1:5566/api/getHistoryPrice

 symbol = btcusdt

 queryparam = timestamp=1629341127

 返回结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   type PartyPriceInfo struct {

 ​    Price     float64      `json:"price"`

 ​    Timestamp int64        `json:"timestamp"`

 ​    Infos     []type WeightInfo struct {

 ​	    Price        float64 `json:"price"`

 ​	    Weight       int64   `json:"weight"`

   	  ExchangeName string  `json:"exchangeName"`

 ​		} `json:"infos"`

 ​	}`json:"data"`

 }  



 getBulkPrices  根据传入的多个交易对参数，聚合最新价格后返回

 url = baseurl + symbol

 url = http://127.0.0.1:5566/api/getBulkPrices?symbol=btcusdt_ethusdt

 baseurl =  http://127.0.0.1:5566/api/getBulkPrices

 symbol = btcusdt_ethusdt

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   map[string]type PRICE_INFO struct {

 ​    Price     float64 `json:"price"`

 ​    Timestamp int64   `json:"timestamp"`

 ​	} json:"data"

 }  



 getReqConfig 获取各个币种向各个交易所请求的配置

 url = baseurl

 url = http://127.0.0.1:5566/api/getReqConfig

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   map[ string ][]type EXCHANGE_WEIGHT_INFO struct {

 ​        Exchange string `json:"exchange"`

 ​        Weight   int64  `json:"weight"`

 ​    } json:"data"

 }  

 getRequestInfo 获取服务器的请求应答日志，需传入配置的用户名密码，按照入参分页返回请求应答记录

 http://127.0.0.1:5566/api/getRequestInfo?index=0&user=root&password=49ba59abbe56e057

 (该接口目前暂无使用需求)



 getRequestInfoBySymbol  根据代币符号获取服务器的请求应答日志，需传入配置的用户名密码，按照入参分页返回请求应答记录

 url = baseurl + queryparam

 url = http://127.0.0.1:5566/api/getRequestInfoBySymbol?index=0&user=root&password=49ba59abbe56e057&symbol=btcusdt

 baseurl = http://127.0.0.1:5566/api/getRequestInfoBySymbol

 queryparam = index=0&user=root&password=49ba59abbe56e057&symbol=btcusdt

 返回结构：

 见README，不同结构的返回结构不同



 getHttpErrorInfo  获取网络请求错误记录

 url = baseurl + queryparam

 url =  http://127.0.0.1:5566/api/getHttpErrorInfo?index=0

 queryparam = index=0

 返回结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   type HTTP_ERROR_INFOS struct {

 ​    Infos []type HTTP_ERROR_INFO struct {

 ​    Url       string `db:"url" json:"url"`

 ​    Symbol    string `db:"symbol" json:"symbol"`

 ​    Error     string `db:"error" json:"error"`

 ​    Timestamp int64  `db:"timestamp" jsoon:"timestamp"`

 } `json:"infos"`

 } json:"data"

 }  



  getLocalPrices  获取服务器已经请求到的交易所价格，按照入参分页返回

 url = baseurl + queryparam

 url = http://127.0.0.1:5566/api/getLocalPrices?index=0&symbol=btcusdt

 baseurl = http://127.0.0.1:5566/api/getLocalPrices

 queryparam = index=0&symbol=btcusdt

 返回结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   type struct {

 ​		type PriceInfosCache struct {

 ​		    PriceInfosCache []type PriceInfos struct {

  				   PriceInfos []type PriceInfo struct {

  					   Symbol      string  `db:"symbol"`

   					  Price       float64 `db:"price"`

   				 	PriceOrigin string  `db:"price_origin"`

  						Weight      int64   `db:"weight"`

    				 TimeStamp   int64   `db:"timestamp"`

 ​				}

 ​			}

 ​		}

 ​    } json:"data"

 }  



 setWeight 设置交易所某交易对权重

 url = baseurl + queryparam

 url = http://127.0.0.1:5566/api/setWeight?exchange=coinbase&symbol=btc-usdt&weight=3

 baseurl = http://127.0.0.1:5566/api/setWeight

 queryparam = exchange=coinbase&symbol=btc-usdt&weight=3

 返回结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   type struct {

 ​    } json:"data"

 }  



 getAresAll 获取ares相关信息，包括价格，涨跌幅，交易量等

 url = baseurl

 url = http://127.0.0.1:5566/api/getAresAll

 返回结构:

 type RESPONSE struct {

 ​    Code    int         `json:"code"`

 ​    Message string      `json:"message"`

 ​    Data   type AresShowInfo struct {

 ​    Price         float64 `json:"price"`

 ​    PercentChange float64 `json:"percent_change"`

 ​    Rank          int     `json:"rank"`

 ​    MarketCap     float64 `json:"market_cap"`

 ​    Volume        float64 `json:"volume"`

 } json:"data"

 }  

