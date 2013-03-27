function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function capitalize (text) {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
function callbackObject( obj, methodName) {
	this.obj = obj;
	this.methodName = methodName;
	this.doit = function(data) {
		this.obj[this.methodName].call(this.obj, data);
	}
	this.doitMulti = function(data) {
		// data must be an array here
		this.obj[this.methodName].apply(this.obj, data);
	}

}
// this is for callback functions where you want to pass
// 'this' as callback data
// can take up to 3 vars
function createMethodReference(object, methodName) {
	return function (event, var1, var2, var3) {
		object[methodName].call(object, event || window.event, var1, var2, var3);
	};
}

function createEventMethod(object, methodName) {
	return function (event) {
		object[methodName].call(object, event || window.event);
	};
}

// use this to log messages in the top div
function log( msg ) {
	$("#logdiv").append( msg + "<br>");
	$("#logdiv").attr({ scrollTop: $("#logdiv").attr("scrollHeight") });
}

// get's the name of the biogeographic location based on id
function getLocationNameFromId( id ) {
	for (var l in display_options.locations) {
		if ( display_options.locations[l].id == id ) {
			return display_options.locations[l].name;
		}
	}
	return undefined;
}

// update a table in the database.  generic function 
// takes field:value array pairs
function updateTable( table_name, id, fields, values ) {
	var postdata = Object();
	postdata.functionName = "updateTable";
	postdata.table_name = table_name;
	postdata.id = id;
	postdata.fields = fields;
	postdata.values = values; 
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		success: function(data, t, x) {	
			if (data.error != undefined )
				alert(data.error);
			else {
				log("updated " + postdata.fields + " on " + postdata.table_name);
			}
		}
	});
}

// used in getItisCommonNames 
function getCommonNamesFromDataAsString(data) { 
	valstring='';
	var first = true;
	if (data.return != undefined  && data.return.commonNames != undefined ){
		if (data.return.commonNames instanceof Array) {
			for (var n=0; n < data.return.commonNames.length;n++) {
				if (first) first=false;
				else valstring+=", ";
				valstring +=  data['return']['commonNames'][n]['commonName'];
			}
		} else if ( data.return.commonNames instanceof Object) {
			valstring +=  data.return.commonNames.commonName;
		}
		if (valstring =='')
			return "none";
		else
			return valstring;
	}
}

// use this function to retrieve Itis Common Names from 
// the Itis DB. A node may have more than one name.
//  is_val tells whether or not to set the 
// "val" on the element id or to set the "html"  
function getItisCommonNames( itis_id, element_search_id, is_val) {
	var retstring = undefined;
	var postdata = Object();
	postdata.functionName = "getCommonNamesFromTSN";
	postdata.tsn= itis_id;
	var div_bg = $(element_search_id).css("background");
	$(element_search_id).css("background", "#ffffff url('css/ui-anim_basic_16x16.gif') right top no-repeat");
	$.ajax( { async:true, type:"GET", dataType:"json",
		data: postdata, 
		url: "auto/itis.php", 
		success: function(data, t, x) {	
			if (data == null || data == undefined) {
			  alert("Error on getItisCommonNames, no response from server." );
			} else {			
				retstring = getCommonNamesFromDataAsString(data);
				if (is_val)
				  $(element_search_id).val(retstring);
				else
				  $(element_search_id).html(retstring);
				$(element_search_id).css("background", div_bg);
			}
		}
	});
	return retstring;
}

// use this function to retrieve Itis Latin/Scientific Name from 
// the Itis DB. It can only be one name.  
// is_val tells whether or not to set the 
// "val" on the element id or to set the "html" 
function getItisLatinName( itis_id, element_search_id, is_val ) {
	var retstring = undefined;
	var postdata = Object();
	postdata.functionName = "getScientificNameFromTSN";
	postdata.tsn= itis_id;
	var div_bg = $(element_search_id).css("background");
	$(element_search_id).css("background", "#ffffff url('css/ui-anim_basic_16x16.gif') right top no-repeat");
	$.ajax( { async:true, type:"GET", dataType:"json",
		data: postdata, 
		url: "auto/itis.php", 
		success: function(data, t, x) {	
			if (data == null || data == undefined) {
			  alert("Error on getItisLatinName, no response from server." );
			} else {			
				retstring = data.return.combinedName;
				if (is_val)
				 $(element_search_id).val(retstring);
				else
				 $(element_search_id).html(retstring);
				$(element_search_id).css("background", div_bg);
			}
		}
	});
	return retstring;
}


// generic autocomplete function generator
// need this for caching searches.  should save search times
function makeAutocompleteFunc( url ) {
	var cache = {},
			lastXhr;
	
	return function( request, response ) {
		var term = request.term;
		if ( term in cache ) {
			response( cache[ term ] );
			return;
		}
		lastXhr = $.getJSON( url, request, function( data, status, xhr ) {
				cache[ term ] = data;
				if ( xhr === lastXhr ) {
				response( data );
				}
				});
	}
}

function makeTmpDialogWindow( content, title ) {
	var d = new Date();
	var time = 'tmp' + d.toString().replace(/ /g,"_");
	var tmp ='<div id="'+ time +'" title="' + title+ '">' + content + '</div>';
	$('body').append( $(tmp) );
	$( "#" + time ).dialog({
		autoOpen: true,
		height: 400,
		width: 600,
		modal: true,
		buttons: {
			"add" : function() { },
			"Close": function() {
				$( this ).dialog( "close" );
				$( this ).remove( );
			}
		}
	});
	$( "#" + time ).dialog("open");
}





 function DumpObjectIndented(obj, indent) {
	var result = "";
	if (indent == null) indent = "";

	for (var property in obj)
	{
		var value = obj[property];
		if (typeof value == 'string')
			value = "'" + value + "'";
		else if (typeof value == 'object')
		{
			if (value instanceof Array)
			{
				// Just let JS convert the Array to a string!
				value = "[ " + value + " ]";
			}
			else
			{
				// Recursive dump
				// (replace "  " by "\t" or something else if you prefer)
				var od = DumpObjectIndented(value, indent + "  ");
				// If you like { on the same line as the key
					//value = "{\n" + od + "\n" + indent + "}";
					// If you prefer { and } to be aligned
					value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
			}
		}
		result += indent + "'" + property + "' : " + value + ",\n";
	}
	return result.replace(/,\n$/, "");
}




