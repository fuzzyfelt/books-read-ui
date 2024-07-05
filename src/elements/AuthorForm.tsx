import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthorForm({session}:{session: string}) {

  console.log(`Session = ${session}`)
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [result, setResult] = useState("")

  function handleInputChange(e: any) {
    setAuthor(e.target.value);
  }


  function handleSubmit(event: any) {
    event.preventDefault();

    fetch('/add/author', {
      method: 'POST',
      body: JSON.stringify({ author, session }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(!response.ok) {
        //problem
        setResult("An error occurred")
      } else {
        navigate('/dashboard');
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
      <p>{result}</p>
    </form>
  )
}