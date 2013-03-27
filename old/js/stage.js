
function StageTab( stagetabs_obj, stageobj  ) {
	this.parent = stagetabs_obj;
	this.stage = stageobj;
	// we only need the stage id to make a unique div id name
	this.id =  this.parent.id + "_" + this.stage.name + "_" + this.stage.id;

	this.element = document.createElement("table");
	this.element.setAttribute('cellspacing', "5");
	this.element.setAttribute('id', this.id);
	this.element.style.paddingTop = "15px";

	// hold an object for all of our cited variables
	this.cvars = new Object();

	var mb = "20px";
	this.cvars.stage_population = new CiteInput(this, "population", "number");
	this.cvars.stage_population.display_name = "Percent of Population :";
	this.cvars.stage_population.tooltip = "Percentage of population 0-100%";

	this.cvars.stage_reproductive_strategy = new CiteInput(this, "reproductive_strategy", "select");
	this.cvars.stage_reproductive_strategy.display_name ="Reproductive strategy :";
	this.cvars.stage_reproductive_strategy.tooltip =  "<b>Broadcast-Gametes</b> or offspring are released without care.<br><b>Brooder-Offspring</b> are cared for either inside or outside the body for at least part of their development.<br><b>Parental Care</b> - Offspring are cared for after their development.";
	this.cvars.stage_reproductive_strategy.setSelect( display_options.stage_reproductive_strategy); 
	this.cvars.stage_reproductive_strategy.element.style.marginBottom = mb;


	this.cvars.stage_length = new CiteInput(this, "length", "number");
	this.cvars.stage_length.display_name= "Individual Body Length :";
	this.cvars.stage_length.tooltip =  "Average body length (mm)";

	this.cvars.stage_mass = new CiteInput(this,  "mass", "number");
	this.cvars.stage_mass.display_name = "Individual Body Mass :";
	this.cvars.stage_mass.tooltip = "Average total body weight (g)";

	this.cvars.stage_drymass = new CiteInput(this, "drymass", "number");
	this.cvars.stage_drymass.display_name = "Individual Body Drymass :";
	this.cvars.stage_drymass.tooltip = "Average dry body weight (g)";
	this.cvars.stage_drymass.element.style.marginBottom = mb;

	this.cvars.stage_length_weight= new CiteInput(this,  "length_weight", "select", "length_measure");
	this.cvars.stage_length_weight.display_name = "Length(L)-Weight(W) :";
	this.cvars.stage_length_weight.tooltip = "L-Length (mm);   W-Weight (g)";
	this.cvars.stage_length_weight.setLengthWeight( display_options["stage_length_weight"] ) ;

	this.cvars.stage_length_fecundity = new CiteInput(this, "length_fecundity", "select", "length_measure");
	this.cvars.stage_length_fecundity.display_name = "Length(L)-Fecundity(F) :";
	this.cvars.stage_length_fecundity.tooltip = "L-Length (mm);  F-Fecundity (# of offspring)";
	this.cvars.stage_length_fecundity.setLengthWeight( display_options["stage_length_fecundity"]); 
	this.cvars.stage_length_fecundity.element.style.paddingBottom = mb;

	this.cvars.stage_lifestyle = new CiteInput(this, "lifestyle", "select");
	this.cvars.stage_lifestyle.display_name = "Lifestyle :";
	this.cvars.stage_lifestyle.tooltip = "<b>Non-living</b> - e.g. detritus, bedrock, etc.<br><b>Free-living</b> - e.g. plankton, kelp, sea otter, etc.<br><b>Infectious</b> - e.g., parasite, virus, etc.";
	this.cvars.stage_lifestyle.setSelect ( display_options["stage_lifestyle"]); 

	this.cvars.stage_duration = new CiteInput(this, "duration", "number");
	this.cvars.stage_duration.display_name = "Duration :";
	this.cvars.stage_duration.tooltip = "Average duration of stage (days) ('General' stage would be same as Max Age)";

	this.cvars.stage_fecundity = new CiteInput(this, "fecundity", "number");
	this.cvars.stage_fecundity.display_name = "Fecundity :";
	this.cvars.stage_fecundity.tooltip = "Offspring produced per female individuals per year";

	this.cvars.stage_consumer_strategy = new CiteInput(this, "consumer_strategy", "select");
	this.cvars.stage_consumer_strategy.display_name = "Consumer strategy :";
	this.cvars.stage_consumer_strategy.tooltip = "<b>Autotroph</b> - Photosynthesizer (e.g. algae).<br><b>Grazer</b> - Benthic consumer of autotrophs (e.g., limpet, herbivorous fishes).<br><b>Filter feeder</b> - Suspension feeder capturing particles from water column (e.g., barnacle).<br><b>Passive sit</b> - Sit & wait predator (e.g., some fishes).<br><b>Active cursorial</b> - Actively foraging/ hunting predator (e.g., sea otter).<br><b>Detritivore</b> - Consumer of algal detritus (e.g., sea cucumber).<br><b>Scavenger</b> - Consumer of dead animal remains (e.g., some crabs)<br><b>Social predator</b> - hunts in packs (e.g. Orca)";
	this.cvars.stage_consumer_strategy.setSelect( display_options["stage_consumer_strategy"]);
	
	this.cvars.stage_habitat = new CiteInput(this, "habitat", "select");
	this.cvars.stage_habitat.display_name ="Habitat affiliation :";
	this.cvars.stage_habitat.tooltip = "<b>Rocky substrate</b> - Benthic hard rock.<br><b>Soft bottom</b> - Benthic sand, mud, etc.<br><b>Kelp Water column</b> - Non-benthic but within kelpforest.<br><b>Pelagic</b> - Water column outside of kelp forest";
	this.cvars.stage_habitat.setSelect( display_options["stage_habitat"]); 

	this.cvars.stage_max_depth = new CiteInput(this, "max_depth", "number");
	this.cvars.stage_max_depth.display_name = "Max depth :";
	this.cvars.stage_max_depth.tooltip ="Maximum recorded depth of species' occurrence (meters)";

	this.cvars.stage_mobility = new CiteInput(this, "mobility", "select");
	this.cvars.stage_mobility.display_name = "Mobility :";
	this.cvars.stage_mobility.tooltip ="<b>Sessile</b> - e.g., barnacle adult.<br><b>Mobile</b> - e.g., sea otter, fish.<br><b>Drifter</b> - e.g., zooplankton, phytoplankton";
	this.cvars.stage_mobility.setSelect( display_options["stage_mobility"]);

	this.cvars.stage_residency = new CiteInput(this, "residency", "select");
	this.cvars.stage_residency.display_name = "Residency :";
	this.cvars.stage_residency.tooltip = "<b>Resident</b> - permanent resident within nearshore ecosystem.<br><b>Migrant</b> - temporary resident of nearshore ecosystem, spending some time off-shore";
	this.cvars.stage_residency.setSelect( display_options["stage_residency"]); 

	this.cvars.stage_residency_time = new CiteInput(this, "residency_time", "number");
	this.cvars.stage_residency_time.display_name = "Residency time :";
	this.cvars.stage_residency_time.tooltip = "% of year spent in nearshore ecosystem";
	this.cvars.stage_residency_time.element.style.marginBottom = mb;


	this.cvars.stage_biomass_density = new CiteInput(this, "biomass_density", "number");
	this.cvars.stage_biomass_density.display_name = "Biomass density :";
	this.cvars.stage_biomass_density.tooltip = "Population biomass per square kilometer (kg/km^2)";

	this.cvars.stage_prod_biomass_ratio = new CiteInput(this, "prod_biomass_ratio", "number");
	this.cvars.stage_prod_biomass_ratio.display_name = "Prod/Biomass ratio :";
	this.cvars.stage_prod_biomass_ratio.tooltip = "biomass produced per unit of initial biomass per year (units: 1/year)";

	this.cvars.stage_prod_consum_ratio = new CiteInput(this, "prod_consum_ratio",  "number");
	this.cvars.stage_prod_consum_ratio.display_name = "Prod/Consumtion ratio :";
	this.cvars.stage_prod_consum_ratio.tooltip = "biomass produced per unit of biomass consumed (unit-less)";

	this.cvars.stage_consum_biomass_ratio = new CiteInput(this, "consum_biomass_ratio",  "number");
	this.cvars.stage_consum_biomass_ratio.display_name = "Consumption biomass ratio :";
	this.cvars.stage_consum_biomass_ratio.tooltip = "prey biomass eaten per unit of predator biomass per year (units: 1/year)";

	this.cvars.stage_unassimilated_consum_ratio = new CiteInput(this, "unassimilated_consum_ratio", "number");
	this.cvars.stage_unassimilated_consum_ratio.display_name = "Unassimilated consumption ratio :";

	this.cvars.stage_biomass_change = new CiteInput(this,  "biomass_change", "number");
	this.cvars.stage_biomass_change.display_name = "Biomass change :";
	this.cvars.stage_biomass_change.tooltip = "biomass gained or lost per year (due to fishing, immigration, emigration, etc.) (kg/km^2)";


	for (var i in this.cvars){
		this.cvars[i].setOnPressEnterEvent( createMethodReference(this, "openCiteVarDialog") ); 
	}

	this.set_stage_values_but = new Input(this, "set_stage_values_but", "button");
	this.set_stage_values_but.tooltip = "Set all the values above with a single citation source for stage:" +this.stage.name;
	var l = "Set " + capitalize( this.stage.name) + " Values"; 
	this.set_stage_values_but.setButton( l, createMethodReference(this, "openCiteVarDialog") );
	this.set_stage_values_but.element.style.marginTop = "15px";

}

StageTab.prototype.addNewCitedVarsCB = function ( data ) {
	console.log( data );
}

StageTab.prototype.openCiteVarDialogCB = function ( cite_id ) {
	for (var c in this.cvars) {
		var cvar = this.cvars[c];
		if (cvar.element.value != "" ) {
			cvar.addNewCitedVar( cite_id );
		}
	}
}

StageTab.prototype.openCiteVarDialog = function ( ) {
	// gather all the values
	// check their inputs
	for (var c in this.cvars) {
		var cvar = this.cvars[c];
		if ( !cvar.check() ) {
			return;
		}
	}	
	// then open the citevardialog global 
	var title = "Set " + capitalize( this.stage.name) + " Values for " + capitalize(this.parent.parent.node.working_name);
	var cback =  new callbackObject(this, "openCiteVarDialogCB");
	citevardialog.open(this, title, cback );
}


StageTab.prototype.createTableRow = function () {

	//this.parent.element.appendChild(this.element);
	document.body.appendChild(this.element);

	for (var i in this.cvars) {
		this.cvars[i].createTableRow( this.element );
	}

	this.set_stage_values_but.createTableRow(this.element);
	/*
	var $but = $(this.set_stage_values_but.element);
	$but.button();
	$but.click(  createMethodReference(this, "openCiteVarDialog") );
	*/
}

/////////////
//
//

function StageTabs( node_dialog ) {
	this.id = node_dialog.id + "_stagetabs";
	this.parent = node_dialog;

	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);

	this.tabs = new Array();
}

StageTabs.prototype.haveStageTab = function ( stage ) {
	for (var i =0; i < this.tabs.length; i++ ) {
		if ( this.tabs[i].stage.name == stage.name ) {
			return true;
		}
	}
	return false;
}

StageTabs.prototype.setValues = function () {
	// be aware we could have new stages here
	for (var i =0; i < this.parent.node.stages.length; i++) {
		var s = this.parent.node.stages[i];
		if ( this.haveStageTab( s) == false ) {
			var st = new StageTab( this, s);
			st.createTableRow( );
			this.tabs.push(st);
			// this is s
			$(this.element).tabs("add", "#" + st.id, capitalize(s.name) );
		}
	}
	// note: closable tabs gonna be an option in the future - see http://dev.jqueryui.com/ticket/3924
	$( this.element ).find( "span.ui-icon-close" ).unbind( );
	$( this.element ).find("span.ui-icon-close" ).bind( "click", createMethodReference(this, "removeTab"));

	/*
	for (var i =0;i < this.tabs.length; i++) {
		this.tabs[i].setValues();
	}
	*/
}

StageTabs.prototype.addNewStageCB = function (response) {
	if (response != undefined && response.error != undefined) {
		alert( response.error);
	} else {
		$( this.add_new_stage_dialog).dialog("destroy");
		// we get a stage object in return..add it to node dialog node object
		this.parent.node.stages.push( response );
		this.setValues();

	}
}

StageTabs.prototype.addNewStage = function () {
	if (this.add_new_stage_dialog_select == undefined) return;
	var p = new Object();
	p.node_id = this.parent.node.id;
	p.stage_name = $( this.add_new_stage_dialog_select ).val();
	p.functionName = "addNewStage"; 
	$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
			success: createMethodReference(this, "addNewStageCB")
		});

}

StageTabs.prototype.openAddNewStageDialog = function (e, ui) {
	this.add_new_stage_dialog = document.createElement("div");
	this.add_new_stage_dialog_select = document.createElement("select");
	
	this.add_new_stage_dialog.id = this.id + "_addstage_dialog";
	this.add_new_stage_dialog.setAttribute("title", "Add New Stage to " + this.parent.node.working_name );
	this.add_new_stage_dialog_select.id = this.id + "_addstage_dialog_select";
	for (var i=0;i<display_options.stage_names.length;i++) {
      var addstagename = display_options.stage_names[i];
			var gotstage =false;
			console.log(addstagename);
      if (this.parent.node.hasStageName(addstagename) == false) {
				console.log("\treturnd false, adding: " +addstagename);
				var opt = document.createElement("option");
				opt.value = addstagename;
				opt.innerHTML = addstagename;
        this.add_new_stage_dialog_select.appendChild(opt);
      }
    }
	console.log(this.add_new_stage_dialog_select);	
	document.body.appendChild( this.add_new_stage_dialog);
	this.add_new_stage_dialog.appendChild(this.add_new_stage_dialog_select);
	var tmp_func =  createMethodReference(this, "addNewStage");
	$( this.add_new_stage_dialog ).dialog({ autoOpen: true, modal: true,
			buttons: { "Add New Stage": tmp_func, Cancel: function() { $( this ).remove( ); } },
			closeOnEscape: true, 
			"Close": function() {$( this ).remove(); }
	});
}

StageTabs.prototype.addTabCB = function (e, ui) {
}


StageTabs.prototype.deleteStageCB = function (data) {
	var tabid="";
	if (data != undefined && data.error == undefined) {
		// delete from our tabs array
		for (var i=0;i< this.tabs.length;i++) {
			if ( this.tabs[i].stage.id == data.stage_id) {
				tabid = this.tabs[i].id;
				this.tabs.splice(i,1);
			}
		}
		// delete from the node stages array
		for (var i=0;i< this.parent.node.stages.length;i++) {
			if ( this.parent.node.stages[i].id == data.stage_id)
				this.parent.node.stages.splice(i,1);
		}
		$( "li", this.element ).children("a").each( function(i, e) {
			var href = e.getAttribute("href");
			href = href.substr(1);
			if ( href == tabid ) {
				if (i == 0) { alert("Deleted a general stage. This shouldn't happen."); }
				else { 
					// we are at the <a href> tag here.  We go up 3 levels to get to our "tab" holder
					$( this ).parent().parent().parent().tabs( "remove", i );
				}
			}

		});
	} else {
		error = "There was an error deleting the stage";
		if ( data.error != undefined) {
			error += "\n" + data.error;
			alert(error);
			console.log(data.sql);
		}
	}	
}

StageTabs.prototype.removeTab = function (e) {
	$e = $( e.currentTarget );
	var index = $( "li", this.element ).index( $e.parent() );
	if (index == 0) {
		alert("Sorry, each node must have a general stage.");
		return;
	}
	// get the sibling <a> tag and check out its href
	var tabid = $e.parent().children("a").attr("href");
	// remove the "#" character
	tabid = tabid.substr(1) ;

	// now find the tab object itself
	var tab = null;
	for (var i=0;i< this.tabs.length;i++) {
		if ( this.tabs[i].id == tabid)
			tab = this.tabs[i];
	}
	if (tab == null) {
		// we didn't find the tab
		alert("you click to delete a tab, but the tab cannot be found. \n This a bug; please report it.");
		return;
	}
	if (!confirm("You are about to delete an entire stage.  If you are an administrator, this will delete the entire stage and any cited variables or interactions associated with this stage.\nIf you are not an adminstrator AND others have associated cited variables or interactions to this stage, you will not be allowed to delete it.\nIf have read-only privilages, you will not be allowed to delete this stage.\n\nDo you wish to continue?" ))
		return;

	var p = new Object();
	p.stage_id = tab.stage.id;
	p.functionName = "deleteStage";
	$.ajax( { async:true, type:"GET", dataType:"json", 
		data: p,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "deleteStageCB")
	});
	return false;
}

StageTabs.prototype.create = function () {
	// make sure we only create the StageTabs once
	$(this.element).empty();
	
	var d = document.createElement("div");
	d.style.padding="10px";
	var s = document.createElement("div");
	s.style.fontWeight = "bold";
	s.style.fontSize = "1.2em";
	s.innerHTML = "Stages";
	var p = document.createElement("p");
	p.innerHTML = 'If the units provided by the citation differ from those required for the entry, use <a href="http://www.wolframalpha.com/input/?i=unit+converter" target="_new">http://www.wolframalpha.com/</a> to make the conversion first.<br>Mouse-over each field to see description and required units.';

	this.add_stage_but = document.createElement("button");
	//this.add_stage_but.id = this.id +"_add_stage_but";
	this.add_stage_but.style.marginLeft = "0px";
	this.add_stage_but.style.marginTop = "10px";

	d.appendChild(s);
	d.appendChild(this.add_stage_but);
	d.appendChild(p);

	this.element.appendChild(d);	
	
	var tmp = '<ul><li><a href="#tabs-1">empty</a> <span class="ui-icon ui-icon-close">Remove Tab</span></li></ul><div id="tabs-1"></div>';
	// CANNOT do this:  this.element.innerHTML += tmp;  !!!
	$(this.element).append(tmp) ;
	this.parent.stagediv.appendChild(this.element);

	$(this.add_stage_but).button({label: "Add Stage" } );
	$(this.add_stage_but).bind( "click", createMethodReference(this, "openAddNewStageDialog") );

	// tabs init with a custom tab template and an "add" callback filling in the content
	var $tabs = $( this.element ).tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' style='display:inline-block'>Remove Tab</span></li>",
			add:  createMethodReference(this, "addTabCB")	
	} );
	$tabs.tabs("remove", 0);

	this.setValues();
}

