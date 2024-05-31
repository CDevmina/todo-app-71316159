import React from "react";
import "./Pagination.css";

function Pagination({ totalTasks, tasksPerPage, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="Pagination">
        <li className="Page-backward">
          <a
            onClick={() =>
              paginate(currentPage !== 1 ? --currentPage : currentPage)
            }
            href="!#"
            className="Page-link"
          >
            &lt;
          </a>
          {console.log(currentPage)}
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`Page-number ${number === currentPage && "Selected"}`}
          >
            <a onClick={() => paginate(number)} href="!#" className="Page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="Page-forward">
          <a
            onClick={() =>
              paginate(
                currentPage !== pageNumbers.length ? ++currentPage : currentPage
              )
            }
            href="!#"
            className="Page-link"
          >
            &gt;
          </a>
          {console.log(currentPage)}
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
