import { useEffect, useState } from "react";
import React from 'react';
import './Booklist.css';
import { Book, BookListData } from "../types";

const pageSize = 20;
let currentPage = 1;


export function BookList() {

  const [data, setData] = useState<BookListData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchString, setSearchString] = useState("");

  const pageUp = () => {
    currentPage += 1;
    setLoading(true);
  }

  const pageDown = () => {
    currentPage -= 1;
    setLoading(true);
  }



  useEffect(() => {
    let query = searchString ? `&titleSearch=${searchString}` : "";
    console.log(`Query: ${query}`)
    fetch(`http://localhost:7000/books?page=${currentPage}` + query)
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
  }, [loading, searchString]);

  function handleSearchChange(e : any) {
    setSearchString(e.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    setLoading(true);
  }

  return (
    <div className="bookList">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <form method="post" className="flex-form" onSubmit={handleSubmit}>
        <input id="search" name="search" className="search-box" type="text" value={searchString} onChange={handleSearchChange}/>
      </form>
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
          {data && data.rows.length > 0 &&
            data.rows.map(({ id, title, date, recommend, authors, comment }: Book) => (
              <tr key={id}>
                <td>{title}</td>
                <td>{authors.join()}</td>
                <td>{recommend ? "⭐️" : "👎🏼"}</td>
                <td>{comment}</td>
                <td>{date as string}</td>
              </tr>
            ))}
            {data && data.rows.length === 0 &&
            <tr><td>No results found.</td></tr>}
        </tbody>
      </table>
      <div className="nav-footer">
        { data && data.rows.length > 0 && <p>Page {currentPage} of {Math.ceil(data.total_rows / pageSize)}.</p> }
        { (currentPage > 1) && <button className="nav-button" onClick={() => pageDown()}>Previous page</button> }
        { data && Math.ceil(data.total_rows / pageSize) > 1 && <button className="nav-button" onClick={() => pageUp()}>Next page</button>}
      </div>
    </div>);
}