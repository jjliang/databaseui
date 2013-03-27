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

$response = $client->searchByScientificName( array('srchKey' => $srchKey ) );
echo "[ ";
$first=true;
foreach( $response as $k => $v ) {
	foreach( $v as $k1 => $v1 ) {
		if (is_object( $v1 ) ) {
			$tmp = preg_replace("'\s+'", ' ', $v1->combinedName);
			echo "{\"id\": \"$v1->tsn\", \"value\": \"$tmp\", \"info\": \"\"}";
		} else if (is_array($v1)) {
			foreach( $v1 as $k2 => $v2 ) {
				//echo var_dump($v2) . "<br>";
				if (!$first) {
					echo ",";
				} else {
					$first = false;
				}
				$tmp = preg_replace("'\s+'", ' ', $v2->combinedName);
				echo "{\"id\": \"$v2->tsn\", \"value\": \"$tmp\", \"info\": \"\"}";
			}
		}
	}
}

echo "]";

?>
