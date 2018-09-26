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

      window.vendor.Chartist.Line('#current-time-chart', data, chartOptions, chartResponsiveOptions);
    });
}
