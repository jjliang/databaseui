function SearchNodeDialog () {
	this.id = "search_node_dialog";

	this.inputs = new Object ();
	this.searchinputs = new Object ();

	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', "Search Nodes");
	this.element.style.paddingTop = "15px";

	this.searchinfo = document.createElement("div");
	this.searchinfo.setAttribute("class", "divpad");
	var tmp ='Search for a node by its working name, ITIS latin name, ITIS common name, or ITIS id.';
	this.searchinfo.innerHTML = tmp;
	this.searchinfo.style.paddingBottom = "15px";
	
	
	this.searchinputs.working_name = new Input(this, "working_name");
	this.searchinputs.working_name.display_name = "Working Name :";
	this.searchinputs.working_name.tooltip = "Search for node by its working name" ;	
	this.searchinputs.working_name.autocomplete_cb = createMethodReference(this, "wn_autocompleteCB");
	this.searchinputs.working_name.autocomplete_source = "auto/working_name.php" ;

	this.searchinputs.latin_name = new Input(this, "latin_name");
	this.searchinputs.latin_name.display_name = "ITIS Latin Name :";
	this.searchinputs.latin_name.tooltip = "Search for node by Itis latin name";
	this.searchinputs.latin_name.autocomplete_cb = createMethodReference(this, "autocompleteCB");
	this.searchinputs.latin_name.autocomplete_source = "auto/itis_latin_name.php" ;

	this.searchinputs.common_name = new Input(this, "common_name");
	this.searchinputs.common_name.display_name ="ITIS Common Name :";
	this.searchinputs.common_name.tooltip = "Search for node by Itis common name";	
	this.searchinputs.common_name.autocomplete_cb = this.searchinputs.latin_name.autocomplete_cb;
	this.searchinputs.common_name.autocomplete_source = "auto/itis_common_name.php";

	this.searchinputs.itis_id = new Input(this, "itis_id");
	this.searchinputs.itis_id.display_name = "ITIS id :";
	this.searchinputs.itis_id.tooltip = "Search for a node by Itis id.";
	this.searchinputs.itis_id.element.setAttribute('class', "short");
		
}

SearchNodeDialog.prototype.checkItisIdCB = function (data) {
	if (data.error != undefined) {
		alert(data.error);
	} else { 
		if (data.notfound == 1) {
			var tmp = "This node DOES not already exists in our Database.\nWould you like to enter it now?";
			if (confirm (tmp) ) {
				addnode.open(data.itis_id);
			}
		} else { // this should mean we have a node
			var tmp = "This node already exists in our Database.\nWould you like to open it now?";
			if (confirm (tmp) ) {
				var node = new Node();
				node.setData(data);
				// you MUST set the data first
				// we could also store global nodes in a cache an retrieve them here
				var node_dlog = new NodeDialog(node);
				node_dlog.open();
				//this.close();
			}
		}
	}
}

SearchNodeDialog.prototype.close =function () {
	$( this.element ).remove( );
}

SearchNodeDialog.prototype.wn_autocompleteCB = function (e, ui) {
	this.reset();
	if ( ui != undefined && ui.item != undefined && ui.item.id != undefined &&ui.item.value != undefined) {

		var node = new Node();
		node.id = ui.item.id;
		node.working_name = ui.item.value;
		node.getFromDatabase(node.id, "node_id");
		// you MUST set the data first
		// we could also store global nodes in a cache an retrieve them here
		var f = "_" + node.id;
		var gotit = $('[id$="' + f + '"]');
		if ( gotit.length > 0 ) {
			gotit.dialog("close");
			gotit.remove();
		}
		var node_dlog = new NodeDialog(node);
		node_dlog.open();
	} else {
		alert("Error on working_name autocomplete in search node dialog.");
	}
}


SearchNodeDialog.prototype.autocompleteCB = function (e, ui) {
	this.reset();

	var itis_id = ui.item.id;
	var p = new Object();
	p.functionName = "checkItisId";	
	p.itis_id = itis_id;
	$.ajax( { async:true, type:"GET", dataType:"json", 
		data: p,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "checkItisIdCB") 
	});
}


SearchNodeDialog.prototype.reset = function () {
	$( this.searchinputs.latin_name.element).autocomplete("close");
	$( this.searchinputs.common_name.element).autocomplete("close");
	$( this.searchinputs.working_name.element ).autocomplete("close");
	$( this.searchinputs.itis_id.element ).autocomplete("close");

}

SearchNodeDialog.prototype.open =function ( itis_id) {

	if ( $(this.element).dialog( "isOpen" ) === true ) {
		console.log(  $(this.element).dialog( "isOpen" )  );
		return;
	}

	$('body').append( this.element );

	$( this.element ).dialog({
		autoOpen: false,
		height: 300,
		width: 500,
		modal: false,
		close: function() { $( this ).remove(); },
		buttons: {
			"Close": function() { $( this ).remove();	}
		}
	});
	// Now add the info element 
	this.element.appendChild(this.searchinfo);
	// now add the search elements
	for (var i in this.searchinputs ) {
		this.searchinputs[i].createDivRow( this.element );
	}

	$( this.element).dialog("open");

};



