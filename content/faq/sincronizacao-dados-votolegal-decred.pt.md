---
date: 2018-10-03T15:29:13-03:00
draft: false
title: "Como funciona a sincronização dos dados entre o Voto Legal e a Decred?"
layout: none
type: faq
weight: 4
---
Cada doação possui um comprovante matemático único ([hash SHA-256](https://pt.wikipedia.org/wiki/SHA-2)) composto por algumas informações da doação, tais como: nome do doador, CPF do doador, informações do candidato, valor, hora etc. Quando uma doação é realizada, nós protocolamos a _hash_ da doação no nosso servidor do _dcrtime_. Os comprovantes das doações então são somadas em uma _hash_ única que representa a _merkle root_. Isso significa que, se a _hash_ de alguma doação fosse modificada, todas as doações posteriores também mudariam. Por fim, essa _hash_ final (_merkle root_) é escrita na blockchain pública da Decred, gerando uma transação imutável.
