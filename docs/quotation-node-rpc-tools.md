---
id: quotationNodeRpcTools
title: Quotation node rpc tools
sidebar_label: Quotation node rpc tools
---
## Get the parameter setting value of the node warehouse.
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_getWarehouse"}' http://localhost:9933
```
* Response data
```text
{
	"jsonrpc": "2.0",
	"result": "http://api.aresprotocol.io",
	"id": 1
}
```

## Set the warehouse parameter of the current node.
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_setWarehouse", "params": ["https://api.aresprotocol.io"]}' http://localhost:9933
```
* Receiving null means successful setup
```text
{"jsonrpc":"2.0","result":null,"id":1}
```

## Get the current local XRay parameter value.
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_getXray"}' http://localhost:9933
```
* Response data
```text
{
	"jsonrpc": "2.0",
	"result": "0xFFFFXXX",
	"id": 1
}
```

## Try to return off-chain data through the http service.
```shell
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "ares_tryRequest"}' http://localhost:9933
```
* Response data of failed
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
* Response data of success
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

## Integrated scan
* Returns the complete debugging information of the node, including the role of the node, the status returned by the request and JSON format, etc.
* In most cases, run this command to understand the node situation.
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