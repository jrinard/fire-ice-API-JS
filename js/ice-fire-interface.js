var houseTemplate = "<h3>House Stark</h3><p>Winter is coming!</p>";

var displayHouseInfo = function(houseId) {
  var houseResult = GotArchive.getHouseInfo(houseId);

  var houseHtml = ""//fill in later with template

  $("#showResult").html(houseHtml)
}

$(document).ready(function() {

  $('img').click(function() {
    $('#showResult').html(houseTemplate);
  });

});
