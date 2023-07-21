import AuthorForm from "../../elements/AuthorForm";
import { useOutletContext } from "react-router-dom";
import './formPage.css';

export default function AddAuthor() {

  const {session}: {session: string} = useOutletContext()
  return <>
    <h1>Author Form</h1>
    <div className="form_box"><AuthorForm session={session}/></div>
  </>
}