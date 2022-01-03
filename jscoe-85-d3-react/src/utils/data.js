import { randomNumber } from "./utils";

export const createRandomData = (amount, config) => {
    const {yMax, yMin} = config;

    const dataPoints = [];

    for (let i = 1; i <= amount; i++) {
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