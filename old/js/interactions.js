
function IXInput(interactions_editor, td, which) {

	this.which = which;
	this.ix_editor = interactions_editor;

	this.search_working_name = document.createElement("input");
	this.search_working_name.className = "medium";
	this.search_latin_name = document.createElement("input");
	this.search_latin_name.className = "medium";
	this.infodiv = document.createElement("div");
	this.interactiondiv = document.createElement("div");
	this.stage_select = document.createElement("select");

	var td_h = document.createElement("p");	
	td_h.innerHTML="<b>Node " + this.which +"</b>";

	var p_which = document.createElement("d");
	$(p_which).text( "Node/Stage " + this.which);
	p_which.style.fontWeight = "bold";
	p_which.style.fontSize = "1.2em";

	var p_wn = document.createElement("p");
	var span_wn = document.createElement("span");
	$(span_wn).text( "Working Name: ");
	span_wn.style.width = "80px";
	span_wn.style.display = "inline-block";
	p_wn.appendChild(span_wn);
	p_wn.appendChild(this.search_working_name);

	var p_ln = document.createElement("p");
	var span_ln = document.createElement("span");
	span_ln.style.width = "80px";
	span_ln.style.display = "inline-block";
	$(span_ln).text( "Latin Name: ");
	p_ln.appendChild(span_ln);
	p_ln.appendChild(this.search_latin_name);

	td.appendChild(p_which);
	td.appendChild(p_wn);
	td.appendChild(p_ln);
	td.appendChild(this.infodiv);
	td.appendChild(this.interactiondiv);

}

IXInput.prototype.reset = function () {
	this.resetSearches();
	this.infodiv.innerHTML ="";
	this.interactiondiv.innerHTML ="";
	this.node = undefined;
}

IXInput.prototype.setAutocomplete = function () {
	$( this.search_working_name).autocomplete({
		minLength: 3,
		select: createMethodReference(this, "wn_autocompleteCB"),
		source: makeAutocompleteFunc( "auto/working_name.php" ) 
	});

	$( this.search_latin_name).autocomplete({
		minLength: 3,
		select: createMethodReference(this, "ln_autocompleteCB"),
		source: makeAutocompleteFunc( "auto/itis_latin_name.php" ) 
	});
}

IXInput.prototype.resetSearches = function () {
	$( this.search_working_name).autocomplete("close");
	$( this.search_latin_name).autocomplete("close");
	this.search_working_name.value ="";
	this.search_latin_name.value ="";
}


// http://w3future.com/html/stories/callbacks.xml
function ixSetter( ix_editor, node_id, stage_name, node_stage_name, interaction_type) {
	this.ix_editor = ix_editor;
	this.node_id = node_id;
	this.stage_name = stage_name;
	this.node_stage_name = node_stage_name;
	this.interaction_type = interaction_type;
	var me = this;
	this.invoke1 = function() { 
		me.ix_editor.setInteractionTypeSelect(me.interaction_type);
		me.ix_editor.ixinput1.setStageSelectByName( me.stage_name); 
		me.ix_editor.ixinput2.setNodeAndStageName( me.node_id, me.node_stage_name) 
	}
	this.invoke2 = function() { 
		me.ix_editor.setInteractionTypeSelect(me.interaction_type);
		me.ix_editor.ixinput2.setStageSelectByName( me.stage_name); 
		me.ix_editor.ixinput1.setNodeAndStageName( me.node_id, me.node_stage_name) 
	}
}


IXInput.prototype.setNodeAndStageName = function( node_id, stage_name) {	
	this.resetSearches();
	var p = new Object();
	p.functionName = "getNodeItems";	
	p.node_id = node_id;
	// this we will have to record for the callback
	this.current_stage_name = stage_name;
	$.ajax( { async: true, type:"GET", dataType:"json", 
		data: p,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "getNodeItemsCB")
	});
}

IXInput.prototype.setInteractionInfoSingle = function(data ) {	
	//console.log(data);
	this.interactiondiv.innerHTML = "";
	var tmp='<br><br>';
	var div = document.createElement("div");
	div.style.color = "#333333";
	var p = document.createElement("div");
	$(p).text( "All interactions" );
	var hr = document.createElement("hr");
	div.appendChild( document.createElement("br") );
	div.appendChild( document.createElement("br") );
	div.appendChild(p);
	div.appendChild(hr);
	this.interactiondiv.appendChild( div );
	if (data.interactions != undefined) {
		for(var i=0;i< data.interactions.length;i++) {
			var d = document.createElement("div");
			d.style.marginBottom = "2px";
			var sl = document.createElement("span");
			var sm = document.createElement("span");
			var sr = document.createElement("span");
			sm.style.cursor="pointer";
			sm.style.color ="#0000ff";
			d.appendChild(sl);
			d.appendChild(sm);
			d.appendChild(sr);
			div.appendChild(d);
			if (this.which==1) {
				sl.innerHTML = data.interactions[i].stage_name + "&nbsp;";
				sm.innerHTML = data.interactions[i].interaction_type + "->";
				sr.innerHTML = data.interactions[i].node_working_name + "/" + data.interactions[i].node_stage_name;
				var set = new ixSetter( this.ix_editor, data.interactions[i].node_id, data.interactions[i].stage_name, 
				data.interactions[i].node_stage_name, data.interactions[i].interaction_type); 
				$(sm).click( set.invoke1 );
			} else {
				sl.innerHTML = data.interactions[i].node_working_name + "/" + data.interactions[i].node_stage_name + "&nbsp;"; 
				sm.innerHTML = data.interactions[i].interaction_type + "->";
				sr.innerHTML = data.interactions[i].stage_name;
				var set = new ixSetter( this.ix_editor, data.interactions[i].node_id, data.interactions[i].stage_name, 
				data.interactions[i].node_stage_name, data.interactions[i].interaction_type); 
				$(sm).click( set.invoke2 );
			}
		}
	}
}

IXInput.prototype.addNewStageCB = function (response) {
	if (response != undefined && response.error != undefined) {
		alert( response.error);
	} else {
		$( this.stage_select ).dialog("destroy");
		// we get a stage object in return..add it to node dialog node object
		if (this.node == undefined) alert("No stage");
		this.node.stages.push( response );
		// now what?
		this.setStages( response.name );
	}
}

IXInput.prototype.getSelectedStageId = function ( ) {
	var stage_id = $( this.stage_select).children("option:selected").val();
	if ( isNumber(stage_id)) return stage_id;
	return undefined;
}

IXInput.prototype.getSelectedStage = function ( ) {
	var stage_name = $( this.stage_select).children("option:selected").text();
	var stage_id = $( this.stage_select).children("option:selected").val();
	for (var i=0; i< this.node.stages.length; i++){
		if ( ( stage_name != undefined) && ( stage_name == this.node.stages[i].name) && ( stage_id == this.node.stages[i].id)){ 
			return this.node.stages[i];
		} 
	}
	return undefined;
}
	
IXInput.prototype.setStageSelectByName = function ( stage_name) {
	for( var i=0; i < this.stage_select.options.length; i++) {
		var opt = this.stage_select.options[i];
		if ( $(opt).text() == stage_name) {
			this.stage_select.selectedIndex = i;
		}
	}	
}
IXInput.prototype.setStages = function ( stage_name) {
	if (this.node == undefined) return;

	// clear it
	$(this.stage_select).html("");

	for (var i=0; i< this.node.stages.length; i++){
		var tmp2 = '<option value="' + this.node.stages[i].id + '">'+ this.node.stages[i].name +'</option>';
		if ( ( stage_name != undefined) && ( stage_name == this.node.stages[i].name) ){ 
			tmp2 = '<option value="' + this.node.stages[i].id + '" selected="selected">'+ this.node.stages[i].name +'</option>';
		} 
		// we could also have a situation where we want to set the stage name from a callback to get the node info
		//  setNodeAndStageName
		if ( ( this.current_stage_name != undefined) && ( this.current_stage_name == this.node.stages[i].name) ){ 
			tmp2 = '<option value="' + this.node.stages[i].id + '" selected="selected">'+ this.node.stages[i].name +'</option>';
			this.current_stage_name = undefined;
		} 
		$( this.stage_select ).append( tmp2);
	}
	for (var i in display_options.stage_names) {
		var sn = display_options.stage_names[i];
		if ( !this.node.hasStageName( sn ) ) {
			var sn_s = sn + " *";
			var tmp2 = '<option value="' + sn_s + '">'+ sn_s +'</option>';
			$( this.stage_select ).append( tmp2);
		}
	}

	$( this.stage_select ).unbind('change');
	$( this.stage_select ).bind("change", createMethodReference(this.ix_editor, "getInteractionInfo") ); 

	// this is also an asynchronous call to the ix editor 
	this.ix_editor.getInteractionInfo() ; 
}

IXInput.prototype.addNewStage = function ( ) {
	if (this.stage_select == undefined || this.node == undefined) return;
	var p = new Object();
	p.node_id = this.node.id;
	p.stage_name = $( this.stage_select ).val();
	if (p.stage_name.charAt( p.stage_name.length -1) != "*") {
		alert("Warning: Attempting to create a stage that already exists.");
		return;
	}
	p.stage_name = p.stage_name.slice(0, p.stage_name.length -2)
	p.functionName = "addNewStage"; 
	$.ajax( { async:true, type:"GET", dataType:"json", 
		data: p,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewStageCB")
	});
}

IXInput.prototype.setNodeInfo = function(node) {	
	if (node.id == undefined) {
		alert("This node does not exist in our database");
		return;
	}
	this.node = new Node(node); //transfer it to our node object

	// this is asynchronous, but safe to call here
	this.getAllInteractionsForNode();

	this.infodiv.innerHTML = "";

	var tmp="<p><hr></p>";
	tmp += "<p>working name: <big><b>" + this.node.working_name +"</b></big><p>";
	if (this.node.itis_id != -1 ) {
		tmp += "<p>Itis common name: <span id=\"node"+this.which+"commonname\">&nbsp; &nbsp; &nbsp;</span><br>";
		tmp += "Itis latin name: <span id=\"node"+this.which+"latinname\">&nbsp; &nbsp; &nbsp;</span><br>";
		tmp+="Itis id: " + this.node.itis_id +"<p>";
	}
	
	this.infodiv.innerHTML = tmp;
	this.infodiv.appendChild( this.stage_select );
	
	// retrieve the itis information
	if (node.itis_id != -1 ) {
		getItisCommonNames(node.itis_id, "#node"+this.which+"commonname", false );
		getItisLatinName(node.itis_id, "#node"+this.which+"latinname", false );
	}

	this.setStages();
} 	

IXInput.prototype.getAllInteractionsForNodeCB = function(data, t, x) {	
	if (data != undefined) {
		if (data.error != undefined ) {
			alert(data.error);
		} else {
			this.setInteractionInfoSingle( data );		
		}
	}
}

IXInput.prototype.getAllInteractionsForNode = function(data, t, x) {	
	if (this.node == undefined || this.which == undefined) return;
	var postdata2 = Object();
	postdata2.functionName = "getAllInteractionsForNode";
	postdata2.node_id = this.node.id; 
	postdata2.stage_1_or_2 = this.which;
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata2, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "getAllInteractionsForNodeCB")
	});	
}

IXInput.prototype.getNodeItemsCB = function(node, t, x) {	
	if (node != undefined) {
		if (node.error != undefined ) {
			alert(node.error);
		} else {
			this.setNodeInfo( node);		
		}
	}
}
IXInput.prototype.wn_autocompleteCB = function (e, ui) {
	this.resetSearches();
	var postdata = Object();
	postdata.functionName = "getNodeItems";
	postdata.node_id = ui.item.id;
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "getNodeItemsCB") 	
	});
}

IXInput.prototype.ln_autocompleteCB = function (e, ui) {
	this.resetSearches();
	var itis_id = ui.item.id;
	var postdata = Object();
	postdata.functionName = "getNodeItems";
	postdata.itis_id = ui.item.id;
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "getNodeItemsCB") 	
	});
}



/// -----------------

function InteractionsEditor() {
	this.id = "interactions_dialog";
	this.element = document.createElement("div");
	this.element.title = "Interactions Editor";
	this.element.id = this.id;

	this.interaction_type_select = document.createElement("select")
	this.interaction_type_select.style.marginBottom = "20px";

	var tmp = '<option name="trophic" value="trophic">trophic (1 eats 2)</option>';
	tmp += '<option name="competition" value="competition">competition (1 outcompetes 2)</option>';
	tmp += '<option name="facilitation" value="facilitation">facilitation (1 facilitates 2)</option>';
	tmp += '<option name="parasitic" value="parasitic">parasitic (1 is parasite of 2)</option>';
	this.interaction_type_select.innerHTML = tmp;

	this.interaction_info  = document.createElement("div");

	this.add_observation_but  = document.createElement("button");
	this.add_observation_but.innerHTML = "Add Observation";
	this.add_interaction_but  = document.createElement("button");
	this.add_interaction_but.innerHTML = "Add Interaction";


	var table = document.createElement("table");
	table.setAttribute( "cellpadding", "10");
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.setAttribute("valign", "top");
	td1.setAttribute("align", "left");
	td1.setAttribute("width", "33%");
	td1.style.minWidth = "220px";

	var td_c = document.createElement("td");
	td_c.setAttribute("valign", "top");
	td_c.setAttribute("align","left");
	td_c.setAttribute("width", "*");
	td_c.style.minWidth = "280px";

	var td2 = document.createElement("td");
	td2.setAttribute( "valign", "top");
	td2.setAttribute( "align", "left");
	td2.setAttribute("width", "33%");
	td2.style.minWidth = "220px";

	table.appendChild(tr);
	tr.appendChild(td1);
	tr.appendChild(td_c);
	tr.appendChild(td2);

	td_c.appendChild(this.interaction_type_select);
	td_c.appendChild(this.interaction_info);
	td_c.appendChild(this.add_observation_but);
	td_c.appendChild(this.add_interaction_but);

	this.ixinput1 = new IXInput( this, td1, 1);
	this.ixinput2 = new IXInput( this, td2, 2);

	this.element.appendChild(table);

}

InteractionsEditor.prototype.reset = function () {
	this.ixinput1.reset();
	this.ixinput2.reset();
	this.interaction_info.innerHTML="";
	this.setInteractionTypeSelect("trophic");
}

InteractionsEditor.prototype.setInteractionTypeSelect = function( interaction_type ) {
	for( var i=0; i < this.interaction_type_select.options.length; i++) {
		var opt = this.interaction_type_select.options[i];
		if (opt.value == interaction_type) {
			this.interaction_type_select.selectedIndex = i;
		}
	}	
}


InteractionsEditor.prototype.getInteractionInfo = function() {	
	if (this.dontcall != undefined) {
		this.dontcall = undefined;
		return;
	}

	this.interaction_id = undefined;

	this.interaction_info.innerHTML = "";

	$( this.add_observation_but ).button( "option", "disabled", true  );
	$( this.add_interaction_but ).button( "option", "disabled", true  );

	$( this.add_observation_but ).unbind( "click");
	$( this.add_interaction_but ).unbind( "click");
	
	$( this.add_interaction_but ).button( "option", "label", "Add Interaction");

	if (this.ixinput1.node == undefined || this.ixinput2.node == undefined) {
		return;
	}
	var sn1 = $(this.ixinput1.stage_select).val();
	var sn2 = $(this.ixinput2.stage_select).val();

	if (sn1 == undefined || sn2 == undefined) {
		alert("Error: getInteractionInfo, at least one stage is undefined");
		return
	} 

	if (sn1.charAt( sn1.length -1) == "*"){
		var txt = "Node '" + this.ixinput1.node.working_name + "' does not have a stage '" + sn1.slice(0, sn1.length -2);
		txt += "'.\nWould you like to create it now?";
		if (confirm(txt)) this.ixinput1.addNewStage();
		return;
	}
	if (sn2.charAt( sn2.length -1) == "*"){
		var txt = "Node '" + this.ixinput2.node.working_name + "' does not have a stage '" + sn2.slice(0, sn2.length -2);
		txt += "'.\nWould you like to create it now?";
		if (confirm(txt)) this.ixinput2.addNewStage();
		return;
	}

	// now check to see if there is an interaction
	var p = new Object();
	p.functionName = "getInteractionInfo";
	p.stage_1_id =  this.ixinput1.getSelectedStageId();
	p.stage_2_id =  this.ixinput2.getSelectedStageId();
	p.interaction_type = $( this.interaction_type_select).val();
	$.ajax( { async:true, type:"GET", dataType:"json", 
		data: p,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "getInteractionInfoCB")
	});
}

InteractionsEditor.prototype.getInteractionInfoCB = function( data, t, x) {
	if (data == undefined) {
		alert("No data on getInteractionInfoCB");
		return;
	}
	if (data.error != undefined) {
		alert(data.error);
		return;
	}
	$( this.add_interaction_but ).button( "option", "disabled", false  );

	//console.log(data);
	if (data.id != undefined) {
		this.interaction_id = data.id;
		// if we have observations, make a remove interaction button
		$( this.add_interaction_but ).button( "option", "label", "Remove Interaction");
		$( this.add_observation_but ).button( "option", "disabled", false  );
	
		$( this.add_interaction_but ).bind( "click", createMethodReference(this, "deleteInteraction"));
		$( this.add_observation_but ).bind( "click", createMethodReference(this, "addNewObservation")  );
	
	} else {
		this.interaction_id = undefined;
		// if no observations, make a add interaction button
		$( this.add_interaction_but ).button( "option", "label", "Add Interaction");
		$( this.add_interaction_but ).bind( "click", createMethodReference(this, "addNewInteraction"));
	}

	if ( data.observations != undefined) {
		console.log("got some observations");
		for (var i=0; i< data.observations.length; i++) {
			var obs = new ObservationSpan( this.interaction_info, data.observations[i] );
		}
	}
}

InteractionsEditor.prototype.open = function( node1_id, stage1_name, interaction_type, node2_id, stage2_name) {
	var $element = $(this.element);

	if ($element.length>0) {
		$element.dialog("destroy");
		$element.remove();
	}

	$('body').append( this.element );

	$element.dialog({
		autoOpen: true,
		height: 500,
		width: 850,
		modal: false	,
		buttons: {  Close: function() { $( this ).remove(); } },
		close: function() { $( this ).remove(); }
	});

	this.reset();
	
	this.ixinput1.setAutocomplete();
	this.ixinput2.setAutocomplete();

	$( this.add_observation_but ).button( { "disabled": true } );
  $( this.add_interaction_but).button( {  "disabled": true } );

	$( this.interaction_type_select ).unbind( "change" );
	$( this.interaction_type_select ).bind( "change", createMethodReference(this, "getInteractionInfo"));
	if (node1_id != undefined 
		&& stage1_name != undefined 
	&& interaction_type != undefined 
	&& node2_id != undefined 
	&& stage2_name != undefined) {
		this.setInteraction( node1_id, stage1_name, interaction_type, node2_id, stage2_name);
	}
}

InteractionsEditor.prototype.setInteraction = function( node1_id, stage1_name, interaction_type, node2_id, stage2_name ) {
		this.setInteractionTypeSelect(interaction_type);	
		// we set this to hold the first one that returns info
		this.dontcall = true;
		this.ixinput1.setNodeAndStageName( node1_id, stage1_name);
		this.ixinput2.setNodeAndStageName( node2_id, stage2_name);
}

// post a new interaction for the two node/stage pairs.
InteractionsEditor.prototype.addNewInteractionCB = function(data, t, x) {
	if (data.error == undefined && data.id != undefined ) {
		this.getInteractionInfo();
		this.ixinput1.getAllInteractionsForNode();
		this.ixinput2.getAllInteractionsForNode();
	} else {
		alert("Error getting interaction info on add: " + data.error);
		alert(data.sql);
	}	
}

InteractionsEditor.prototype.addNewInteraction = function() {
	var postdata = Object();
	postdata.functionName = "addNewInteraction";
	postdata.interaction_type = $(this.interaction_type_select).val();
	postdata.stage_1_id = this.ixinput1.getSelectedStageId();
	postdata.stage_2_id = this.ixinput2.getSelectedStageId();
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewInteractionCB") 
	});
}

InteractionsEditor.prototype.deleteInteractionCB = function(data, t, x) {
	if (data.error == undefined  ) {
		this.getInteractionInfo();
		this.ixinput1.getAllInteractionsForNode();
		this.ixinput2.getAllInteractionsForNode();
	} else {
		alert("Error getting deleted interaction info: " + data.error);
		alert(data.sql);
	}	
}

// delete an interaction
InteractionsEditor.prototype.deleteInteraction = function() {
	if (this.interaction_id == undefined) {
		alert("interaction id is not defined.");
		return;
	}
	if (!confirm("Delete this interaction?" ) ) {
		return;
	}
	var postdata = Object();
	postdata.functionName = "deleteInteraction";
	postdata.interaction_type = $(this.interaction_type_select).val();
	postdata.interaction_id = this.interaction_id;	
	postdata.stage_1_id = this.ixinput1.getSelectedStageId();
	postdata.stage_2_id = this.ixinput2.getSelectedStageId();
	$.ajax( { async:false, type:"GET", dataType:"json",
			data: postdata, 
			url: "query.php", 
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
			success: createMethodReference(this, "deleteInteractionCB")
	});
}

InteractionsEditor.prototype.addNewObservation = function( ) {

	observationdialog.open(this);

}


