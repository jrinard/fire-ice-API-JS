
//run in terminal with node deleter.js

var booksJson = require("./../json/books.json");//source file
var fs = require('fs');

var cleanUp = function(books) {
  for (var i=0; i < books.length; i++) {
    var book = books[i];
    for (var key in book) {
      if (!(key === "Name" || key === "Id")) {
        delete book[key];
      }
    }
  }
  return books;
};


var booksClean = cleanUp(booksJson);

fs.writeFile("./../json/booksClean.json", JSON.stringify(booksClean)); //final file name
