import BarGraph from 'components/BarChart';

export default function RenderCharts({option}) {
    switch(option) {
      case 'Line Chart':
        return <div></div>
      default: 
        return <BarGraph />
    }
}
  