var House = require('./../js/ice-fire.js').houseModule;
var Character = require('./../js/ice-fire.js').characterModule;
var Book = require('./../js/ice-fire.js').bookModule;
var Searcher = require('./../js/ice-fire.js').searcherModule;

var displayHouseInfo = function(houseObject) {
  var houseInfo = houseObject.info;
  var validImages = ["stark", "arryn", "baratheon", "clegane", "greyjoy", "lannister", "mallister", "martell", "targaryen", "tully", "tyrell"];
  var houseImage;
  if(validImages.includes(houseObject.nameTag)) {
    houseImage = "./img/" + houseObject.nameTag + ".jpg";
  } else {
    houseImage = "./img/house.png";
  }
  // var houseImage = "./img/house.png";
  var houseHtml =
  '<div class="row">' + '<div class="col-sm-4">' +
  '<img class="bigimage" src="'+houseImage+'"/>'+'</div>'+
  '<div class="col-sm-8">' +
  '<h2>' + houseInfo.name + '</h2>' +
  '<h4><span class="titles">Region: </span>' + houseInfo.region + '</h4>' +
  '<h4><span class="titles">Coat of Arms: </span>' + houseInfo.coatOfArms + '</h4>' +
  '<h4><span class="titles">Slogan: </span>' + houseInfo.words + '</h4>' +
  '<h4><span class="titles">Titles: </span>' + houseInfo.titles + '</h4>' +
  '<h4><span class="titles">Ancestral Weapons: </span>' + houseInfo.ancestralWeapons + '</h4>' +
  '</div>' + '</div>';

  $("#showResult").html(houseHtml);
};

var displayCharacterInfo = function(characterObject) {
  var characterInfo = characterObject.info;
  var characterHtml =
  '<div class="row">' + '<div class="col-sm-4">' +
  '<img class="bigimage" src="./img/char.png"/>'+'</div>'+
  '<div class="col-sm-8">' +
  '<h2>' + characterInfo.name + '</h2>' +
  '<h4><span class="titles">Gender: </span>' + characterInfo.gender + '</h4>' +
  '<h4><span class="titles">Culture: </span>' + characterInfo.culture + '</h4>' +
  '<h4><span class="titles">Born: </span>' + characterInfo.born + '</h4>' +
  '<h4><span class="titles">Titles: </span>' + characterInfo.titles + '</h4>' +
  '<h4><span class="titles">Aliases: </span>' + characterInfo.aliases + '</h4>' +
  '</div>' + '</div>';
  $("#showResult").html(characterHtml);
};

var displaySearchInfo = function(searchObject) {
  var searchHtml = '<ul><h2>Search Results:<span id="cat" value="'+searchObject.category+'"></span></h2></ul>';
  $("#showResult").html(searchHtml);
  var searchInfo = searchObject.infoList;
  searchInfo.forEach(function(element){
    var searchHtml;
    if(searchObject.category === "characters") {
      searchHtml =
      '<br>'+'<li>'+
        '<h4 value="'+element.Name+'"><span class="titles">Name:</span> ' + element.Name+' &nbsp;&nbsp;&nbsp; <span value="'+element.Id+'" class="btn btn-xs btn-default viewInfo">View Info</span></h4>' +
        '<h4><span class="titles">Aliases:</span> ' + element.Aliases+'</h4>' +
      '</li>'+'<hr>';
    } else {
      searchHtml =
      '<br>'+'<li value="'+element.Id+'">'+
      '<h4 value="'+element.Name+'"><span class="titles">Name:</span> ' + element.Name+' &nbsp;&nbsp;&nbsp; <span value="'+element.Id+'" class="btn btn-xs btn-default viewInfo">View Info</span></h4>' +
      '</li>'+'<hr>';
    }
    $('#showResult ul').append(searchHtml);
    $(".viewInfo").on("click", viewInfo);
  });
};

var viewInfo = function(){
  var viewId = $(this).attr('value');
  var viewName = $(this).parent().attr('value');
  var viewCategory = $('#cat').attr('value');
  $('#showResult').empty().show();
  if (viewCategory === 'characters') {
    var newCharacter = new Character(viewId, viewName);
    newCharacter.getInfo(displayCharacterInfo);
  } else if (viewCategory === 'books') {
    var newBook = new Book(viewId, viewName);
    newBook.getInfo(displayBookInfo);
  } else if (viewCategory === 'houses') {
    var newHouse = new House(viewId, viewName);
    newHouse.getInfo(displayHouseInfo);
  }
};


$(document).ready(function() {
  $('img').click(function() {
    var houseId = $(this).parent().attr('value');
    var houseNameTag = $(this).parent().attr('id');
    var newHouse = new House(houseId, houseNameTag);
    newHouse.getInfo(displayHouseInfo);
    $('#house-box').hide();
  });

  $('#house-button').click(function(){
    $('#house-box').toggle();
    $('#showResult').empty();
  });

  $('.search-link').click(function() {
    $('#house-box').hide();
    var searchCategory = $(this).attr('id');
    var searchText = $('#search-text').val();
    if (searchText != "") {
      var newSearcher = new Searcher(searchCategory,searchText);
      newSearcher.search();
      $('#search-text').val("");
      $('#showResult').empty().show();
      displaySearchInfo(newSearcher);
    } else {
      $('#showResult').empty().show();
      $('#showResult').html("<h3>Please enter a name.</h3>")
    }
  });
});
