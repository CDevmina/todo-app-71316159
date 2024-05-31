import React from "react";
import "./TaskPriorities.css";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// TaskPriorities component
function TaskPriorities({ data }) {
  // Count Priorities
  const high = data.filter((task) => task.priority === "HIGH").length;
  const medium = data.filter((task) => task.priority === "MEDIUM").length;
  const low = data.filter((task) => task.priority === "LOW").length;

  // Chart Data
  const chartData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [high, medium, low],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Chart Options
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="TaskPriorities">
      <h2>Task Priorities</h2>
      <div className="DoughnutContainer">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default TaskPriorities;
