jQuery(document).ready(function() {
			var fetchItems = [];
			var inners = ["ALL"];
			var filters = ["*"];
			var obj = getItems();
			window.reasJSON = "{\"products\": [ ";
			
			for(var i=0; i < obj.l.length; i++) {
				filter = obj.l[i].innerHTML;
				inners.push(filter);
				filter = filter.replace(/\s/g, '');
				filters.push(filter);
				fetchItems.push(getCatalogItems(obj.l[i].id, filter, inners[i+1]));
			}
			
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
						window.reasJSON += "{ \"category\":\"" + category + "\", \"items\":[ ";
						var products = getItems(data);
						for(var i=0; i < products.l.length; i++) {
							var name = products.l[i].innerHTML;
							var js = jQuery(products.l[i]).attr("onclick");
							var description = products.d[i].innerHTML;
							var image = products.im[i].src;
							var li = newLi(js ,image, description, name, liClass);		
							var item = 
								"{ \"name\":\"" + name + "\"," +
								+ "\"description\":\"" + description + "\"," +
								+ "\"js\":\"" + js + "\"," +
								+ "\"image\":\"" + image + "\"} " + ((i == (products.l.length - 1))?"":",");
							window.reasJSON += item;
							ul.append(li);
						}
						window.reasJSON += "]},";
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
				jQuery("#catalogContent").remove();
				document.getElementById('ENUSmain').style.visibility = 'visible';
				var json = window.reasJSON;
				json = json.slice(0, -1);
				json += "]}";
				if (this.reasJSON == "") {
					document.cookie = "reas=" + json;
				}
			});		
	})