import { HistoryProps } from 'types/CryptoTypes'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const LineGraph = ({ data }: { data: Array<HistoryProps> }) => {
  const updatedData = {
    labels: [...data].map((d) => moment.unix(d.timestamp).format('MM/DD/YYYY')),
    datasets: [
      {
        label: 'Price Range',
        data: [...data].map((d) => d.price),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  }
  const options = {
    title: 'Graph',
    scales: {
      xAxes: [
        {
          title: 'time',
          type: 'time',
          gridLines: {
            lineWidth: 2,
          },
          time: {
            unit: 'day',
            unitStepSize: 1000,
            displayFormats: {
              millisecond: 'MMM DD',
              second: 'MMM DD',
              minute: 'MMM DD',
              hour: 'MMM DD',
              day: 'MMM DD',
              week: 'MMM DD',
              month: 'MMM DD',
              quarter: 'MMM DD',
              year: 'MMM DD',
            },
          },
        },
      ],
    },
  }
  return <Line data={updatedData} {...options} />
}

export default LineGraph
