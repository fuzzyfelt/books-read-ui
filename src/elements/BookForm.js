import { useState, useEffect } from 'react';

const getDate = () => {
  const d = new Date();
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-');
}

export default function BookForm({session}) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState(null);

  console.log(`Session = ${session}`)

  const [formState, setFormState] = useState({
    date: getDate(),
    title: "",
    authors: [],
    publish_type: 'isbn',
    publish_id: "",
    recommend: 'FALSE',
    comment: "",
    session: session
  });


  function handleInputChange(e) {

    console.log(">>>" + JSON.stringify(formState));

    const target = e.target;
    const name = target.name;

    //Handle authors multi-select
    if (target.name === 'authors') {
      const options = e.target.options;
      const selected = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }

      setFormState(
        prevState => ({
          ...prevState,
          authors: selected
        }));
      return;
    }

    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormState(
      prevState => ({
        ...prevState,
        [name]: value
      }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formState);
    fetch('http://localhost:7000/add/book', {
      method: 'POST',
      body: JSON.stringify(formState),
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
            Date: <input type='date' id="date" name='date' value={formState.date} onChange={handleInputChange} required />
          </label>
          <br />
          <label>
            Book Title: <input id="title" name="title" type="text" value={formState.title} onChange={handleInputChange} required minLength="3" />
          </label>
          <br />
          <label>
            Author(s): <select name='authors' id="authors" value={formState.authors} onChange={handleInputChange} multiple>
              {authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
            </select>
          </label>
          <hr />
          ID<br />
          <div>
          <label>
            ISBN: <input type="radio" name="publish_type" value="isbn" checked={formState.publish_type === 'isbn' ? true : false} onChange={handleInputChange} />
          </label>
          <label>
            ASIN: <input type="radio" name="publish_type" value="asin" checked={formState.publish_type === 'asin' ? true : false} onChange={handleInputChange}/>
          </label>
          </div>
          <br />
          <input id="publish_id" name="publish_id" type="text" value={formState.publish_id} onChange={handleInputChange} required />
          <hr />
          Recommend?<br />
          <div>
          <label>
            Yes: <input type="radio" id="rec_yes" name="recommend" value="TRUE" checked={formState.recommend === 'TRUE' ? true : false} onChange={handleInputChange} />
          </label>
          <label>
            No: <input type="radio" id="rec_no" name="recommend" value="FALSE" checked={formState.recommend === 'FALSE' ? true : false} onChange={handleInputChange}/>
          </label>
          </div>
          <br />
          <textarea name="comment" id="comment" value={formState.comment} cols="30" rows="2" placeholder="Optional comment" onChange={handleInputChange}></textarea>
          <hr />
          <button type="submit">Submit form</button>
        </form>)}
    </>
  )
}