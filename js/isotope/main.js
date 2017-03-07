var portfolio;

var portfolio_selectors;
var portfolio_selectors_li;

var hashfilter;

jQuery(document).ready(function () {




    // use for portfolio sotring with masonry

    portfolio = jQuery('.masonry-items');
    portfolio_selectors = jQuery('.portfolio-filter > li > a');
    portfolio_selectors_li = jQuery('.portfolio-filter li');

    hashfilter = "*";
    if(location.hash!=""){
        var temphashfilter = "." + location.hash.substr(1);
        if (temphashfilter==".*")
        {
            temphashfilter="*";
        }

        portfolio_selectors.each(function(){
                 if (jQuery(this).attr("data-filter") == temphashfilter) {
                    portfolio_selectors_li.removeClass('active');
                    portfolio_selectors_li.find('a[data-filter="'+temphashfilter+'"]').parent('li').addClass("active");

                    var autoscrolltoelement = function(){
                        jQuery("html, body").animate({
                         scrollTop: jQuery('.portfolio-filter').parents('section').offset().top-60
                        });
                    };
                    setTimeout(autoscrolltoelement, 500);
                    hashfilter=temphashfilter;
                 }
             });        
    }
       

    portfolio.imagesLoaded(function () {
        portfolio.isotope({
            filter: hashfilter,
            itemSelector: 'li',
            layoutMode: 'masonry'
        });
    });


    portfolio_selectors.on('click', function () {
        portfolio_selectors.parent().removeClass('active');
        jQuery(this).parent().addClass('active');
        var selector = jQuery(this).attr('data-filter');
        portfolio.isotope({filter: selector});
       
        if (selector.substr(1)!="" && selector.substr(1)!="#")
        {
             location.hash = selector.substr(1);     
        }
        else
        {
            location.hash ="*";
        }
        return false;
    });



    jQuery(window).resize(function () {
        setTimeout(function () {
            portfolio.isotope('layout');
        }, 500);
    });
});

/*==============================================================*/
// Main navigation href
/*==============================================================*/

jQuery(document).ready(function () {
    jQuery(document).on('click', '.menu-first-level > a:first-child', function() {
        var geturl = jQuery(this).attr('data-redirect-url');
        if(geturl != '#' && geturl != ''){
            if ( jQuery(this).attr('target') == '_blank') {
                window.open(geturl, '_blank');
            }else{
                window.location = geturl;
            }
        }
    });
});