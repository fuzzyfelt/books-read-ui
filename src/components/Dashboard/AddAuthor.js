import AuthorForm from "../../elements/AuthorForm";
import { useOutletContext } from "react-router-dom";

export default function AddAuthor() {

  const {session} = useOutletContext()
  console.log(`SessionA = ${session}`)
  return <>
    <h1>Author Form</h1>
    <AuthorForm session={session}/>
  </>
}