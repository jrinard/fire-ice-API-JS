GotArchive.getHouseInfo = function(houseId) {
  var houseInfo = $.get('http://http://www.anapioficeandfire.com/api/houses/' + houseId);
  return houseInfo;
};
