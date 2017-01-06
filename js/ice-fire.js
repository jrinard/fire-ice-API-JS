var books = require('../json_data/booksClean.json');
var houses = require('../json_data/housesClean.json');
var characters = require('../json_data/charactersClean.json');

function Book(newId, newName) {
  this.id = newId;
  this.nameTag = newName;
  this.info = null;
}

Book.prototype.getInfo = function(displayFunction) {
  var that = this;
  $.get('http://www.anapioficeandfire.com/api/books/' + that.id).then(
    function(response){
      that.info = response;
      displayFunction(that);
    }).fail(function(error) {
      console.log(error.responseJSON.message);
    });
  };

function Character(newId, newName) {
  this.id = newId;
  this.nameTag = newName;
  this.info = null;
}

Character.prototype.getInfo = function(displayFunction) {
  var that = this;
  $.get('http://www.anapioficeandfire.com/api/characters/' + that.id).then(
    function(response){
      that.info = response;
      displayFunction(that);
    }).fail(function(error) {
      console.log(error.responseJSON.message);
    });
  };

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
      var houseNameWords = that.info.name.split(" ");
      that.nameTag = houseNameWords[1].toLowerCase();
      displayFunction(that);
    }).fail(function(error) {
      console.log(error.responseJSON.message);
    });
  };


function Searcher(category, searchValue) {
  this.category = category;
  this.searchValue = searchValue.toLowerCase();
  this.infoList = [];
}

Searcher.prototype.search = function() {
  debugger
  var that = this;
  if (that.category === 'books') {
    for (var i=0; i < books.length; i++) {
      if (books[i].Name.toLowerCase().includes(that.searchValue)) {
        that.infoList.push(books[i]);
      }
    }
  } else if (this.category === 'houses') {
    for (var j=0; j < houses.length; j++) {
      if (houses[j].Name.toLowerCase().includes(that.searchValue)) {
        that.infoList.push(houses[j]);
      }
    }
  } else if (this.category === 'characters') {
    for (var k=0; k < characters.length; k++) {
      if (characters[k].Name.toLowerCase().includes(that.searchValue)) {
        that.infoList.push(characters[k]);
      } else {
        for(var l=0; l < characters[k].Aliases.length; l++) {
          var alias = characters[k].Aliases[l];
          if(alias != undefined){
            if (alias.toLowerCase().includes(that.searchValue)) {
              that.infoList.push(characters[k]);
            }
          }
        }
      }
    }
  }
};

exports.houseModule = House;
exports.characterModule = Character;
exports.bookModule = Book;
exports.searcherModule = Searcher;
