import { useEffect, useState } from "react";
import React from 'react';
import './Booklist.css';

const pageSize = 20;
let currentPage = 1;

export function BookList() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageUp= () => {
    currentPage += 1;
    loadPage(currentPage);
  }

  const pageDown= () => {
    currentPage -= 1;
    loadPage(currentPage);
  }

  const loadPage = (page = 1) => {
    fetch(`http://localhost:7000/books?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error retrieving books: ${response.status}`)
        }
        return response.json()
      })
      .then((loadedData) => {
        setData(loadedData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    loadPage(1);
  }, []);


  return (
    <div className="bookList">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <table className="main-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Recommend</th>
            <th>Comment</th>
            <th>Finished</th>
          </tr>
        </thead>
        {data &&
          data.rows.map(({ id, title, date, recommend, authors, comment }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{authors.join()}</td>
              <td>{recommend ? "⭐️" : "👎🏼"}</td>
              <td>{comment}</td>
              <td>{date}</td>
            </tr>
          ))}
      </table>
      {data && <div><p>Page {currentPage} of {Math.ceil(data.total_rows / pageSize) }.</p>
      <button onClick={() => pageUp()}>Next page</button></div>}
      {(currentPage > 1) && <button onClick={() => pageDown()}>Previous page</button>}
    </div>);
}