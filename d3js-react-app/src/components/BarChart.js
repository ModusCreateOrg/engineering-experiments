import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { createRandomData } from 'utils/data';


export default function BarChart({dataCount}) {

    const [data, setData] = useState([])
    const ref = useRef()

    useEffect(() => {
      setData(createRandomData({xMin: 1, xMax: dataCount, yMin:10, yMax: 50}))
    }, [dataCount])

    useEffect(() => {
        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const margin = { top: 20, right: 10, bottom: 30, left: 40 };
        const height = 600;
        const width = 1200;
        const x =  d3
        .scaleBand()
        .domain(data.map((d) => d.x))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.4);

        const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .rangeRound([height - margin.bottom, margin.top]);

        const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
        );

        const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));


      d3Node.select(".x-axis").call(xAxis);
      d3Node.select(".y-axis").call(yAxis);

      d3Node
        .select(".plot-area")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.x))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.y))
        .attr("height", (d) => y(0) - y(d.y))
        .attr("fill", "orange");
    }, [ data ])



    return (
        <div className="p-2">
          <h2 className="text-center mb-5">Bar Chart</h2>
          <svg className="graph-default" ref={ref}>
              <g className="plot-area" />
              <g className="x-axis" />
              <g className="y-axis" />
          </svg>
        </div>
    )
}