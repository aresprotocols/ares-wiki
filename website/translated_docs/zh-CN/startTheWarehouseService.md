---
id: StartTheWarehouseService
title: Start The Warehouse Service
sidebar_label: Start The Warehouse Service
---

## 编译和启动


### 获取源码

你可以从 github 中获取源码

``` bash
 git clone https://github.com/aresprotocols/warehouse.git
```

### 编译源码

编译源码需要go环境

#### 在Ubuntu中安装

```bash
## install
wget https://studygolang.com/dl/golang/go1.13.4.linux-amd64.tar.gz
tar xfz go1.13.4.linux-amd64.tar.gz -C /usr/local
## config
vim ~/.bashrc
export GOPATH=/usr/local/go
export PATH=$GOPATH/bin:$PATH
source ～/.bashrc
```

#### 在Mac中安装

```bash
brew install go
```

安装完成后，执行

```bash
cd price_server
go build
```

完成安装

### 配置

在你运行之前，你可以配置你的项目，选择你喜欢的编辑器，例如

```bash
vim conf.toml
```

以下是一些你可能需要了解的配置项

> port = 5566 # 服务器监听端口, 默认为：5566

> proxy = "http://127.0.0.1:7890/"   # 你的代理服务器地址和端口, 或者

> proxy = "" # 不使用代理


> symbols = ["btc-usdt", "eth-usdt", "dot-usdt", "xrp-usdt"]  #你感兴趣的交易对

> [mysql] # 添加你的mysql配置项

### 配置 mysql

安装mysql服务并启动.

#### 在ubuntu中安装

```bash
sudo apt update
sudo apt install mysql-server
```

#### 在mac中安装

```bash
brew install mysql
```

当mysql版本 >= 8.0, 还需要如下配置:

```bash
mysql -u root -p
use mysql;
GRANT ALL ON *.* TO 'root'@'%';
flush privileges;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$yourpassword$' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '$yourpassword$';
FLUSH PRIVILEGES;
```

### 启动

执行

```bash
./start.sh
```


## 通过Docker 启动

### 获取源码

你可以从 github 中获取源码

``` bash
 git clone https://github.com/aresprotocols/warehouse.git
```

### 进入deploy目录 
``` bash
 cd warehouse/price_server/deploy
```

### 配置

拷贝 env_example 文件为 .env
``` bash
 cp env_example .env
```

修改.env文件和设置你的mysql密码

> MYSQL_ROOT_PASSWORD='xxx'

如果你想修改其他配置,你可以参照 `Configuration`章节去修改 `configs/config.toml` 文件


### 启动服务
执行 `docker-compose` 启动服务
```bash
docker-compose up -d
```

### 关闭服务
执行 `docker-compose` 关闭服务
```bash
docker-compose down
```