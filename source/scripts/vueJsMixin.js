/* global dayjs */

import config from './config';
import utilities from './utilities';

import errors from './httpErrors';

utilities.formatDate = function formatDate(date, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ') {
  return format !== 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    ? dayjs(date).format(format)
    : date;
};

export default {
  filters: utilities,
  data() {
    return {
      config,
    };
  },
  methods: {
    handleErrorMessage(err) {
      return errors[err.name] || err.message || err.name || err.data[0].message;
    },
    isDateValid(date) {
      return dayjs(date).isValid();
    },
    totalAmount(items = []) {
      return items.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    },
    getQueryString(url = window.location.search) {
      const queryString = url.indexOf('?') !== -1
        ? url.split('?')[1]
        : [];
      const params = {};
      const queries = queryString.indexOf('&') !== -1
        ? queryString.split('&')
        : [queryString];
      for (let i = 0; i < queries.length; i += 1) {
        const element = queries[i].indexOf('=') !== -1
          ? queries[i].split('=')
          : [queries[i], null];
        params[decodeURIComponent(element[0])] = decodeURIComponent(element[1] || '');
      }
      return params;
    },
  },
};
