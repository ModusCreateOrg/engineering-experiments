import { randomNumber } from "./utils";

export const createRandomData = (amount, config) => {
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