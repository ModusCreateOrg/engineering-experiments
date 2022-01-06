import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { createRandomData } from 'utils/data';


export default function CircleChart() {

    const [data, setData] = useState(createRandomData(5, {xMin: 1, xMax: 20,yMin: 10, yMax: 20}))

    const ref = useRef()

    useEffect(() => {
        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const margin = { top: 20, right: 10, bottom: 30, left: 40 };
        const height = 600;
        const width = 1200;

        const radius = Math.min(width, height)/ 2;

        const graphSection = d3Node.attr("width", width)
            .attr("heigh", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        const color = d3.scaleOrdinal()
            .domain(data)
            .range(["blue","orange", "purple", "green", "red"])

        const circle = d3.pie()
            .value((d) => d.value)

        const renderGraph = circle(d3.entries(data))

        graphSection
            .selectAll('whatever')
            .data(renderGraph)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr('fill', (d) => color(d.data.key))
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
        
    }, [ data ])

    return (
        <div className="p-2">
        <h2 className="text-center mb-5">Bar Chart</h2>
        <svg className="graph-default" ref={ref}>
        </svg>
        </div>
    )
}