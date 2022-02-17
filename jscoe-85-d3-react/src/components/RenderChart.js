import BarChart from './BarChart';
import CircleChart from './CircleChart';
import DensityChart from './DensityChart';
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
      case 'Density Chart':
        return <DensityChart dataCount={dataCount} />
      default: 
        return <BarChart dataCount={dataCount} />
    }
}
  