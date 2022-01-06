import BarChart from 'components/BarChart';
import CircleChart from './CircleChart';
import LineChart from './LineChart';

export default function RenderCharts({option}) {
    switch(option) {
      case 'Line Chart':
        return <LineChart />
      case 'Circle Chart':
        return <CircleChart />
      default: 
        return <BarChart />
    }
}
  