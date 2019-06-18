# 本地搭建https

[**windows 下搭建https + node.js + nginx**](https://troyyang.com/2017/11/07/windows-ssl-node-nginx/)

## 证书生成

```shell
>> openssl genrsa -out server.key 4096

>> openssl req -new -key server.key -out server.csr

// 获取私钥
>> openssl x509 -req -days 730 -in server.csr -signkey server.key -out server.crt
```

## nginx搭建

### 安装

切换到解压后nginx的目录

```shell
>> start nginx
```

检测是否安装成功

```shell
>> tasklist /fi "imagename eq nginx.exe"

Image Name           PID Session Name     Session#    Mem Usage
=============== ======== ============== ========== ============
nginx.exe            652 Console                 0      2 780 K
nginx.exe           1332 Console                 0      3 112 K
```

这表明安装已成功

### 配置SSL

在nginx目录下的`/config`中修改`nginx.conf`

```
server {
      listen       443 ssl;
      server_name  localhost;
  
      ssl_certificate      D:\ssl\server.crt;
      ssl_certificate_key  D:\ssl\server.key;
  
      ssl_session_cache    shared:SSL:1m;
      ssl_session_timeout  5m;
  
      ssl_ciphers  HIGH:!aNULL:!MD5;
      ssl_prefer_server_ciphers  on;
  
      location / {
			proxy_pass http://localhost:3000;
	  }
}
```

即可将本地localhost:3000上的服务反向代理到https://localhost