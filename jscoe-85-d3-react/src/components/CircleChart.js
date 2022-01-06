import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { createRandomData } from 'utils/data';


export default function CircleChart() {

    const [data, setData] = useState(createRandomData({xMin: 1, xMax: 5,yMin: 10, yMax: 20}))

    const ref = useRef()
    console.log(data)
    useEffect(() => {
        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const height = 500;
        const width = 1300;

        const radius = Math.min(width, height)/ 2 - 20;

        const graphSection = d3Node.attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


        const color = d3.scaleOrdinal()
            .domain(data)
            .range(["#AA7B16", "#16AA91", "#168BAA", "#60747A", "#a05d56"])

        const circle = d3.pie().value(d => d.x)

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
            .text((d) => d.data.x)
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
            .style("text-anchor", "middle")
            .style("font-size", 17)
    }, [ data ])

    return (
        <div className="p-2">
        <h2 className="text-center mb-5">Bar Chart</h2>
        <svg className="graph-default" ref={ref}>
        </svg>
        </div>
    )
}