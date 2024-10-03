import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  effortHistory: number[];
};

const ProgressChart = ({ effortHistory }: Props) => {
  // Prepare data with session number and corresponding effort (max reps)
  const data = effortHistory.map((effort, index) => ({
    session: index + 1, // session number (1, 2, 3, ...)
    maxReps: effort, // max reps for that session
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="session"
          label={{ value: "Session", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis label={{ value: "Max Reps", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="maxReps" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
