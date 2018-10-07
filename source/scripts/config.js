export default {
  api: {
    domain: (window.location.hostname.indexOf('blockchain.votolegal.com.br') !== -1 ? '' : 'api.votolegal.com.br'),
    pathnames: {
      lastDay: '/public-api/blockchain',
      chart: '/public-api/blockchain/chart',
      search: '/public-api/blockchain/search',
    },
  },
  formats: {
    date: 'DD.MM.YY',
    dateChart: 'DD.MM',
    time: 'hh:mm',
    timestamp: 'DD.MM.YY - hh.mm',
    dateQuery: 'YYYY-MM-DD',
  },
  candidates: {
    domain: 'votolegal.com.br',
    pathname: '/em',
  },
  receipts: {
    domain: 'votolegal.com.br',
    pathname: '/recibo',
  },
  decred: {
    domain: 'explorer.dcrdata.org',
    pathnames: {
      transactionId: '/tx',
    },
  },
  searchKey: 'buscar',
  chartUpdateInterval: 1000 * 60 * 60,
};
