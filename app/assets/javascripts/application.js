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

//For loading map in dashboard tabs
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
	$('a[href="#newregion"]').on('shown', function (e) {
		Gmaps.second_map.initialize();
		Gmaps.second_map.adjustMapToBounds();
		google.maps.event.trigger(Gmaps.second_map, 'resize');
		Gmaps.second_map.callback();
		google.maps.event.clearListeners(Gmaps.second_map.serviceObject, "click");
		var drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: google.maps.drawing.OverlayType.MARKER,
		drawingControl: true,
		drawingControlOptions: {
		position: google.maps.ControlPosition.TOP_CENTER,
		drawingModes: [
      google.maps.drawing.OverlayType.MARKER,
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
	

	$(".modal").css({
		'width' : 300,
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
			$("#node_non_itis_id_field").show();
			$("#node_native_status_field").show();
			$("#node_is_assemblage_field").show();
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
									}	
									else {
										$('#Common_name').val("undefined");
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
			$("#node_non_itis_id_field").show();
			$("#node_native_status_field").show();
			$("#node_is_assemblage_field").show();
			return item;
		}	
	});	
	
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
    // For generating form based on selection for citations
    $("#citation_format").change(function(){
    	if($('#citation_format').val() == "Journal"){
    		$("#journal_title").show();
    		$("#doc").show();
    		$("#vol").show();
    		$("#pages").show();
    		$("#num").show();
    		$("#ab").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		$("#vol_area").show()
    		$("#num_area").show()
    	
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#website_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#pub").hide();
    		$("#email").hide();
    		$("#address").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#pub_area").hide()
    	}
    	else if ($('#citation_format').val() == "Book"){
    		$("#book_title").show();
    		$("#doc").show();
    		$("#pub").show();
    		$("#pages").show();
    		$("#ab").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		$("#pub_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#website_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#email").hide();
    		$("#vol").hide();
    		$("#address").hide();
    		$("#num").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#num_area").hide()
    		$("#vol_area").hide()
    	}
    	else if($('#citation_format').val() == "Book_Section"){
    		$("#book_select_title").show();
    		$("#doc").show();
    		$("#pages").show();
    		$("#ab").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#website_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#pub").hide();
    		$("#email").hide();
    		$("#vol").hide();
    		$("#address").hide();
    		$("#num").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#pub_area").hide()
    		$("#num_area").hide()
    		$("#vol_area").hide()
    	}
    	else if($('#citation_format').val() == "Report"){
    		$("#report_title").show();
    		$("#doc").show();
    		$("#pages").show();
    		$("#ab").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#thesis_title").hide();
    		$("#website_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#pub").hide();
    		$("#email").hide();
    		$("#vol").hide();
    		$("#address").hide();
    		$("#num").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#pub_area").hide()
    		$("#num_area").hide()
    		$("#vol_area").hide()
    	}
    	else if($('#citation_format').val() == "Thesis"){
    		$("#thesis_title").show();
    		$("#doc").show();
    		$("#pages").show();
    		$("#ab").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#website_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#pub").hide();
    		$("#email").hide();
    		$("#vol").hide();
    		$("#address").hide();
    		$("#num").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#pub_area").hide()
    		$("#num_area").hide()
    		$("#vol_area").hide()
    	}
    	else if($('#citation_format').val() == "Website"){
    		$("#website_title").show();
    		$("#doc").show();
    		$("#ab").show();
    		$("#format_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#pub").hide();
    		$("#email").hide();
    		$("#vol").hide();
    		$("#address").hide();
    		$("#pages").hide();
    		$("#num").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#pages_area").hide()
    		$("#pub_area").hide()
    		$("#num_area").hide()
    		$("#vol_area").hide()
    	}
    	else if($('#citation_format').val() == "Other"){
    		$("#other_title").show();
    		$("#doc").show();
    		$("#ab").show();
    		$("#format_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#website_title").hide();
    		$("#personal_title").hide();
    		$("#unpublished_title").hide();
    		$("#inst_doc").hide();
    		$("#pub").hide();
    		$("#email").hide();
    		$("#vol").hide();
    		$("#address").hide();
    		$("#pages").hide();
    		$("#num").hide();
    		$("#phonenum").hide();
    		$("#com").hide();
    		$("#pages_area").hide()
    		$("#pub_area").hide()
    		$("#num_area").hide()
    		$("#vol_area").hide()
    	}
    	else if($('#citation_format').val() == "Personal_Observation"){
    		$("#personal_title").show();
    		$("#inst_doc").show();
    		$("#email").show();
    		$("#address").show();
    		$("#phonenum").show();
    		$("#com").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		$("#pub_area").show()
    		$("#num_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#website_title").hide();
    		$("#other_title").hide();
    		$("#unpublished_title").hide();
    		$("#doc").hide();
    		$("#pub").hide();
    		$("#vol").hide();
    		$("#pages").hide();
    		$("#num").hide();
    		$("#ab").hide();
    		$("#vol_area").hide()

    	}
    	else if($('#citation_format').val() == "Unpublished_Data"){
    		$("#unpublished_title").show();
    		$("#inst_doc").show();
    		$("#email").show();
    		$("#address").show();
    		$("#phonenum").show();
    		$("#com").show();
    		$("#format_area").show()
    		$("#pages_area").show()
    		$("#pub_area").show()
    		$("#num_area").show()
    		
    		$("#journal_title").hide();
    		$("#book_title").hide();
    		$("#book_select_title").hide();
    		$("#report_title").hide();
    		$("#thesis_title").hide();
    		$("#other_title").hide();
    		$("#personal_title").hide();
    		$("#doc").hide();
    		$("#pub").hide();
    		$("#vol").hide();
    		$("#pages").hide();
    		$("#num").hide();
    		$("#ab").hide();
    		$("#vol_area").hide()
    	}
    });
    
    //hide fields for citations
  	$('#reset_new_cite').on('click', function (e) {
			$("#journal_title").hide();
    	$("#book_title").hide();
    	$("#book_select_title").hide();
    	$("#report_title").hide();
    	$("#thesis_title").hide();
    	$("#other_title").hide();
    	$("#personal_title").hide();
    	$("#unpublished_title").hide();
    	$("#inst_doc").hide();
    	$("#pub").hide();
    	$("#email").hide();
    	$("#vol").hide();
    	$("#address").hide();
    	$("#pages").hide();
    	$("#num").hide();
    	$("#phonenum").hide();
    	$("#com").hide();
    	$("#pages_area").hide()
    	$("#pub_area").hide()
    	$("#num_area").hide()
    	$("#vol_area").hide()
    	$("#website_title").hide();
    	$("#format_area").hide();
    	$("#ab").show();
	});
	//hide fields
	$('#reset_new_node').on('click', function (e) {
		$("#node_working_name_field").hide();
		$("#node_functional_group_id_field").hide();
		$("#node_non_itis_id_field").hide();
		$("#node_native_status_field").hide();
		$("#node_is_assemblage_field").hide()
	});
});		
				




