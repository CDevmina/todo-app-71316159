import React from "react";
import "./Feed.css";

// Feed component
const Feed = ({ item }) => (
  <div className="Feed">
    <ul>
      <li>
        <img src={item.img} alt="Avatar"></img>{" "}
        <div className="FeedContent">
          <p>
            {item.name} created {item.desc}
          </p>
          <span className="FeedDatetime">{item.datetime}</span>
        </div>
      </li>
    </ul>
  </div>
);

export default Feed;
