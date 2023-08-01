import React from "react";
import { ChartParams } from "../../types/component-params/app.type";
import {
  Pie,
  PieChart as RechartPieChart,
  PieLabel,
  ResponsiveContainer,
} from "recharts";
import strings from "../../assets/strings";

const PieChart: React.FC<ChartParams> = ({ data, className, renderLabel }) => {
  return (
    <div
      className={["w-full flex justify-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      {data.length > 0 && (
        <ResponsiveContainer width={"99%"} height={400}>
          <RechartPieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="key"
              cx="50%"
              label={renderLabel}
              labelLine={false}
              cy="50%"
              outerRadius={200}
              fill={"#313131"}
            />
          </RechartPieChart>
        </ResponsiveContainer>
      )}
      {data.length === 0 && <h3>{strings.finance.NO_DATA_FOR_FILTERS}</h3>}
    </div>
  );
};

export default PieChart;
