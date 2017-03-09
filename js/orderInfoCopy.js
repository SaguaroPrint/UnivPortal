jQuery(document).ready(function() {

    // format order info copy tables
    var result = document.evaluate('//*[@id="ctl00_content_CtlAddToCart_InteractivityContainer_panelInteractivity"]/table/tbody/tr[1]/td[2]', document, null, 5, null);
    var el = result.iterateNext();
    el.style.width = "5%";

    // remove white space at the bottom
    result = document.evaluate('//*[@id="CtlCart"]/tbody/tr/td/table/tbody/tr/td[1]/div[8]', document, null, 5, null);
    el = result.iterateNext();
    el.style.visibility = "hidden";

    result = document.evaluate('//*[@id="CtlCart"]/tbody/tr/td/table/tbody/tr/td[1]/br[3]', document, null, 5, null);
    el = result.iterateNext();
    el.style.visibility = "hidden";

});
