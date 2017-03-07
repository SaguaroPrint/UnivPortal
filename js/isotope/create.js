
	/****
	**		Create a new item in collection
	**	@params: 
	**		link -> what to open
	**		icon type -> icon-video, 
	**			icon-browser, 
	**			icon-camera,
	**			icon-attachment...
	**	@returns:
	**		li item to be added to the gallery
	**/			


	function newLi(link, image, textP, textA, filter) {
		var smallP = $("<p></p>").html(textP);
		var a = $("<a></a>").attr("href", link).html(textA);
		var h3 = $("<h3></h3>");
		var caption = $("<figcaption></figcaption>");
		//
		h3.append(a);
		caption.append(h3);
		caption.append(smallP);

		// **
		var div = $("<div></div>").addClass("gallery-img");
		var divA = $("<a></a>").attr("href", link);
		var aImg = $("<img></img>").attr("src", image);
		//
		divA.append(aImg);
		div.append(divA);
		
		//**
		var figure = $("<figure></figure>");
		//
		figure.append(div);
		figure.append(caption);
		
		//**
		var li = $("<li></li>").addClass("html " + filter);
		li.append(figure);
		return li;
	}
	
	/****
	**		Create gallery holder
	**	@returns object:
	**		ul holder for lis
	**		gallery holder
	**
	**/	
	
	function newGridGallery() {
		var ul = $("<ul></ul>").addClass("grid masonry-items");
		var divContent = $("<div></div>").addClass("tab-content");
		var galleryCol =$("<div></div>").addClass("col-md-12 grid-gallery overflow-hidden");
		
		divContent.append(ul);
		galleryCol.append(divContent);
		return {ul: ul, galleryCol: galleryCol};
	}
	
	/****
	**		Create gallery filter collection
	**	@params: 
	**		dataFilter object
	**		{
	**			filters: ["*", ".id1", ".id2", ...],
	**			inners: ["All", "Magento", "Jquery", ...]
	**		}
	**	@returns:	
	**		divCol holder for the ul pool
	**/	
	
	function newFilter(dataFilter) {
		var ul = $("<ul></ul>").addClass("portfolio-filter nav nav-tabs nav-tabs-light wow fadeInUp");
		// Get the filters arrays
		var filters = dataFilter.filters;
		var inners = dataFilter.inners;
		// Add filters to the filter collection
		for(var i = 0; i <= filters.length; i++) {
			var a = $("<a></a>");
			a.attr("data-filter", filters[i]);
			a.html(inners[i]);
			var li = $("<li></li>").addClass("nav");
			if (i == 0) {
				li.addClass("nav active");
			}
			li.append(a);
			ul.append(li);			
		}
		
		//**
		var divCenter = $("<div></div>").addClass("text-center");
		var filterCol = $("<div></div>").addClass("col-md-12 text-center");
		divCenter.append(ul);
		filterCol.append(divCenter);
		
		return filterCol;
	}
	
	/****
	**		Create gallery main section
	**	@params: 
	**		filterCol and galleryCol, two divs
	**		both divs are added to the section
	**	@returns:	
	**		the section
	**/		
	
	function isotopeSection(filterCol, galleryCol) {
		var divRow = $("<div></div>").addClass("row");
		var divContainer = $("<div></div>").addClass("container");
		var section = $("<section></section>").addClass("work-5col gutter work-with-title no-margin-top content-section");
		
		divRow.append(filterCol);
		divRow.append(galleryCol);
		divContainer.append(divRow);
		section.append(divContainer);
		return section;		
	}
	
	
	
	
	
	
	
	
	
	