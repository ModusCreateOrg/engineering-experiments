import { randomNumber } from "./utils";

export const createRandomData = (amount, config) => {
    const {xMax, xMin, yMax, yMin} = config;

    const dataPoints = [];

    for (let i = 1; i <= amount; i++) {
        dataPoints.push({
            x: randomNumber(xMin, xMax),
            y: randomNumber(yMin, yMax)
        })
    }   

    return dataPoints
}