import './App.css';
import BarGraph from 'components/BarChart';

function App() {
  return (
    <div className="App">
        <h1 className="text-center">D3 Visuals</h1>
        <div className="container">
            <div className="d-flex">
            <div className="w-50">
                <BarGraph />
            </div>
            <div className="row">


            </div>

            </div>
           
        </div>
    </div>
  );
}

export default App;
