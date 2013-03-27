<?

// send out the header first to tell the client to expect json data
//header("Content-Type: application/json");

$srchKey='';
$functionName='';
$tsn='';

if ( !empty( $_GET['functionName']) && ( !empty( $_GET['term']) || !empty( $_GET['tsn']) ) ) {
	$functionName = $_GET['functionName'];
	if ( !empty( $_GET['term'])) $srchKey = $_GET['term'];
	if ( !empty( $_GET['tsn'])) $tsn = $_GET['tsn'];
} else {
	echo json_encode(array( 'error' => "No search terms or tsn."));
	exit();
}
$wsdl = "http://www.itis.gov/ITISWebService.xml";
//$wsdl = "ITISWebService.xml";
$client = new SoapClient($wsdl);

$response='';
//var_dump($client->__getFunctions());

switch ($functionName) {
	case "searchByCommonNameBeginsWith": 
		$response = $client->searchByCommonNameBeginsWith( array( 'srchKey' => $srchKey ) );
		echo "{\"results\": [ ";
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
		echo " ] }";
		break;
		case "searchByScientificName": 
			$response = $client->searchByScientificName( array('srchKey' => $srchKey ) );
		echo "{\"results\": [ ";
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
		echo " ] }";

		break;

	case "getFullRecordFromTSN": 
		$response = $client->getFullRecordFromTSN( array( 'tsn' => $tsn ) );
		echo json_encode($response);
		break;
	case "getCommonNamesFromTSN": 
		$response = $client->getCommonNamesFromTSN( array( 'tsn' => $tsn ) );
		echo json_encode($response);
		break;
	case "getScientificNameFromTSN": 
		$response = $client->getScientificNameFromTSN( array( 'tsn' => $tsn ) );
		echo json_encode($response);
		break;

	case "searchForAnyMatch":
		$response = $client->searchForAnyMatch( array( 'srchKey' => $srchKey ) );
		break;
	default:
		break;
}

if ($response == '') {
	echo json_encode(array( 'error' => "No response to query."));
	exit();
}

//echo("\nDumping request:\n".$client->__getLastRequest());
//echo"<br><br>";
// echo (var_dump( $response));
?>
