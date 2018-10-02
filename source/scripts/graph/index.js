/* global Chartist, dayjs */
export default {
  el: '#last-days-chart-insertion-point',
  template: '#last-days-chart',
  name: 'last-days-chart',
  data() {
    return {
      total_donations_amount: 0,
      last_seven_days_amount: 0,
      total_donations_count: 0,
      last_seven_days_count: 0,
      loading: true,
      debug: true,
      error: null,
      xhr_request: [],
    };
  },
  created() {},
  mounted() {
    this.initGraph();
    this.showElement();
  },
  methods: {
    initGraph() {
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

      const requestData = new Request(requestURI);

      fetch(requestData, requestOptions)
        .then((response) => {
          const contentType = response.headers.get('content-type');

          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          throw new TypeError("Oops, we haven't got JSON!");
        }).then((response) => {
          Object.assign(this.$data, response.ui);

          const data = response.ui.last_seven_days_graph;

          const chartOptions = {
            axisX: {
              divisor: 7,
              labelInterpolationFnc: value => dayjs(value).format(this.config.formats.dateChart),
            },
            axisY: {
              showGrid: false,
              labelInterpolationFnc(value) {
                return `${value} mil`;
              },
              offset: 70,
              scaleMinSpace: 25,
            },
            chartPadding: {
              right: 30,
            },
            fullWidth: true,
            lineSmooth: Chartist.Interpolation.simple({
              divisor: 1.5,
            }),
            showPoint: false,
          };

          const chartResponsiveOptions = {
            maintainAspectRatio: false,
          };

          Chartist.Line('#current-time-chart', data, chartOptions, chartResponsiveOptions);
        }).then(() => {
          this.loading = false;
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
