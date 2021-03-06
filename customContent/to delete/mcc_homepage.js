jQuery(document).ready(function() {
    var logoImg = jQuery("<img></img>");
    logoImg.attr("src", "https://rawgit.com/SaguaroPrint/saguaroprint.github.io/master/img/logo_min_university.png").css("float", "left").css("vertical-align", "middle").css("max-height", "45px").css("margin-left", "10%");
    var logoTxt = jQuery("<img></img>");
    logoTxt.attr("src", "https://rawgit.com/SaguaroPrint/UnivPortal/master/img/uoc.png").css("float", "left").css("vertical-align", "middle").css("max-height", "45px").css("margin-left", "5px");
    //full width Table
    jQuery("#ENUSmain").css("width", "100%");

    //Banner customization
    /*
    jQuery("#ctl00_ImageControlPageHeader").css({
        "max-height": "300px",
        "min-width": "100%",
        "flex-shrink": "0",
        "object-fit": "cover",
        "border-top": "2px solid #0074c7 !important",
        "box-shadow": "0px -3px 4px rgba(0,0,0,.2)",
        "border-bottom": "2px solid #0074c7 !important",
        "box-shadow": "0px 3px 4px rgba(0,0,0,.2)",
        "object-position": "0% 40%"
    });*/
    jQuery("#PageType01").css({
        "background-color": "#09121B"
    });
    jQuery(".NavTop").css("background", "#ffffff");
    jQuery(".NavTop").css("padding", "20px 0px").css("font-family", "Helvetica Neue,Helvetica,Arial").css("font-size", "14px").css("color", "#333").css("font-weight", "600");
    jQuery(".NavTop").find("a").css("color", "#333").css("font-family", "Helvetica Neue,Helvetica,Arial").css("font-size", "14px").css("text-decoration", "none").css("font-weight", "600");

    //hover function
    jQuery(".NavTop").find("a").hover(function() {
        jQuery(this).css("color", "#d42000").css("border-bottom", "2px solid #d42000").css("padding-bottom", "3px").css("text-decoration", "none");
    }, function() {
        jQuery(this).css("color", "#333").css("border-bottom", "");
    });


    //Add logo and Text
    jQuery(".NavTop").prepend(logoTxt);
    jQuery(".NavTop").prepend(logoImg);

    //jQuery(".NavTop").prepend("<h1> University </h1>").css(".navbar-brand");

    //remove DOM elements
    jQuery("#ctl00_ctl08_CatalogSearchBox_txtSearchText").remove();
    jQuery(".spSearch").remove();
    jQuery("#ctl00_ctl08_lblUserName").remove();
    jQuery("#ctl00_ctl08_imgDivider1").remove();
    jQuery("#ctl00_ctl08_spUserName").remove();
    jQuery("#sn_share").remove();


    //Main Menu modifications.
    var mccMenuLeft = jQuery(".NavTop > div").children().last().prev();
    var mccMenuRight = jQuery(".NavTop > div").children().last();

    //Modify menu CSS
    jQuery(mccMenuLeft).css("float", "right").css("display", "inline-block").css("margin-right", "20px").css("vertical-align", "middle").css("text-transform", "uppercase").css("margin-top", "20px").css("margin-bottom", "auto");
    jQuery(mccMenuRight).css("float", "").css("display", "inline-block").css("margin-right", "20px").css("vertical-align", "middle").css("text-transform", "uppercase").css("margin-top", "20px").css("margin-bottom", "auto");

    // change cart icon to black
    jQuery("#ctl00_ctl08_lnkImgCart > img").attr("src", "images/cart_black.png");
	
	//Build the Banner Section  (Row -> Column -> Span Headers -> Search Box) 
		
	jQuery(".MastHead").append('<div class="container"><div class="row" id="bannerRow"><div class="col-md-12" id="bannerColumn"><span id="bannerHead">Welcome to our University Courses Portal</span><span id="bannersubhead"> Find any course on our portal in minutes</span><div id="searchbox"><button class="btn btn-sm btn-success" id="searchButton"><i class="fa fa-search" id="searchicon" aria-hidden="true"></i> Search </button><input type="text" id="searchField"></div></div></div></div>');

    // redirect to landing page
    var logoutHref = jQuery("#ctl00_ctl08_btnLogOut").attr("href");
    var landingPage = "https://ricoheurope.github.io";
    jQuery("#ctl00_ctl08_btnLogOut").attr("href", logoutHref + "; window.location.href = '" + landingPage + "'");

    /**
     * function to load a given css file
     */
    loadCSS = function(href) {
        var cssLink = jQuery("<link rel='stylesheet' type='text/css' href='" + href + "'>");
        jQuery("head").append(cssLink);
    };

    /**
     * function to load a given js file
     */
    loadJS = function(src) {
        var jsLink = jQuery("<script type='text/javascript' src='" + src + "'>");
        jQuery("head").append(jsLink);
    };

    // load the css file
    loadCSS("https://rawgit.com/SaguaroPrint/UnivPortal/master/css/main.css");
    loadCSS("https://rawgit.com/SaguaroPrint/UnivPortal/master/css/orderInfoCopy.css");

    jQuery("#ENUSmain").css("display", "table");

    // load the js file
    //loadJS("one.js");

});
