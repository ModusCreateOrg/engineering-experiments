import './App.css';
import BarGraph from 'components/BarChart';
import { useEffect, useState } from 'react';
import { createRandomData } from 'utils/data';

function App() {
  // Default Data
  const [currentData, setCurrentData] = useState(createRandomData(20, {
    xMax: 7, 
    xMin: 1, 
    yMax: 1, 
    yMin: 30,
  }))

  useEffect(() => {
 
  }, [])

  console.log(currentData)

  return (
    <div className="App">
        <h1 className="text-center mb-4">D3 Visuals</h1>
        <div className="container">
            <div className="d-flex">
            <div className="w-100">
              <div className="side">
                <BarGraph data={currentData}/>


              </div>
            </div>
            <div className="row">


            </div>

            </div>
           
        </div>
    </div>
  );
}

export default App;
