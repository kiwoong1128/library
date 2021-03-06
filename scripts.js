let myLibrary = []; //INTERNAL ARRAY
var booksTable = document.getElementById("books-table"); //ACTUAL TABLE DOM

let book1 = new Book("The Hobbit", "J.R.R. Tolkien",295, false);
let book2 = new Book("Ender's Game", "Orson Scott Card", 324, true);
myLibrary.push(book1);
myLibrary.push(book2);


render();

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = () => {
    let str = `${title} by ${author}, ${pages} pages, `;
    if(this.read === true) {
      str += "read";
    } else {
      str += "not read yet"
    }
    return str;
   }
}

function addBook() {
  const bookData = document.querySelectorAll('input');
  myLibrary.push(new Book(bookData[0].value, bookData[1].value, bookData[2].value, false));
  closeForm();
  render();
}


var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

/* DOM */


function render() {
  //If table is filled, clear all except header row
  if(booksTable.rows.length > 1) {
    while(booksTable.rows.length > 1) {
      booksTable.deleteRow(1);
    }
  }
  //add all books in library array into the table
  myLibrary.forEach(book => {
    var row = booksTable.insertRow(booksTable.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = book.title;
    /*  DELETE BUTTON */
      var p = document.createElement("span");
      p.textContent = " X ";
      p.className = 'delete';
      p.id = row.rowIndex;
      cell1.appendChild(p);
    cell1.className = "titles";
    cell2.textContent = book.author;
    cell3.textContent = book.pages;
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    if(book.read == true) {
      x.checked = true;
    }
    cell4.appendChild(x);
  });

  let titles = document.querySelectorAll(".delete");
  for(const title of titles) {
    title.addEventListener('click', function(event) {
      booksTable.deleteRow(parseInt(this.id));
      myLibrary.splice(parseInt(this.id - 1), 1);
      myLibrary.forEach(book => console.log(book));
    });
  }

}




function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  const bookData = document.querySelectorAll('input');
  for(let i = 0; i < bookData.length; i++) {
    bookData[i].value = "";
  }
  document.getElementById("myForm").style.display = "none";
}
