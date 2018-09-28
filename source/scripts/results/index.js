import config from '../config';

export default {
  el: '#search-results-wrapper',
  template: '#search-form',
  name: 'search-results-wrapper',
  components: {
    'search-results': {
      template: '#search-results',
      props: {
        nodes: {
          type: Array,
          required: false,
        },
      },
      computed: {
        now() {
          return new Date().toISOString();
        },
      },
      components: {
        'search-result': {
          template: '#search-result',
          props: {
            donations: {
              type: Array,
              required: false,
            },
            highlight: {
              type: Number,
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
    },
  },
  data() {
    return {
      searchKey: '',
      loading: true,
      nodes: [],
      debug: true,
      error: null,
      xhr_request: [],
    };
  },
  created() {
  },
  mounted() {
    const pathArray = window.location.pathname.split('/');
    const lastURLSegment = pathArray[pathArray.length - 1];

    if (lastURLSegment) {
      this.searchKey = lastURLSegment;
    }

    this.loadResults();
    this.showElement();
  },
  methods: {
    loadResults() {
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

      const requestData = new Request(`${requestURI}/${this.searchKey}`);

      fetch(requestData, requestOptions)
        .then((response) => {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          throw new TypeError("Oops, we haven't got JSON!");
        }).then((response) => {
          if (this.searchKey) {
            window.history.pushState(
              { searchKey: this.searchKey },
              `Busca por ${this.searchKey}`,
              `?${config.searchKey}=${this.searchKey}`,
            );
          }
          this.nodes = response.nodes;
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
