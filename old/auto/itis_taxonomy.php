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


$itis_id="";
if ( !empty( $_GET['itis_id']) ) {
	$itis_id = $_GET['itis_id'];
} else {
	$response['error'] = "No itis id given.";
	echo json_encode( $response);
	exit();
}

$taxon=Array();

$wsdl = "http://www.itis.gov/ITISWebService.xml";
//$wsdl = "ITISWebService.xml";
$client = new SoapClient($wsdl);
$tax = $client->getTaxonomicRankNameFromTSN( array('tsn' =>  $itis_id ));
if (!empty($tax) ) {
$taxon =  Array( 'id' => $itis_id, 'is_itis'=> 1, 'taxonomy_level' => $tax->return->rankName );
}

echo json_encode($taxon);
?>
