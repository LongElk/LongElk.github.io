# Openwrt扩容及原理

> 视频推荐
>
> 

## 1.为什么要扩容？

首先，我的openwrt是安装在**物理机**上的。由于openwrt所占用的空间是作者写在固件中的，那么openwrt系统就会**占用的空间**=**16Mb内核空间**+**固件空间**+**overlay大小**，这就会导致无法占满整个磁盘空间并导致大量的空间浪费。与其他 Linux 操作系统不同，OpenWrt 的安装通常不需要执行擦写和分区操作。它的存储方式是通过将固件直接烧录到设备中，而 Overlay 是在固件之外的一个可写区域，用于存储配置、安装软件包等用户数据。这与传统的 Linux 操作系统在安装过程中通常会进行分区并使用整块磁盘空间来安装系统有所不同。：

### overlay空间不足 ###

Overlay 区域是一个挂载在只读固件（rootfs）之上的可写区域。它通常位于设备上的闪存中，用于存储配置、安装软件包等用户数据。如果 Overlay 空间不足，会导致无法安装新软件包或保存配置更改。

### 特殊软件需求 ###

在 OpenWrt 上安装 Docker 或其他需要大量磁盘空间的软件时，可能需要更多的可用空间。这些软件可能需要单独的分区来存储数据、镜像或其他文件。

### 空余磁盘空间 ###

因为是物理机安装openwrt，那我256G的硬盘只用了1G很不合理吧，肯定要想办法把它利用上啊！

## 2.扩容须知

### 1.UnionFS

