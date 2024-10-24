import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PriceChartProps {
  data: number[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const chartData = data.map((price, index) => ({ name: index, price }));

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#4F46E5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
