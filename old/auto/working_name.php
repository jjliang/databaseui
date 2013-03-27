<?
function error ( $msg ) {
	$response['error'] = $msg;
	echo json_encode( $response );	
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
	error("No search terms.");
	exit();
}

$sql = "SELECT * FROM nodes WHERE working_name LIKE " . $db->quote( '%'. $srchKey . '%') . " ORDER BY working_name"; 
$results = $db->getAll($sql);
if(DB::IsError($results)) { error($results->getMessage(  )); }
$first=true;
echo "[ ";
foreach( $results as $k => $v ) {
	if (!$first) {
		echo ",";
	} else {
		$first = false;
	}
	if ( $v['itis_id'] == -1) 
		echo "{\"id\": \"". $v['id']. "\", \"value\": \"" . $v['working_name'] ."\", \"label\": \"". $v['working_name'] . " non_itis_id:" . $v['non_itis_id'] ."\"}";
	else
		echo "{\"id\": \"". $v['id']. "\", \"value\": \"" . $v['working_name'] ."\", \"label\": \"". $v['working_name'] . " itis_id:" . $v['itis_id'] ."\"}";
}
echo " ]";

?>
