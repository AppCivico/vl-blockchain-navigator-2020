/* global dayjs */
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
      searchQueryDisplay: '',
      loading: true,
      nodes: [],
      debug: true,
      error: '',
      xhr_request: [],
    };
  },
  computed: {
    rawSearchQuery() {
      const searchQuery = this.searchQueryDisplay || this.getQueryString()[this.config.searchKey] || '';

      if (dayjs(searchQuery).isValid()) {
        return dayjs(searchQuery).format(this.config.formats.dateQuery);
      }

      if (/^(\d\d?)[\s/.-](\d\d?)[\s/.-]((?:\d\d){1,2})$/.test(searchQuery)) {
        const dateParts = searchQuery.match(/^(\d\d?)[\s/.-](\d\d?)[\s/.-]((?:\d\d){1,2})$/);

        if (String(dateParts[3]).length === 2) {
          dateParts[3] = `20${dateParts[3]}`;
        }

        return dayjs(`${dateParts[3]}-${dateParts[2]}-${dateParts[1]}`).format(this.config.formats.dateQuery);
      }

      return searchQuery;
    },
  },
  mounted() {
    const searchQuery = this.getQueryString()[this.config.searchKey] || '';

    this.searchQueryDisplay = dayjs(searchQuery).isValid()
      ? dayjs(searchQuery).format(this.config.formats.date)
      : searchQuery;

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
        credentials: 'same-origin',
      };

      let requestURI = this.config.api.domain
        ? `https://${this.config.api.domain}${this.config.api.pathname}`
        : this.config.api.pathname;

      if (this.rawSearchQuery) {
        console.log('this.rawSearchQuery', this.rawSearchQuery);
        console.log('this.getQueryString()[this.config.searchKey]', this.getQueryString()[this.config.searchKey]);
        requestURI += `/search/${this.rawSearchQuery}`;

        if (this.rawSearchQuery !== this.getQueryString()[this.config.searchKey]) {
          window.history.pushState({
            searchKey: this.rawSearchQuery,
          },
          `Busca por ${this.searchQueryDisplay}`,
          `?${this.config.searchKey}=${this.rawSearchQuery}`);
        }
      }

      this.loading = true;

      fetch(new Request(requestURI), requestOptions)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          return Promise.reject(
            new Error(`${response.status}: ${response.statusText}`),
          );
        })
        .then((response) => {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          return Promise.reject(
            new Error("Oops, we haven't got JSON!"),
          );
        })
        .then((response) => {
          this.nodes = response.nodes;
          this.loading = false;
        })
        .catch((err) => {
          this.nodes = [];
          this.loading = false;
          this.error = this.handleErrorMessage(err);
          throw err;
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
