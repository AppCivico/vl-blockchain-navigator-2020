---
date: 2018-10-03T15:22:09-03:00
draft: false
title: "Por que utilizadmos Decred?"
layout: none
type: faq
weight: 3
---
A Decred é uma criptomoeda cuja principal característica é a descentralização. Através de um sistema de [votação na _blockchain_](https://voting.decred.org/), são seus _stakeholders_ que decidem quais são os próximos passos do projeto. Seu [roadmap](https://blog.decred.org/2018/02/28/2018-Decred-Roadmap/) é focado em ser uma moeda cada vez mais descentralizada, evitando problemas que outras moedas possuem como a falta de consenso e concentração de poder na mão dos desenvolvedores ou dos mineradores.

Entre as recentes criações do time de desenvolvimento da Decred está o [Politeia](https://blog.decred.org/2017/10/25/Politeia/), uma plataforma onde os usuários podem formalizar propostas que que serão votadas pela comunidade.

Um dos componentes que viabiliza o Politeia é o _dcrtime_. Este, por sua vez, implementa uma [árvore de merkle](https://pt.wikipedia.org/wiki/%C3%81rvores_de_Merkle), carimbando o dado inserido com data e hora e refletindo o _merkle root_ na _blockchain_ pública da Decred. Superficialmente podemos dizer que o _dcrtime_ é a parte do Politeia responsável por comprovar que um determinado dado realmente estava lá em uma determinada data.
