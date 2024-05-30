import "./App.css";
import { useState, useEffect } from "react";
import Bell_High from "./Assets/Priority-High.svg";
import Bell_Medium from "./Assets/Priority-Medium.svg";
import Bell_Low from "./Assets/Priority-Low.svg";
import Avatar1 from "./Assets/Avatar-1.svg";
import Avatar2 from "./Assets/Avatar-2.svg";
import Pagination from "./Pagination";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Feed Dummy Data
const feedData = [
  {
    id: 1,
    img: Avatar1,
    name: "Kushantha Charuka",
    desc: "Contract #00124 need John Beige signature",
  },
  {
    id: 2,
    img: Avatar2,
    name: "John Beige",
    desc: "Draft #00124 need to be reviewed and signed by Kushantha Charuka",
  },
  {
    id: 3,
    img: Avatar1,
    name: "John Doe",
    desc: "Contract #00125 need John Beige signature",
  },
];

function Task({ task }) {
  // Date formatting
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  };

  // Priority Bell color
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
    <div className="Tasks">
      <h2>{task.todo}</h2>
      <p>Status: {task.completed ? "Completed" : "In Progress"}</p>
      <p>Date: {dateFormat(task.createdAt)}</p>
      <img src={bellColor(task.priority)} alt="Priority"></img>
    </div>
  );
}

function Feed({ item }) {
  return (
    <div className="Feed">
      <img src={item.img} alt="Avatar"></img>
      <p>
        {item.name} created {item.desc}
      </p>
    </div>
  );
}

function TaskPriorities({ data }) {
  //Counting task priorities
  const high = data.filter((task) => task.priority === "HIGH").length;
  const medium = data.filter((task) => task.priority === "MEDIUM").length;
  const low = data.filter((task) => task.priority === "LOW").length;

  //Chart data
  const chartData = {
    labels: ["Red", "Yellow", "Blue"],
    datasets: [
      {
        data: [high, medium, low],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="TaskPriorities">
      <h2>Task Priorities</h2>
      <Doughnut data={chartData} />
    </div>
  );
}

function App() {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(8);

  // Fetch data from API
  useEffect(() => {
    setLoading(true);
    fetch(`https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = data.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (data)
    return (
      <div className="App">
        <div className="Header">
          <div className="LeftNav">
            <div className="TopLeftContainer">
              <h1>Acmy Solutions</h1>
            </div>
            <ul>
              <li>Dashboard</li>
            </ul>
          </div>
          <div className="TopDashboard">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="MainContainer">
          <div className="Content">
            <h1>Tasks</h1>
            {currentTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            <Pagination
              tasksPerPage={tasksPerPage}
              totalTasks={data.length}
              paginate={paginate}
            />
            <h1>Activity Feed</h1>
            {feedData.map((item) => (
              <Feed key={item.id} item={item} />
            ))}
            <TaskPriorities data={data} />
          </div>
        </div>
      </div>
    );
}

export default App;
