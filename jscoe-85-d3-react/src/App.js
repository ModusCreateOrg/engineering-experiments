import './App.css';
import { useEffect, useState } from 'react';
import RenderCharts from 'components/RenderChart';

const options = ['Bar Chart','Line Chart', 'Circle Chart', 'Histogram Chart', 'Density Chart']


function App() {
  // Default Chart

  const [currentChart, setCurrentChart] = useState(options[0]);
  const [dataCount ,setDataCount] = useState(3)


  const changeAmount = (type) => {
    if (type === 'minus') {
      if (dataCount > 3) {
        setDataCount(count => count - 1);
      }
    }
    else {
      if (dataCount < 30) {
        setDataCount(count => count + 1);
      }
    }
  }

  const changeCurrentChart = (option) => {
    setCurrentChart(option);
    setDataCount(3);
  }


  return (
    <div className="App">
        <h1 className="text-center mb-4">D3 Visuals</h1>
        <div className="container">
            <div className="adjust-data">
              <button onClick={() => changeAmount('minus')} className="px-4 py-2">-</button>
              <button onClick={() => changeAmount('add')} className="px-4 py-2">+</button>
            </div>
            <div className="w-100">
              <div className="side">
                  {<RenderCharts option={currentChart} dataCount={dataCount} />}
              </div>
            </div>
            <div className="menu-bar d-flex flex-wrap">
              {options.map(option => (<div key={option} onClick={() => changeCurrentChart(option)} className={`card-item ${currentChart === option ? 'active' : ''}`}>{option}</div>))}
            </div>         
        </div>
    </div>
  );
}

export default App;
