# ssr-with-eggjs

## Install

```sh
$ yarn
```

## Usage

Development

```sh
$ npm run dev
$ open http://localhost:7001/
```

Build

```bash
$ npm run build
```

# 国际化

目前是按照 cookie > 浏览器默认语言 > 默认语言顺序选择
由于服务端获取不到 localStorage，所以要通过 cookie 将
所需信息带到服务端

# 部署

egg 内置了 cluster 模式，执行 yarn start 即可，详情见[egg 官网](https://eggjs.org)

# 使用秘钥登录远程服务器

> 以下操作都是按照 Linux 来写的，window 上自行验证。各个命令的具体使用可以在通 Linux 上的`man`命令来查看,比如：`man ssh-keygen`。以上命令的各种参数也都是设置成我们这次需要的，你可以改成你自己需要的。

## 生成秘钥

```bash
# 邮箱改成你自己的，当然省略这个参数也行
# -f 参数，保存生成的秘钥对的路径，你可以指定，也可以不指定。但是为了今后可能会生成多个秘钥对，最好指定一个
# 这个命令执行完之后，你会看到 ~/.ssh/key_pair, ~/.ssh/key_pair.pub 这个两个文件
# 中间一路回车即可
$ ssh-keygen -m PEM -t rsa -b 4096 -C "xxxxxmiss@gmail.com" -f ~/.ssh/key_pair
```

## 上传公钥到远程服务器

```bash
# 将上一步生成的公钥传到远程服务器
$ ssh-copy-id -i ~/.ssh/key_pair.pub user@192.168.16.173
```

## 配置 ssh config 文件

> 一般对于类 linux 用户而言，`ssh config`文件会放在`~/.ssh/confg`文件中

```bash
# 这个地方的name可以随便取，只是一个标示而言
Host name
# 远程主机的ip
HostName 192.168.16.173
# 登录远程主机的用户名
User root
# ssh 默认端口，所以这行可以省略
Port 22
# 这里是ssh-keygen那一步生成的私钥的路径
IdentityFile ~/.ssh/key_pair
```

## 登录

```bash
# 这个地方的name就是上一步Host中指定的name
$ ssh name
```
