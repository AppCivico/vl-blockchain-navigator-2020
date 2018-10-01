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
    url(donation) {
      const candidateSlug = donation.candidate.slug || donation.candidate_slug;
      const candidateCustomUrl = donation.candidate.custom_url || donation.candidate_custom_url;

      const decredDataDigest = donation.decred_data_digest || '';

      const candidateUrl = candidateCustomUrl || (candidateSlug
        ? `https://${config.candidates.domain}${config.candidates.pathname}/${candidateSlug}`
        : '');

      const receiptUrl = candidateSlug && decredDataDigest
        ? `https://${config.candidates.domain}${config.candidates.pathname}/${candidateSlug}${config.receipts.pathname}/${decredDataDigest}`
        : '';

      return {
        candidate: candidateUrl,
        receipt: receiptUrl,
      };
    },
  },
};
