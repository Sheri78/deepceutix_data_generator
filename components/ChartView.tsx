"use client";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface ChartViewProps {
  data: any;
  title: string;
  xLabel: string;
  yLabel: string;
}

export default function ChartView({ data, title, xLabel, yLabel }: ChartViewProps) {
  if (!data || !data.x || !data.y) {
    return (
      <div className="text-center text-gray-400 italic">
        No chart data available.
      </div>
    );
  }

  return (
    <Plot
      data={[
        {
          x: data.x,
          y: data.y,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "#6366f1" },
        },
      ]}
      layout={{
        title: { text: title },
        xaxis: { title: { text: xLabel } },
        yaxis: { title: { text: yLabel } },
        paper_bgcolor: "#fff", // changed from "transparent"
        plot_bgcolor: "#fff",  // changed from "transparent"
        font: { color: "#222" }, // optional: make font dark for white bg
      }}
      style={{ width: "100%", height: "400px" }}
    />
  );
}
