var $portfolio;

var $portfolio_selectors;
var $portfolio_selectors_li;

var hashfilter;

$(document).ready(function () {




    // use for portfolio sotring with masonry

    $portfolio = $('.masonry-items');
    $portfolio_selectors = $('.portfolio-filter > li > a');
    $portfolio_selectors_li = $('.portfolio-filter li');

    hashfilter = "*";
    if(location.hash!=""){
        var temphashfilter = "." + location.hash.substr(1);
        if (temphashfilter==".*")
        {
            temphashfilter="*";
        }

        $portfolio_selectors.each(function(){
                 if ($(this).attr("data-filter") == temphashfilter) {
                    $portfolio_selectors_li.removeClass('active');
                    $portfolio_selectors_li.find('a[data-filter="'+temphashfilter+'"]').parent('li').addClass("active");

                    var autoscrolltoelement = function(){
                        $("html, body").animate({
                         scrollTop: $('.portfolio-filter').parents('section').offset().top-60
                        });
                    };
                    setTimeout(autoscrolltoelement, 500);
                    hashfilter=temphashfilter;
                 }
             });        
    }
       

    $portfolio.imagesLoaded(function () {
        $portfolio.isotope({
            filter: hashfilter,
            itemSelector: 'li',
            layoutMode: 'masonry'
        });
    });


    $portfolio_selectors.on('click', function () {
        $portfolio_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio.isotope({filter: selector});
       
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



    $(window).resize(function () {
        setTimeout(function () {
            $portfolio.isotope('layout');
        }, 500);
    });
});

/*==============================================================*/
// Main navigation href
/*==============================================================*/

$(document).ready(function () {
    $(document).on('click', '.menu-first-level > a:first-child', function() {
        var geturl = $(this).attr('data-redirect-url');
        if(geturl != '#' && geturl != ''){
            if ( $(this).attr('target') == '_blank') {
                window.open(geturl, '_blank');
            }else{
                window.location = geturl;
            }
        }
    });
});