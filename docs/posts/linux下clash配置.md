# 在linux（Ubuntu）中配置clash的教程 #

## 选择1：clash for windows（有gui且操作系统必须要有gui） ##

### 1.网盘下载clash for windows ###

因为clash已删库，所以从[Clash for windows - Google 云端硬盘](https://drive.google.com/drive/folders/1Tnx8NOsCEqztPJ1lwCP6xICMLCQiBDG8)选择x64-linux版下载

### 2.用winscp将clash传输到Ubuntu主文件夹中

### 3.解压缩 ###

```bash
tar -xzvf Clash.for.Windows-0.20.39-x64-linux.tar.gz
```

### 4.重命名为clash并进入文件目录，在文件目录中打开终端

### 5. 点击cfw，运行成功 ###

## 选择二： clash for linux（通用，且内存占用更小） ##

### 1.网盘下载clash ###

[Clash latest - Google 云端硬盘](https://drive.google.com/drive/folders/1mhKMWAcS5661t_TWSp9wm4WNj32NFbZK)选择amd64

amd64 和 amd64-v3 有什么区别？[常见问题 | Clash (a76yyyy.github.io)](https://a76yyyy.github.io/clash/zh_CN/introduction/faq.html#amd64-和-amd64-v3-有什么区别)

### 2.为方便管理，将clash 解压到/usr/local/bin

```bash
gunzip clash-linux-amd64-latest.gz #解压
chmod +x clash-linux-amd64-latest #提权
mv clash-linux-amd64-latest.gz clash #重命名
mv clash /usr/local/bin/clash #移动到/usr/local/bin
clash -v # 查看是否安装成功
```

### 3.配置文件 ###

```bash
clash #启动clash自动下载配置文件
sudo su # 获取管理员权限
cd #返回根目录
cd ~/.config/clash/ # 进入目录配置文件
```

### 4.导入订阅 ###

我在运行`wget -O config.yaml 订阅地址`时发现config.yaml中存储的并非是配置，而是base64编码，自动导入不可行。所以采取手动导入。

通过服务商提供的网站，手动下载配置文件，并复制代理文件中的内容。

返回终端：

```bash
vim config.yaml
```

复制配置信息。

### 5.设置开机自启 ###

通过`.service`文件配置开机自启

```bash
sudo vim /etc/systemd/system/clash.service
```

在文件中添加以下内容

```plaintext
[Unit]
Description=clash service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/clash
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

启用systemd服务

```bash
sudo systemctl enable clash.service # 启用刚刚创建的服务
sudo systemctl start clash.service # 启动clash
systemctl status clash.service # 检查服务状态
```

