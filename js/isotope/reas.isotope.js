jQuery(window).on('load', function() {

			function getReasCookies() {
				var reasCookies = {};
				for (var i = 0; i < localStorage.length; i++){
					var name = localStorage.key(i);
					if (name.startsWith("reas")) {
						reasCookies[name] = unescape(localStorage.getItem(name));
					}
				}
				return reasCookies;
			}

			function removeOriginalCatalog() {
				jQuery('#catalogContent').remove();
			}

			var gallery = {
				test: function() {
					var c = getReasCookies();
					if (c["reasCatalog"]) {
						return {ready: true, c: c};
					} else {
						var data = createGalleryCookieData();
						return {ready: false, c: data};
					}
				},
				draw: function(c) {
					var catalog = JSON.parse(c["reasCatalog"]);
					var gridGallery = newGridGallery();
					var ul = gridGallery.ul;
					var imageGallery = isotopeSection(newFilter(catalog), gridGallery.galleryCol);

					for (var category in catalog) {
						if (category != "*") {
							var products = JSON.parse(c["reasCategory" + category]);
							for (var i = 0; i < products.items.length; i++) {
								var product = JSON.parse(c[products.items[i]]);
								var li = newLi(product.js ,product.image, product.description, product.name, category);
								ul.append(li);
							}
						}
					}

					var el = jQuery("#ctl00_content_RadScriptManager1").siblings("div").first();
					jQuery(el).append(imageGallery);
					removeOriginalCatalog();
					loadIsotope();
					document.getElementById('ENUSmain').style.visibility = 'visible';
				}
			}

			var data = gallery.test();
			if (data.ready)
				gallery.draw(data.c);
			else {
				jQuery.when.apply(null, data.c).done(function(args) {
					var c = getReasCookies();
					gallery.draw(c);
				})
			}

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
							if (js) {
								var description = products.d[i].innerHTML;
								var image = products.im[i].src;
								var item = "{ \"name\":\"" + name + "\",\"description\":\"" + description + "\",\"js\":\"" + js + "\",\"image\":\"" + image + "\"} ";
								localStorage.setItem("reasProduct" + name.replace(/\s/g, ''), escape(item));
								reasCategory += "\"reasProduct" + name.replace(/\s/g, '') + "\",";
							}
						}
						reasCategory = reasCategory.substr(0, reasCategory.length - 1) + "]}";
						localStorage.setItem("reasCategory" + filter, escape(reasCategory));
					},
					done: function(data) {
					}
				});
			}

			function createGalleryCookieData() {

				var fetchItems = [];
				var filters = {}
				filters["*"] = "ALL";

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
				localStorage.setItem("reasCatalog" , escape(reasCatalog));

				return fetchItems;
			}
	})