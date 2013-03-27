function AddNode () {
	this.id = "new_node_dialog";

	this.inputs = new Object ();
	this.searchinputs = new Object ();

	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', "Add New Node");
	this.element.style.paddingTop = "15px";

	this.searchinfo = document.createElement("div");
	this.searchinfo.setAttribute("class", "divpad");
	var tmp ='First search for a node by its latin or common name.';
	tmp +='  Once you have selected an Itis node by latin or common name,  ';
	tmp +='click "Add Node" to fill out the rest of the necessary information.';
	this.searchinfo.innerHTML = tmp;
	
	this.searchinputs.latin_name = new Input(this, "itis_latin_name");
	this.searchinputs.latin_name.display_name = "ITIS Latin Name :";
	this.searchinputs.latin_name.tooltip = "Search for node by Itis latin name";	
	this.searchinputs.latin_name.autocomplete_cb = createMethodReference(this, "autocompleteCB");
	this.searchinputs.latin_name.autocomplete_source = "auto/itis_latin_name.php" ;

	this.searchinputs.common_name = new Input(this,"itis_common_name");
	this.searchinputs.common_name.display_name = "ITIS Common Name :"; 
	this.searchinputs.common_name.tooltip = "Search for node by Itis common name";	
	this.searchinputs.common_name.autocomplete_cb = this.searchinputs.latin_name.autocomplete_cb;
	this.searchinputs.common_name.autocomplete_source = "auto/itis_common_name.php";

	this.searchinputs.itis_id = new Input(this, "itis_id");
	this.searchinputs.itis_id.display_name = "ITIS id";
	this.searchinputs.itis_id.tooltip = "Itis id, this will be provided by your search.";
	this.searchinputs.itis_id.element.setAttribute('class', "short");

	//InfoInput	
	this.inputs.latin_name = new Input(this, "latin_name_itis");
	this.inputs.latin_name.display_name = "ITIS Latin Name :";
	this.inputs.latin_name.tooltip = "The Itis latin name for this node.";	

	//InfoInput	
	this.inputs.common_name = new Input(this, "common_name_itis");
	this.inputs.common_name.display_name = "ITIS Common Name :";
	this.inputs.common_name.tooltip = "The Itis common name(s) for this node.";	

	//InfoInput	
	this.inputs.itis_id = new Input(this, "id_itis", "number");
	this.inputs.itis_id.display_name = "ITIS id";
	this.inputs.itis_id.tooltip = "The Itis id for this node.";
	this.inputs.itis_id.element.setAttribute('class', "short");


	this.inputs.working_name = new Input(this, "working_name");
	this.inputs.working_name.display_name = "Working name :";
	this.inputs.working_name.tooltip = "The working name should represent an easily recognizable synonym for the node.  Most often, this will be the common name (e.g. Latin name: Enhydra lultris, Working name: Sea otter)";

	this.inputs.functional_group = new Input(this, "functional_group", "select");
	this.inputs.functional_group.display_name = "Functional group :";
	this.inputs.functional_group.setSelect( display_options.functional_groups);

	this.inputs.native_status =new Input(this, "native_status", "select");
	this.inputs.native_status.display_name = "Native status :";
	this.inputs.native_status.tooltip = "Native or Non-Native (introduced, invasive, or non-endemic)";
	this.inputs.native_status.setSelect( display_options.node_native_status);

	this.inputs.is_assemblage = new Input(this, "is_assemblage", "checkbox");
	this.inputs.is_assemblage.display_name = "Is assemblage";
	this.inputs.is_assemblage.tooltip = "Does this node entry represents a node that is identified to the species-specific level.";
	this.inputs.is_assemblage.element.style.width = "15px";

		
}

AddNode.prototype.checkItisIdCB = function (data) {
	if (data.error != undefined) {
		alert(data.error);
	} else { 
		if (data.notfound == 1) {
			this.createAddNodeDialog(data.itis_id);
		} else { // this should mean we have a node
			var tmp = "This node already exists in our Database.\nWould you like to open it now?";
			if (confirm (tmp) ) {
				var node = new Node();
				node.setData(data);
				// you MUST set the data first
				// we could also store global nodes in a cache an retrieve them here
				var node_dlog = new NodeDialog(node);
				node_dlog.open();
				this.close();
			}
		}
	}
}

AddNode.prototype.addNewNodeCheck = function (data) {
	if( data.error != undefined)  {
		alert(data.error);
		return;
	}
	if (data.similar_items != undefined && data.similar_items.length > 0 ) {
		var ctxt = "There are similar working names in the DB.\n ";
		for (var i=0;i<data.similar_items.length;i++) {
			ctxt += "\t{ working name: " + data.similar_items[i].working_name + ", itis_id: " +data.similar_items[i].itis_id + "}\n";
		}
		ctxt += "\nDo you want to continue adding the new node?";
		ctxt += "\nPlease note that nodes with exact duplicate working names are not allowed.";
		if ( !confirm( ctxt) )
			this.goodtogo  = false;
	}
}

AddNode.prototype.close =function () {
	$( this.element ).remove( );
}
AddNode.prototype.addNewNodeCB =function (data) {
	if (data.error != undefined) {
		var tmp = data.error;
		if( data.sql !=undefined ) tmp += "\n----\n" + data.sql;
		alert( tmp );

	} else {
		if ( confirm("Succesfully added new node (" + data.working_name + ").\n Would you like to add another") ) {
			this.reset();	
		} else {
			var node = new Node();
			node.setData(data);
			// you MUST set the data first
			// we could also store global nodes in a cache an retrieve them here
			var node_dlog = new NodeDialog(node);
			node_dlog.open();
			this.close();
		}
	} 
}
AddNode.prototype.addNewNode = function() {
	var postobj = Object();
	postobj.functionName ="addNewNode";
	if( this.inputs.itis_id.element.value =="" ) {
		alert("You must first seach and find a valid itis id.");
		return;
	}
	postobj.itis_id = this.inputs.itis_id.element.value;
	postobj.working_name = $.trim( this.inputs.working_name.element.value );

	if (postobj.working_name == "" ) {
		alert("You need to submit a working name. This may be the same as the ITIS common name(s).");
		return;
	}

	var tmpobj = Object();
	tmpobj.working_name = postobj.working_name;
	tmpobj.functionName = "addNewNodeCheck";
	this.goodtogo  = true;
	$.ajax( { async:false, type:"GET", dataType:"json", 
		data: tmpobj,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewNodeCheck") 
	} );

	if (this.goodtogo == false) return;

	postobj.functional_group_id = this.inputs.functional_group.element.value;
	postobj.native_status = this.inputs.native_status.element.value;
	postobj.is_assemblage = 0;
	if (this.inputs.is_assemblage.element.checked == true)
		postobj.is_assemblage=1;

	$.ajax( { async:false, type:"GET", dataType:"json", 
		data: postobj,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewNodeCB")	
		} );
}

AddNode.prototype.autocompleteCB = function (e, ui) {
	$( this.searchinputs.latin_name.element).autocomplete("close");
	$( this.searchinputs.common_name.element).autocomplete("close");

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


AddNode.prototype.createAddNodeDialog = function (itis_id) {

	for (var i in this.inputs ) {
		this.inputs[i].show();			
		this.inputs[i].clear();			
	}

	this.searchinfo.style.visibility = "hidden";
	this.searchinfo.style.display= "none";

	for (var i in this.searchinputs ) {
		this.searchinputs[i].hide();			
	}

	$( this.inputs.itis_id.element ).val(itis_id);
	this.inputs.common_name.getItisCommonNames( itis_id); 
	this.inputs.latin_name.getItisLatinName( itis_id); 
	//	add the "Add New Node" button
	$( this.element ).dialog( "option", "buttons",{
		"Add New Node": createMethodReference(this, "addNewNode"),
		"Reset": createMethodReference(this, "reset"),
		"Close": function() { $( this ).remove(); }
	});
}



AddNode.prototype.reset = function () {
	this.createSearchDialog();
}

AddNode.prototype.createSearchDialog = function () {

	for (var i in this.inputs ) {
		this.inputs[i].hide();			
	}

	this.searchinfo.style.visibility = "visible";
	this.searchinfo.style.display= "block";

	for (var i in this.searchinputs ) {
		this.searchinputs[i].show();			
		this.searchinputs[i].clear( );			
	}

	$( this.element).dialog( "option", "buttons",{
		"Reset": createMethodReference(this, "reset"),
		"Close": function() { $( this ).remove(); }
	});
}

AddNode.prototype.open =function ( itis_id) {

	if ( $(this.element).dialog( "isOpen" ) === true ) {
		return;
	}

	$('body').append( this.element );
	$(this.element).empty();

	$( this.element ).dialog({
		autoOpen: false,
		height: 300,
		width: 500,
		close : function() { $( this ).remove();	},
		closeOnEscape: true, 
		modal: true	
	});
	// Now add the info element 
	this.element.appendChild(this.searchinfo);
	// now add the search elements
	for (var i in this.searchinputs ) {
		this.searchinputs[i].createDivRow( this.element );
	}

	// now add and hide the other inputs
	for (var i in this.inputs ) {
		this.inputs[i].createDivRow( this.element );			
		this.inputs[i].hide( );			
	}

	if (itis_id == null || itis_id == undefined) {
		this.createSearchDialog();
	} else {
		this.createAddNodeDialog(itis_id);
	}

	$( this.element ).dialog("open");

};
