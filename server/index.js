const express = require("express");
const app = express();
const cors = require("cors");
const books = require('./books');

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const PORT = 4000;

const getBooks = async (req, res, next) => {
  try {
    let response = [] ;
    const filters = req.query;
    const size = filters['size']?filters['size']:books.length;
    let page= filters['page']?filters['page']:1;
    const title= filters['title']?filters['title']:'';
    if(page==='last'){
      page= Math.ceil(books.length/size);
    }
    let bookEndIndex= page * size;
      let bookStartIndex=(page-1)*size;
      
    if(title.length >0){
    let filteredBooks = books.filter((x)=>x.name.trim() === title.trim());
      console.log(filteredBooks);
     response = filteredBooks.slice(bookStartIndex,bookEndIndex) ;
    }else{
     response = books.slice(bookStartIndex,bookEndIndex) ;
    }
  
  res.send(response);
  
    
  } catch (err) {
    next(err);
  }
};


app.get("/api/books", getBooks);


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
