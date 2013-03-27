
function AddNonItisNode() {
	this.id = "new_nonitis";
	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', "Add New Non-ITIS Node");
	this.element.style.paddingTop = "15px";

	this.inputs = new Object();

	this.information = document.createElement("div");
	this.information.innerHTML = '<p>Each node (i.e. species) that is not already in the ITIS database receives a Non-ITIS id with which is identified in our local database.  Each Non-ITIS id must point to a valid ITIS id at some higher (parent) taxonomic level.  If your new node\'s parent is already in ITIS, this will be a simple three-step process: (1) Use the "Parent Search" field to search the ITIS database for the scientific name of the most specific taxonomic name you can identify your new node to. Then (2) manually enter the taxonomic level and the Latin name of your new node.  Then (3) specify (i) a representative "working name" for the nod, (ii) select its functional group, and (iii) check "is assemblage" if the entry does not represent a node that is identified to the species-specific level.</p><p>The working name should represent an easily recognizable synonym for the node.  Most often, this will be the common name (e.g. Latin name: Enhydra lultris, Working name: Sea otter).</p> <p>Note: If you have multiple taxonomic levels that are not already in ITIS, you will need to repeat the above steps several times, starting with the level of the parent that is already in ITIS. From there, work your way down by using the "Parent Search" field to search for the either an ITIS node or Non-ITIS node that represents the next parent.</p>';
	this.information.style.marginBottom = "2.0em";

	//this.inputs.parenttree = new Input(this, "Parent tree", "The parent tree information is displayed here.");
	//this.inputs.parenttree.setDiv();

	this.inputs.parentsearch = new Input(this, "parentsearch");
	this.inputs.parentsearch.display_name = "Parent Search :";
	this.inputs.parentsearch.tooltip = "Search for a parent node in both ITIS and local databases.";
	this.inputs.parentsearch.autocomplete_source = "auto/non_itis_search.php";		
	this.inputs.parentsearch.autocomplete_cb =  createMethodReference(this, "autocompleteCB");

	this.inputs.parentinfo = new Input(this, "parentinfo", "div");
	this.inputs.parentinfo.display_name = "Parent info :";
	this.inputs.parentinfo.tooltip = "Information on this node's parent is displayed here.";
	//this.inputs.parentinfo.setDiv();

	this.inputs.latinname = new Input(this, "latinname");
	this.inputs.latinname.display_name = "Latin Name :";
	this.inputs.latinname.tooltip ="You must enter a latin name for this non-itis node.";

	this.inputs.workingname = new Input(this, "workingname");
	this.inputs.workingname.display_name = "Working Name :";
	this.inputs.workingname.tooltip  ="You must enter a working name for this non-itis node.";

	this.inputs.taxlevel = new Input(this, "taxlevel", "select");
	this.inputs.taxlevel.display_name = "Taxonomic Level";
	this.inputs.taxlevel.tooltip = "Taxonomic level.";
	this.inputs.taxlevel.setSelect( new Array( "phylum", "class", "order", "family", "genus", "species") );

	this.inputs.functionalgroup = new Input(this, "functionalgroup", "select");
	this.inputs.functionalgroup.display_name = "Functional Group :";
	this.inputs.functionalgroup.tooltip = "Functional Group";
	this.inputs.functionalgroup.setSelect( display_options.functional_groups );

	this.inputs.nativestatus =new Input(this, "nativestatus", "select");
	this.inputs.nativestatus.display_name = "Native Status :";
	this.inputs.nativestatus.tooltip = "Native, Non-Native (introduced, invasive, or non-endemic), or unknown";
	this.inputs.nativestatus.setSelect( display_options.node_native_status );

	this.inputs.is_assemblage = new Input(this, "is_assemblage", "checkbox");
	this.inputs.is_assemblage.display_name = "is assemblage :";
	this.inputs.is_assemblage.tooltip = "Does this node entry represents a node that is identified to the species-specific level.";
	//this.inputs.is_assemblage.element.setAttribute( "class" , "small");
	this.inputs.is_assemblage.element.style.width = "15px";

	this.inputs.extrainfo = new Input(this, "extrainfo", "textarea");
	this.inputs.extrainfo.display_name = "Extra info";
	this.inputs.extrainfo.tooltip = "Put any extra relevant info about this non-itis node here.";
	this.inputs.extrainfo.element.setAttribute("rows", "5");

};

AddNonItisNode.prototype.autocompleteCB = function( event, ui) {
	// the returned ui.item.id is an object
	this.val = ui.item.id;
	if (this.val.taxonomy_level == undefined) {
		var p  = Object();
		p.itis_id = this.val.id;
		$.ajax( { async:false, type:"GET", dataType:"json",
				data: p, 
				url: "auto/itis_taxonomy.php", 
				error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
				success: createMethodReference(this, "getTaxonomyLevel")
		});
	}

	if (this.val.taxonomy_level == undefined ) {
		alert("Could not retrieve the taxon info from ITIS. Perhaps the networks is down.  Please try again at another time.");
	}
	this.inputs.parentinfo.element.innerHTML = "id: " + this.val.id + ", is itis:" + this.val.is_itis + ", taxonomy level: " + this.val.taxonomy_level ;
	this.setNonItisTaxSelect();
};


// for non-itis nodes, get tax level
AddNonItisNode.prototype.getTaxonomyLevel = function(data, t, x) {	
	if (data.error == undefined ) {
		this.val.taxonomy_level = data.taxonomy_level;
	} else {
		alert( "error: " + data.error);
	}	
}
/*
AddNonItisNode.prototype.resetNonItisTaxSelect = function( ) {
	this.inputs.taxlevel.element.innerHTML = "";
	var	tmp = '<option value=""></option>';
	for (var i=0; i< display_options.non_itis_taxonomy_level.length;i++) {
		var level = display_options.non_itis_taxonomy_level[i];
		tmp+= '<option value="' + level + '">' + level + '</option>';
	}
	this.inputs.taxlevel.element.innerHTML = tmp;
}
*/
AddNonItisNode.prototype.setNonItisTaxSelect = function ( ) {
	this.inputs.taxlevel.element.innerHTML = "";
	if (this.val != null && this.val != undefined && this.val.taxonomy_level != undefined) {
		var tl = this.val.taxonomy_level;
		var levels = new Array();
		for (var i=0; i< display_options.non_itis_taxonomy_level.length;i++) {
			var tmp = display_options.non_itis_taxonomy_level[i];
			var regex =   new RegExp( tmp, "i");
			if ( tl.search(regex) != -1 ) {
				for (var j=i+1;j< display_options.non_itis_taxonomy_level.length;j++) {
					levels.push( display_options.non_itis_taxonomy_level[j]);
				}
				break;
			}
		}
		var tmp='';
		for (var i=0;i < levels.length; i++ ){
			tmp+= '<option value="' + levels[i] + '">' + levels[i] + '</option>';
		}
		this.inputs.taxlevel.element.innerHTML = tmp;
	}
}


// |||||||||||||||||add new nonitis node dialog||||||||||||||||||||| 
//	you get here from the main menu on top
//	this dialogue will allow you to add new nodes that are not already 
//	entered in the government sponsored ITIS database.
AddNonItisNode.prototype.open = function () {

	if ( $(this.element).dialog( "isOpen" ) === true ) {
		console.log(  $(this.element).dialog( "isOpen" )  );
		return;
	}


	$("body").append(this.element );
	$(this.element).empty();

	$(this.element).append( this.information );

	for (var i in this.inputs) {
		this.inputs[i].createDivRow( this.element );
		//this.inputs[i].clear();
	}

	this.reset();
	
	$( this.element ).dialog({
		autoOpen: true,
		height: 600,
		width: 700,
		modal: true,
		closeOnEscape: true, 
		close : function() { $( this ).remove();	},
		buttons: {
			"Add New NonItis Node": createMethodReference(this, "addNewNonItisNode"),
			Reset: createMethodReference(this, "reset"),
			Close: function() { $( this ).remove(); }
		}
	});
}

AddNonItisNode.prototype.reset = function() {
	this.inputs.parentsearch.clear();
	this.inputs.parentinfo.clear();
	this.inputs.latinname.clear();
	this.inputs.workingname.clear();
	this.inputs.taxlevel.clear();
	this.inputs.functionalgroup.clear();
	this.inputs.nativestatus.clear();
	this.inputs.is_assemblage.clear();
	this.inputs.extrainfo.clear();
	this.val = null;
	this.setNonItisTaxSelect();
}

AddNonItisNode.prototype.addNewNonItisNodeCB =  function(data, t, x) {	
	if (data == null || data == undefined) {
		alert("Error : data is null" );
	} else if (  data.error != undefined) {
		var tmp = "Error adding new non-itis node: " + data.error ;
		if (data.sql != undefined)
			tmp += data.sql;
		alert(tmp);
	} else {
		this.reset();
	}
}

AddNonItisNode.prototype.addNewNonItisNodeCheck = function (data) {
	if( data.error != undefined)  {
		alert(data.error);
		return;
	}
	if (data.similar_items != undefined && data.similar_items.length > 0 ) {
		var ctxt = "There are similar non-itis nodes in the DB.\n ";
		for (var i=0;i<data.similar_items.length;i++) {
			var item = data.similar_items[i];
			if (item.working_name != undefined) 
				ctxt += "\t{ working name: " + item.working_name + ", itis_id: " + item.itis_id + "}\n";
			else if (item.latin_name != undefined)
				ctxt += "\t{ latin name: " + item.latin_name + ", taxonomy level: " + item.taxonomy_level + "}\n";
		}
		ctxt += "\nDo you want to continue adding the new non-itis node?";
		ctxt += "\nPlease note that non-itis nodes with exact duplicate working names or latin names are not allowed.";
		if ( !confirm( ctxt) )
			this.goodtogo  = false;
	}
}


AddNonItisNode.prototype.addNewNonItisNode = function() {
	if ( this.val != undefined && this.val != null) {
		var p = new Object();
		p.functionName = "addNewNonItisNode";
		p.parent_id = this.val.id;
		p.parent_id_is_itis = this.val.is_itis;
		p.latin_name = this.inputs.latinname.element.value;	
		p.working_name = this.inputs.workingname.element.value;	
		p.functional_group_id = this.inputs.functionalgroup.element.value;	
		p.native_status = this.inputs.nativestatus.element.value;
		p.info = this.inputs.extrainfo.element.value;
		p.is_assemblage = 0;
		if (this.inputs.is_assemblage.element.checked == true)
			p.is_assemblage=1;
		p.taxonomy_level = this.inputs.taxlevel.element.value;	
		if (p.latin_name == "") { alert("no latin name"); return};
		if (p.working_name =="") { alert("no working name"); return};
		if (p.taxonomy_level =="") { alert("no taxonomy level"); return};

		var tmpobj = Object();
		tmpobj.working_name = p.working_name;
		tmpobj.latin_name = p.latin_name;
		tmpobj.functionName = "addNewNonItisNodeCheck";
		this.goodtogo  = true;
		$.ajax( { async:false, type:"GET", dataType:"json", 
			data: tmpobj,
			url: "query.php",
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
			success: createMethodReference(this, "addNewNonItisNodeCheck") 
		} );

		if (this.goodtogo == false) return;

		$.ajax( { async:false, type:"GET", dataType:"json",
			data: p, 
			url: "query.php", 
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
			success: createMethodReference(this, "addNewNonItisNodeCB") 
		});	
	} else {
		alert("A non-itis node must have a parent");
	}
}

