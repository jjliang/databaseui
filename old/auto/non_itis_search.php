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
	$response['error'] = "No search terms or tsn.";
	echo json_encode( $response);
	exit();
}


$list =  Array();

$sql = "SELECT * FROM non_itis WHERE latin_name LIKE " . $db->quote( '%'. $srchKey . '%') . " ORDER BY latin_name"; 
$results = $db->getAll($sql);
if(DB::IsError($results)) { error($results->getMessage(  )); }

foreach( $results as $k => $v ) {
	$val = Array();
	$val['id'] =  Array( 'id' => $v['id'], 'is_itis'=> 0, 'taxonomy_level' => $v['taxonomy_level']);
	$val['value'] = $v['latin_name'];	
	$val['label'] = $v['latin_name'] . " - non-itis";	
	array_push( $list, $val);
}

$wsdl = "http://www.itis.gov/ITISWebService.xml";
//$wsdl = "ITISWebService.xml";
$client = new SoapClient($wsdl);

$response = $client->searchByScientificName( array('srchKey' => $srchKey ) );
foreach( $response as $k => $v ) {
	foreach( $v as $k1 => $v1 ) {
		if (is_object( $v1 ) ) {
			$val = Array();
			//$tax = $client->getTaxonomicRankNameFromTSN( array('tsn' =>  $v1->tsn ));
			//if (!empty($tax) ) {
				//$val['id'] =  Array( 'id' => $v1->tsn, 'is_itis'=> 1, 'taxonomy_level' => $tax->return->rankName );
				$val['id'] =  Array( 'id' => $v1->tsn, 'is_itis'=> 1 );
				$val['value'] = $v1->combinedName;	
				$val['label'] = $v1->combinedName . " - itis";	
				array_push( $list, $val);
			//}
		} else if (is_array($v1)) {
			foreach( $v1 as $k2 => $v2 ) {
				$val = Array();
				//$tax = $client->getTaxonomicRankNameFromTSN( array('tsn' =>  $v2->tsn ));
				//if (!empty($tax) ) {
					//$val['id'] =  Array( 'id' => $v2->tsn, 'is_itis'=> 1, 'taxonomy_level' => $tax->return->rankName);
					$val['id'] =  Array( 'id' => $v2->tsn, 'is_itis'=> 1);
					$val['value'] = $v2->combinedName;	
					$val['label'] = $v2->combinedName . " - itis";	
					array_push( $list, $val);
				//}
			}
		}
	}
}

echo json_encode($list);
?>
