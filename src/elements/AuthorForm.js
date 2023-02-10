
export default function AuthorForm() {


  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch('http://localhost:7000/add/author', { 
      method: 'POST', 
      body: JSON.stringify(formJson),
      headers: {
        'Content-Type': 'application/json'
      } });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Author name: <input name="name"/>
      </label>
      <hr />
      <button type="submit">Submit form</button>
    </form>
  )
}