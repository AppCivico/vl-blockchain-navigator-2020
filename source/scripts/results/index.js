import config from '../config';

export default {
  el: '#search-results-wrapper',
  template: '#search-results',
  name: 'search-results-wrapper',
  components: {
    'search-result': {
      template: '#search-result',
      props: {
        donations: {
          type: Array,
          required: false,
        },
        block: {
          type: Number,
          required: false,
        },
        hash: {
          type: String,
          required: false,
        },
        time: {
          type: Date,
          required: false,
        },
      },
      components: {
        'block-detail': {
          template: '#block-detail',
          props: {
            donation: {
              type: Object,
            },
          },
        },
      },
    },
  },
  // render(createElement) {
  //   return createElement('search-results');
  // },
  data() {
    return {
      loading: true,
      nodes: [],
      debug: true,
      error: null,
      xhr_request: [],
    };
  },
  computed: {
    now() {
      return new Date().toISOString();
    },
  },
  created() {
  },
  mounted() {
    this.loadResults();
    // this.showElement();
  },
  methods: {
    // totalAmount(items = []) {
    //   return items.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    // },
    loadResults(params = {}) {
      const requestheaders = new Headers();
      requestheaders.append('Content-Type', 'application/json');
      requestheaders.append('pragma', 'no-cache');

      const requestOptions = {
        method: 'GET',
        headers: requestheaders,
        mode: 'cors',
        cache: 'no-cache',
      };

      const requestURI = config.api.domain
        ? `https://${config.api.domain}${config.api.pathname}`
        : config.api.pathname;

      const requestData = new Request(requestURI);

      fetch(requestData, requestOptions)
        .then((response) => {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          throw new TypeError("Oops, we haven't got JSON!");
        }).then((response) => {
          this.nodes = response.nodes;
          // this.$data.nodes = response.nodes;
        });
    },
    cancelRequest() {
      for (let i = 0; i < this.xhr_request.length; i += 1) {
        this.xhr_request.shift().abort();
      }
      this.metadata.loading = false;
    },
    showElement() {
      if (this.$el.hasAttribute('hidden')) {
        this.$el.removeAttribute('hidden');
      }
    },
  },
};
