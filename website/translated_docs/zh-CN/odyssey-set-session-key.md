---
id: odysseySetSessionKey
title: Set Session Keys
sidebar_label: Set Session Keys
---

## 设置Session Keys （二进制启动模式）

### 第一步：
````
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://localhost:9933
````

Output
````
{"jsonrpc":"2.0","result":"0x865cec2b50d8a16bff955c3f83501d7ed178a769f410c8557920964227cf55262be48db19f5ec8fc30706f68c7949768d9f9e943b5e4d019295b4da579618848b68b116b6e42dfd62162971efed83729f09582abd729b935a35dece66fb34615","id":1}
````
* 「result」即为你的「rotateKeys」，保存好它们，在设置「session key」里将会使用。


### 第二步：

![](assets/build/321.png)
![](assets/build/322.png)

进入Staking页面并点击Accounts这个标签页；选中你需要操作的账户，点击Change session keys，在弹出页面的输入框中粘贴第一步拿到的公钥，并点击Set Session Key按钮确认提交。




## 设置 Session Keys  （Docker启动模式）

### 第一步：
````
docker exec -it ares_odyssey bash -c "apt update && apt install -y curl && curl -X POST http://localhost:9933 -H 'Content-Type: application/json' -d '{\"id\":1, \"jsonrpc\":\"2.0\", \"method\": \"author_rotateKeys\"}'"
````

Output
````
{"jsonrpc":"2.0","result":"0x74ed2791ab818797bc4a2caa78b01180cc52a5e95c8cd5286d2642b671c3986d00a93e91eaedd838f275f4c49f1c9a9c2525f7f34577c556f02bc357eddaa4dbf28ab5102be4fa22b6b8115765d290de0c6c91f37a265acecdf3782746bff32b","id":1}
````
生成的结果用于在Odyssey上设置Session Key。


### 第二步：

![](assets/build/321.png)
![](assets/build/322.png)
进入Staking页面并点击Accounts这个标签页；选中你需要操作的账户，点击Change session keys，在弹出页面的输入框中粘贴第一步拿到的公钥，并点击Set Session Key按钮确认提交。
