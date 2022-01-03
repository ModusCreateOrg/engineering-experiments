import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

export default function BarGraph({data}) {
    const ref = useRef()

    useEffect(() => {
        // Integrate Graph here from Ref
        const d3Node = d3.select(ref.current)
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const height = 400;
        const width = 1400;
        const x =  d3
        .scaleBand()
        .domain(data.map((d) => d.x))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.5);

        const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .rangeRound([height - margin.bottom, margin.top]);

        const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      d3Node.select(".x-axis").call(xAxis);
      d3Node.select(".y-axis").call(y1Axis);

      d3Node
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.x))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.y))
        .attr("height", (d) => y(0) - y(d.y));
    }, [ data ])

    return (
        <>
        <h2 className="text-center">BarChart</h2>
        <svg style={{ margin: "0 auto", height: 400, width: 1000, }} ref={ref}>
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
        </>
    )
}