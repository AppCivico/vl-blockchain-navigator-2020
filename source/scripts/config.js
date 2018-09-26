export default {
  api: {
    domain: (window.location.hostname.indexOf('blockchain.votolegal.com.br') !== -1 ? '' : 'api.votolegal.com.br'),
    pathname: '/public-api/blockchain',
  },
};
