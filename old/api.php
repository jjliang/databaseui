<?php
// note note
// Pretty print some JSON
function json_format($json)
{
	$tab = " ";
	$new_json = "";
	$indent_level = 0;
	$in_string = false;

	$json_obj = json_decode($json);

	if($json_obj === false)
		return false;

	$json = json_encode($json_obj);
	$len = strlen($json);

	for($c = 0; $c < $len; $c++)
	{
		$char = $json[$c];
		switch($char)
		{
		case '{':
		case '[':
			if(!$in_string)
			{
				$new_json .= $char . "\n" . str_repeat($tab, $indent_level+1);
				$indent_level++;
			}
			else
			{
				$new_json .= $char;
			}
			break;
		case '}':
		case ']':
			if(!$in_string)
			{
				$indent_level--;
				$new_json .= "\n" . str_repeat($tab, $indent_level) . $char;
			}
			else
			{
				$new_json .= $char;
			}
			break;
		case ',':
			if(!$in_string)
			{
				$new_json .= ",\n" . str_repeat($tab, $indent_level);
			}
			else
			{
				$new_json .= $char;
			}
			break;
		case ':':
			if(!$in_string)
			{
				$new_json .= ": ";
			}
			else
			{
				$new_json .= $char;
			}
			break;
		case '"':
			if($c > 0 && $json[$c-1] != '\\')
			{
				$in_string = !$in_string;
			}
		default:
			$new_json .= $char;
			break;                   
		}
	}

	return $new_json;
}
?>
<html>
<head>
<link type="text/css" rel="stylesheet" href="js/pre/prettify.css" />
<script type="text/javascript" src="js/pre/prettify.js"></script>
<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.6.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.tipTip.minified.js"></script>
<script type="text/javascript" src="js/json2.js"></script> 

<style>
pre.prettyprint {
	max-width=600px;
	max-height=400px;
	overflow:auto;
	display:block;
	border:1px solid black;
}
</style>
<script>

var precss =  { "max-height": "200px", "max-width": "800px" };
jQuery.fn.prettify = function () { this.html(prettyPrintOne(this.html())); };
</script>
</head>
<!-- <body  onload="prettyPrint()"> -->
<body >

		<div><h3>listAllLocations</h3>
		<p>Lists all of the locations. Returns an array of location objects.</p> 
		<pre class="prettyprint lang-js" id="listAllLocations"></pre>
		<script>
		var p = new Object();
		p.functionName="listAllLocations";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#listAllLocations").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#listAllLocations").css( precss );
			}
		});
		</script>
<!--    -->
		<div><h3>listAllCitations</h3>
		<p>List all citations in the database.</p>
		<pre class="prettyprint lang-js" id="listAllCitations"></pre>
		<script>
		var p = new Object();
		p.functionName="listAllCitations";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#listAllCitations").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#listAllCitations").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>listAllNodes</h3>
		<p>List all nodes in the database. This includes the interactions.</p>
		<pre class="prettyprint lang-js" id="listAllNodes"></pre>
		<script>
		var p = new Object();
		p.functionName="listAllNodes";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#listAllNodes").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#listAllNodes").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>getDisplayOptions</h3>
		<pre class="prettyprint lang-js" id="getDisplayOptions"></pre>
		<script>
		var p = new Object();
		p.functionName="getDisplayOptions";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#getDisplayOptions").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#getDisplayOptions").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>getAllInteractionsForNode</h3>
		<pre class="prettyprint lang-js" id="getAllInteractionsForNode"></pre>
		<script>
		var p = new Object();
		p.functionName="getAllInteractionsForNode";
		p.node_id =1;
		p.stage_1_or_2 = 1;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#getAllInteractionsForNode").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#getAllInteractionsForNode").css( precss );
			}
		});
		</script>
		</div>

<!--    -->
		<div><h3>getStageVars</h3>
		<pre class="prettyprint lang-js" id="getStageVars"></pre>
		<script>
		var p = new Object();
		p.functionName="getStageVars";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#getStageVars").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#getStageVars").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>getStages</h3>
		<pre class="prettyprint lang-js" id="getStages"></pre>
		<script>
		var p = new Object();
		p.functionName="getStages";
		p.node_id =1;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#getStages").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#getStages").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>getNodeItems</h3>
		<pre class="prettyprint lang-js" id="getNodeItems"></pre>
		<script>
		var p = new Object();
		p.functionName="getNodeItems";
		p.node_id =1;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#getNodeItems").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#getNodeItems").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>checkItisId</h3>
		<pre class="prettyprint lang-js" id="checkItisId"></pre>
		<script>
		var p = new Object();
		p.functionName="checkItisId";
		p.itis_id = 159903;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#checkItisId").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#checkItisId").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>addNewNodeCheck</h3>
		<pre class="prettyprint lang-js" id="addNewNodeCheck"></pre>
		<script>
		var p = new Object();
		p.functionName="addNewNodeCheck";
		p.working_name = "shark";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewNodeCheck").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewNodeCheck").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>addNewNode</h3>
		<pre class="prettyprint lang-js" id="addNewNode"></pre>
		<script>
		var p = new Object();
		p.functionName="getNodeItems"; // just do this to simulate the success response
		p.node_id = 1;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewNode").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewNode").css( precss );
			}
		});
		</script>
		</div>

<!--    -->
		<div><h3>addNewNonItisNodeCheck</h3>
		<pre class="prettyprint lang-js" id="addNewNonItisNodeCheck"></pre>
		<script>
		var p = new Object();
		p.functionName="addNewNonItisNodeCheck";
		p.working_name = "shark";
		p.latin_name = "Carcharodon carcharias";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewNonItisNodeCheck").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewNonItisNodeCheck").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>addNewNonItisNode</h3><table></table></div>
<!--    -->
		<div><h3>deleteInteraction</h3><table></table></div> 
<!--    -->
		<div><h3>deleteInteractionObservation</h3><table></table></div> 
<!--    -->
		<div><h3>deleteCitations</h3><table></table></div> 
<!--    -->
		<div><h3>addNewCitationCheck</h3>
		<pre class="prettyprint lang-js" id="addNewCitationCheck"></pre>
		<script>
		var p = new Object();
		p.functionName="addNewCitationCheck";
		p.title = "lost";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewCitationCheck").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewCitationCheck").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>addNewCitation</h3>
		<pre class="prettyprint lang-js" id="addNewCitation"></pre>
		<script>
		var p = new Object();
		p.functionName="getCitationInfo"; // here we will fake the insert
		p.cite_id = 1;
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewCitation").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewCitation").css( precss );
			}
		});
		</script>
		</div>

<!--    -->
		<div><h3>addNewAuthorCheck</h3>
		<pre class="prettyprint lang-js" id="addNewAuthorCheck"></pre>
		<script>
		var p = new Object();
		p.functionName="addNewAuthorCheck"; // here we will fake the insert
		p.first_name = "John";
		p.last_name = "Wayne";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewAuthorCheck").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewAuthorCheck").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>addNewAuthor</h3>
		<pre class="prettyprint lang-js" id="addNewAuthor"></pre>
		<script>
		var p = new Object();
		p.functionName="addNewAuthor"; // here we will fake the insert
		p.first_name = "John";
		p.last_name = "Wayne";
		$.ajax( { async:true, type:"GET", dataType:"json", 
			data: p,
			url: "query.php",
			success: function( data, hmm) {
				$("#addNewAuthor").html( JSON.stringify( data, null, "  ") );
				prettyPrint();
				$("#addNewAuthor").css( precss );
			}
		});
		</script>
		</div>
<!--    -->
		<div><h3>addNewInteraction</h3>
		</div>
<!--    -->
		<div><h3>addNewInteractionObservation</h3>
		</div>
<!--    -->
		<div><h3>addNewStages</h3>
		</div>
<!--    -->
		<div><h3>addNewStage</h3>
		</div>
<!--    -->
		<div><h3>addNewCitedVars</h3>
			<pre class="prettyprint lang-js" id="addNewAuthor">
		var p = new Object();
		p.functionName="addNewCitedVars"; 
		p.json = [ {node_id: 33, table: "max_age", cite_id: 18} ]
</pre>
		
		</div>
<!--    -->
		<div><h3>updateTable</h3>
		</div>
</body>
</html>
