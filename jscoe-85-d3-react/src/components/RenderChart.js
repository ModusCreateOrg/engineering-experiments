import BarChart from './BarChart';
import CircleChart from './CircleChart';
import HistoChart from './HistoChart';
import LineChart from './LineChart';

export default function RenderCharts({option, dataCount}) {
    switch(option) {
      case 'Line Chart':
        return <LineChart  dataCount={dataCount} />
      case 'Circle Chart':
        return <CircleChart dataCount={dataCount} />
      case 'Histogram Chart':
        return <HistoChart dataCount={dataCount} />
      default: 
        return <BarChart dataCount={dataCount} />
    }
}
  