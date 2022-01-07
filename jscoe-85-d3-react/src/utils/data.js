import { randomNumber } from "./utils";

import randomWords from 'random-words';

// Use for Line and Bar Charts
export const createRandomData = (config) => {
    const {xMax, xMin, yMax, yMin} = config;

                    const dataPoints = [];

    for (let i = xMin; i <= xMax; i++) {
        dataPoints.push({
            x: i,
            y: randomNumber(yMin, yMax)
        })
    }   

    // Sort Data Points by X Value

    dataPoints.sort((a,b) => a.x - b.x)
    return dataPoints
}


// Generate Histogram Data 
export const createHistogramData = (length) => {
    // Keep it at 10 - 500 range
    const data = [];

    for (let i = 0; i <= 1000; i++) {
        // Lets make middle value appear more frequently
        let tries = 0;

        let randomNum = randomNumber(10, length);

        while ((randomNum < (length / 2 - (length / 10 )) || randomNum > (length / 2 + length / 5)) && tries !== 2) {
            randomNum = randomNumber(10, length);
            
            tries ++;
        }
        

        data.push(randomNum);
    }

    return data;
}

// Use for Circle Charts or any Distribution
export const createDistRandomData = (length) => {
    const randomWordsArray = randomWords(length);


    return randomWordsArray.map(word => (
        {
            x: word,
            y: randomNumber(30, 50)
        }
    ))

}


// Density Estimators (Straight from Source) https://www.d3-graph-gallery.com/graph/density_basic.html

export const kernelDensityEstimator = (kernel, X, d3) =>  {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
  }

export const  kernelEpanechnikov = (k) =>  {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
  }