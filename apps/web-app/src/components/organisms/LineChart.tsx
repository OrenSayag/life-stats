import React from "react";
import { ChartParams } from "../../types/component-params/app.type";
import {
  Line,
  LineChart as RechartLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const LineChart: React.FC<ChartParams> = ({ data, className }) => {
  return (
    <div
      className={["w-full flex justify-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      <ResponsiveContainer width={"99%"} height={400}>
        <RechartLineChart
          height={100}
          width={100}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="value" stroke="#309700" dot={false} />
          <XAxis dataKey="key" />
          <YAxis />
        </RechartLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
