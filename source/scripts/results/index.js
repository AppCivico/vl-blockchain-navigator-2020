import searchResults from './components/searchResults';

export default {
  el: '#search-results-insertion-point',
  template: '#search-form',
  name: 'search-results-wrapper',
  components: {
    'search-results': searchResults,
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

      const requestURI = this.config.api.domain
        ? `https://${this.config.api.domain}${this.config.api.pathname}`
        : this.config.api.pathname;

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
              `?${this.config.searchKey}=${this.searchKey}`,
            );
          }
          this.nodes = response.nodes;
        });
    },
    cancelRequest() {
      for (let i = 0; i < this.xhr_request.length; i += 1) {
        this.xhr_request.shift().abort();
      }
      this.loading = false;
    },
    showElement() {
      if (this.$el.hasAttribute('hidden')) {
        this.$el.removeAttribute('hidden');
      }
    },
  },
};
