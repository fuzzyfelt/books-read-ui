import { useState, useEffect } from 'react';

export default function BookForm() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch('http://localhost:7000/add/book', { 
      method: 'POST',
      body: JSON.stringify(formJson),
      headers: {
        'Content-Type': 'application/json'
      } });
  }

  useEffect(() => {
    fetch(`http://localhost:7000/authors`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error retrieving authors: ${response.status}`)
        }
        return response.json()
      })
      .then((loadedData) => {
        setAuthors(loadedData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {authors && (
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Date: <input type='date' id="date" name='date' required/>
        </label>
        <br />
        <label>
          Book Title: <input id="title" name="title" type="text" required minlength="3"/>
        </label>
        <br />
        <label>
          Author(s): <select name='authors' id="authors" multiple>
            {authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
          </select>
        </label>
        <hr />
        ID<br/>
        <label>
          ISBN: <input type="radio" name="publish_type" value="isbn" checked={true} />
        </label>
        <label>
          ASIN: <input type="radio" name="publish_type" value="asin"/>
        </label>
        <br />
        <input id="publish_id" name="publish_id" type="text" required />
        <hr />
        Recommend?<br/>
        <label>
          Yes: <input type="radio" id="rec_yes" name="recommend" value="TRUE" checked={true} />
        </label>
        <label>
          No: <input type="radio" id="rec_no" name="recommend" value="FALSE"/>
        </label>
        <br />
        <textarea class="form-control" name="comment" id="comment" cols="30" rows="2" placeholder="Optional comment"></textarea>
        <hr />
        <button type="submit">Submit form</button>
      </form>)}
    </>
  )
}