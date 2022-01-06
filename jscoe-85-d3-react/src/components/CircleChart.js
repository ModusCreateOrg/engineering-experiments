import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { createDistRandomData, createRandomData } from 'utils/data';


export default function CircleChart() {

    const [data, setData] = useState(createDistRandomData(6))

    console.log(data)

    const ref = useRef()
    useEffect(() => {
        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const height = 500;
        const width = 1300;

        const radius = Math.min(width, height)/ 2;

        const graphSection = d3Node.attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        const color = d3.scaleOrdinal()
            .domain(data)
            .range(["#AA7B16", "#16AA91", "#168BAA", "#60747A", "#a05d56"])

        const circle = d3.pie().value(d => d.y)

        const renderGraph = circle(data)

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        graphSection
            .selectAll('graphs')
            .data(renderGraph)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d))
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 1)
        graphSection
            .selectAll('graphs')
            .data(renderGraph)
            .enter()
            .append('text')
            .text((d) => `${d.data.x} (${d.data.y})`)
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 17)
    }, [ data ])

    return (
        <div className="p-2">
            <h2 className="text-center mb-5">Pie Chart</h2>
            <svg className="graph-default" ref={ref}>
            </svg>   
        </div>
    )
}