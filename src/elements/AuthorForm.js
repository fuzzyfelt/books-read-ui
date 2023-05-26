import { useState } from 'react';

export default function AuthorForm({session}) {

  console.log(`Session = ${session}`)

  const [author, setAuthor] = useState("");

  function handleInputChange(e) {
    setAuthor(e.target.value);
  }


  function handleSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:7000/add/author', {
      method: 'POST',
      body: JSON.stringify({ author, session }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Author name: <input name="name" value={author} onChange={handleInputChange} />
      </label>
      <hr />
      <button type="submit">Submit form</button>
    </form>
  )
}