var House = require('./../js/ice-fire.js').houseModule;

var displayHouseInfo = function(houseObject) {
  var houseInfo = houseObject.info;
  var houseHtml =
    '<img class="bigimage" src="./img/' + houseObject.nameTag + '.jpg"/>'+
    '<h2>' + houseInfo.name + '</h2>' +
    '<h4><span class="titles">Region: </span>' + houseInfo.region + '</h4>' +
    '<h4><span class="titles">Coat of Arms: </span>' + houseInfo.coatOfArms + '</h4>' +
    '<h4><span class="titles">Slogan: </span>' + houseInfo.words + '</h4>' +
    '<h4><span class="titles">Titles: </span>' + houseInfo.titles[0] + ', ' +    houseInfo.titles[1] + ', ' + houseInfo.titles[2] + '</h4>' +
    '<h4><span class="titles">Ancestral Weapons: </span>' + houseInfo.ancestralWeapons[0] + '</h4>';
  // '<h2>' + houseInfo.name + '</h2>' +
  //                 '<h4><span class="titles">Region: </span>' + houseInfo.region + '</h4>' +
  //                 '<h4><span class="titles">Coat of Arms: </span>' + houseInfo.coatOfArms + '</h4>' +
  //                 '<h4><span class="titles">Slogan: </span>' + houseInfo.words + '</h4>' +
  //                 '<h4><span class="titles">Titles: </span>' + houseInfo.titles[0] + ', ' +    houseInfo.titles[1] + ', ' + houseInfo.titles[2] + '</h4>' +
  //                 '<h4><span class="titles">Ancestral Weapons: </span>' + houseInfo.ancestralWeapons[0] + '</h4>';
  $("#showResult").html(houseHtml);
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
  })

});
