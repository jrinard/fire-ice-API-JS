function House(newId) {
  this.id = newId;
  this.info = null;
}

House.prototype.getInfo = function(displayFunction) {
  var that = this;
  $.get('http://www.anapioficeandfire.com/api/houses/' + that.id).then(
    function(response){
      that.info = response;
      displayFunction(that.info);
    });
  };

exports.houseModule = House;
