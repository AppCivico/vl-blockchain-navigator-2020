/* global dayjs */

import config from './config';
import utilities from './utilities';

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
      return err.message || err.name || err.data[0].message;
    },
    isDateValid(date) {
      return dayjs(date).isValid();
    },
    totalAmount(items = []) {
      return items.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
    },
    },
  },
};
