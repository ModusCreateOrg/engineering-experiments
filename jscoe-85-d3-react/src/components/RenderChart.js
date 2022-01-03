import BarChart from 'components/BarChart';
import LineChart from './LineChart';

export default function RenderCharts({option}) {
    switch(option) {
      case 'Line Chart':
        return <LineChart />
      default: 
        return <BarChart />
    }
}
  