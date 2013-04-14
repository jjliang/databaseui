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
      clickable: true
  }
});
drawingManager.setMap(Gmaps.second_map.map);
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
});

