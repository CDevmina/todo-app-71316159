import React from "react";
import "./Tasks.css";

import Bell_High from "./Assets/Priority-High.svg";
import Bell_Medium from "./Assets/Priority-Medium.svg";
import Bell_Low from "./Assets/Priority-Low.svg";

// Task component
function Task({ task }) {
  // Date Format
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  };

  // Bell Color
  const bellColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return Bell_High;
      case "MEDIUM":
        return Bell_Medium;
      case "LOW":
        return Bell_Low;
      default:
        return Bell_Low;
    }
  };

  return (
    <div className="Task">
      <div className="Task-bell">
        <img src={bellColor(task.priority)} alt="Priority" />
      </div>
      <div className="Task-details">
        <h2>{task.todo}</h2>
        {task.completed === false && (
          <a href="!#" className="MarkAsDone">
            Mark as Done
          </a>
        )}
      </div>
      <div className="Task-status">
        <label className={task.completed === true ? "Complete" : "Incomplete"}>
          {task.completed === true ? "Done" : "In Progress"}
        </label>
        <p>Date: {dateFormat(task.createdAt)}</p>
      </div>
    </div>
  );
}

export default Task;
