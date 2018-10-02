export default {
  name: 'block-detail',
  template: '#block-detail',
  props: {
    donation: {
      type: Object,
    },
  },
  methods: {
    url(donation) {
      const candidateSlug = donation.candidate.slug || donation.candidate_slug;
      const candidateCustomUrl = donation.candidate.custom_url || donation.candidate_custom_url;

      const decredDataDigest = donation.decred_data_digest || '';

      const candidateUrl = candidateCustomUrl || (candidateSlug
        ? `https://${this.config.candidates.domain}${this.config.candidates.pathname}/${candidateSlug}`
        : '');

      const receiptUrl = candidateSlug && decredDataDigest
        ? `https://${this.config.candidates.domain}${this.config.candidates.pathname}/${candidateSlug}${this.config.receipts.pathname}/${decredDataDigest}`
        : '';

      const transactionUrl = donation.decred_capture_txid
        ? `${this.config.decred.transactionHref}/${donation.decred_capture_txid}`
        : '';

      return {
        candidate: candidateUrl,
        receipt: receiptUrl,
        transactionId: transactionUrl,
      };
    },
  },
};
