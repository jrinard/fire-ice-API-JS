var books = require('../json_data/booksClean.json');
var houses = require('../json_data/housesClean.json');
var characters = require('../json_data/charactersClean.json');

function House(newId, newName) {
  this.id = newId;
  this.nameTag = newName;
  this.info = null;
}

House.prototype.getInfo = function(displayFunction) {
  var that = this;
  $.get('http://www.anapioficeandfire.com/api/houses/' + that.id).then(
    function(response){
      that.info = response;
      displayFunction(that);
    });
  };

exports.houseModule = House;


function Searcher(category, searchValue) {
  this.category = category;
  this.searchValue = searchValue.toLowerCase();
  this.infoList = [];
}

Searcher.prototype.search = function() {
  var that = this;
  if (that.category === 'books') {
    for (var i=0; i < books.length; i++) {
      var book = books[i];
      for (var key in book) {
        var keyValue = book[key].toString().toLowerCase();
        if (keyValue.includes(that.searchValue)) {
          that.infoList.push(book);
        }
      }
    }
  } else if (this.category === 'houses') {
    // do stuff
  } else if (this.category === 'characters') {
    // do stuff
  }
};

exports.searcherModule = Searcher;
