jQuery(document).ready(function(){
var logoImg = jQuery("<img></img>");
logoImg.attr("src","https://rawgit.com/SaguaroPrint/saguaroprint.github.io/master/img/logo_min_university.png").css("float","left").css("vertical-align","middle").css("max-height","45px").css("margin-left","10%");
var logoTxt = jQuery("<img></img>");
logoTxt.attr("src","https://rawgit.com/SaguaroPrint/UnivPortal/master/img/uoc.png").css("float","left").css("vertical-align","middle").css("max-height","45px").css("margin-left","5px");
//full width Table 
jQuery("#ENUSmain").css("width","100%");

//banner customization
jQuery("#ctl00_ImageControlPageHeader").css("max-height","500px").css("min-width","100%").css("flex-shrink","0").css("object-fit","cover");
jQuery(".NavTop").css("padding","20px 0px").css("font-family","Helvetica Neue").css("font-size","14px").css("color","#333");
jQuery(".NavTop").css("background","#ffffff");
jQuery(".NavTop").prepend(logoTxt);
jQuery(".NavTop").prepend(logoImg);

//jQuery(".NavTop").prepend("<h1> University </h1>").css(".navbar-brand");

//remove DOM elements
jQuery("#ctl00_ctl08_CatalogSearchBox_txtSearchText").remove();
jQuery(".spSearch").remove();


//Main Menu modifications.
var mccMenuLeft = jQuery(".NavTop div").last().prev();
var mccMenuRight = jQuery(".NavTop div").last();

jQuery(mccMenuLeft).css("float","right").css("display","inline-block").css("margin-right","20px").css("vertical-align","middle").css("text-transform","uppercase").css("margin-top","20px").css("margin-bottom","auto");
jQuery(mccMenuRight).css("float","").css("display","inline-block").css("margin-right","20px").css("vertical-align","middle").css("text-transform","uppercase").css("margin-top","20px").css("margin-bottom","auto");

});
