

function AddAuthor() {  

	this.id= "new_author_dialog";

	this.inputs = new Object ();

	this.element = document.createElement("div");
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', "Add New Author");
	this.element.style.paddingTop = "15px";

	this.inputs.first_name= new Input(this, "first_name");
	this.inputs.first_name.display_name = "First Name :";
	this.inputs.first_name.tooltip = "Please enter the first name of the author.";

	this.inputs.last_name= new Input(this, "last_name");
	this.inputs.last_name.display_name ="Last Name";
	this.inputs.last_name.tooltip = "Please enter a the last name of the author.";

	this.inputs.first_name.element.setAttribute("class", "medium");
	this.inputs.last_name.element.setAttribute("class", "medium");
}

AddAuthor.prototype.addNewAuthorCheck = function (data) {
	if( data.error != undefined)  {
		alert(data.error);
		return;
	}
	if (data.similar_items != undefined && data.similar_items.length > 0 ) {
		var ctxt = "There are similar authors already in the DB.\n ";
		for (var i=0;i<data.similar_items.length;i++) {
			ctxt += "\t{ first name: " + data.similar_items[i].first_name + ", last name: " +data.similar_items[i].last_name + "}\n";
			if (i != data.similar_items.length -1) ctxt += ", ";
		}
		ctxt += "\nDo you want to continue adding the new author?";
		ctxt += "\nPlease note that duplicate authors with the exact same first and last name are not allowed.";
		if ( !confirm( ctxt) )
			this.goodtogo  = false;
	}
}

AddAuthor.prototype.addNewAuthorCB = function(data, t, x) {	
	if (data.error == undefined ) {
		//log("Added new author with id=" +  data.id + ", name=" + data.last_name +", " +data.first_name);
		var name = data.last_name +", " +data.first_name;
		addcitation.makeAuthorCiteSpan( data.id, name ) ; 
		var ctxt = "Author ( " + name + ") was successfully added.";
		ctxt += "Would you like to add another author?";
		if ( !confirm( ctxt ) )
			$( this.element ).remove();
	} else {
		alert(data.error);
	}	
}

AddAuthor.prototype.addNewAuthor = function() {
	var postdata = new Object();
	postdata.first_name = jQuery.trim( this.inputs.first_name.element.value  );
	postdata.last_name = jQuery.trim( this.inputs.last_name.element.value );
	postdata.functionName = "addNewAuthor";
	if( postdata.first_name == ""  || postdata.last_name == "" ) {
		alert("Please enter a first and last name");
		return;
	}

	var tmpobj = Object();
	tmpobj.first_name = postdata.first_name;
	tmpobj.last_name = postdata.last_name;
	tmpobj.functionName = "addNewAuthorCheck";
	this.goodtogo  = true;
	$.ajax( { async:false, type:"GET", dataType:"json", 
		data: tmpobj,
		url: "query.php",
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewAuthorCheck") 
	} );

	if (this.goodtogo == false) return
	$.ajax( { async:false, type:"GET", dataType:"json",
		data: postdata, 
		url: "query.php", 
		error : function (data, t, errorThrown) { alert("error (" + t + "):" + errorThrown); },
		success: createMethodReference(this, "addNewAuthorCB")	
	});
}


AddAuthor.prototype.open = function () {

	if ( $(this.element).dialog( "isOpen" ) === true ) {
		return;
	}

	$('body').append( this.element );
	$(this.element).empty();

	for (var i in this.inputs ) {
		this.inputs[i].createDivRow(this.element);
	}

	$( this.element ).dialog({
		autoOpen: true,
		title: "Add New Author",
		height: 200,
		width: 500,
		modal: false,
		close: function() { $( this ).remove(); },
		buttons: {
			"Add New Author": createMethodReference(this, "addNewAuthor" ),
			"Close": function() { $( this ).remove();	}
		}
	});
}


