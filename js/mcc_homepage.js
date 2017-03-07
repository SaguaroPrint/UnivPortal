jQuery(document).ready(function(){
var logoImg = $("<img></img>");
logoImg.attr("src","https://rawgit.com/SaguaroPrint/saguaroprint.github.io/master/img/logo_min_university.png").css("float","left").css("vertical-align","middle").css("max-height","45px").css("margin-left","10%");

//full width Table 
$("#ENUSmain").css("width","100%");

//banner customization
$("#ctl00_ImageControlPageHeader").css("max-height","500px").css("min-width","100%").css("flex-shrink","0").css("object-fit","cover");
$(".NavTop").css("padding","20px 0px !important");
$(".NavTop").css("background","#ff00ff !important");
$(".NavTop").prepend(logoImg);
//$(".NavTop").prepend("<h1> University </h1>").css(".navbar-brand");
$("#ctl00_ctl08_CatalogSearchBox_txtSearchText").remove();

});
