import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { createRandomData } from 'utils/data';


export default function LineChart() {

    const [data, setData] = useState(createRandomData(20, {xMin: 2012, xMax: 2020 ,yMin: 1000, yMax: 5000}))

    const ref = useRef()

    useEffect(() => {
        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const height = 500;
        const width = 1200;
        const x =  d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.x))
        .range([ 0, width ])

        const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .range([height, 0]);

        
      d3Node.select(".x-axis").attr("transform", "translate(45," + height + ")")
      .call(d3.axisBottom(x));

      d3Node.select(".y-axis").attr("transform", "translate(40,0)").call(d3.axisLeft(y));
      
      const line = d3.line()
      .x(function(d) { return x(d.x)})
      .y(function(d) { return y(d.y)})

      d3Node
        .append("path")
        .datum(data)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line) 
        .style("fill", "none")
        .style("stroke", "orange")
        .style("stroke-width", "1");

    
    }, [ data ])

    return (
        <div className="p-2">
        <h2 className="text-center mb-5">Line Chart</h2>
        <svg className="graph-default" ref={ref}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
        </div>
    )
}