// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require bootstrap
//= require_tree.
//= require highcharts
//= require gmaps4rails/gmaps4rails.base
//= require gmaps4rails/gmaps4rails.googlemaps
//= require autocomplete-rails
//= require citations




//begin Jquery
$(document).ready(function(){
	$('a[href="#regions"]').on('shown', function (e) {
	    console.log("test1");
		Gmaps.second_map.initialize();
		Gmaps.second_map.create_polygons();
		Gmaps.second_map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.second_map, 'resize');
		Gmaps.second_map.callback();
	 });
	 $('a[href="#regionhome"]').on('shown', function (e) {
		Gmaps.second_map.initialize();
		Gmaps.second_map.create_polygons();
		Gmaps.second_map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.second_map, 'resize');
		Gmaps.second_map.callback();
	 });
	 //New region requires a different map click event
	$('a[href="#regioneditor"]').on('shown', function (e) {
		Gmaps.second_map.initialize();
		Gmaps.second_map.create_polygons();
		
		Gmaps.second_map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.second_map, 'resize');
		Gmaps.second_map.callback();
		google.maps.event.clearListeners(Gmaps.second_map.serviceObject, "click");
		var drawingManager = new google.maps.drawing.DrawingManager({
		//drawingMode: google.maps.drawing.OverlayType.POLYGON,
		drawingControl: true,
		drawingControlOptions: {
		position: google.maps.ControlPosition.TOP_CENTER,
		drawingModes: [
      //google.maps.drawing.OverlayType.MARKER,
      google.maps.drawing.OverlayType.POLYGON,
    ]
  },
  markerOptions: {
    //add map icon here    icon: 'http://www.example.com/icon.png'
  },
  polygonOptions: {
    strokeColor: "#FFAA00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#000000",
      fillOpacity: 0.35,
      clickable: true,
	  draggable:true,
	  editable: true
  }
});
	drawingManager.setMap(Gmaps.second_map.map);
	//When polygon is drawn
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
	    console.log(event);
		if (event.type == google.maps.drawing.OverlayType.POLYGON) {
		$('#newpolygon').modal({
		keyboard: false,
		backdrop: 'static'
		
		});
		}
			var latitudeData = [], longitudeData = [];
		    result = event.overlay.latLngs.b[0].b;
			for (i = 0, len = result.length; i < len; i++) { 
				latitudeData.push(result[i].Ya);
				longitudeData.push(result[i].Za);	
	}
	document.getElementById('location_datum_latitude').value = latitudeData;
	document.getElementById('location_datum_longitude').value = longitudeData;
		
	
		});
	
	
	});
	
	$('#newpolygon').on('hidden', function () {
		
	});
	$('a[href="#navhome"]').on('shown', function (e) {
		Gmaps.second_map.initialize();
		Gmaps.second_map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.second_map, 'resize');
		Gmaps.second_map.callback();
	});
	$('a[href="#editregion"]').on('shown', function (e) {
		Gmaps.second_map.initialize();
		Gmaps.second_map.create_polygons();
		Gmaps.second_map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.second_map, 'resize');
		Gmaps.second_map.callback();
	});
	
	//Modal css
	$("#newpolygon").css({
		'width' : 300,
		'height' : 'auto',
		'overflow' : 'auto'
	});
	$("#new_competition_observation").css({
		'width' : 'auto',
		'height' : 'auto',
		'overflow' : 'auto'	
	});



		$('#myCarousel').bind('slid', function () {
	    console.log("test1");
		Gmaps.map.initialize();
		Gmaps.map.create_polygons();
		Gmaps.map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.map, 'resize');
		Gmaps.map.callback();
	 });
	
	//for searching by common name
	$('#Common_name').typeahead(
	{
		source: function(query,process) 
		{
				$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByCommonName",
				data    : { "tsn" : query },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#common-name-loading-indicator').hide();
								result = [];
								for (var i = 0; i < data.commonNames.length; i++)
								{
									result[i] = data.commonNames[i].commonName;
								}
								process(result);
							} ,
				beforeSend : function() {
							$('#common-name-loading-indicator').show();
							}
				});
		},
		minLength : 3,
		updater: function(item)
		{
			$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByCommonName",
				data    : { "tsn" : item },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#itis-name-loading-indicator').hide();
								result = data.commonNames[0].tsn;
								$('#node_itis_id').val(result);
								$.ajax({
								url     : "http://www.itis.gov/ITISWebService/jsonservice/getScientificNameFromTSN",
								data    : { "tsn" : result },
								dataType: "jsonp",
								jsonp   : "jsonp",
								success : function(data) 
								{ 
									$('#latin-name-loading-indicator').hide();
									$('#Latin_name').val(data.combinedName);
								} ,
								beforeSend : function() {
											$('#latin-name-loading-indicator').show();
											}
								});
							} ,
				beforeSend : function() {
							$('#itis-name-loading-indicator').show();
							}
				});
			//show fields
			$("#node_working_name_field").show();
			$("#node_functional_group_id_field").show();
			$("#node_native_status_field").show();
			$("#node_is_assemblage_field").show();
			$('#node_working_name').val(item);
			return item;
		}
		
		
	});	
	//For searching by Latin/Scientific name
	$('#Latin_name').typeahead(
	{
		source: function(query,process) 
		{
				$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByScientificName",
				data    : { "tsn" : query },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#latin-name-loading-indicator').hide();
								result = [];
								for (var i = 0; i < data.scientificNames.length; i++)
								{
									result[i] = data.scientificNames[i].combinedName;
								}
								process(result);
							} ,
				beforeSend : function() {
							$('#latin-name-loading-indicator').show();
							}
				});
		},
		minLength : 3,
		updater : function(item)
		{
			$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByScientificName",
				data    : { "tsn" : item },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#latin-name-loading-indicator').hide();
								result = data.scientificNames[0].tsn;
								$('#node_itis_id').val(result);
								$.ajax({
								url     : "http://www.itis.gov/ITISWebService/jsonservice/getCommonNamesFromTSN",
								data    : { "tsn" : result },
								dataType: "jsonp",
								jsonp   : "jsonp",
								success : function(data) 
								{			
									$('#common-name-loading-indicator').hide();
									if (data.commonNames[0] != null){
										name = data.commonNames[0].commonName;
										$('#common-name-loading-indicator').hide();
										for (var i = 1; i < data.commonNames.length - 1; i++)
										{	
											name += ", " + data.commonNames[i].commonName;
										}
										$('#Common_name').val(name);
										$('#node_working_name').val(name);
									}	
									else {
										$('#Common_name').val("undefined");
										$('#node_working_name').val("undefined");
									}
								
								}	 ,
				beforeSend : function() {
							$('#common-name-loading-indicator').show();
							}
				});
				
						$('#itis-name-loading-indicator').hide();
							} ,
				beforeSend : function() {
							$('#itis-name-loading-indicator').show();
							}
				});
				
			//show fields
			$("#node_working_name_field").show();
			$("#node_functional_group_id_field").show();
			$("#node_native_status_field").show();
			$("#node_is_assemblage_field").show();
			return item;
		}	
	});	
	
	//CSS's for loading gif
	$("#common-name-loading-indicator").css({
		height: 25,
		width: 25
    });
    $("#latin-name-loading-indicator").css({
		height: 25,
		width: 25
    });
	$("#itis-name-loading-indicator").css({
		height: 25,
		width: 25
    });
	$("#interaction-latin1-loading-indicator").css({
		height: 25,
		width: 25
    });
	$("#interaction-latin2-loading-indicator").css({
		height: 25,
		width: 25
    });
	//For searching by Latin/Scientific name in interactions for stage 1
	$('#interaction_latin_name1').typeahead(
	{
		source: function(query,process) 
		{
				$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByScientificName",
				data    : { "tsn" : query },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#interaction-latin1-loading-indicator').hide();
								result = [];
								for (var i = 0; i < data.scientificNames.length; i++)
								{
									result[i] = data.scientificNames[i].combinedName;
								}
								process(result);
							} ,
				beforeSend : function() {
							$('#interaction-latin1-loading-indicator').show();
							}
				});
		},
		updater: function(item)
		{
			$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByScientificName",
				data    : { "tsn" : item },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
				{
					result = data.scientificNames[0].tsn;
					$.ajax({
						type: "GET",
						url: "search_by_tsn",
						data: {tsn: result},
						success: function(data) 
						{
							if (data[0] == false)
								alert("This node does not exist in the database")
							else
							{
								$('#interaction_node_id1').val(data[1].id);
								$('#interaction_stage1_field').show();
								$('#interaction_working_name1').val(data[1].working_name);
								$('#interaction_itis_working_name1').text('Working Name: ' + data[1].working_name);
								$('#interaction_itis_id1').text('ITIS ID : ' + data[1].itis_id);
								
								$.ajax({
									url     : "http://www.itis.gov/ITISWebService/jsonservice/getFullRecordFromTSN",
									data    : { "tsn" : data[1].itis_id },
									dataType: "jsonp",
									jsonp   : "jsonp",
									success : function(data)
									{
										result = [];
										for (var i = 0; i < data.commonNameList.commonNames.length; i++)
										{
											result[i] = data.commonNameList.commonNames[i].commonName;
										}
										$('#interaction_itis_common_name1').text('Common Name: ' + result.join());				
										$('#interaction_itis_latin_name1').text('Latin Name: ' + data.scientificName.combinedName);
										generate_select_box('#interaction_select1','#interaction_node_id1');
										if ($('#interaction_working_name2').val() !== "" || $('#interaction_latin_name2').val() =="")
										{
											$('#interaction_add_interaction').attr("disabled", false);
											$('#interaction_add_observation').attr("disabled", false);
										}
									}
									
									});
							}
						}
				});
					
				}
			});
			
			
			return item;
		},
		minLength : 3,	
	});
	//For searching by Latin/Scientific name in interactions for stage 2
	$('#interaction_latin_name2').typeahead(
	{
		source: function(query,process) 
		{
				$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByScientificName",
				data    : { "tsn" : query },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#interaction-latin2-loading-indicator').hide();
								result = [];
								for (var i = 0; i < data.scientificNames.length; i++)
								{
									result[i] = data.scientificNames[i].combinedName;
								}
								process(result);
							} ,
				beforeSend : function() {
							$('#interaction-latin2-loading-indicator').show();
							}
				});
		},
		updater: function(item)
		{
			$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/searchByScientificName",
				data    : { "tsn" : item },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
				{
					result = data.scientificNames[0].tsn;
					$.ajax({
						type: "GET",
						url: "search_by_tsn",
						data: {tsn: result},
						success: function(data) 
						{
							if (data[0] == false)
								alert("This node does not exist in the database")
							else
							{
								$('#interaction_node_id2').val(data[1].id);
								$('#interaction_stage2_field').show();
								$('#interaction_working_name2').val(data[1].working_name);
								$('#interaction_itis_working_name2').text('Working Name: ' + data[1].working_name);
								$('#interaction_itis_id2').text('ITIS ID : ' + data[1].itis_id);
								
								$.ajax({
									url     : "http://www.itis.gov/ITISWebService/jsonservice/getFullRecordFromTSN",
									data    : { "tsn" : data[1].itis_id },
									dataType: "jsonp",
									jsonp   : "jsonp",
									success : function(data)
									{
										result = [];
										for (var i = 0; i < data.commonNameList.commonNames.length; i++)
										{
											result[i] = data.commonNameList.commonNames[i].commonName;
										}
										$('#interaction_itis_common_name2').text('Common Name: ' + result.join());				
										$('#interaction_itis_latin_name2').text('Latin Name: ' + data.scientificName.combinedName);
										generate_select_box('#interaction_select2','#interaction_node_id1');
										if ($('#interaction_working_name1').val() !== "" || $('#interaction_latin_name1').val() =="")
										{
											$('#interaction_add_interaction').attr("disabled", false);
											$('#interaction_add_observation').attr("disabled", false);
										}
									}
									
									});
							}
						}
				});
					
				}
			});
			
			
			return item;
		},
		minLength : 3,	
	});


	//helper functions
	
	//generate select box based upon select id
	function generate_select_box(id,hidden)
	{
		$(id).empty();
		$.get('/search_stage',{node : $(hidden).val()} ,function(data)
		{
			for (var i = 0; i < data[1].length; i++)
			{
				$('<option>').val(data[1][i]).text(data[1][i]).appendTo(id);
			}			
				if (data[1][0] == 'general *')
					new_stage('general',hidden,id);
		});
	}
	
	
	function new_stage(n,node,select)
	{
		if(confirm('stage ' + n + ' does not exist.  Would you like to create?'))
		{
			$.ajax({
				type: "POST",
				url: "create_stage",
				data: {stage: {name : n,node_id : $(node).val()}},
				success: function(data) 
				{
					generate_select_box(select,node);
				}
			});
		}		
	}
	//For interactions stage 1
	$('#interaction_working_name1').bind('railsAutocomplete.select', function(event, data){
		$('#interaction_stage1_field').show();
		$('#interaction_itis_working_name1').text('Working Name: ' + data.item.label);
		$('#interaction_itis_id1').text('ITIS ID: ' + data.item.itis_id);
		$('#interaction_node_id1').val(data.item.id);
				$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/getFullRecordFromTSN",
				data    : { "tsn" : data.item.itis_id },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#interaction-latin1-loading-indicator').hide();
								$('#interaction_itis_latin_name1').text('Latin Name: ' + data.scientificName.combinedName);
								$('#interaction_latin_name1').val(data.scientificName.combinedName);
								result = []
								for (var i = 0; i < data.commonNameList.commonNames.length; i++)
								{
									result[i] = data.commonNameList.commonNames[i].commonName;
								}
								
								$('#interaction_itis_common_name1').text('Common Name: ' + result.join());
								generate_select_box('#interaction_select1','#interaction_node_id1');
								if ($('#interaction_working_name2').val() !== "" || $('#interaction_latin_name2').val() =="")
								{
									$('#interaction_add_interaction').attr("disabled", false);
									
									$('#interaction_add_observation').attr("disabled", false);
								}
							} ,
				beforeSend : function() {
							$('#interaction-latin1-loading-indicator').show();
							}
				});
	});
	
	
	//For interactions stage 2
	$('#interaction_working_name2').bind('railsAutocomplete.select', function(event, data){
		$('#interaction_stage2_field').show();
		$('#interaction_itis_working_name2').text('Working Name: ' + data.item.label);
		$('#interaction_itis_id2').text('ITIS ID: ' + data.item.itis_id);
		$('#interaction_node_id2').val(data.item.id);
				$.ajax({
				url     : "http://www.itis.gov/ITISWebService/jsonservice/getFullRecordFromTSN",
				data    : { "tsn" : data.item.itis_id },
				dataType: "jsonp",
				jsonp   : "jsonp",
				success : function(data) 
							{ 
								$('#interaction-latin2-loading-indicator').hide();
								$('#interaction_itis_latin_name2').text('Latin Name: ' + data.scientificName.combinedName);
								$('#interaction_latin_name2').val(data.scientificName.combinedName);
								result = []
								for (var i = 0; i < data.commonNameList.commonNames.length; i++)
								{
									result[i] = data.commonNameList.commonNames[i].commonName;
								}
								
								$('#interaction_itis_common_name2').text('Common Name: ' + result.join());
								generate_select_box('#interaction_select2','#interaction_node_id2');
								if ($('#interaction_working_name1').val() !== "" || $('#interaction_latin_name1').val() =="")
								{
									$('#interaction_add_interaction').attr("disabled", false);
									
									$('#interaction_add_observation').attr("disabled", false);
								}
							} ,
				beforeSend : function() {
							$('#interaction-latin2-loading-indicator').show();
							}
				});
	});
	
	$('#interaction_reset_button').on('click', function (e) {
		$('#interaction_working_name1').val("");
		$('#interaction_working_name2').val("");
		$('#interaction_node_id1').val("");
		$('#interaction_node_id2').val("");
		$('#interaction_stage1_field').hide();
		$('#interaction_stage2_field').hide();
		$('#interaction_add_interaction').attr("disabled", true);
		$('#interaction_add_observation').attr("disabled", true);
		$('#interaction_alert_success').hide();
		$('#interaction_alert_fail').hide();
		$('#observation_alert_success').hide();
		$('#observation_alert_fail').hide();
	});
	
	$('#alert_success_close').on('click', function (e) {
		$('#interaction_alert_success').hide();
	});

	$('#alert_fail_close').on('click', function (e) {
		$('#interaction_alert_fail').hide();
	});
	
	$('#interaction_alert_fail').bind('closed', function () {
		$('#interaction_alert_fail').hide();
	})
	
	$('#interaction_alert_success').bind('closed', function () {
		$('#interaction_alert_success').hide();
	})
	//add interaction
	$('#interaction_add_interaction').on('click', function (e) {
		$("#interaction_alert_fail").hide();
		$("#interaction_alert_success").hide();
		if ($('#interactions-list').val() != "main")
		{
			$.ajax({
				type: "POST",
				url: "interactions",
				data: {interaction: {interactionname : $("#interactions-list").val() , 
									name1 : $('#interaction_select1').val(), 
									name2 : $('#interaction_select2').val(),
									node_id1 : $('#interaction_node_id1').val(),
									node_id2 : $('#interaction_node_id2').val()}},
				success: function(data) 
				{
					if (data[0] == false)
						$("#interaction_alert_fail").show();
					else
						$("#interaction_alert_success").show();

				}		
				
			});
		}
		else
			alert("Choose a type of interaction");
	});
	
	//Add competition observation
	$('#competition_submit').on('click', function (e) {

			$.ajax({
				type: "POST",
				url: "add_competition",
				data: {competition_interaction_observation : {citation_id : $("#citation_id").val(),
				observation_type : $('#competition_observation_type_select').val(), 
				competition_type : $('#competition_type_select').val(),
				datum : $('#competition_interaction_observation_datum').val(),
				comment : $('#competition_interaction_observation_comment').val(),
				stage1 : $('#interaction_node_id1').val(),
				stage2 : $('#interaction_node_id2').val()}},
				success: function(data) 
				{
					if (data[0] == false)
						$("#observation_alert_fail").show();
					else
						$("#observation_alert_success").show();
				}		
				
			});	
		$('#new_competition_observation').modal('hide');
	});
	
	//Add facilitation observation
	$('#facilitation_submit').on('click', function (e) {

			$.ajax({
				type: "POST",
				url: "add_facilitation",
				data: {facilitation_interaction_observation : {citation_id : $("#citation_id").val(),
				observation_type : $('#facilitation_observation_type_select').val(), 
				facilitation_type : $('#facilitation_type_select').val(),
				datum : $('#facilitation_interaction_observation_datum').val(),
				comment : $('#facilitation_interaction_observation_comment').val(),
				stage1 : $('#interaction_node_id1').val(),
				stage2 : $('#interaction_node_id2').val()}},
				success: function(data) 
				{
					if (data[0] == false)
						$("#observation_alert_fail").show();
					else
						$("#observation_alert_success").show();				
				}		
				
			});	
		$('#new_facilitation_observation').modal('hide');
	});	
	
	//Add facilitation observation
	$('#parasitic_submit').on('click', function (e) {

			$.ajax({
				type: "POST",
				url: "add_parasitic",
				data: {parasitic_interaction_observation : {citation_id : $("#citation_id").val(),
				observation_type : $('#parasitic_observation_type_select').val(), 
				parasite_type : $('#parasite_type_select').val(),
				endo_ecto : $('#parasitic_interaction_observation_endo_ecto').val(),
				lethality : $('#parasitic_interaction_observation_lethality').val(),
				prevalence : $('#parasitic_interaction_observation_prevalence').val(),
				intensity : $('#parasitic_interaction_observation_intensity').val(),
				datum : $('#parasitic_interaction_observation_datum').val(),
				comment : $('#parasitic_interaction_observation_comment').val(),
				stage1 : $('#interaction_node_id1').val(),
				stage2 : $('#interaction_node_id2').val()}},
				success: function(data) 
				{
					if (data[0] == false)
						$("#observation_alert_fail").show();
					else
						$("#observation_alert_success").show();				
				}		
				
			});	
		$('#new_parasitic_observation').modal('hide');
	});	
	
	//Add facilitation observation
	$('#trophic_submit').on('click', function (e) {

			$.ajax({
				type: "POST",
				url: "add_trophic",
				data: {trophic_interaction_observation : {
				citation_id : $("#citation_id").val(),
				observation_type : $('#trophic_observation_type_select').val(), 
				lethality : $('#trophic_interaction_observation_lethality').val(),
				structures_consumed : $('#trophic_interaction_observation_structures_consumed').val(),
				percentage_consumed : $('#trophic_interaction_observation_percentage_consumed').val(),
				percentage_diet : $('#trophic_interaction_observation_percentage_diet').val(),
				percentage_diet_by : $('#trophic_interaction_observation_percentage_diet_by').val(),
				preference : $('#trophic_interaction_observation_preference').val(),
				datum : $('#trophic_interaction_observation_datum').val(),
				comment : $('#trophic_interaction_observation_comment').val(),
				stage1 : $('#interaction_node_id1').val(),
				stage2 : $('#interaction_node_id2').val()}},
				success: function(data) 
				{
					if (data[0] == false)
						$("#observation_alert_fail").show();
					else
						$("#observation_alert_success").show();				
				}		
				
			});	
		$('#new_trophic_observation').modal('hide');
	});	
	
	
	
	
	$('#interaction_add_observation').on('click', function (e) {
		$("#interaction_alert_fail").hide();
		$("#interaction_alert_success").hide();
		$("#observation_alert_fail").hide();
		$("#observation_alert_success").hide();
		if ($('#interaction_node_id1').val() !="" && $('#interaction_node_id2').val() !="" )
		{
			value = $("#interactions-list").val();
			if (value == "competition") {
				$('#new_competition_observation').modal({
				keyboard: false,
				backdrop: 'static'
				});
			}
			if (value == "facilitation") {
				$('#new_facilitation_observation').modal({
				keyboard: false,
				backdrop: 'static'
				});
			}
			if (value == "parasitic") {
				$('#new_parasitic_observation').modal({
				keyboard: false,
				backdrop: 'static'
				});
			}
			if (value == "trophic") {
				$('#new_trophic_observation').modal({
				keyboard: false,
				backdrop: 'static'
				});
			}
			
		}
		else
			alert("Stages must be selected");
	
	
	});
	//For creating interactions if it does not exist
		$("#interactions-list").change(function(){
			if ($("#interactions-list").val() != "main")
			{
				if ($('#interaction_node_id1').val() != "" || $('#interaction_node_id1').val() != "")
				{
					$.ajax({
					type: "Get",
					url: "search_interactions",
					data:  {interaction : {interactionname: $("#interactions-list").val(), 
					node_id1 : $('#interaction_node_id1').val(), 
					node_id2 : $('#interaction_node_id2').val(),
					name1 : $('#interaction_select1').val(), 
					name2 : $('#interaction_select2').val()}},
					success: function(data)  {
						if (data[0] == false)
						{
							if (confirm("Interaction " + $("#interactions-list").val() + " does not exist.  Would you like to create?"))
							{
								$("#interaction_alert_fail").hide();
								$("#interaction_alert_success").hide();
								$.ajax({
									type: "POST",
									url: "interactions",
									data:  {interaction : {interactionname: $("#interactions-list").val(), 
									node_id1 : $('#interaction_node_id1').val(), 
									node_id2 : $('#interaction_node_id2').val(),
									name1 : $('#interaction_select1').val(), 
									name2 : $('#interaction_select2').val()}},
									success: function(data) 
									{
										if (data[0] == false)
										$("#interaction_alert_fail").show();
										else
										$("#interaction_alert_success").show();
									}				
								});	
							}
						}
					}
					});
				
				}
				else
				{
					$("#interactions-list").val("main");
					alert("Stages must be chosen!");
				}
			}
		});
	//For creating new stage if it does not exist
	$("#interaction_select1").change(function(){
		s = $("#interaction_select1").val();
		if(s.charAt(s.length-1) == '*')
		{
			s = s.substring(0,s.length - 2)
			new_stage(s,'#interaction_node_id1','#interaction_select1');
		}
	});
	$("#interaction_select2").change(function(){
		s = $("#interaction_select2").val();
		if(s.charAt(s.length-1) == '*')
		{
			s = s.substring(0,s.length - 2)
			new_stage(s,'#interaction_node_id2','#interaction_select2');
		}
	});
	//hide fields
	$('#reset_new_node').on('click', function (e) {
		$("#node_working_name_field").hide();
		$("#node_functional_group_id_field").hide();
		$("#node_native_status_field").hide();
		$("#node_is_assemblage_field").hide()
	});
	
		$('#new_competition_observation').on('hide', function () {
		$("#interaction_alert_fail").hide();
		$("#interaction_alert_success").hide();
	});
	
		$('#new_facilitation_observation').on('hide', function () {
		$("#interaction_alert_fail").hide();
		$("#interaction_alert_success").hide();
	});
	
		$('#new_parasitic_observation').on('hide', function () {
		$("#interaction_alert_fail").hide();
		$("#interaction_alert_success").hide();
	});
	
		$('#new_trophic_observation').on('hide', function () {
		$("#interaction_alert_fail").hide();
		$("#interaction_alert_success").hide();
	});
	
	
});		
				




