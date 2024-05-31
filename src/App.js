import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import Profile from "./Assets/Profile.svg";
import Vector from "./Assets/Vector.svg";
import DashboardIcon from "./Assets/Dashboard.svg";
import NotificationIcon from "./Assets/Notifications.svg";
import ArrowDown from "./Assets/Chevron-down.svg";
import Pagination from "./Pagination";
import Task from "./Tasks";
import TaskPriorities from "./TaskPriorities";
import Feed from "./Feed";
import Avatar1 from "./Assets/Avatar-1.svg";
import Avatar2 from "./Assets/Avatar-2.svg";
import Close from "./Assets/Close.svg";

// Create a context
export const AppContext = createContext();

// Feed Dummy Data
const feedData = [
  {
    id: 1,
    img: Avatar1,
    name: "Kushantha Charuka",
    desc: "Contract #00124 need John Beige signature",
    datetime: "2023-06-01 10:00 AM",
  },
  {
    id: 2,
    img: Avatar2,
    name: "John Beige",
    desc: "Draft #00124 need to be reviewed and signed by Kushantha Charuka",
    datetime: "2023-06-02 02:30 PM",
  },
  {
    id: 3,
    img: Avatar1,
    name: "John Doe",
    desc: "Contract #00125 need John Beige signature",
    datetime: "2023-06-03 11:15 AM",
  },
  {
    id: 4,
    img: Avatar1,
    name: "John Doe",
    desc: "Contract #00125 need John Beige signature",
    datetime: "2023-06-03 11:15 AM",
  },
  {
    id: 5,
    img: Avatar1,
    name: "John Doe",
    desc: "Contract #00125 need John Beige signature",
    datetime: "2023-06-03 11:15 AM",
  },
  {
    id: 6,
    img: Avatar1,
    name: "John Doe",
    desc: "Contract #00125 need John Beige signature",
    datetime: "2023-06-03 11:15 AM",
  },
];

// Sidebar component
const Sidebar = () => (
  <div className="SidebarTitle">
    <h2>Acmy Solutions</h2>
  </div>
);

const SidebarNav = () => (
  <div className="SidebarNav">
    <nav>
      <ul>
        <li>
          <img src={DashboardIcon} alt="DashboardIcon" />
          <p>Dashboard</p>
        </li>
      </ul>
    </nav>
  </div>
);

// Header component
const Header = () => (
  <div className="Header">
    <h1>Dashboard</h1>
    <div className="Profile">
      <a href="!#">
        <img src={NotificationIcon} alt="Notifications" />
      </a>
      <a href="!#">
        <img src={Profile} alt="Profile" />
      </a>
      <a href="!#">
        <img src={ArrowDown} alt="options" />
      </a>
    </div>
  </div>
);

// Welcome component
const Welcome = () => (
  <div className="Welcome">
    <h1>Welcome back, John Doe</h1>
    <p>
      The end of the year is coming. Are you planning your performance
      interviews? You can do this super efficiently with Acmy.
    </p>
    <a href="!#">Look here for more information</a>
  </div>
);

// Vector component
const WelcomeVector = () => (
  <div className="Vector">
    <img src={Vector} alt="Vector" />
    <a href="!#" className="CancelButton">
      <img src={Close} alt="Close"></img>
    </a>
  </div>
);

// App component
const App = () => {
  // State Variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(8);

  // Fetch Data from API
  useEffect(() => {
    setLoading(true);
    fetch(`https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do`)
      .then((response) => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);

  // Pagination Logic
  const indexofLastTask = currentPage * tasksPerPage;
  const indexofFirstTask = indexofLastTask - tasksPerPage;
  const currentTasks = data.slice(indexofFirstTask, indexofLastTask);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <AppContext.Provider value={{ currentTasks, paginate }}>
      <div className="App">
        <div className="SidebarSection">
          <Sidebar />
          <SidebarNav />
        </div>
        <Header />
        <div className="WelcomeSection">
          <Welcome />
          <WelcomeVector />
        </div>
        <main className="MainContent">
          <div className="TasksSection">
            <h2>Tasks</h2>
            {currentTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            <Pagination
              tasksPerPage={tasksPerPage}
              totalTasks={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
          <div className="FeedSection">
            <h2>Activity Feed</h2>
            {feedData.map((item) => (
              <Feed key={item.id} item={item} />
            ))}
          </div>
          <TaskPriorities data={data} />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
