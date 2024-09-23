# 在Ubuntu中配置go 环境

## 1.下载go并安装

https://go.dev/dl/go1.21.5.linux-amd64.tar.gz

解压go安装包到`/usr/local`目录下

```bash
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz
```

## 2.配置环境变量：

我喜欢用bashrc配置环境变量，因为配置在bashrc会开机自启，而profile每次需要手动启用

```bash
sudo vim ~/.bashrc
```

在vim模式下导入环境变量

```bash
export PATH=$PATH:/usr/local/go/bin
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
```

`:wq`推出vim，并更新配置

```bash
source ~/.bashrc
```

## 3.验证安装

```bash
go version
```

