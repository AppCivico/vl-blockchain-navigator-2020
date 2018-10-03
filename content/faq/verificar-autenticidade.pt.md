---
date: 2018-10-03T15:33:51-03:00
draft: false
title: "Como posso verificar a autenticidade dos dados?"
layout: none
type: faq
weight: 5
---
Você pode utilizar o cliente do [dcrtime](https://github.com/decred/dcrtime) para consultar os dados em nosso servidor (`time.appcivico.com`), pesquisando pela hash de cada doação, como por exemplo:

```
$ ./dcrtime -h time.appcivico.com:443 -v c52a7f550c06414145fe86d9f2c8288643a19b28a76b6389f952923eedd6e817 c52a7f558c06414145fe86d8f2c8288643a19b28a76b6399f952923eedd6e817 Verify c52a7f558c06414145fe86d8f2c8288643a19b28a76b6399f952923eedd6e817 OK
Chain Timestamp: 1529247857
Merkle Root : bef6218c2f50691a9d1cdd3elde9Oce78c957fd9e74f27e1a6aee315a727b3Of
TxID : d72a87682bf2c66dd696514e659leeecbe9aa97d4ea64f5a62b744d723e6952e
```

O _DCRtime_ também fornece uma API RESTful. O endpoint abaixo exibe as _hashes_ de todas as doações que foram utilizadas para compor a _merkle root_:

```
$ curl -X POST https://time.appcivico.com/v1/verify/ -d '{"id":"votolegal","digests":["c52a7f550c06414145fe86d0f2c8208643a19b28a76b6309f952023eedd6e817"]}'
```
