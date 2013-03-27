
function Node( data ) {
	this.id=null;
	this.dlog= null;

	// node info
	this.itis_id= null;
	this.non_itis_id = null;
	this.working_name= null;
	this.functional_group_id = null;
	this.native_status= null;
	this.is_assemblage= null;
	this.owner_id= null;
	this.node_max_age = new Array();
	this.node_range = new Array();
	this.stages = new Array();


	// itis info
	this.common_name= null;
	this.latin_name= null;
	this.taxonomy_level = null;
	if (data != undefined && ( typeof(data) == "object" || typeof(data) == "Object" )) {
		this.setData( data);
	}
}

Node.prototype.hasStageName = function ( stage_name ) { 
	//console.log( "looking for: " +stage_name);
	for (var i=0; i<this.stages.length;i++) {
		//console.log( "\tchecking: " +this.stages[i].name);
		if ( this.stages[i].name == stage_name) {
			//console.log( "\tfound : " + this.stages[i].name);
			return true;
		}
	}
	//console.log( "\tnothing found : " + stage_name);
	return false;
}
Node.prototype.setData = function ( data ) { 
	if (data.id) {
		for (var i in data) {
			this[i] = data[i];	
		}
	} else {
		alert("Tried to enter node data from erroneous source.");
	}
}

Node.prototype.getFromDatabaseCB = function ( data ) { 
	if (data.error == undefined) {
		for (var i in data) {
			this[i] = data[i];	
		}
		if (this.dlog != undefined) {
			this.dlog.setValues();
		}
	} else {
		alert(data.error);
	}
}

Node.prototype.getFromDatabase = function ( id, lookup_type) {  //  lookup_type can be either "itis_id" or "node_id"
	if ( isNumber(id) && ( lookup_type == "itis_id" || lookup_type == "node_id" ) ) {
		var p = new Object();
		p.functionName = "getNodeItems";	
		if (lookup_type == "itis_id")
			p.itis_id = id;
		else p.node_id = id;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
			success: createMethodReference(this, "getFromDatabaseCB")
		});
	
	}
};


// data can either be a number, a Node object, or a json object
// if data is a Number, lookup_type can be either "itis_id" or "node_id"
function NodeDialog( node ) {
	this.node = node;
	this.node.dlog = this;

	// generate a unique dialog name for a node.  This is used as a DOM id for
	// making and finding particular node dialog as well as their internal variable
	// widgets. 
	/*
	if (this.node.working_name == undefined ||
		this.node.id == undefined ) {
		alert("Attempting to create a NodeDialog without a node object.");
	}
	*/
	var tmp =  this.node.working_name + "_" + this.node.id ;
	this.id = tmp.replace(/\s/g, ""); 		// remove white space
	
	this.maindiv = document.createElement("div");
	this.maindiv.setAttribute('title', "Node id:" + this.node.id + " working name: " + this.node.working_name);
	this.maindiv.id = this.id;

	this.inputs_table = document.createElement("table");
	this.inputs_table.setAttribute('id', this.id + "_inputs");
	this.inputs_table.setAttribute('cellspacing', "5");
	this.inputs_table.style.paddingTop = "15px";


	this.cvars_table = document.createElement("table");
	this.cvars_table.setAttribute('id', this.id + "_cvars");
	this.cvars_table.setAttribute('cellspacing', "5");
	this.cvars_table.style.paddingTop = "15px";


	this.stagediv = document.createElement("div");
	this.stagetabs = new StageTabs( this, this.node.stages );

	this.inputs = new Object();

	this.inputs.latin_name = new Input(this, "latin_name");
	this.inputs.latin_name.display_name = "ITIS Latin Name :";	
	this.inputs.latin_name.onchange = createEventMethod(this, "onLatinNameChange");

	this.inputs.common_name = new Input(this, "common_name")
	this.inputs.common_name.display_name = "ITIS Common Name :";
	this.inputs.common_name.onchange = createEventMethod(this, "onCommonNameChange");

	this.inputs.itis_id = new Input(this, "itis_id");
	this.inputs.itis_id.display_name = "ITIS id :";
	this.inputs.itis_id.element.setAttribute('class', "short");

	this.inputs.working_name = new Input(this, "working_name");
	this.inputs.working_name.display_name = "Working name :";
	this.inputs.working_name.tooltip = "The working name should represent an easily recognizable synonym for the node.  Most often, this will be the common name (e.g. Latin name: Enhydra lultris, Working name: Sea otter)";

	this.inputs.functional_group = new Input(this, "functional_group");
	this.inputs.functional_group.display_name = "Functional group :";
	//this.inputs.functional_group.setSelect( display_options.functional_groups);

	this.inputs.native_status =new Input(this, "native_status");
	this.inputs.native_status.display_name = "Native status :";
	this.inputs.native_status.tooltip = "Native or Non-Native (introduced, invasive, or non-endemic)";
	//this.inputs.native_status.setSelect( display_options.node_native_status);

	this.inputs.is_assemblage = new Input(this, "is_assemblage");
	this.inputs.is_assemblage.display_name = "Is assemblage";
	this.inputs.is_assemblage.tooltip = "Does this node entry represents a node that is identified to the species-specific level.";
	//this.inputs.is_assemblage.element.setAttribute('type', "checkbox");
	this.inputs.is_assemblage.element.setAttribute('class', "short");

	// hold an object for all of our cited variables
	this.cvars = new Object();
	this.cvars.node_range = new CiteInput(this, "range", "number");
	this.cvars.node_range.display_name = "Range :";
	this.cvars.node_range.tooltip = "Northern and Southern limits of species occurrence";

	this.cvars.node_max_age= new CiteInput(this, "max_age", "number");
	this.cvars.node_max_age.display_name = "Max age :";
	this.cvars.node_max_age.tooltip = "Maximum reported age attained by individual (years)";

	this.set_node_values_but = new Input(this, "set_node_values_but", "button");
	this.set_node_values_but.tooltip = "Set all the values above with a single citation source.";
	this.set_node_values_but.setButton( "Set Node Values",  createMethodReference(this, "openCiteVarDialog") ); 

	this.set_node_values_but.element.style.marginTop = "15px";

	for (var i in this.cvars){
		this.cvars[i].setOnPressEnterEvent( createMethodReference(this, "openCiteVarDialog") ); 
	}
}
	
NodeDialog.prototype.onLatinNameChange =function () {
	this.node.latin_name = this.inputs.latin_name.element.value;
}
	
NodeDialog.prototype.onCommonNameChange =function () {
	this.node.common_name = this.inputs.common_name.element.value;
}

NodeDialog.prototype.setValues = function () { 
	// we need to be careful that we can set these values at any
	// asynchronous time

	if (this.node.itis_id != null && this.node.itis_id != "-1") {
		this.inputs.itis_id.element.value = this.node.itis_id;
		if (this.node.common_name == null ) {
			this.inputs.common_name.getItisCommonNames( this.node.itis_id); 
		} else if  (this.node.common_name != undefined){
			this.inputs.common_name.element.value = this.node.common_name;
		}

		if (this.node.latin_name == null ) {
			this.inputs.latin_name.getItisLatinName( this.node.itis_id); 
		} else if (this.node.latin_name != undefined) {
			this.inputs.latin_name.element.value = this.node.latin_name;
		}
	}  

	for (var i in display_options.functional_groups) {
		var fg = display_options.functional_groups[i];
		if ( fg.id ==	this.node.functional_group_id){
			this.inputs.functional_group.element.value = fg.name; 
			//this.inputs.functional_group.element.value = fg.id; 
			//tmp += '<b>Functional Group:</b> '+ fg.name + '<br>';
			break;
		}
	}
	this.inputs.working_name.element.value = this.node.working_name;
	this.inputs.native_status.element.value = this.node.native_status;
	this.inputs.is_assemblage.element.value = this.node.is_assemblage;
	$(this.maindiv).dialog("option", "title", "Node id:" + this.node.id + " working name: " + this.node.working_name);

	// we need to set the node values 
	for (var i in this.cvars ) {
		this.cvars[i].setValues();
	}

	// DONT forget to set the stages
	this.stagetabs.setValues();

}

// build the main dialog widget
NodeDialog.prototype.open = function () { 

	var $maindiv = $(this.maindiv);
	$maindiv.remove();

	$('body').append( this.maindiv );
	$maindiv.append( this.inputs_table );
	$maindiv.append( this.cvars_table);
	$(this.inputs_table).css("margin-bottom", "20px");
	$(this.cvars_table).css("margin-bottom", "20px");
	$maindiv.append( this.stagediv);

	var w =0;
	for (var i in this.inputs) {
		this.inputs[i].createTableRowInfo( this.inputs_table );
		var ww = $(this.inputs[i].label).width();
		if (ww > w) w = ww;
	}

	for (var i in this.cvars) {
		this.cvars[i].createTableRow(this.cvars_table) ;
		$(this.cvars[i].label).width(w);
	}
	this.set_node_values_but.createTableRow( this.cvars_table);

	//$( this.set_node_values_but.element ).button();
	//$( this.set_node_values_but.element ).click( createMethodReference(this, "openCiteVarDialog") );

	// create the stage div and its tabs
	this.stagetabs.create();

	// set all the values on the inputs
	this.setValues();

	$maindiv.dialog({ 
		width: 800, 
		closeOnEscape: true, 
		modal:false,
		close: function() { $( this ).remove(); },
		buttons: { 
			"Close": function() {$( this ).remove(); }
		} 
	});

}


// This is called when a user opens the cite var dialog and hits "do it"
// the cite_id is provide so that we can ajax to the server and set the 
// citation on the var
NodeDialog.prototype.openCiteVarDialogCB = function ( cite_id ) {
	for (var c in this.cvars) {
		var cvar = this.cvars[c];
		if (cvar.element.value != "" ) {
			cvar.addNewCitedVar( cite_id );
		}
	}

}

NodeDialog.prototype.openCiteVarDialog = function ( ) {
	// gather all the values
	var gotone = false;
	for (var c in this.cvars) {
		var cvar = this.cvars[c];
		if ( !cvar.check() ) {
			return;
		}
		if ( $(cvar.element).val() != "")
			gotone = true;
	}	
	if (!gotone) {
		alert("You must first enter a value");
		return;
	}
	// then open the citevardialog global 
	var cback =  new callbackObject(this, "openCiteVarDialogCB");
	citevardialog.open(this, "Set Node Values for " + this.node.working_name, cback);
}


function listNodesDialog() {
	this.element = document.createElement("div");
	this.element.setAttribute('id', "list_all_nodes_dialog");
	this.element.setAttribute('title', "List All Nodes");
	this.element.style.paddingTop = "15px";
}

listNodesDialog.prototype.open = function () {

	$dialog = $(this.element);
	if ( $dialog.length>0) {
		$dialog.dialog("destroy");
		$dialog.remove();
	}

	$('body').append( this.element );

	$dialog.dialog({ 
		width: 800, 
		height: 700, 
		closeOnEscape: true, 
		modal:false,
		close: function() { $( this ).remove(); },
		buttons: { 
			"Close": function() {$( this ).remove(); }
		} 
	});

	$dialog.html( "retrieving info..." );
	$dialog.css("background", "#ffffff url('css/ui-anim_basic_16x16.gif') right top no-repeat");

	var postdata = Object();
	postdata.functionName = "listAllNodes";
	$.ajax( { async:true, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "listAllNodesCB")
	});
}

listNodesDialog.prototype.listAllNodesCB = function (data, t, x) {
	if (data == null || data == undefined) {
		alert("Error on listAllNodes, no response from server." );
	} else if (data.error != undefined) {			
		alert(data.error);
	} else {			
		var tmp="";
		for (var i in data) {
			var node_id = data[i].id;
			var working_name = data[i].working_name;
			var interactions1 = data[i].interactions1;
			var interactions2 = data[i].interactions2;
			tmp += '<div><span style="cursor:pointer;cursor:hand;color:blue;padding:4px;"';
			tmp += ' onclick="openNodeDialog('+ node_id +');">';
			tmp += working_name + "</span>";
			tmp += "<br>";
			if (interactions1.length > 0 ) {
				tmp+= '<div style="padding-left:10px;">';
				for( var j  in interactions1) {
					tmp += working_name + "/" + interactions1[j].stage_name;
					tmp += "->";
					tmp += '<span style="cursor:pointer;cursor:hand;color:blue;padding:4px;"';
					tmp += ' onclick="interactionseditor.open('+ node_id + ", '" + 
						interactions1[j].stage_name + "', '" +
						interactions1[j].interaction_type + "', " +
						interactions1[j].node_id + ", '" +
								interactions1[j].node_stage_name + "');\">";
							tmp += interactions1[j].interaction_type;
							tmp += "</span>->";
							tmp +=	interactions1[j].node_working_name + "/" + interactions1[j].node_stage_name;
							tmp += "<br>";
				}
				tmp+= "</div>";
			}
			if (interactions2.length > 0 ) {
				tmp+= '<div style="padding-left:10px;">';
				for( var j  in interactions2) {
					tmp +=	interactions2[j].node_working_name + "/" + interactions2[j].node_stage_name;
					tmp += "->";
					tmp += '<span style="cursor:pointer;cursor:hand;color:blue;padding:4px;"';
					tmp += ' onclick="interactionseditor.open('+ interactions2[j].node_id + ", '" + 
						interactions2[j].node_stage_name + "', '" +
						interactions2[j].interaction_type + "', " +
						node_id + ", '" +
						interactions2[j].stage_name + "');\">";
							tmp += interactions2[j].interaction_type;
							tmp += "</span>->";
							tmp += working_name + "/" + interactions2[j].stage_name;
							tmp += "<br>";
				}
				tmp+= "</div>";
			}

			tmp += "</div>";
		}	
		$(this.element).html( tmp);
		$(this.element).css("background", "#ffffff");
	}
}


function openNodeDialog( node_id) {
	// if we have it open, close it and destroy it
	var f = "_" + node_id;
	var gotit = $('[id$="' + f + '"]');
	if ( gotit.length > 0 ) {
		gotit.dialog("close");
		gotit.remove();
	}

	var node = new Node();
	node.id = node_id;
	var node_dlog = new NodeDialog(node);
	node.getFromDatabase( node_id, "node_id");
	//node.setData(data);
	// you MUST set the data first
	// we could also store global nodes in a cache an retrieve them here
	node_dlog.open();
}
