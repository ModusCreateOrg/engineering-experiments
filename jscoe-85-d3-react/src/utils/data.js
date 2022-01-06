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

    for (let i = 0; i <= length; i++) {
        // Lets make middle value appear more frequently
        let tries = 0;
        let triesTwo = 0;

        let randomNum = randomNumber(10, 500);

        while ((randomNum < 200 || randomNum > 300) && tries !== 2) {
            randomNum = randomNumber(10, 500);
            
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