# blueprint依赖项安装

## 1.官方说明

## **Installation Instructions**

To install Blueprint, you only need a brief set of dependencies that are highlighted below.

**Note**: Python and Pip refer to Python3 and Pip3 respectively. Blueprint expects that the command `python` points to a python3 installation.

### **Dependencies**

- Go version >= 1.18
- Python version >=3.8
- Thrift: [install](https://thrift.apache.org/docs/install/debian.html), [download](https://thrift.apache.org/download)
- Grpc for go: [instructions](https://grpc.io/docs/languages/go/quickstart/)
- Kompose: [install](https://kompose.io/)

To download the go dependencies, please execute the following commands

```plaintext
go mod tidy
go mod download
```

In addition, you need some python libraries which can be downloaded using the following commands

```plaintext
pip install astunparse
```

To deploy applications, you will need to install `docker` and `docker-compose` on all the machines you intend to deploy the services on. Note that for newer docker versions, `compose` is a built-in command does not require additional instructions. If using newer versions of docker, replace occurrences of `docker-compose` in the following with `docker compose`.

## 2. go安装

请看[go安装教程](./go环境配置(linux).md)

## 3.Python安装

Ubuntu中已集成python3

## 4.Thrift安装

1. **安装依赖项：** 在开始之前，确保系统已安装了编译工具和其他必要的依赖项，以便编译和构建 Thrift。在 Ubuntu 上，可以使用以下命令安装这些依赖项：

   ```bash
   sudo apt-get update
   sudo apt-get install -y automake bison flex g++ git libboost-all-dev libevent-dev libssl-dev libtool make pkg-config
   ```

2. **下载和构建 Thrift：** 下载 Thrift 的源代码，并构建安装。以下是一般步骤：

   ```bash
   # 克隆 Thrift 仓库
   git clone https://github.com/apache/thrift.git
   
   # 进入 Thrift 目录
   cd thrift
   
   # 生成配置脚本
   ./bootstrap.sh
   
   # 配置
   ./configure
   
   # 编译并安装
   make
   sudo make install
   ```

3. **设置环境变量：** 在 `.bashrc` 或者 `.profile` 文件中添加 Thrift 的可执行文件路径到 `PATH` 环境变量中，以便系统能够找到 Thrift 的命令。

   ```bash
   export PATH=$PATH:/usr/local/bin
   ```

   确保保存文件并运行 `source` 命令使得环境变量生效：

   ```bash
   source ~/.bashrc  # 或者 source ~/.profile
   ```

4. **验证安装：** 打开一个新的终端窗口，输入 `thrift --version` 命令来验证 Thrift 是否已成功安装。如果安装成功，会显示 Thrift 的版本信息。

## 5.Grpc for go

### 1.配置clash

由于国内环境的复杂性和访问外网的困难性，要用google提供的方法配置grcp-go，需要先配置clash

[clash配置教程](./linux下clash配置.md)

### 2.安装Protocol Buffers 编译器（protobuf）

a. **下载源代码：** 前往 Protocol Buffers GitHub 页面[下载最新版本的源代码包](https://github.com/protocolbuffers/protobuf/releases)。

b. **安装依赖项：** 在 Ubuntu 上安装编译 Protocol Buffers 所需的依赖项：

```bash
sudo apt-get install -y autoconf automake libtool curl make g++ unzip
```

c. **编译和安装：** 解压下载的源代码包，并进入该目录。然后执行以下命令编译和安装：

```bash
./configure
make
sudo make install
```

安装完成后，运行 `protoc --version` 命令来检查 Protocol Buffers 编译器的安装情况。如果安装成功，会显示当前安装的 protobuf 版本信息。

### 3.安装grcp-go

1. Install the protocol compiler plugins for Go using the following commands:

   ```bash
   go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
   go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
   ```

2. Update your `PATH` so that the `protoc` compiler can find the plugins:

   ```bash
   export PATH="$PATH:$(go env GOPATH)/bin"
   ```

## 6.Kompose安装

1.**下载 Kompose：** 前往[Kompose GitHub 页面](https://github.com/kubernetes/kompose/releases)下载适用于你系统的最新版本的二进制文件。选择适合你操作系统的版本并下载。

2.**安装 Kompose：** 解压下载的文件，并将二进制文件放置在一个系统路径下，以便能够在终端中直接执行。例如，将二进制文件移动到 `/usr/local/bin` 目录下：

```bash
sudo mv /path/to/downloaded/kompose /usr/local/bin/kompose
sudo chmod +x /usr/local/bin/kompose
```

3.**验证安装：** 在终端中运行 `kompose version` 命令来验证 Kompose 是否成功安装，并显示当前的版本信息。