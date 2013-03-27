
function ObservationSpan ( parent_div, observation ) {
	this.element = document.createElement("div");
	this.element.className = "cited";
	this.element.style.position = "relative";

	this.infodiv = document.createElement("div");
	this.infodiv.style.padding="5px";

	this.cite_span = document.createElement("span");

	this.open_but = document.createElement("button");

	this.del_but = document.createElement("button");
	this.del_but.style.position = "absolute";
	this.del_but.style.right = "5px";
	this.del_but.style.top = "5px";

	this.is_open = false;

	this.observation = observation;
	parent_div.appendChild( this.element);

	this.getCitationInfo(this.observation.cite_id);

}

ObservationSpan.prototype.getInteractionType = function() {	
	for (var i in this.observation) {
		var idx = i.indexOf("interaction_id");
		if (idx != -1) {
			var type =  i.slice(0, idx -1);
			return type;	
		};
	}
	return undefined;
}
ObservationSpan.prototype.getInteractionId = function() {	
	for (var i in this.observation) {
		if (i.indexOf("interaction_id") != -1) {
			return this.observation[i];	
		};
	}
	return undefined;
}

ObservationSpan.prototype.openInfoDiv = function(data, t, x) {	
	if(this.is_open) {
		//close it
		this.is_open = false;
		var $but = $(this.open_but);
		$but.text("open");
		$but.button( { icons: {primary:'ui-icon-circle-triangle-s'}, text: false } );
		$(this.infodiv).hide(200);
	} else {
		// open it
		this.is_open = true;
		var $but = $(this.open_but);
		$but.text("close");
		$but.button( { icons: {primary:'ui-icon-circle-triangle-n'}, text: false } );
		$(this.infodiv).show(200);
	}
}
ObservationSpan.prototype.setCitationInfo = function(data) {	
	this.cite = data;

	var tmp = '[' + data.authors[0].last_name + '.' + data.year +']';
	$(this.cite_span ).html( tmp  );

	var $but = $(this.del_but);
	$but.attr("data-icon", "delete");
	$but.text("delete");
	$but.button( { icons: {primary:'ui-icon-circle-close'}, text: false } );
	$but.unbind("click");
	$but.click(  createMethodReference(this, "deleteInteractionObservation") );
	$but.css( "border", "0px" );
	$but.css( "height", "10px" );
	$but.css( "width", "10px" );
	$but.css( "padding", "0px" );
	$but.css( "display", "inline-block" );
	$but.css( "float", "none" );
	$but.css( "clear", "both" );

	var authors="";
	for (var j=0;j< this.cite.authors.length;j++) {
		if (j != 0) authors+=", ";
		authors+=this.cite.authors[j].first_name + " ";
		authors+=this.cite.authors[j].last_name;
	}

	$( this.element ).html("");

	this.element.appendChild( this.open_but);
	this.element.appendChild( this.cite_span);
	this.element.appendChild( this.del_but);
	this.element.appendChild( this.infodiv);

	var tooltip = authors + "<i>" + this.cite.title + "</i>, " + this.cite.year;
	tooltip += "<br>";

	for (var i in this.observation) {
		var p = document.createElement("div");
		var txt = "&nbsp;&nbsp;" + i + "&nbsp;:&nbsp;";
		txt += this.observation[i];
		tooltip += txt + "<br>";
		p.innerHTML = txt ;
		this.infodiv.appendChild( p );
	}

	var $but = $(this.open_but);
	$but.text("open");
	$but.button( { icons: {primary:'ui-icon-circle-triangle-s'}, text: false } );
	$but.css( "border", "0px" );
	$but.css( "height", "10px" );
	$but.css( "width", "10px" );
	$but.css( "padding", "0px" );
	$but.css( "margin-right", "5px" );
	$but.css( "display", "inline-block" );
	$but.css( "float", "none" );
	$but.css( "clear", "both" );
	$but.click( createMethodReference(this, "openInfoDiv") );

	this.element.setAttribute('title', tooltip);
	$(this.infodiv).hide();
	this.is_open = false;

	$( this.element ).tipTip();

}

ObservationSpan.prototype.getCitationInfoCB = function(data, t, x) {	
	if (data == null) {
		alert("Error : data is null" );
	} else if (data.error != undefined ) {
		alert("Error: " + data.error);
	} else {
		// add to global citations array
		citations.push(data);
		this.setCitationInfo(data);
	}
}

// call the DB to get citation info for a particular id
// appends the returned data to the global citation array
ObservationSpan.prototype.getCitationInfo = function ( cite_id ) {
	// first check to see if we have it globally already
	var tmp_cite = citations.get(cite_id)
	if ( tmp_cite != undefined ) {
		this.setCitationInfo( tmp_cite);
		return;
	}
	var postdata = Object() ;
	postdata.functionName = "getCitationInfo";
	postdata.cite_id = cite_id;
	$.ajax( { async:true, type:"GET", dataType:"json",
			data: postdata, 
			url: "query.php", 
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
			success: createMethodReference(this, "getCitationInfoCB") 
	});
	return postdata.response;
}

// delete any cited variable whether for stage or node
// table - full name of table (node_max_age, stage_residency, etc.)
ObservationSpan.prototype.deleteInteractionObservation = function( ) {
	if (!confirm("Delete this cited interaction observation?" ) ) {
		return;
	}
	var obj = Object();
	obj.functionName = "deleteInteractionObservation";
	obj.location_id = this.observation.location_id;
	obj.cite_id = this.observation.cite_id;
	obj.observation_type = this.observation.observation_type;
	obj.interaction_id = this.getInteractionId();
	obj.interaction_type = this.getInteractionType();
	$.ajax( { async:true, type:"GET", dataType:"json",
		data: obj,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "deleteInteractionObservationCB")	
	} );
}

ObservationSpan.prototype.deleteInteractionObservationCB = function( data, t, x) {
	if (data == null || data == undefined) {
		alert("Error : data is null" );
	} else if (  data.error != undefined) {
		alert("Error deleting citation value: " + data.error );
	} else {
		// everything went okay, we want to remove that one
		$( this.element).remove();
		this.cite = undefined;
		this.element = undefined;
	}
}

///----------------------------------

function InteractionObservationDialog() {
	this.id = "observation_dialog";
	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.style.paddingTop = "15px";

	this.search = new Input(this, "search");
	this.search.display_name = "Search Citations :";
	this.search.tooltip = "Type here to search available citations by first or last name of author OR by title";
	this.search.autocomplete_cb = createMethodReference(this, "autocompleteCB");
	this.search.autocomplete_source =	"auto/citation_name.php" ;

	this.cite_select= new Input(this, "cite_select", "select");
	this.cite_select.display_name = "Citation :";
	this.cite_select.tooltip = "Select a citation here. There can only be one citation for a value.";
	this.cite_select.setSelect( new Array());

	this.comment = new Comment();
	this.datum = new Datum();
	
}

InteractionObservationDialog.prototype.autocompleteCB = function ( e, ui ) {
	this.getCitationInfo( ui.item.id ); 
	return false;
}

InteractionObservationDialog.prototype.setCitationInfo = function ( cite ) {
	$(this.cite_select.element).children().each(function(i, option){ 
		if (cite.id == $(option).val()) {
			$(option).attr("selected","selected");  
		} 
	});
}

// add a citation <option> element to the citation dialog
InteractionObservationDialog.prototype.addCiteToCitationDialogSelect = function( cite ) {
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
InteractionObservationDialog.prototype.getCitationInfoCB = function(data, t, x) { 
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

InteractionObservationDialog.prototype.getCitationInfo = function ( cite_id) {
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
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
      success: createMethodReference(this, "getCitationInfoCB")  
	});
}

InteractionObservationDialog.prototype.onClick= function ( e ) {
	var cite_id = this.cite_select.element.options[this.cite_select.element.selectedIndex].value;
	if (cite_id == "") {
		alert("You need to assign a citation source");
		return;
	}

	var have_a_var= false;
	for (var i in this.cvars) {
		if (this.cvars[i].element.value != ""){
			have_a_var = true;
			break;
		}
	}

	if (have_a_var == false) {
		alert("You need to assign at least one observation variable.");
		return;
	}

	if (this.interaction_type == undefined) {
		alert("Error: No interaction type is defined.");
		return;
	}
	if (this.ixdialog.interaction_id == undefined) {
		alert("Error: No interaction ID is defined.");
		return;
	}

	var postdata = Object();
	postdata.functionName = "addNewInteractionObservation";
	postdata.cite_id = cite_id;
	postdata.interaction_type = this.interaction_type;
	postdata.interaction_id = this.ixdialog.interaction_id;
	var comment = this.comment.getComment();
	if (comment!= "") {
		postdata.comment = comment;
	}
	var datum = this.datum.getDatum();
	if (datum!= undefined) {
		postdata.datum = JSON.stringify( datum );
	}

	for(var i in this.cvars) {
		var l = this.cvars[i].field_name;
		postdata[l] = this.cvars[i].element.value;
	}		
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewInteractionObservationCB") 
	});

}

InteractionObservationDialog.prototype.addNewInteractionObservationCB = function ( data, t, x) {
	if (data == null) {
		alert("Error on addNewInteractionObservation, no response from server." );
	} else if (data.error == undefined ) {
		// we have a new  
		this.ixdialog.getInteractionInfo();
		this.close();	
	} else {
		alert("Error on addNewInteractionObservation:" + data.error);
		alert( data.sql);
	}
}

InteractionObservationDialog.prototype.close = function ( ) {
	$(this.element).remove();
}

InteractionObservationDialog.prototype.open = function ( ixdialog) {
	this.ixdialog = ixdialog;
	this.search.clear();

	if ( $(this.element).dialog( "isOpen" ) === true ) {
		return;
	}

	$(this.element).empty();
	$('body').append( this.element );

	this.search.createDivRow( this.element );

	this.add_cite_but = new Input(this, "add_cite_but", "button");
	this.add_cite_but.tooltip = "Add a new citation";
	var cback =  new callbackObject(this, "addCiteToCitationDialogSelect");
	this.add_cite_but.setButton("Add New Citation", function () { addcitation.open( cback ) });
	this.add_cite_but.createDivRow( this.element );

	this.cite_select.createDivRow( this.element );
	this.cite_select.element.style.marginBottom = "20px";

	this.interaction_type = $(this.ixdialog.interaction_type_select).val();
	this.createInputs( );

	for (var i in this.cvars) {
		this.cvars[i].createDivRow(this.element);
		this.cvars[i].element.className = "medium";
	}

	this.comment = new Comment();
	this.datum = new Datum();
	
	var holder = new Input(this, "blank", "div");
	holder.createDivRow(this.element);
	$(holder.element).append( this.comment.button );
	$(holder.element).append( this.datum.button );

	var title = "Add " +  capitalize( this.interaction_type)  + " Interaction Observation";
	var func = new Object();
	func[title] = createMethodReference(this, "onClick");
	func["Close"] =  function() { $( this ).remove();	}

	$( this.element ).dialog({
		autoOpen: true,
		closeOnEscape: true,
		title:  title,
		height: 500,
		width: 700,
		modal: true,
		close: function() { $( this ).remove(); },
		buttons: func	
	});

}

InteractionObservationDialog.prototype.createInputs = function (  ) {
	this.cvars = new Object();
	if (this.interaction_type == undefined) return;
	// everything has a location
	this.cvars.location = new Input(this, "location_id", "select");
	this.cvars.location.display_name  = "Location :";
	this.cvars.location.tooltip = "Add separate observations for an interaction observed in multiple regions."; 
	this.cvars.location.setSelect( display_options.locations);

	if ( this.interaction_type == "trophic") {

		this.cvars.lethality = new Input( this, "lethality", "select");
		this.cvars.lethality.display_name = "Lethality :";
		this.cvars.lethality.tooltip = "<b>Lethal Whole</b> - the entire individual is consumed.<br><b>Lethal Partial</b> - only part of the individual is consumed, but the effect is fatal.<br><b>Nonlethal partial</b> - only part of the individual is consumed and the effect is not lethal."; 
		this.cvars.lethality.setSelect(display_options.trophic_interaction_observation_lethality);

		this.cvars.structures_consumed = new Input(this, "structures_consumed", "select");
		this.cvars.structures_consumed.display_name = "Structures consumed :";
		this.cvars.structures_consumed.tooltip = "<b>Whole organism</b> (default).<br><b>Flesh</b> - e.g., shell is not consumed.<br><b>Frond</b> - e.g. stipe is not consumed</p>"; 
		this.cvars.structures_consumed.setSelect(display_options.trophic_interaction_observation_structures_consumed); 

		this.cvars.percentage_consumed = new Input(this, "percentage_consumed", "number");
		this.cvars.percentage_consumed.display_name = "Percentage consumed :";
		this.cvars.percentage_consumed.tooltip = "fraction of individual consumed"; 
		this.cvars.percentage_consumed.element.style.marginBottom="14px";

		this.cvars.percentage_diet = new Input(this, "percentage_diet", "number");
		this.cvars.percentage_diet.display_name = "Percentage of diet :";
		this.cvars.percentage_diet.tooltip = "percentage of predator's diet"; 


		this.cvars.percentage_diet_by = new Input(this, "percentage_diet_by", "select");
		this.cvars.percentage_diet_by.display_name = "Percentage of diet by :";
		this.cvars.percentage_diet_by.tooltip = "How to measure the percentage of predator's diet; by volume, mass, or count"; 
		this.cvars.percentage_diet_by.setSelect(display_options.trophic_interaction_observation_percentage_diet_by); 
		this.cvars.percentage_diet_by.element.style.marginBottom="14px";
	

		this.cvars.preference = new Input(this, "preference", "select");
		this.cvars.preference.display_name = "Preference :"; 
		this.cvars.preference.tooltip = "<b>None</b> prey is consumed in proportion to its availability in the environment.<br><b>More preferred</b> - prey is consumed in greater proportion than is reflected by its availability in the environment.<br><b>Less preferred</b> - prey is consumed in lower proportion than is reflected by its availability in the environment."; 
		this.cvars.preference.setSelect(display_options.trophic_interaction_observation_preference); 

		this.cvars.observation_type = new Input( this, "observation_type", "select");
		this.cvars.observation_type.display_name = "Observation type :";
		this.cvars.observation_type.tooltip = "<b>Field observation</b>.<br><b>Laboratory observation</b> - Observation made in non-field setting.<br><b>Chemical</b> - Stable isotope, fatty acid, etc.<br><b>Gut contents</b>.<br><b>Inferred</b> - Based on similar species.<br><b>Expert opinion</b>.<br><b>Fishery</b> - Caught by humans.<br><b>Nest contents</b>.<br><b>Scat</b>.<br><b>Forensic</b>."; 
		this.cvars.observation_type.setSelect(display_options.trophic_interaction_observation_observation_type); 
	}

	if ( this.interaction_type == "parasitic") {
		this.cvars.endo_ecto = new Input(this, "endo_ecto", "select");
		this.cvars.endo_ecto.display_name = "Endo ecto :";
		this.cvars.endo_ecto.tooltip = "<b>Endoparasite</b> - inside body cavity.<br><b>Ecoparasite</b> - on body surface (including oral cavity)"; 
		this.cvars.endo_ecto.setSelect(display_options.parasitic_interaction_observation_endo_ecto); 

		this.cvars.lethality = new Input(this, "lethality", "select");
		this.cvars.lethality.display_name = "Lethality";
		this.cvars.lethality.tooltip = "<b>benign</b> - does not directly cause mortality.<br><b>lethal</b> - directly causes mortality."; 
		this.cvars.lethality.setSelect(display_options.parasitic_interaction_observation_lethality); 

		this.cvars.prevalence = new Input( this, "prevalence", "number");
		this.cvars.prevalence.display_name = "Prevalence :";
		this.cvars.prevalence.tooltip = "<b>Prevalence</b> - % of hosts infected."; 

		this.cvars.intensity = new Input(this, "intensity", "number");
		this.cvars.intensity.display_name = "Intensity :";
		this.cvars.intensity.tooltip = "<b>Intensity</b> - #parasites/host"; 

		this.cvars.parasite_type = new Input(this, "parasite_type", "select");
		this.cvars.parasite_type.display_name = "Type :";
		this.cvars.parasite_type.tooltip = "<b>Typical parasites/parasitoid</b> - recruit to hosts, but do not multiply on them.  Impact on the host is intensity dependent (e.g., worms in the gut).<br><b>Pathogen</b> -  microbe or microorganism that reproduces in or on the host to cause disease (e.g., virus, bacterium, prion, fungus).<br><b>Castrator</b> - blocks hosts reproduction, partially or completely (e.g.rhizocephalan barnacle, larval trematode).<br><b>Trophically transmitted parasite larva</b> (typical parasites and castrators): cysts in a prey host that become adult parasites in an adult host."; 
		this.cvars.parasite_type.setSelect(display_options.parasitic_interaction_observation_parasite_type); 

		this.cvars.observation_type = new Input( this, "observation_type", "select");
		this.cvars.observation_type.display_name = "Observation type :";
		this.cvars.observation_type.tooltip = "<b>Field observation</b>.<br><b>Laboratory observation</b> - Observation made in non-field setting.<br><b>Chemical</b> - Stable isotope, fatty acid, etc.<br><b>Gut contents</b>.<br><b>Inferred</b> - Based on similar species.<br><b>Expert opinion</b>.<br><b>Fishery</b> - Caught by humans.<br><b>Nest contents</b>.<br><b>Scat</b>.<br><b>Forensic</b>."; 
		this.cvars.observation_type.setSelect(display_options.parasitic_interaction_observation_observation_type);
	}

	if ( this.interaction_type == "competition") {
		this.cvars.observation_type = new Input( this, "observation_type", "select");
		this.cvars.observation_type.display_name = "Observation type :";
		this.cvars.observation_type.tooltip = "<b>Field observation</b>.<br><b>Laboratory observation</b> - Observation made in non-field setting.<br><b>Chemical</b> - Stable isotope, fatty acid, etc.<br><b>Gut contents</b>.<br><b>Inferred</b> - Based on similar species.<br><b>Expert opinion</b>.<br><b>Fishery</b> - Caught by humans.<br><b>Nest contents</b>.<br><b>Scat</b>.<br><b>Forensic</b>."; 
		this.cvars.observation_type.setSelect(display_options.competition_interaction_observation_observation_type);

		this.cvars.competition_type = new Input( this, "competition_type", "select");
		this.cvars.competition_type.display_name = "Competition type :";
		this.cvars.competition_type.tooltip = "<b>Space</b> - indirect competition through removal of available space.<br><b>Interference</b> - direct aggression between individuals"; 
		this.cvars.competition_type.setSelect(display_options.competition_interaction_observation_competition_type); 

	}

	if ( this.interaction_type == "facilitation") {
		this.cvars.observation_type = new Input( this, "observation_type", "select");
		this.cvars.observation_type.display_name = "Observation type :";
		this.cvars.observation_type.tooltip = "<b>Field observation</b>.<br><b>Laboratory observation</b> - Observation made in non-field setting.<br><b>Chemical</b> - Stable isotope, fatty acid, etc.<br><b>Gut contents</b>.<br><b>Inferred</b> - Based on similar species.<br><b>Expert opinion</b>.<br><b>Fishery</b> - Caught by humans.<br><b>Nest contents</b>.<br><b>Scat</b>.<br><b>Forensic</b>."; 
		this.cvars.observation_type.setSelect(display_options.facilitation_interaction_observation_observation_type); 

		this.cvars.facilitation_type = new Input(this, "facilitation_type", "select");
		this.cvars.facilitation_type.display_name = "Facilitation type :";
		this.cvars.facilitation_type.tooltip = "<b>Habitat</b> - e.g., kelp providing shelter to juvenile fishes.<br><b>Mutualism</b> - both partners profit from interaction.<br><b>Commensalism</b> - one partner profits, the other is unaffected"; 
		this.cvars.facilitation_type.setSelect(display_options.facilitation_interaction_observation_facilitaton_type);
	}
}
	
