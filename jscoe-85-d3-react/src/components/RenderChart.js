import BarChart from './BarChart';
import CircleChart from './CircleChart';
import LineChart from './LineChart';

export default function RenderCharts({option, dataCount}) {
    switch(option) {
      case 'Line Chart':
        return <LineChart />
      case 'Circle Chart':
        return <CircleChart />
      default: 
        return <BarChart dataCount={dataCount} />
    }
}
  