// global url
var url = "http://kelpforest.ucsc.edu/";

//get the global display_options
$.ajax( { async:false,type:"GET", dataType:"json", 
	url: "query.php?functionName=getDisplayOptions", 
	timeout: 500,
	error: function(jqXHR, textStatus, errorThrown) {
		alert(errorThrown);
	},
	success: function(data, t, x) { 	
		display_options = data;
	}
});
// call on ready
//--------------------------------------------------
// $(function() {
// //makeTmpDialogWindow( "<pre>" +JSON.stringify(display_options) + "</pre>", "display_options");
// //$("#log").html( JSON.stringify(display_options) , "display_options");
// //node = new Node( 159903 , "itis_id");
// });
//-------------------------------------------------- 
