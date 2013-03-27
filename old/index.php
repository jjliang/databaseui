<?
include_once("init.php");
require_authentication();

?>

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" >
<meta http-equiv="content-language" content="EN">
<meta name="Author" content="August Black">
<meta name="Publisher" content="August Black">

<title>FoodWeb Interaction Database</title>

<link type="text/css" href="css/custom-theme/jquery-ui-1.8.6.custom.css" rel="stylesheet" />	
<link type="text/css" href="css/kelpstyle.css" rel="stylesheet" />	
<link type="text/css" href="css/tipTip.css" rel="stylesheet" />	
<link type="text/css" href="css/menu.css" rel="stylesheet" />	
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.6.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.tipTip.minified.js"></script>
<script type="text/javascript" src="js/json2.js"></script> 
<script type="text/javascript" src="js/jquery.jstree.js"></script>
<script type="text/javascript" src="js/jquery.hotkeys.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAvQp4yENnLHBXW9xK-69jXRIAtlnycO9w&sensor=false&libraries=places&v=3"></script>
<script type="text/javascript" src="js/jquery.geocomplete.js"></script>
<script type="text/javascript" src="http://openlayers.org/api/OpenLayers.js"></script>

<script type="text/javascript" src="js/utils.js"></script> 
<script type="text/javascript" src="js/globals.js"></script> 
<script type="text/javascript" src="js/input.js"></script> 
<script type="text/javascript" src="js/addnewnode.js"></script> 
<script type="text/javascript" src="js/addnewnonitisnode.js"></script> 
<script type="text/javascript" src="js/addnewcitation.js"></script> 
<script type="text/javascript" src="js/addnewauthor.js"></script> 
<script type="text/javascript" src="js/node.js"></script> 
<script type="text/javascript" src="js/stage.js"></script> 
<script type="text/javascript" src="js/searchnodes.js"></script> 
<script type="text/javascript" src="js/citedvar.js"></script> 
<script type="text/javascript" src="js/citationlist.js"></script> 
<script type="text/javascript" src="js/interactions.js"></script> 
<script type="text/javascript" src="js/observationdialog.js"></script> 
<script type="text/javascript" src="js/mapentry.js"></script> 
<script>
var addnode,addnonitisnode,addcitation,addauthor,listnodesdialog,searchnodedialog,citevardialog,listnodesdialog,interactionseditor,observationdialog,mapentry;

$(function() {
	addnode = new AddNode();
	addnonitisnode = new AddNonItisNode();
	addcitation = new AddCitation();
	addauthor = new AddAuthor();
	listnodesdialog = new listNodesDialog();
	searchnodedialog = new SearchNodeDialog();
	citevardialog = new CitedVarDialog();
	listcitationsdialog = new listCitationsDialog();
	interactionseditor = new InteractionsEditor();
	observationdialog = new InteractionObservationDialog();
	mapentry = new MapEntry();
});
</script>

</head>
<body>
<?
$user_first_name ="";
$user_last_name="";

if(is_authenticated() ) {
	$user_email = $_SESSION['username'];
	$res = $db->getRow( "SELECT * FROM users WHERE email=". $db->quote($user_email) );  
	if(DB::IsError($res)) { 
		die( $res->getMessage()) ;
	} else {
		$user_id= $res['id'];
		$user_first_name= $res['first_name'];
		$user_last_name= $res['last_name'];
	}
}
?>

<ul class="ui-widget cssMenu">
	<li>
	<a  href="#"><span>Nodes</span></a>
	<ul>
		<li><a href="#" onclick="addnode.open();">Add New Node</a></li>
		<li><a href="#" onclick="addnonitisnode.open();">Add New Non-Itis Node</a></li>
		<li><a href="#" onclick="searchnodedialog.open();">Search Nodes</a></li>
		<li><a href="#" onclick="listnodesdialog.open();">List Nodes</a></li>
	</ul>
	</li>

	<li>
	<a href="#"><span>Citations</span></a>
	<ul>
		<li><a href="#" onclick="addauthor.open();">Add New Author</a></li>
		<li><a href="#" onclick="addcitation.open();">Add New Citation</a></li>
		<li><a href="#" onclick="listcitationsdialog.open();">List Citations</a></li>
	</ul>
	</li>

	<li>
	<a href="#"><span>Interactions</span></a>
	<ul>
		<li><a href="#" onclick="interactionseditor.open();">Interactions Editor</a></li>
		<li><a href="#">Human Use Interactions (in development)</a></li>
		<li><a href="#">Interactions Matrix (coming soon)</a></li>
	</ul>
	</li>
	<li>
	<a href="login.php">Logout <? echo $user_first_name . " " . $user_last_name; ?></a>
	</li>

</ul>


</body>
</html>
