import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  effortHistory: number[];
};

const ProgressChart = ({ effortHistory }: Props) => {
  // Prepare data with session number and corresponding effort (max reps)
  const data = effortHistory.map((effort, index) => ({
    maxReps: effort, // max reps for that session
    session: index + 1, // session number (1, 2, 3, ...)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 30, bottom: 40 }} // Add margin to bottom for XAxis label
      >
        <XAxis
          dataKey="session"
          label={{ value: "Session", position: "bottom", offset: 10, style: { fontSize: "12px" } }} // Position label outside chart
        />
        <YAxis
          label={{
            value: "Max Reps",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: "12px" },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "black", // Set tooltip background color to black
            border: "none",
            borderRadius: "5px",
            color: "white", // Set text color to white
          }}
          // Customizing the tooltip's label (for session number)
          labelFormatter={(label) => `Session ${label}`}
          // Customizing the tooltip's value (for max reps)
          formatter={(value) => [`Max Reps: ${value}`]}
        />
        <Line type="monotone" dataKey="maxReps" stroke="#ffffff" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
