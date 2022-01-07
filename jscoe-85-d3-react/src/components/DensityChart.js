import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { createRandomData, kernelDensityEstimator, kernelEpanechnikov } from 'utils/data';


export default function DensityChart({dataCount}) {

    const [data, setData] = useState([])

    const ref = useRef()

    useEffect(() => {
        setData(createRandomData({xMin: 10, xMax: 5 * dataCount, yMin: 400, yMax: 800}))
      }, [dataCount])
  

    useEffect(() => {
        // Removes all paths (graphical lines)
        d3.selectAll("path").remove();

        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const height = 500;
        const width = 1200;

        // Max for X
        const x =  d3
        .scaleLinear()
        .domain(d3.max(data, (d) => d.x))
        .range([ 0, width ])


        // Append X instead of producing it
        d3Node.append('g')
        .call(d3.axisBottom(x))




        // Max for Y
        const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .range([height, 0]);

        // Append Y instead of producing it 
        d3Node.append('g')
        .call(d3.axisBottom(x));


         // Compute kernel density estimation
        const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40), d3);
        const density =  kde( data.map(d => d.x))

        
       // Plot the area
        d3Node.append("path")
            .attr("class", "mypath")
            .datum(density)
            .attr("fill", "#69b3a2")
            .attr("opacity", ".8")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
  );
    
    }, [ data ])

    return (
        <div className="p-2">
        <h2 className="text-center mb-5">Line Chart</h2>
        <svg className="graph-default" ref={ref}>
           
        </svg>
        </div>
    )
}