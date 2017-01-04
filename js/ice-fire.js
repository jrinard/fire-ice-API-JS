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
