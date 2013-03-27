<?
// send out the header first to tell the client to expect json data
header("Content-Type: application/json");

$srchKey='';

if ( !empty( $_GET['term']) ) {
	$srchKey = $_GET['term'];
} else {
	$response['error'] = "No search terms or tsn.";
	echo json_encode( $response);
	exit();
}
$wsdl = "http://www.itis.gov/ITISWebService.xml";
//$wsdl = "ITISWebService.xml";
$client = new SoapClient($wsdl);

$data = array('srchKey' => $srchKey );
//$response = $client->searchByCommonNameBeginsWith( $data );
$response = $client->searchByCommonName( $data );
echo "[ ";
$first=true;
foreach( $response as $k => $v ) {
	foreach( $v as $k1 => $v1 ) {
		if ( is_object( $v1) ) { 
			echo "{\"id\": \"$v1->tsn\", \"value\": \"$v1->commonName\", \"info\": \"\"}";
		} else if (is_array($v1)) {
			foreach( $v1 as $k2 => $v2 ) {
				if (!$first) {
					echo ",";
				} else {
					$first = false;
				}
				echo "{\"id\": \"$v2->tsn\", \"value\": \"$v2->commonName\", \"info\": \"\"}";
			}
		}
	}
}

echo " ]";

//echo("\nDumping request:\n".$client->__getLastRequest());
//echo"<br><br>";
// echo (var_dump( $response));
?>
