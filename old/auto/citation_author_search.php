<?
function error ( $msg ) {
	echo json_encode( Array('error'=> $msg));	
	exit();
} 

// init will check our session and log us in
include_once("../init.php");

// send out the header first to tell the client to expect json data
//header("Content-Type: application/json");

$srchKey='';

if ( !empty( $_GET['term']) ) {
	$srchKey = $_GET['term'];
} else {
	error( "No search terms.");
	exit();
}

$sql = "SELECT * from authors ";
$sql .= " WHERE authors.last_name LIKE " . $db->quote( '%' .  $srchKey . '%') ;
$sql .= " OR authors.first_name LIKE " . $db->quote( '%'  . $srchKey . '%') ;
$sql .= " ORDER BY authors.last_name"; 
$results = $db->getAll($sql);
if(DB::IsError($results)) { error($results->getMessage(  )); }
$first=true;
echo "[ ";
foreach( $results as $k => $v ) {
	$label = $v['last_name'] . ", " . $v['first_name'] ;
	if (!$first) {
		echo ",";
	} else {
		$first = false;
	}
	echo "{\"id\": \"". $v['id']. "\", \"value\": \"" . $label ."\", \"label\": \"". $label ."\"}";
}
echo " ]";

?>
