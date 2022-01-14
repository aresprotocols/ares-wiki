---
id: programInstallation
title: Program Installation
sidebar_label: Program Installation
---

**程序安装**

**方法一：Docker运行节点程序**

1.拉取程序最新镜像
```
docker pull aresprotocollab/ares_gladios:latest
```

2.打开命令行工具，运行命令执行节点程序
```
docker run -d --name ares_gladios aresprotocollab/ares_gladios:latest gladios-node --name your-name --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
```
*your-name请以Ares_TelegramUsername_bsc地址的方式填写。请如实填写，方便进行奖励计算与发放。

如：name Ares_Emily0626（节点tg群username）_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（BSC地址）。

以上命令中：aresprotocollab/ares_gladios:latest可以换成不同的版本如：aresprotocollab/ares_gladios:alpha；更加多版本请查看：https://hub.docker.com/r/aresprotocollab/ares_gladios/tags

3.查看程序运行日志
```
docker logs -f ares_gladios -n 1000
```

4.停止并删除节点程序
```
docker stop ares_gladios
docker rm ares_gladios
```

**方法二：下载节点执行程序**

下载节点的二进制执行程序：
下载地址：gladios-node-linux-amd64-1.1.2-39df776

1.可执行的 gladios-node 二进制文件
```
wget -c https://github.com/aresprotocols/ares/releases/download/v1.1.2/gladios-node-linux-amd64-1.1.2-39df776
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/e8715565be4f4838ae518c9ea550990c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQXJlcyBQcm90b2NvbOaKgOacr-ekvuWMug==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


2.添加执行权限
```
chmod +777 gladios-node-linux-amd64-1.1.2-39df776
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2c2d12143438453e8dbda93b6bcf326a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQXJlcyBQcm90b2NvbOaKgOacr-ekvuWMug==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


3.执行节点
```
./gladios-node-linux-amd64-1.1.2-39df776 --base-path data --name your-name --chain gladios --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'
```

*your-name请以Ares_TelegramUsername_bsc地址的方式填写。请如实填写，方便进行奖励计算与发放。如：name Ares_Emily0626（节点tg群username）_0xA86ed7899330DF48316E2A2842D5aD13F031Ab11（BSC地址）。

![在这里插入图片描述](https://img-blog.csdnimg.cn/8fbf4975ca9b496693efe321990be82d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQXJlcyBQcm90b2NvbOaKgOacr-ekvuWMug==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)



**方法三：源码编译**

1.安装Rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

2.安装依赖库
```
sudo apt install make clang pkg-config libssl-dev build-essential
```

3.下载Ares代码
```
git clone https://github.com/aresprotocols/ares.git
```
4.切换到release1.0.1分支
```
git checkout release1.0.1
```

5.编译源码
```
cargo build --releaseNote if you run into compile errors, you may have to switch to a less recent nightly. This can be done by running:rustup install nightly-2021-06-09rustup target add wasm32-unknown-unknown --toolchain nightly-2021-06-09cargo +nightly-2021-06-09 build --release
```
