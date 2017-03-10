	
	
	jQuery(window).on('load', function() {
	
			function getReasCookies() {
				var reasCookies = {};
				var cookie = document.cookie;
				var pairs = cookie.split(";");
				var i = 0;
				for (var i =0; i< pairs.length; i++) {
					var pair = pairs[i].split("=");
					var name = pair[0];
					if (name.charAt(0) == " ") {
						name = name.substring(1, name.length);
					}
					if (name.startsWith("reas")) {
						reasCookies[name] = pair[1];
					}
				}
				return reasCookies;
			}
			
			var c = getReasCookies();
			if (c["reasCatalog"]) {
				var catalog = JSON.parse(unescape(c["reasCatalog"]));
				var filterCol = newFilter(catalog);
				var gridGallery = newGridGallery();
				var ul = gridGallery.ul;
				var galleryCol = gridGallery.galleryCol;	
				var imageGallery = isotopeSection(filterCol, galleryCol);
				
				/*
reasCatalog	{
	"catalog": [{
		"PromoPoster": "Promo Poster"
	}, {
		"LuggageTags": "Luggage Tags"
	}]
}


reasCategoryMarketingAssets	{
	"items": ["Contest Postcard", "Downloadable Logo", "Company brochure"]
}


reasProductBusinessCard {

	"name": "Business Card",
	"description": "It's a business card",
	"js": "location.href='https://eu.marcomcentral.app.pti.com/Ricoh_EU_Training/Ungureanu_Travel/addToCart.aspx?uigroup_id=4352&product_id=7&node_id=1714';return false;",
	"image": "https://images-eu.marcomcentral.app.pti.com/printonelogos/images/55/103/thumbnails/1690/BusCard_Preview.png"


}
*/
				for (var category in catalog) {
					if (category != "*") {
						var products = JSON.parse(unescape(c["reasCategory" + category]));
						for (var i = 0; i < products.items.length; i++) {
							var product = JSON.parse(unescape(c[products.items[i]]));
							var li = newLi(product.js ,product.image, product.description, product.name, category);	
							ul.append(li);
						}
					}
				}
				
				var result = document.evaluate('//*[@id="ENUSmain"]/tbody/tr/td/div[1]', 
					document, null, 5, null);
				var el = result.iterateNext();
	
				jQuery(el).append(imageGallery);
				jQuery("#catalogContent").remove();
				loadIsotope();
				document.getElementById('ENUSmain').style.visibility = 'visible';
				
				return;
			} 
	
			var fetchItems = [];
			var filters = {}
			filters["*"] = "ALL";
			
/*
reasCatalog {
	"MarketingAssets": "Marketing Assets",
	"Identity": "Identity",
	"LabTime": "Lab Time",
	"JobSubmission": "Job Submission"
}
*/			
			var obj = getItems();
			var reasCatalog = "{\"*\":\"ALL\"";
			for(var i=0; i < obj.l.length; i++) {
				var category = obj.l[i].innerHTML;
				var inner = category;
				var filter = category.replace(/\s/g, '');
				filters[filter] = inner;
				reasCatalog += ",\"" + filter + "\":\"" + inner + "\"";
				fetchItems.push(getCatalogItems(obj.l[i].id, filter, inner));
			}
			reasCatalog += "}";
			document.cookie = "reasCatalog=" + escape(reasCatalog);
			
			var filterCol = newFilter(filters);
			var gridGallery = newGridGallery();
			var ul = gridGallery.ul;
			var galleryCol = gridGallery.galleryCol;	
			var imageGallery = isotopeSection(filterCol, galleryCol);			
			
			function getItems(data) {
				var items;
				if (data) {
					var els = jQuery(data);
					items = jQuery('[id^="ctl00_content_CtlCatalogList_CtlCatalogItemRepeater_ct"]', els);
				} else {
					items = jQuery('[id^="ctl00_content_CtlCatalogList_CtlCatalogItemRepeater_ct"]');
				}
				var links = items.find('a[id$="SelectName"]');
				var images = items.find('input[id$="SelectItem"]');
				var descriptions = items.find('span[id$="Description"]');	
				return {i: items, l: links, im: images, d: descriptions};
			}			
	
			function getCatalogItems(catalogId, filter, category) {
				theForm.__EVENTTARGET.value = catalogId.replace(/_/g, '$');
				return jQuery.ajax({
					type: theForm.method,
					url: theForm.action,
					data: $(theForm).serialize(),
					success: function (data, textStatus, jqXHR) {
						var reasCategory = "{ \"items\":[ ";
						var products = getItems(data);
						for(var i=0; i < products.l.length; i++) {
							var name = products.l[i].innerHTML;
							var js = jQuery(products.l[i]).attr("onclick");
							var description = products.d[i].innerHTML;
							var image = products.im[i].src;
							var li = newLi(js ,image, description, name, filter);		
							var item = "{ \"name\":\"" + name + "\",\"description\":\"" + description + "\",\"js\":\"" + js.replace(/\"/g, '\'') + "\",\"image\":\"" + image + "\"} ";
							document.cookie = "reasProduct" + name.replace(/\s/g, '') + "=" + escape(item);
							reasCategory += "\"reasProduct" + name.replace(/\s/g, '') + "\"" + ((i == (products.l.length - 1))?"":",");
							ul.append(li);
						}
						reasCategory += "]}";
						document.cookie = "reasCategory" + filter + "=" + escape(reasCategory);
					},
					done: function(data) {
					}
				});
			}

			function removeOriginalCatalog() {
				var catalogContent = jQuery('#catalogContent');
				catalogContent.remove();
			}
			
			jQuery.when.apply(null, fetchItems).done(function(args) {
				/*   //*[@id="ENUSmain"]/tbody/tr/td/div[1]  */
				var result = document.evaluate('//*[@id="ENUSmain"]/tbody/tr/td/div[1]', 
					document, null, 5, null);
				var el = result.iterateNext();
	
				jQuery(el).append(imageGallery);
				jQuery("#catalogContent").remove();
				loadIsotope();
				document.getElementById('ENUSmain').style.visibility = 'visible';
			});		
	})