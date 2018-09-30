import searchResult from './searchResult';

export default {
  name: 'search-results',
  template: '#search-results',
  props: {
    nodes: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    'search-result': searchResult,
  },
  computed: {
    now() {
      return new Date().toISOString();
    },
  },
};
