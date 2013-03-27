
function TInput( p, name, tooltip ) {
	this.parent_element = p;
	this.id = this.parent_element.id + "_" +  $.trim( name).toLowerCase().replace(/ /g,"_");

	this.container = document.createElement('div');
	this.container.setAttribute('class', "divpad");
	this.container.setAttribute('id', this.id + "_container");

	this.label = document.createElement('label');
	this.label.innerHTML = name + ":";
	this.label.setAttribute('for', this.id);

	this.element = document.createElement('input');
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', tooltip);
	this.element.setAttribute('type', 'text');
}


// jq_id is the string id name of the element to which we will 
// be appending 
TInput.prototype.create = function(  ) {
	this.container.appendChild(this.label);
	this.container.appendChild(this.element);

	$( "#" + this.parent_element.id ).append( this.container );
	
	var id = "#" +this.element.id;

	if (this.autocomplete_source != undefined && this.autocomplete_cb != undefined ) {
		$( id ).autocomplete({
			minLength: 3,
			select: this.autocomplete_cb,
			source: makeAutocompleteFunc( this.autocomplete_source ) // makeAutocompleteFunc is from utils.js
		});
	}
	$( id ).tipTip();
}

TInput.prototype.hide = function(  ) {
	this.container.style.visibility = "hidden";
	this.container.style.display = "none";
}

TInput.prototype.show = function(  ) {
	this.container.style.visibility = "visible";
	this.container.style.display = "block";
}



TInput.prototype.setSelect = function (select_array) {
	var tooltip = this.element.getAttribute("title");
	this.element = document.createElement('select');
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', tooltip);
	this.element.setAttribute('type', 'text');
	var tmp= "";
	// if there is a select array, we will draw a select form 
	// with the array elements as its options
	if (select_array != undefined) {
		tmp += '<option value=""></option>';
		for (var i=0;i< select_array.length;i++) {	
			var opt = select_array[i];
			if (typeof ( opt ) == "object") {
				// this is for display_options.locations and display_options.functional_groups
				// for locations, we want to make the spaces on the front of the names have a
				// mandatory space.  normally, the space doesn't show up in the drop down 
				// list without the &nbsp; in the  <option>
				tmp+='<option value="'+ opt.id +'">'+ opt.name.replace("     ", " &nbsp; ") +'</option>';
			} else {
				tmp+='<option value="'+ opt +'">'+ opt +'</option>';
			}
		}
		this.element.innerHTML = tmp;
	}
};

TInput.prototype.setTextarea = function () {
	var tooltip = this.element.getAttribute("title");
	this.element = document.createElement('textarea');
	this.element.setAttribute('id', this.id);
	this.element.setAttribute('title', tooltip);
};

