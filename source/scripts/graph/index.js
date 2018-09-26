import config from '../config';

export default function initGraph() {
  const requestheaders = new Headers();
  requestheaders.append('Content-Type', 'application/json');
  requestheaders.append('pragma', 'no-cache');

  const requestOptions = {
    method: 'GET',
    headers: requestheaders,
    mode: 'cors',
    cache: 'no-cache',
  };

  const totalAmountEl = document.querySelector('#totalAmount');
  const last7DaysAmountEl = document.querySelector('#last7DaysAmount');
  const totalAmountDonationsEl = document.querySelector('#totalAmountDonations');
  const last7DaysAmountDonationsEl = document.querySelector('#last7DaysAmountDonations');
  const lastDaysChartEl = document.querySelector('#lastDaysChart');

  lastDaysChartEl.removeAttribute('hidden');

  const requestURI = config.api.domain
    ? `https://${config.api.domain}${config.api.pathname}`
    : config.api.pathname;

  const requestData = new Request(requestURI);

  fetch(requestData, requestOptions)
    .then((response) => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    }).then((response) => {
      const data = response.ui.last_seven_days_graph;

      const chartOptions = {
        chartPadding: {
          right: 80,
        },
        fullWidth: true,
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(255, 99, 132)',
          },
        },
      };

      const chartResponsiveOptions = {
        maintainAspectRatio: false,
      };

      if (totalAmountEl) {
        totalAmountEl.textContent = response.ui.total_donations_amount;
      }

      if (last7DaysAmountEl) {
        last7DaysAmountEl.textContent = response.ui.last_seven_days_amount;
      }

      if (totalAmountDonationsEl) {
        totalAmountDonationsEl.textContent = response.ui.total_donations_count;
      }

      if (last7DaysAmountDonationsEl) {
        last7DaysAmountDonationsEl.textContent = response.ui.last_seven_days_count;
      }

      window.vendor.Chartist.Line('#current-time-chart', data, chartOptions, chartResponsiveOptions);

      lastDaysChartEl.setAttribute('aria-busy', false);
    });
}
