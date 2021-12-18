import "./App.css";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import ReactTable from "react-table";  


const App = (props) => {
  const [books,setBooks] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  useEffect(async () => {
    await getBooks();
  }, []);
const getBooks = (size,page) => {
  size=size?size:5;
  page=page?page:1;
  const url = `http://localhost:4000/api/books?size=${size}&page=${page}`;

  axios.get(url).then((res) => {
      const response = res.data;
      setBooks(response);
    }).catch((ex)=>{
      console.error(ex);
    });
}
const handleNavigation = (type) => {
switch (type) {
  case 'FIRST':
    getBooks();
    break;
    case 'PREV':
    getBooks(5, currentPage-1);
    break;
    case 'NEXT':
    getBooks(5, currentPage+1);
    break;
    case 'LAST':
    getBooks(5, 'last');
    break;

  default:
    break;
}

 

}

  return (
    <div>
       <table width="100%">
         <th>
           <tr>
           <td>ID</td>
           <td>BookName</td>
           <td>Author</td>
           </tr>
         </th>
         {books?.map((book)=><tr>
           <td>
{book.id}
           </td>
           <td>
{book.name}
           </td>
           <td>
{book.author}
           </td>
         </tr>)}
         
                </table>      
   <div>
     <button onClick={()=>handleNavigation('FIRST')}>First</button>
     <button onClick={()=>handleNavigation('PREV')}>Prev</button>
     <button onClick={()=>handleNavigation('NEXT')}>Next</button>
     <button onClick={()=>handleNavigation('LAST')}>Last</button>

   </div>
    </div>
  );
}

export default App;
