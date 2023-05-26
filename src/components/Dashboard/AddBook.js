
import { useOutletContext } from "react-router-dom";
import BookForm from "../../elements/BookForm";

export default function AddBook() {

  const {session} = useOutletContext()
  console.log(`Sessionb = ${session}`)
  return <>
    <h1>Book Form</h1>
    <BookForm session={session}/>
  </>
}