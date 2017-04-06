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
					var catalog = JSON.parse(c["reasCatalog"].replace(/%/g, '\"'));
					var gridGallery = newGridGallery();
					var ul = gridGallery.ul;
					var imageGallery = isotopeSection(newFilter(catalog), gridGallery.galleryCol);

					for (var category in catalog) {
						if (category != "*") {
							var products = JSON.parse(c["reasCategory" + category].replace(/%/g, '\"'));
							for (var i = 0; i < products.items.length; i++) {
								var itemp = c[products.items[i]];
								itemp = itemp.replace(/>/g, '\'');
								itemp = itemp.replace(/%/g, '\"');
								itemp = itemp.replace(/@/g, '=');
								item = item.replace(/|/g, ';');
								var product = JSON.parse(itemp);
								var li = newLi(product.js ,product.image, product.description, product.name, category);
								ul.append(li);
							}
						}
					}

					/*
					var result = document.evaluate('//*[@id="ENUSmain"]/tbody/tr/td/div[1]',
						document, null, 5, null);
					var el = result.iterateNext();
					*/
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
								item = item.replace(/\'/g, '>');
								item = item.replace(/\"/g, '%');
								item = item.replace(/=/g, '@');
								item = item.replace(/;/g, '|');
								document.cookie = "reasProduct" + name.replace(/\s/g, '') + "=" + item;
								reasCategory += "\"reasProduct" + name.replace(/\s/g, '') + "\"" + ((i == (products.l.length - 1))?"":",");
							}
						}
						reasCategory += "]}";
						document.cookie = "reasCategory" + filter + "=" + reasCategory.replace(/\"/g, '%');
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
				document.cookie = "reasCatalog=" + reasCatalog.replace(/\"/g, '%');

				return fetchItems;
			}
	})
