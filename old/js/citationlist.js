// we will keep hold of a global citation var
// this will be used to update any citation widget 
// with citation info that has already been used by a user

function setCitationClosed( cite_id, open_or_closed ) {
	var ret = false;
	var postdata = new Object();
	postdata.functionName = "setCitationClosed";
	postdata.cite_id = cite_id;
	postdata.open_or_closed = open_or_closed;
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		success: function(data, t, x) { 
			if (data == null || data == undefined) {
				alert("Error on setCitationClosed, no response from server." );
			} else {      
				if (data.error != undefined) {
					alert(data.error);
				} else {
					ret = true;
				} 
			}
		}
	});
	return ret;
}


function CitationList( ) {
	this.cites = Array();
}

CitationList.prototype.get = function ( cite_id ) {
  for (var i =0; i < this.cites.length; i++) {
    if ( this.cites[i].id == cite_id) {
			return ;
    }
  } 
	return undefined;
}

CitationList.prototype.push = function ( cite ) {
  for (var i =0; i < this.cites.length; i++) {
    if ( this.cites[i].id == cite.id) {
			return;
    }
  } 
	this.cites.push(cite);
}

CitationList.prototype.recreateFromList = function ( citations_array ) {
	delete	this.cites;
	this.cites = citations_array;
	this.cites.sort( function (a, b) {
		// http://www.javascriptkit.com/javatutors/arraysort2.shtml
		var nameA, nameB;
		if (a.authors == undefined || a.authors.length < 1 || a.authors[0].last_name == undefined) {
			nameA = undefined;
		} else {
			nameA = a.authors[0].last_name.toLowerCase();
		}
		if (b.authors == undefined || b.authors.length < 1 || b.authors[0].last_name == undefined) {
			nameB = undefined;
		} else {
			nameB = b.authors[0].last_name.toLowerCase();
		}

		if (nameA < nameB) //sort string ascending
			return -1 
		if (nameA > nameB)
			return 1
		return 0 //default return value (no sorting)
	});
}


var citations =  new CitationList();



function listCitationsDialog() {
	this.element = document.createElement("div");
	this.element.setAttribute('id', "list_all_citations_dialog");
	this.element.setAttribute('title', "List All Citations");
	this.element.style.paddingTop = "15px";
}

listCitationsDialog.prototype.open = function () {

	$dialog = $(this.element);
	if ( $dialog.length>0) {
		$dialog.dialog("destroy");
		$dialog.remove();
	}

	$('body').append( this.element );

	$dialog.dialog({ 
		width: 800, 
		height: 600,
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
	postdata.functionName = "listAllCitations";
	$.ajax( { async:true, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "listAllCitationsCB")
	});
}

listCitationsDialog.prototype.getCiteId = function ( cite ) {
	var aid = this.element.id + "_" + $.trim(cite.authors[0].last_name) + "_" + $.trim(cite.authors[0].first_name);
	aid = aid.replace(/ /g, "_"); 
	aid = aid.replace(/\./g, "_"); 
	//console.log(aid);
	return aid;
}
	
listCitationsDialog.prototype.listAllCitationsCB = function (data, t, x) {
	if (data == null || data == undefined) {
		alert("Error on listAllCitations, no response from server." );
	} else if (data.error != undefined) {			
		alert(data.error);
	} else {			
		// clear whatever was there before
		$(this.element).html( "" );
		$(this.element).css("background", "#ffffff");

		// get all citations
		citations.recreateFromList(data);

		// let's go through and create an author div for each author
		for (var i = 0; i< citations.cites.length; i++) {
			var cite = citations.cites[i];
			if (cite.authors.length > 0 ) {
				var aid = this.getCiteId(cite);
				if ( $('#' + aid)[0] === undefined ) {
					var aiddiv = document.createElement("div");
					aiddiv.style.paddingBottom = "4px";
					aiddiv.id = aid;
					var s = '<span style="background:#fcfcfc;color:black;padding:2px;">' + cite.authors[0].last_name + "," + cite.authors[0].first_name + "</span><br>";
					$(aiddiv).html( s );
					$(this.element).append(aiddiv);
				}
			}
		}	

		// now, let's append the info to the author
		for (var i = 0; i< citations.cites.length; i++) {
			var cite = citations.cites[i];
			if (cite.authors.length > 0 ) {
				var aid = this.getCiteId(cite);
				var d = document.createElement("div");
				d.style.paddingLeft = "10px";
				var cb = document.createElement("input");
				var cbid = aid + "_" + cite.id;
				cb.id = aid + "_" + cite.id;
				cb.cite_id =  cite.id;
				cb.type = "checkbox";
				cb.style.width = "20px";
				cb.style.height= "14px";
				cb.style.padding = "0px";
				cb.style.margin = "0px";
				cb.style.verticalAlign = "text-bottom";
				if ( cite.closed == true ) cb.checked = true;
				$(cb).click( function() {
						if (this.checked) { // the user just now clicked it "on"
							// let's set closed=true
							 if ( !setCitationClosed( this.cite_id, "close" ) ) {
									this.checked=false;
							 }
						} else {
							// let's set closed=false
							 if ( !setCitationClosed( this.cite_id, "open" ) ) {
									this.checked=true;
							 }
	
						}
						//console.log(this.cite_id);
						//console.log(this.checked);
				});
				$(d).append( cite.title + " " + cite.year + " &nbsp; &nbsp; closed:" );
				$(d).append( cb );
				$("#" + aid).append(d );
			}
		}	

	}
}




