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
    thisDate() {
      return this.nodes[0]
        ? this.nodes[0].decred_merkle_root_timestamp
        : 0;
    },
  },
};
