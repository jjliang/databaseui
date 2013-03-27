function setOptions( el, options) {
	for (var i in options) {
		var op = document.createElement("option");
		op.appendChild(document.createTextNode(i));
		op.value = options[i];
		el.appendChild(op);
	}
}

function CitedVarDate ( ) {
	this.datum_year = document.createElement("input");
	this.datum_season = document.createElement("select");
	setOptions( this.datum_season, [ "Winter", "Spring", "Summer", "Autumn" ] );
	this.datum_month = document.createElement("select");
	setOptions( this.datum_month, [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" ]);
	this.datum_date_year = document.createElement("input");
	this.datum_date_month = document.createElement("select");
	setOptions( this.datum_date_month, [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" ]);
	this.datum_date_day = document.createElement("input");
	
	this.datum_type = document.createElement("select");
	setOptions( this.datum_type, [ "year", "season", "month", "date" ] );

}

function CitedVarInput ( value ) {
	this.variable = document.createElement("input");
	this.comment = document.createElement("input");
	this.datum_beg = new CitedVarDate() ;
	this.datum_end = new CitedVarDate() ;
}


function CitedVarDialog ( ) {
	this.id = "citedvar_dialog";

	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	//this.element.setAttribute('title', "Add New Author");
	this.element.style.paddingTop = "15px";

	this.search = new Input(this, "search");
	this.search.display_name = "Search Citations :";
	this.search.tooltip = "Type here to search available citations by first or last name of author OR by title";
	this.search.autocomplete_cb = createMethodReference(this, "autocompleteCB");
	this.search.autocomplete_source =	"auto/citation_name.php" ;


	this.cite_select= new Input(this, "cite_select", "select");
	this.cite_select.display_name = "Citation :";
	this.cite_select.tooltip ="Select a citation here. There can only be one citation for a value.";
	this.cite_select.setSelect( new Array());

	this.details = new Input(this, "details", "div");
	this.details.display_name = "Values :"; 
	this.details.tooltip ="The values that you have previously entered and will appear here.";
	//this.details.setDiv();
}

CitedVarDialog.prototype.autocompleteCB = function ( e, ui ) {
	this.getCitationInfo( ui.item.id ); 
	return false;
}

CitedVarDialog.prototype.setCitationInfo = function ( cite ) {
	$(this.cite_select.element).children().each(function(i, option){ 
		if (cite.id == $(option).val()) {
			$(option).attr("selected","selected");  
		} 
	});
	//$(this).val('');
}


// add a citation <option> element to the citation dialog
CitedVarDialog.prototype.addCiteToCitationDialogSelect = function( cite ) {
	var ret = false;	
	$(this.cite_select.element).children().each(function(i, option){ 
			if (cite.id == $(option).val()) {
				$(option).attr("selected","selected");	
				ret =true;
			} 
	});
	if (ret) return;
	authors="";
	for (var j=0;j< cite.authors.length;j++) {
		if (j != 0) authors+=",&nbsp;";
		authors+=cite.authors[j].last_name;
	}
	var label = authors + ' - \'' +  cite.title + '\',' +  cite.year;
	var tmp = '<option selected value="'+ cite.id +'">' + label +'</option>';	
	$(this.cite_select.element ).append(tmp);	
}

// callback
CitedVarDialog.prototype.getCitationInfoCB = function(data, t, x) { 
	if (data == null) {
		alert("Error : data is null" );
	} else if (data.error != undefined ) {
		alert("Error: " + data.error);
	} else {
		// add to global citations array
		citations.push(data);
		this.addCiteToCitationDialogSelect(data);
	}
}


CitedVarDialog.prototype.getCitationInfo = function ( cite_id) {
  // first check to see if we have it globally already
	var tmp_cite = citations.get(cite_id);
	if ( tmp_cite != undefined) {
		this.setCitationInfo( tmp_cite );
		return;
	}
  var postdata = Object() ;
  postdata.functionName = "getCitationInfo";
  postdata.cite_id = cite_id;
  //log("Requesting cite info for id: " + cite_id);
  $.ajax( { async:true, type:"GET", dataType:"json",
      data: postdata, 
      url: "query.php", 
      success: createMethodReference(this, "getCitationInfoCB")  
	});
}

CitedVarDialog.prototype.onClick= function ( e ) {
	var cite_id = this.cite_select.element.options[this.cite_select.element.selectedIndex].value;
	if (cite_id == "") {
		alert("You need to assign a citation source");
		return;
	}
	if (this.callback_obj != undefined) {
		var cite_id = this.cite_select.element.options[this.cite_select.element.selectedIndex].value;
		this.callback_obj.doit( cite_id );
	}
	this.callback_obj = undefined;
}

CitedVarDialog.prototype.close = function ( ) {
		$(this.element).remove();
}

CitedVarDialog.prototype.open = function ( obj, title , callback_obj) {
	this.search.clear();
	if ( $(this.element).dialog( "isOpen" ) === true ) {
		// remove it if it is here
		$(this.element).remove();
	}
	if (callback_obj != undefined) {
		this.callback_obj = callback_obj;
	}
	$('body').append( this.element );
	$(this.element).empty();
	this.search.createDivRow( this.element );

	// we have to re-create the button for some reason
	this.add_cite_but = new Input(this, "add_cite_but", "button");
	this.add_cite_but.tooltip = "Add a new citation";
	var cback =  new callbackObject(this, "addCiteToCitationDialogSelect");
	var func =   function () { addcitation.open( cback ) } ;
	this.add_cite_but.setButton( "Add New Citation", func );


	this.add_cite_but.createDivRow( this.element );

	this.cite_select.createDivRow( this.element);
	this.details.createDivRow( this.element );
	this.details.element.style.display="inline-block";
	$(this.details.element).empty();

	for(var i in obj.cvars) {
		var cvar = obj.cvars[i];
		var vals = cvar.getValues();
		if ( vals[0] != "") {
			var d = document.createElement('div');
			d.style.border = "1px solid #cfcfcf";
			d.style.margin = "2px";
			d.style.padding = "2px";
			$(this.details.element).append(d);
			var s = document.createElement('span');
			var t = cvar.display_name + ' = ' + vals[0];
			if (cvar.type == "length_measure" && vals[0] != "none exists - constant weight")
				t +=  "   &nbsp; A:" + vals[1] + ", B:" + vals[2];
			$(s).html( t);
			$(d).append(s);
			if (cvar.comment.getComment() != undefined)
			$(d).append( '<br><span style="color:#cccccc">comment : ' + cvar.comment.getComment() + '</span>' ) ;
			var datum = cvar.datum.getDatum();
			if (datum != undefined) {
				datum = JSON.stringify( datum );
				$(d).append( '<br><span style="color:#cccccc">date : ' + datum + '</span>' ) ;
			}
		}
	}
	var func = new Object();
	func[title] = createMethodReference(this, "onClick");
	func["Close"] =  function() { $( this ).remove();	}

	$( this.element ).dialog({
		autoOpen: true,
		title:  title,
		height: 350,
		width: 700,
		closeOnEscape: true, 
		modal: true,
		close: function() { $( this ).remove(); },
		buttons: func	
	});

}



