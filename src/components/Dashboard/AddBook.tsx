import { useOutletContext } from "react-router-dom";
import BookForm from "../../elements/BookForm";
import './formPage.css';

export default function AddBook() {

  const {session}: {session: string} = useOutletContext()
  return <>
    <h1>Book Form</h1>
    <div className="form_box"><BookForm session={session}/></div>
  </>
}