	
	jQuery(window).on('load', function() {
	
			function getReasCookies() {
				var cookie = document.cookie;
				var pairs = cookie.split(";");
				var i = 0;
				while (i < pairs.length) {
					var pair = pairs[i].split("=");
					var name = pair[0];
					if (!name.startsWith("reas")) {
						pairs.splice(i, 1);
					} else {
						i++;
					}
				}
				return pairs;
			}
			
			var c = getReasCookies();
			if (c["reasCatalog"]) {
				return;
			} 
	
			

			var fetchItems = [];
			var inners = ["ALL"];
			var filters = ["*"];
			window.reasProducts = [];
			window.reasCategories = [];
			
			var obj = getItems();
			var reasCatalog = "{\"catalog\": [ ";
			for(var i=0; i < obj.l.length; i++) {
				filter = obj.l[i].innerHTML;
				inners.push(filter);
				reasCatalog += "\"" + filter + "\"" + ((i == (obj.l.length - 1))?"":",");
				filter = filter.replace(/\s/g, '');
				filters.push(filter);
				fetchItems.push(getCatalogItems(obj.l[i].id, filter, inners[i+1]));
			}
			reasCatalog += "]}";
			window.reasCatalog = "reasCatalog=" + JSON.stringify(reasCatalog);
			
			var filterCol = newFilter({ filters: filters,	inners: inners});
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
	
			function getCatalogItems(catalogId, liClass, category) {
				theForm.__EVENTTARGET.value = catalogId.replace(/_/g, '$');
				return jQuery.ajax({
					type: theForm.method,
					url: theForm.action,
					data: $(theForm).serialize(),
					success: function (data, textStatus, jqXHR) {
						var reasCategory = "{ \"category\":\"" + category + "\", \"items\":[ ";
						var products = getItems(data);
						for(var i=0; i < products.l.length; i++) {
							var name = products.l[i].innerHTML;
							var js = jQuery(products.l[i]).attr("onclick");
							var description = products.d[i].innerHTML;
							var image = products.im[i].src;
							var li = newLi(js ,image, description, name, liClass);		
							var item = "{ \"name\":\"" + name + "\",\"description\":\"" + description + "\",\"js\":\"" + js.replace(/\"/g, '\'') + "\",\"image\":\"" + image + "\"} ";
							window.reasProducts.push("reasProduct" + name.replace(/\s/g, '') + "=" + JSON.stringify(item));
							reasCategory += "\"" + name + "\"" + ((i == (products.l.length - 1))?"":",");
							ul.append(li);
						}
						reasCategory += "]}";
						window.reasCategories.push("reasCategory" + category.replace(/\s/g, '') + "=" + JSON.stringify(reasCategory));
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
				loadIsotope();
				document.getElementById('ENUSmain').style.visibility = 'visible';
				document.cookie = window.reasCatalog;
				for (var i = 0; i < window.reasCategories.length; i++) {
					document.cookie = window.reasCategories[i];
				}
				for (var i = 0; i < window.reasProducts.length; i++) {
					document.cookie = window.reasProducts[i];
				}
			});		
	})	