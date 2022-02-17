import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import {createHistogramData} from 'utils/data';


export default function HistoChart({dataCount}) {

    const [data, setData] = useState([])
    const ref = useRef()

    useEffect(() => {
      setData(createHistogramData((dataCount+ 2) * 100))
    }, [dataCount])

    useEffect(() => {
        // Integrate Graph here from Ref
        d3.selectAll("g").remove();
        d3.selectAll("path").remove();

        
        const d3Node = d3.select(ref.current)
        const height = 550;
        const width = 1000;

        const svg = d3Node.attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform",
            "translate(" + 100 + "," + 10 + ")");

        const x = d3.scaleLinear()
        .domain([0, (dataCount+ 2) * 100])
        .range([0, width])

        // Append X 
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        const histo = d3.histogram()
            .value((d) => d) 
            .domain(x.domain())
            .thresholds(x.ticks(50))

        const bins =  histo(data);

        // Append Y
        var y = d3.scaleLinear()
            .range([height, 100]);
        y.domain([0, d3.max(bins, (d) => d.length)]);  

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
              .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
              .attr("height", function(d) { return height - y(d.length); })
              .style("fill", "#69b3a2")
    }, [ data ])



    return (
        <div className="p-2">
            <h2 className="text-center mb-5">Histogram Chart</h2>
            <svg className="graph-default" ref={ref}>
            </svg>
        </div>
    )
}