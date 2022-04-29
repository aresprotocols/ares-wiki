---
id: quotationNodeRpcTools
title: Quotation node rpc tools
sidebar_label: Quotation node rpc tools
---
## 获取节点的 warehouse 参数设置
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_getWarehouse"}' http://localhost:9933
```
* 响应数据
```text
{
	"jsonrpc": "2.0",
	"result": "http://api.aresprotocol.io",
	"id": 1
}
```

## 给节点设置 warehouse 参数
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_setWarehouse", "params": ["https://api.aresprotocol.io"]}' http://localhost:9933
```
* 收到 null 表示设置成功
```text
{"jsonrpc":"2.0","result":null,"id":1}
```

## 获取节点的 XRay 参数设置
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_getXray"}' http://localhost:9933
```
* 响应数据
```text
{
	"jsonrpc": "2.0",
	"result": "0xFFFFXXX",
	"id": 1
}
```

## 尝试通过http服务返回链外数据
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_tryRequest"}' http://localhost:9933
```
* 失败的响应数据
```text
{
	"jsonrpc": "2.0",
	"error": {
		"code": 5002,
		"message": "Attempt to request a `Token` through `warehouse` request failed"
	},
	"id": 1
}
```
* 成功的响应数据
```text
{
	"jsonrpc": "2.0",
	"result": {
		"request_body": "{\"code\":0,\"message\":\"OK\",\"data\":{\"btcusdt\":{\"price\":38526.121667,\"timestamp\":1650875616,\"infos\":[{\"price\":38529.57,\"weight\":1,\"exchangeName\":\"binance\"},{\"price\":38526.63,\"weight\":1,\"exchangeName\":\"bitstamp\"},{\"price\":38525.8,\"weight\":1,\"exchangeName\":\"kucoin\"},{\"price\":38524.91,\"weight\":3,\"exchangeName\":\"coinbase\"}]},\"ethusdt\":{\"price\":2810.5175,\"timestamp\":1650875642,\"infos\":[{\"price\":2811,\"weight\":1,\"exchangeName\":\"bitfinex\"},{\"price\":2810.57,\"weight\":1,\"exchangeName\":\"huobi\"},{\"price\":2810.53,\"weight\":1,\"exchangeName\":\"binance\"},{\"price\":2809.97,\"weight\":1,\"exchangeName\":\"coinbase\"}]}}}",
		"request_scheme": "https",
		"request_status": "200 OK",
		"url_path": "/api/getBulkCurrencyPrices",
		"url_query": "currency=usdt&symbol=btc_eth"
	},
	"id": 1
}
```

## 集成扫描
* 返回节点的完整调试信息，包括节点的角色、请求返回的状态和JSON格式等。
* 在大多数情况下，运行这个命令来了解节点情况。
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_getInfos"}' http://localhost:9933
```
*
```text
{
	"jsonrpc": "2.0",
	"result": {
		"node_role": "Authority",
		"request_body_checked": "Ok",
		"request_scheme_checked": "Ok",
		"request_status_checked": "Ok",
		"warehouse": "https://api.aresprotocol.io",
		"xray": null
	},
	"id": 1
}
```