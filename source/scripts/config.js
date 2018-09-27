export default {
  api: {
    domain: (window.location.hostname.indexOf('blockchain.votolegal.com.br') !== -1 ? '' : 'api.votolegal.com.br'),
    pathname: '/public-api/blockchain',
  },
  formats: {
    date: 'DD.MM.YY',
    time: 'hh:mm',
    timestamp: 'DD.MM.YY - hh.mm',
  },
  candidates: {
    domain: 'votolegal.com.br',
    pathname: '/em',
  },
  receipts: {
    domain: 'votolegal.com.br',
    pathname: '/recibo',
  },
  searchKey: 'buscar',
};
