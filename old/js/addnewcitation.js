
function AddCitation() {  
	this.id= "new_citation_dialog";

	this.author_ids = new Array();
	this.inputs = new Object ();

	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', "Add New Citation");
	this.element.style.paddingTop = "15px";


	this.inputs.author_search = new Input(this, "author_search");
	this.inputs.author_search.display_name = "Author Search :";
	this.inputs.author_search.tooltip = "Search for an author";
	this.inputs.author_search.autocomplete_cb = createMethodReference(this, "autocompleteCB");
	this.inputs.author_search.autocomplete_source =	"auto/citation_author_search.php" ;

	this.authors_div = new Input(this, "authors", "div");
	this.authors_div.display_name =  "Authors :";
	this.authors_div.tooltip = "Authors that are associated with this citation. The first author in this list is the main author";
	//	this.authors_div.setDiv();
	this.authors_div.element.style.display = "block";
	this.authors_div.element.className = "authorblock";

	this.inputs.title = new Input(this, "title");
	this.inputs.title.display_name = "Title :";
	this.inputs.title.tooltip = "Please enter a valid title for this work." ;

	this.inputs.document = new Input(this, "document");
	this.inputs.document.display_name = "Document :";
	this.inputs.document.tooltip = "Please enter a valid document URL or DOI.";

	this.inputs.year = new Input(this, "year");
	this.inputs.year.display_name = "Year:";
	this.inputs.year.tooltip = "Please enter the publishing year.";


	this.inputs.format = new Input(this, "pub_format", "select");
	this.inputs.format.display_name  ="Published format:";
	this.inputs.format.tooltip = "Please select a publishing format. The following fields will depend on what you enter here.";
	this.inputs.format.setSelect( display_options.citation_format) ;
	this.inputs.format.element.setAttribute('class',"medium");

	this.inputs.format_title = new Input(this, "format_title");
	this.inputs.format_title.display_name = "Format title:";
	this.inputs.format_title.tooltip = "Please enter the title of the format (Journal title, Magazine,  etc.)";

	this.inputs.publisher = new Input(this, "publisher");
	this.inputs.publisher.display_name  = "Publisher:"; 
	this.inputs.publisher.tooltip = "Please enter the publishing agent.";


	this.inputs.volume = new Input(this, "volume");
	this.inputs.volume.display_name= "Volume :";
	this.inputs.volume.tooltip = "Please enter the volume number.";
	this.inputs.volume.element.setAttribute('class', "medium");

	this.inputs.number = new Input(this, "number", "number");
	this.inputs.number.display_name = "Number :";
	this.inputs.number.tooltip = "Please enter the number.";
	this.inputs.number.element.setAttribute('class',"medium");

	this.inputs.pages = new Input(this, "pages");
	this.inputs.pages.display_name = "Pages :";
	this.inputs.pages.tooltip = "Please enter the page numbers (i.e. 1-12).";
	this.inputs.pages.element.setAttribute('class',"medium");

	this.inputs.abstract = new Input(this, "abstract", "textarea");
	this.inputs.abstract.display_name = "Abstract :";
	this.inputs.abstract.tooltip = "Please enter the article abstract, if any." ;
	//this.inputs.abstract.setTextarea();
	this.inputs.abstract.element.setAttribute('rows',"5");

}

AddCitation.prototype.autocompleteCB = function ( e, ui ) {
	var author_id = ui.item.id;
	this.makeAuthorCiteSpan(author_id, ui.item.label);
	return false;
}
AddCitation.prototype.autocompleteChange = function ( e, ui ) {
	this.inputs.author_search.clear();
}

// make a span html element that contains author info
AddCitation.prototype.makeAuthorCiteSpan = function ( author_id, text ) {
	// first check to see if the author id is there already
	// if so, just return
	for (var i =0; i < this.author_ids.length; i++) {
		if (this.author_ids[i] == author_id)
			return;
	}

	var sp = document.createElement("span");
	sp.className="cited";
	$(sp).text(text) ;
	$(sp).css("display", "inline-block") ;

	var delete_button = document.createElement("button");
  delete_button.author_id =  author_id;

	sp.appendChild(delete_button);
	$( this.authors_div.element ).append(sp);

	var $but = $( delete_button);
	$but.button( { icons: {primary:'ui-icon-circle-close'}, text: false } );
	$but.css( "border", "0px" );
	$but.css( "height", "10px" );
	$but.css( "width", "10px" );
	$but.css( "margin-left", "4px" );
	$( delete_button ).click( function() {
		// we can use the global addcitation here
		for(var i in addcitation.author_ids) {
			if(addcitation.author_ids[i] == this.author_id) {
				addcitation.author_ids.splice(i, 1);
				break;
			}
		}
		$(this).parent().remove();
	} );
	this.author_ids.push(author_id);
}


AddCitation.prototype.onFormatSelectChange = function(event) {
	var sel = event.currentTarget;
	var val= sel.options[sel.selectedIndex].value;
	this.inputs.pages.hide();
	this.inputs.publisher.hide();
	this.inputs.volume.hide();
	this.inputs.number.hide();

	if (val == "Book") {
		this.inputs.publisher.show();
	}	
	if (val != "Web Site" && val != "Other" && val != "Unpublished Data" && val != "Personal Observation") {
		this.inputs.pages.show();
	}
	if (val == "Journal") {
		this.inputs.volume.show();
		this.inputs.number.show();
	}
if (val == "Unpublished Data" || val == "Personal Observation") {
		this.inputs.publisher.show();
		this.inputs.volume.show();
		this.inputs.number.show();
		this.inputs.document.label.innerHTML = "Institution:";
		this.inputs.volume.label.innerHTML = "Address:";
		this.inputs.publisher.label.innerHTML = "Email:";
		this.inputs.number.label.innerHTML = "Phone number:";
		this.inputs.format_title.label.innerHTML = " URL:";
		this.inputs.abstract.label.innerHTML = "Comment:";
		//institution, address, email, phone number, website,
		this.inputs.title.element.value = val;
	} else {
		this.inputs.document.label.innerHTML = "Document:";
		this.inputs.volume.label.innerHTML = "Volume:";
		this.inputs.publisher.label.innerHTML = "Publisher:";
		this.inputs.number.label.innerHTML = "Number:";
		this.inputs.format_title.label.innerHTML = "Format title:";
		this.inputs.abstract.label.innerHTML = "abstract:";

	}

	if (val == "Web Site") {
		this.inputs.format_title.label.innerHTML = val + " URL:";
	} else {
		if ( val != "Unpublished Data" && val != "Personal Observation")
		this.inputs.format_title.label.innerHTML = val + " title:";
	}

		return;
}

AddCitation.prototype.addNewCitationCheck = function (data) {
	if( data.error != undefined)  {
		alert(data.error);
		return;
	}
	if (data.similar_items != undefined && data.similar_items.length > 0 ) {
		var ctxt = "There are similar citations already in the DB.\n ";
		for (var i=0;i<data.similar_items.length;i++) {
			var item =  data.similar_items[i];
			var authors = "";
			for (var a=0;a< item.authors.length;a++) {
				if (a!=0) authors+=", ";
				authors += item.authors[a].first_name + " " +  item.authors[a].last_name ;
			}
			ctxt += "\t{ title: " + item.title + ", authors: " + authors + "}\n";
			if (i != data.similar_items.length -1) ctxt += ", ";
		}
		ctxt += "\nDo you want to continue adding the new citation?";
		ctxt += "\nPlease note that duplicate citations with the exact same title are not allowed.";
		if ( !confirm( ctxt) )
			this.goodtogo  = false;
	}
}


AddCitation.prototype.addNewCitationCB = function(data, t, x) {	
	if (data.error == undefined ) {
		// we should get citation info here just like 
		var label =  data.title + '\',' +  data.year;
		console.log("Added new citation:" + label); 
		if ( this.callback != undefined && this.callback.doit != undefined) {
			this.callback.doit(data);
		}
		$( this.element) .remove( );
	} else {
		alert(data.error + " - " + data.sql);
	}	
}

AddCitation.prototype.addNewCitation = function() {
	var postdata = Object();
	postdata.functionName = "addNewCitation";
	postdata.author_ids = this.author_ids; 
	if ( postdata.author_ids==undefined || postdata.author_ids.length == 0) {
		alert("Please enter an Author");
		return;
	}
	postdata.title = this.inputs.title.element.value;
	postdata.document = this.inputs.document.element.value;
	postdata.year = this.inputs.year.element.value;
	postdata.abstract = this.inputs.abstract.element.value;
	postdata.format = this.inputs.format.element.value;
	postdata.format_title = this.inputs.format_title.element.value;
	postdata.volume = this.inputs.volume.element.value;
	postdata.publisher = this.inputs.publisher.element.value;
	postdata.number = this.inputs.number.element.value;
	postdata.pages = this.inputs.pages.element.value;
	if (postdata.title == "") { alert("Please enter title information."); return;}
	if (postdata.year == "") { alert("Please enter year."); return;}
	if (postdata.format == "") { alert("Please enter a publication format."); return;}

	var tmpobj = Object();
	for (var i in postdata) {
		tmpobj[i] = postdata[i];
	}
	tmpobj.functionName = "addNewCitationCheck";
	this.goodtogo  = true;
	$.ajax( { async:false, type:"GET", dataType:"json", 
		data: tmpobj,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewCitationCheck") 
	} );

	if (this.goodtogo == false) return

	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: 	createMethodReference(this, "addNewCitationCB")
	});
}

AddCitation.prototype.open = function ( cback ) {

	if (cback != undefined && cback.doit != undefined) {
		this.callback = cback;
	} else {
		this.callback = undefined;
	}

	if ( $(this.element).dialog( "isOpen" ) === true ) {
		return;
	}

	$('body').append( this.element );
	$(this.element).empty();

	this.author_ids = new Array();

	for (var i in this.inputs ) {
		this.inputs[i].clear();
	}

	this.inputs.author_search.createDivRow(this.element);
	this.inputs.author_search.clear();
	$( this.inputs.author_search.element ).bind("autocompleteclose",	createMethodReference(this, "autocompleteChange") );

	// no need to clear the button
	this.add_new_author_but = new Input(this, "add_new_author", "button");
	this.add_new_author_but.tooltip = "Add New Author to the DB and associate it with this citation. Clicking this will open a new dialog window.";
	this.add_new_author_but.setButton( "Add New Author", function() { addauthor.open() });
	this.add_new_author_but.createDivRow(this.element);

	this.authors_div.createDivRow(this.element);
	this.authors_div.clear();

	this.inputs.title.createDivRow(this.element);
	this.inputs.document.createDivRow(this.element);
	this.inputs.year.createDivRow(this.element);

	this.inputs.format.createDivRow(this.element);
	this.inputs.format_title.createDivRow(this.element);
	this.inputs.publisher.createDivRow(this.element);  // skip this one

	this.inputs.volume.createDivRow(this.element);
	this.inputs.number.createDivRow(this.element);
	this.inputs.pages.createDivRow(this.element);

	this.inputs.abstract.createDivRow(this.element)


	// need to bind the format select to the onchange event
	$( this.inputs.format.element).change( createMethodReference( this, "onFormatSelectChange" ) );
	$( this.inputs.format.element).bind("select", createMethodReference( this, "onFormatSelectChange" ) );


	// create the dialog window for NEW citations
	$( this.element ).dialog({
		autoOpen: true,
		title: "Add New Citation",
		height: 500,
		width: 600,
		modal: true,
		closeOnEscape: true, 
		close : function() { $( this ).remove();	},
		buttons: {
			"Add New Citation": createMethodReference(this, "addNewCitation" ),
			"Close": function() { $( this ).remove();	}
		}
	});
}


