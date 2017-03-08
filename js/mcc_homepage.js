jQuery(document).ready(function(){
var logoImg = jQuery("<img></img>");
logoImg.attr("src","https://rawgit.com/SaguaroPrint/saguaroprint.github.io/master/img/logo_min_university.png").css("float","left").css("vertical-align","middle").css("max-height","45px").css("margin-left","10%");
var logoTxt = jQuery("<img></img>");
logoTxt.attr("src","https://rawgit.com/SaguaroPrint/UnivPortal/master/img/uoc.png").css("float","left").css("vertical-align","middle").css("max-height","45px").css("margin-left","5px");
//full width Table
jQuery("#ENUSmain").css("width","100%");

//Banner customization
jQuery("#ctl00_ImageControlPageHeader").css("max-height","500px").css("min-width","100%").css("flex-shrink","0").css("object-fit","cover").css("border-top", "2px solid #0074c7 !important").css("box-shadow", "0px -3px 4px rgba(0,0,0,.2)").css("border-bottom", "2px solid #0074c7 !important").css("box-shadow", "0px 3px 4px rgba(0,0,0,.2)");
jQuery(".NavTop").css("background","#ffffff");
jQuery(".NavTop").css("padding","20px 0px").css("font-family","Helvetica Neue,Helvetica,Arial").css("font-size","14px").css("color","#333").css("font-weight","600");
jQuery(".NavTop").find("a").css("color","#333").css("font-family","Helvetica Neue,Helvetica,Arial").css("font-size","14px").css("text-decoration","none").css("font-weight","600");

//hover function
jQuery(".NavTop").find("a").hover(function(){jQuery(this).css("color","#d42000").css("border-bottom","2px solid #d42000").css("padding-bottom","3px").css("text-decoration","none");}, function(){jQuery(this).css("color","#333").css("border-bottom","");});


//Add logo and Text
jQuery(".NavTop").prepend(logoTxt);
jQuery(".NavTop").prepend(logoImg);

//jQuery(".NavTop").prepend("<h1> University </h1>").css(".navbar-brand");

//remove DOM elements
jQuery("#ctl00_ctl08_CatalogSearchBox_txtSearchText").remove();
jQuery(".spSearch").remove();


//Main Menu modifications.
var mccMenuLeft = jQuery(".NavTop > div").children().last().prev();
var mccMenuRight = jQuery(".NavTop > div").children().last();

//Modify menu CSS
jQuery(mccMenuLeft).css("float","right").css("display","inline-block").css("margin-right","20px").css("vertical-align","middle").css("text-transform","uppercase").css("margin-top","20px").css("margin-bottom","auto");
jQuery(mccMenuRight).css("float","").css("display","inline-block").css("margin-right","20px").css("vertical-align","middle").css("text-transform","uppercase").css("margin-top","20px").css("margin-bottom","auto");

});
