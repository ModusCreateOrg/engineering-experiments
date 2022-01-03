import './App.css';
import { useEffect, useState } from 'react';
import RenderCharts from 'components/RenderChart';

const options = ['Bar Chart','Line Chart']


function App() {
  // Default Chart

  const [currentChart, setCurrentChart] = useState(options[0]);

  useEffect(() => {
    
  }, [])

  return (
    <div className="App">
        <h1 className="text-center mb-4">D3 Visuals</h1>
        <div className="container">
           
            <div className="w-100">
              <div className="side">
                  {<RenderCharts option={currentChart} />}
              </div>
            </div>

            <div className="menu-bar d-flex flex-wrap">
              {options.map(option => (<div key={option} className="card-item">{option}</div>))}
            </div>
            <div className="data-sets">
                
            </div>

           
        </div>
    </div>
  );
}

export default App;
