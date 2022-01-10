---
id: StartTheWarehouseService
title: Start The Warehouse Service
sidebar_label: Start The Warehouse Service
---

## Build and Run


### Getting the source

Your can get the source from github, run

``` bash
 git clone https://github.com/aresprotocols/warehouse.git
```

### Building the source

Building project requires a go.

#### Install with ubuntu

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

#### Install with mac

```bash
brew install go
```

Once you install, then

```bash
cd price_server
go build
```

That's all

### Configuration

Before run, you should config your project. Using editor you like, such as

```bash
vim conf.toml
```

There is some config you need know.

> port = 5566 # server listen, default is 5566

> proxy = "http://127.0.0.1:7890/"   # your proxy ip and port, or

> proxy = "" # Not use proxy


> symbols = ["btc-usdt", "eth-usdt", "dot-usdt", "xrp-usdt"]  #Transaction pair you interesting

> [mysql] # add your mysql config in here,db mean database name, just use a name you like

### Configure mysql

Install mysql server and start.

#### Install with ubuntu

```bash
sudo apt update
sudo apt install mysql-server
```

#### Install with mac

```bash
brew install mysql
```

If version >= 8.0, config with:

```bash
mysql -u root -p
use mysql;
GRANT ALL ON *.* TO 'root'@'%';
flush privileges;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$yourpassword$' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '$yourpassword$';
FLUSH PRIVILEGES;
```

### Start

Run

```bash
./start.sh
```


## Docker Run

### Getting the source

Your can get the source from github, run

``` bash
 git clone https://github.com/aresprotocols/warehouse.git
```

### go to the deploy folder
``` bash
 cd warehouse/price_server/deploy
```

### Configuration

Copy env_example to .env
``` bash
 cp env_example .env
```

Modify the .env file and change your mysql password

> MYSQL_ROOT_PASSWORD='xxx'

If you want to modify others configs,you can follow section `Configuration` to modify the `configs/config.toml` file


### Up service
Use `docker-compose` to up service 
```bash
docker-compose up -d
```

### Down service
Use `docker-compose` to down service
```bash
docker-compose down
```