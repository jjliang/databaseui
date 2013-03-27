var MODE_RANGE=0,MODE_LOCATION=1;
function MapEntry() {  

	this.id= "map_interface";
	this.initialized = false;
	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', "Map Entry");
	$(this.element).css("padding","2px");
	$(this.element).css("overflow","hidden");
	$(this.element).hide();

	this.table='locations';
	this.zoomTarget = -1;
	this.map = null;
	this.drawControls = null;
	this.vectors = null;
	this.loaded_nodes = [];
	this.select_node = null;
	this.mapClicked = false;
	this.nodeClicked = false;
	this.featureEvent = true;
	OpenLayers.Feature.Vector.style['default']['strokeWidth'] = '2';


	this.html = "<div id=\"map_container\" style=\"background-color: black; width: 875px; height: 500px\">" +
		"<div id=\"map_wrap\" style=\"margin: 10px; width:640px; height:480px;float:left;border: 1px solid black;\"><div id=\"map_canvas\" style=\"width: 100%; height: 100%\"></div></div>" +
		"<div id=\"sidebar\" style=\"width: 200px; height: 480px; background-color: white; float:left; margin-top: 10px; margin-bottom: 10px\">" +
			"<div id=\"tree\" style=\"width: 100%; height: 87%; overflow: auto\"></div>" +
			"<div id=\"nav\" style=\"height: 100%; margin-top: 5px\">" +
				"<form id=\"llform\"><input style=\"background-color: white; border: 1px solid black; width: auto;\" type=\"text\" id=\"lat\" size=8 value=\"lat\" title=\"lat\">&nbsp;<input style=\"background-color: white; border: 1px solid black; width: auto;\" type=\"text\" id=\"lon\" size=\"8\" value=\"lon\" title=\"lon\">&nbsp;<input style=\"background-color: white; border: 1px solid black; width: auto;\" type=submit value=\"go\"></form>" +
				"<form id=\"searchform\" method=\"get\"><input style=\"background-color: white; border: 1px solid black; width: auto;\" type=\"text\" id=\"mapsearch\" size=22 value=\"search map\" title=\"search map\">&nbsp;<input style=\"background-color: white; border: 1px solid black; width: auto;\" type=submit value=\"go\"></form>" +
			"</div>" +
		"</div>" +
	"</div>";
	$(this.element).append(this.html);
	$(this.element).appendTo('body');

	var that = this;
	$( this.element ).dialog({
		autoOpen: false,
		title: "Map Entry",
		height: 'auto',
		width: 'auto',
		shadow: false,
		modal: false,
		resizable: false,
		//--------------------------------------------------
		// close: function() { $( this ).remove(); },
		//-------------------------------------------------- 
		buttons: {
			//--------------------------------------------------
			// "Select": function() { $( this ).remove();	},
			//-------------------------------------------------- 
			"Cancel": function() { $(that.element).dialog('close'); },
		},
		open: function(e,u) {
			if (!that.initialized) {
				that.initialized = true;
				that.initializeMap();
				that.initializeUI();
			}
		}
	});
}

MapEntry.prototype.open = function () {

	var that = this;
	if ( $(this.element).dialog( "isOpen" ) === true ) {
		return;
	}
	
	$(this.element).dialog('open');
}

MapEntry.prototype.updateMap = function()
{
	var that = this;
	var b = this.map.getExtent();
	b.transform("EPSG:3857","EPSG:4326");
	removedList = this.pruneFeatures(b);
	$.get("map.php",
		{
			'op': 'visible_regions', 
			'bbox': b.toBBOX(), 
			'zoom': this.map.getZoom(),
			'table': this.table,
			'exclude': removedList
		},
		function(data) {
			var toSelect = null;
			for (i in data) {
				var feature = that.createFeature(data[i]);
				that.vectors.addFeatures([feature]);
				if (that.select_node != null && feature.attributes.region_id == that.select_node) {
					toSelect = feature;
					that.select_node = null;
				}
			}
			if (that.select_node != null) {
				toSelect = that.getLayer(that.select_node);
				that.select_node = null;
			}
			if (toSelect) {
				that.featureEvent = false;
				that.drawControls.select.unselectAll();
				that.drawControls.select.select(toSelect);
			}
		},
		"json"
	);
}

MapEntry.prototype.createFeature = function(data)
{
	var box = OpenLayers.Geometry.fromWKT(data.envelope).getBounds();
	var centroid = OpenLayers.Geometry.fromWKT(data.centroid);

	var feature = new OpenLayers.Feature.Vector(
		OpenLayers.Geometry.fromWKT(data.region).transform("EPSG:4326","EPSG:3857"),
		{
			'region_id': data.id, 
			'parent_region': data.parent,
			'centroid': centroid,
			'bounding_box': box, 
			'zoom_range': {'min': data.zoom_min, 'max': data.zoom_max},
			'rank': data.rank,
			'color': "#45A818",
			'zIndex': data.z_index,
			'visible': data.visible
		}
	);
	return feature;
}

MapEntry.prototype.pruneFeatures = function(bounds)
{
	var zoom = this.map.getZoom();
	var exclude = [], remove = [];
	for (i in this.vectors.features)
	{
		var f = this.vectors.features[i];
		if (!bounds.intersectsBounds(f.attributes.bounding_box) || (zoom < f.attributes.zoom_range.min || zoom > f.attributes.zoom_range.max)) {
			remove.push(f);
		} else {
			exclude.push(f.attributes.region_id);
		}
	}
	this.vectors.removeFeatures(remove,{silent: true});
	return exclude;
}

MapEntry.prototype.getLayer = function(id)
{
	for (i in this.vectors.features)
	{
		if (this.vectors.features[i].attributes.region_id == id) 
			return this.vectors.features[i];
	}
	return null;
}


MapEntry.prototype.initializeMap = function() 
{
	var that = this;
	this.map = new OpenLayers.Map('map_canvas');
	wkt = new OpenLayers.Format.WKT();
	var wmsLayer = new OpenLayers.Layer.WMS(
		"OpenLayers WMS", 
		"http://vmap0.tiles.osgeo.org/wms/vmap0",
		{layers: 'basic'}
	); 
	//TODO: more map layers from Google? (street, hybrid, etc.)
	var satLayer = new OpenLayers.Layer.Google("Google Satellite",{
			'type': google.maps.MapTypeId.SATELLITE, 
			'numZoomLevels': 22,
			'sphericalMercator': true,
			'maxExtent': new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34)
			});


	// allow testing of specific renderers via "?renderer=Canvas", etc
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

	var context = {
		getColor: function(f,s) {
			if (f.attributes.zoom_range.min == -1) {
				return "#ee9900";
			}	else if (f.attributes.zoom_range.min == 6) {
				return "#45A818";
			} else if (f.attributes.zoom_range.min > 6) {
				return "#F0307D";
			}
		},
		getZIndex: function(f,s) {
			return f.attributes.zIndex;
		},
		getOpacity: function(f,s) {
			return f.attributes.zIndex == 1 ? 0.4 : 1.0;
		}
	};
	var template = {
		fillColor: "${getColor}",
		strokeColor: "${getColor}",
		graphicZIndex: "${getZIndex}",
		fillOpacity: "${getOpacity}"
	};
	var style = new OpenLayers.Style(template,{context: context});

	this.vectors = new OpenLayers.Layer.Vector("Vector Layer", 
		{
			styleMap: new OpenLayers.StyleMap({
				'default': style,
				'select': {
					fillColor: 'blue',
					strokeColor: 'blue',
					fillOpacity: 0.4,
					zIndex: "${zIndex}"
				}
			}),
			rendererOptions: {zIndexing: true},
			renderers: renderer
		}
	);
	this.vectors.events.on({
		'featureselected': function(feature) {
			if (that.featureEvent) {
				that.layerSelect(feature);
			} else {
				that.featureEvent = true;
			}
		},
		'featureunselected': function(feature) {
		}
	});

	this.map.events.on({
		'moveend': function(e) {
			that.updateMap();
		},
		'zoomend': function(e) {
		}	
	});

	//map.addLayers([wmsLayer, this.vectors]);
	this.map.addLayers([satLayer, this.vectors]);
	this.map.addControl(new OpenLayers.Control.LayerSwitcher());

	this.drawControls = {
		select: new OpenLayers.Control.SelectFeature(
			this.vectors,
			{
				clickout: false, toggle: false,
				multiple: false, hover: false,
				toggleKey: "ctrlKey", // ctrl key removes from selection
				multipleKey: "shiftKey", // shift key adds to selection
				box: false
			}
		),
		selecthover: new OpenLayers.Control.SelectFeature(
			this.vectors,
			{
				multiple: false, hover: true,
				toggleKey: "ctrlKey", // ctrl key removes from selection
				multipleKey: "shiftKey" // shift key adds to selection
			}
		)
	};

	for(var key in this.drawControls) {
		this.map.addControl(this.drawControls[key]);
	}
	this.map.setCenter(new OpenLayers.LonLat(-122.030796, 36.974117).transform("EPSG:4326","EPSG:3857"),3);
	this.drawControls.select.clickout = true;
	this.drawControls.select.activate();
}


MapEntry.prototype.initializeUI = function()
{
	var ajax_data = null;
	var that = this;

	$("#tree").jstree({
		"plugins" : [ "json_data","ui","themes","hotkeys","search" ],
		"json_data" : {
			"ajax" : {
				"url" : "map.php",
				"data" : function(n) {
					return {
						"op": "get_children",
						"id" : n.attr ? n.attr("id").replace("node_","") : 1,
						'table': that.table
					};
				},
				"success": function(data) {
					ajax_data = data;
				}
			}
		},
		"themes" : {
			"theme" : "classic",
			"dots" : true,
			"icons" : false
		},
		"search" : {
			"ajax" : {
				"url": "map.php",
				"data": function(str) {
					return {
						"op": "search",
						"srch": str,
						'table': that.table
					}
				}
			}	
		},
		"core" : {
			"animation" : 100
		},
		"ui" : {
			"select_multiple_modifier": false,
			"select_limit" : 1
		}
	}).bind("select_node.jstree",function(e,data) {
		that.nodeSelect(data);
	}).bind("load_node.jstree",function(e,data) {
		var loaded = data.inst._get_children(data.rslt.obj);
		for (var i=0; i<loaded.length; i++) {
			$(loaded[i]).data('node_info',ajax_data[i]);
		}
	}).bind("search.jstree",function(e,data) {
		if (data.args.length) {
			var id = data.args[0];
			if ($("#node_"+id).length) {
				$("#tree").jstree("select_node","#node_"+id,true,false);
			}
		}
	});
	$("input[type=text]").focus(function() {
		if ($(this).val() == $(this).attr('title'))
			$(this).val('');
	}).blur(function() {
		if ($(this).val() == '')
			$(this).val($(this).attr('title'));
	});
	$("#llform").submit(function(e) {
		var lt = parseFloat($("#lat").val());
		var ln = parseFloat($("#lon").val());
		if ((lt >= -90 && lt <= 90) && (ln >= -180 && ln <= 180))
			that.map.setCenter(new OpenLayers.LonLat(ln,lt).transform("EPSG:4326","EPSG:3857"),7);
		e.preventDefault();
	});
	$("#mapsearch").geocomplete().bind("geocode:result",function(e,result) {
		var loc = result.geometry.location;
		that.map.setCenter(new OpenLayers.LonLat(loc.lng(),loc.lat()).transform("EPSG:4326","EPSG:3857"),7);
	});
}

MapEntry.prototype.nodeSelect = function(data)
{
	this.nodeClicked = true;
	if (!this.mapClicked)
	{
		this.select_node = $(data.rslt.obj).attr('id').replace('node_','');
		try { 
			var info = $(data.rslt.obj).data('node_info');
			var zoom = this.map.getZoom();
			zoom = (zoom >= info.zoom_min && zoom <= info.zoom_max) ? zoom : info.zoom_min;
			if (zoom == -1) zoom = 3;
			var g = OpenLayers.Geometry.fromWKT(info.centroid).transform("EPSG:4326","EPSG:3857");
			this.map.setCenter(new OpenLayers.LonLat(g.x,g.y),zoom);
		}	catch (e) {}
	}
	else this.mapClicked = false;
}

MapEntry.prototype.layerSelect = function(feature)
{
	this.mapClicked = true;
		var lyr = feature.feature;
		if ($("#node_"+lyr.attributes.region_id).length) {
			$("#tree").jstree('select_node','#node_'+lyr.attributes.region_id,true,false);
		} else {
			var srch_id = (lyr.attributes.visible == 1) ? lyr.attributes.region_id : lyr.attributes.parent_region;
			$("#tree").jstree('search',srch_id);	
		}
}
