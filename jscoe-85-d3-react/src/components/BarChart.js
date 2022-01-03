import d3 from 'd3'
import { useEffect, useRef } from 'react'

export default function BarGraph() {
    const ref = useRef()

    useEffect(() => {
        console.log(ref)
    }, [])

    return (
        <>
        <div>BarChart</div>
        <svg ref={ref}>
            <g className="plot-area" />
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
        </>
    )
}