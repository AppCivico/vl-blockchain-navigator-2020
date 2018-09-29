import blockDetail from './blockDetail';

export default {
  name: 'search-result',
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
    'block-detail': blockDetail,
  },
};
