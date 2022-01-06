import { randomNumber } from "./utils";

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
    console.log(dataPoints)
    return dataPoints
}

// Use for Circle Charts or any Distribution
export const createDistRandomData = (length) => {
    
}