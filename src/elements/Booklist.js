import { useEffect, useState } from "react";
import React from 'react';
import './Booklist.css';

const pageSize = 20;
let currentPage = 1;


const useInput = function ({ type /*...*/ }) {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
  return [value, input];
}

export function BookList() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const [search, searchInput] = useInput({ type: "text" });

  const pageUp= () => {
    currentPage += 1;
    loadPage(currentPage);
  }

  const pageDown= () => {
    currentPage -= 1;
    loadPage(currentPage);
  }

  const startSearch = () => {
    setSearching(true);
    loadPage();
  }

  const loadPage = (page = 1) => {
    let query = searching ? `&titleSearch=${search}` : ""
    fetch(`http://localhost:7000/books?page=${page}` + query)
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
      {searchInput}
      <button onClick={startSearch}>Search</button>
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
        <tbody>
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
          </tbody>
      </table>
      {data && <div><p>Page {currentPage} of {Math.ceil(data.total_rows / pageSize) }.</p>
      <button onClick={() => pageUp()}>Next page</button></div>}
      {(currentPage > 1) && <button onClick={() => pageDown()}>Previous page</button>}
    </div>);
}