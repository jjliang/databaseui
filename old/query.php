<?

function queryRollbackIfFail ( $sql, $user, $table, $field, $id ) {
	global $db;
	// first see if we are allowed to act on this table
	if (!canModify($user, $table, $field, $id )) {
		$db->query("ROLLBACK"); 
		$response['error'] ="No permissions to modify $table with $field : $id";
		$response['sql'] = $sql;
		echo json_encode( $response );	
		exit();
	}

	$result = $db->query( $sql);
	if(DB::IsError($result)) {  
		$db->query("ROLLBACK"); 
		$response['error'] = $result->getMessage();
		$response['sql'] = $sql;
		echo json_encode( $response );	
		exit();
	} 
}

function error ( $msg ) {
	$response['error'] = $msg;
	echo json_encode( $response );	
	exit();
} 
include_once("init.php");
//include_once("jsonprint.php");

function canWrite($user) {
	global $db;
	if ($user['can_write']) {
		return true;
	}
	return false;
}

function canModify($user, $table, $field, $id) {
	global $db;
	if ($user['can_modify_others']) {
		//error(" Yes, you can modify it you are superuser" );	
		return true;
	} else {
		// check to see if the table row id is owned by user
		$sql = "SELECT * FROM $table WHERE $field=" . $db->quote($id); 
		$row = $db->getRow( $sql );  
		if(DB::IsError($row)) { 
			error( $row->getMessage());
		} else if( empty($row) ) {
			// the row is empty, so the user can't modify it anyway
			return true;
		} else if ( empty($row['owner_id'] )) {
			// there is no owner_id on this table, let's play it safe and 
			// say the user cannot modify this table row
			return false;
		} else {
			if ($row['owner_id'] == $user['id']) {
				//error(" sql=$sql; you are user ". implode(",",$user) . "  ; owner_id=" . $row['owner_id'] . " Yes, you can modify it" );	
				return true;
			} else {
				//error(" sql=$sql; you are user ". implode(",",$user) . "  ; owner_id=" . $row['owner_id'] . " No!" );	
				return false;
			}
		} 
	}
	return false;
}

function getEnumValues($table, $field) {
	global $db;
	$enum_array = array();
	$enum_fields = array();
	$query = 'SHOW COLUMNS FROM `' . $table . '` LIKE "' . $field . '"';
	$q = $db->query($query);
	$row = $q->fetchRow(  ) ;
	//var_dump($row);
	preg_match_all('/\'(.*?)\'/', $row['Type'], $enum_array);
	if(!empty($enum_array[1])) {
		// Shift array keys to match original enumerated index in MySQL (allows for use of index values instead of strings)
		foreach($enum_array[1] as $mkey => $mval) 
			array_push($enum_fields, $mval);
		//$enum_fields["" . $mkey+1] = $mval;
		return $enum_fields;
	}
	else return array(); 
	// Return an empty array to avoid possible errors/warnings if array is passed 
	// to foreach() without first being checked with !empty().
}

function getFunctionalGroups () {
	global $db;
	$sql = "SELECT id, name FROM functional_groups ORDER BY name"; 
	$results = $db->getAll($sql);
	if(DB::IsError($results)) { error($results->getMessage(  )); }
	return $results;
}

function getLocations () {
	global $db;
	$sql = "SELECT * FROM locations ORDER BY id"; 
	$results = $db->getAll($sql);
	if(DB::IsError($results)) { error($results->getMessage(  )); }
	return $results;
}


function getAuthors($cite_id) {
	global $db;
	$sql = "SELECT authors.last_name, authors.first_name from author_cite ";
	$sql .= " INNER JOIN authors ON authors.id=author_cite.author_id WHERE author_cite.cite_id=" . $db->quote($cite_id);
	$results = $db->getAll($sql);
	if(DB::IsError($results)) { error($results->getMessage(  )); }
	return $results;
}

function getValues ( $table, $field, $id, $value) {
	global $db;
	$results = Array( );
	$sql = "SELECT * FROM $table ";
	$sql .= " WHERE $field=" . $db->quote($id) ."  ORDER BY $value";
	$res = $db->getAll($sql);
	if(DB::IsError($res)) { error($res->getMessage(  ) . " - " . $sql); }
	return $res;
}

function getCitationInfo ( $cite_id ) {
	global $db;
	$sql = "SELECT * FROM citations  WHERE id=" . $db->quote($cite_id) ;
	$res = $db->getRow($sql);
	if(DB::IsError($res)) { error($res->getMessage(  )); }
	if (!empty($res)) {
		$res['authors'] = getAuthors($cite_id);
	}
	return $res;
}
/*
$stage_vars = Array (  "biomass_density", "biomass_change", "consumer_strategy",
"consum_biomass_ratio", "drymass", "duration", "fecundity", "habitat","population",
"length", "length_fecundity", "length_weight" ,"lifestyle", "mass", "max_depth", "mobility", "prod_biomass_ratio",
"prod_consum_ratio", "residency","residency_time", "unassimilated_consum_ratio");
 */

function getStageVars () { 
	global $db;

	$results = $db->getListOf('tables');
	if(DB::IsError($results)) { error($results->getMessage(  )); }
	$tmp  =Array();
	if (!empty($results)) {
		foreach( $results as $k => $v ) {
			$sub = substr ( $v , 0 , 6 );
			if ( $sub == "stage_" )
				array_push( $tmp, substr($v, 6, strlen($v)));
		}
	}
	return $tmp;
}

/*
function getStageOld( $stage ) {
	$stage_vars = getStageVars();
	$tmp = Array();
	$stage_name = $stage['name'] ;
	$tmp[ $stage_name ] = Array( 'id'=> $stage['id'], 'node_id' => $stage['node_id'] );
	foreach( $stage_vars as $sv ) {
		// length_weight needs to be handled separately 
		//if ( $sv == "length_fecundity" || $sv == "length_weight" ) {
		//	$values =  getValues("stage_" .$sv, "stage_id", $stage['id'], "equation_type" ) ;
		//} else {
			$values = getValues("stage_".$sv, "stage_id", $stage['id'], $sv ) ;	
		//}
		if (!empty($values) )
			$tmp[$stage_name]['stage_' . $sv] =  $values ;
	}
	return $tmp;
}
 */

function getStage( $stage ) {
	$stage_vars = getStageVars();
	foreach( $stage_vars as $sv ) {
			$values = getValues("stage_".$sv, "stage_id", $stage['id'], $sv ) ;	
		if (!empty($values) )
			$stage['stage_' . $sv] =  $values ;
	}
	return $stage;
}

/*
function getStagesOld( $node_id ) {
	global $db;
	$sql = "SELECT * FROM stages WHERE node_id=$node_id";            // create SQL query
	$results = $db->getAll($sql);
	$tmp = Array();
	if(DB::IsError($results)) { error($results->getMessage(  )); }
	if (empty($results)) {
		// always return at least one stage identifier, the "general" stage
		//$results = Array( Array( id=> null, name=> "general", node_id=> null,  ) ); 
	} else {
		// get the rest of the results 
		$tmp = Array();
		for($i=0; $i< count($results); $i++ ) {
			$stage_name = $results[$i]['name'] ;
			$stage = getStage( $results[$i] );
			$tmp[ $stage_name ] = $stage[ $stage_name ] ;
		}
	} 
	// build a full list of stages
	return $tmp;
}
 */

function getStages( $node_id ) {
	global $db;
	$sql = "SELECT * FROM stages WHERE node_id=$node_id";            // create SQL query
	$results = $db->getAll($sql);
	$tmp = Array();
	if(DB::IsError($results)) { error($results->getMessage(  )); }
	if (empty($results)) {
		// always return at least one stage identifier, the "general" stage
		//$results = Array( Array( id=> null, name=> "general", node_id=> null,  ) ); 
	} else {
		// get the rest of the results 
		$tmp = Array();
		for($i=0; $i< count($results); $i++ ) {
			$stage = getStage( $results[$i] );
			array_push($tmp,  $stage);
		}
	} 
	// build a full list of stages
	return $tmp;
}


function getNodeItems () {
	global $db;
	$sql = "";
	$itis_id= null;
	if ( !empty( $_GET['itis_id']) ) { 
		$itis_id = $_GET['itis_id']; 
		$sql = "SELECT * FROM nodes WHERE itis_id=$itis_id";            // create SQL query
	} else if ( !empty( $_GET['node_id']) ) {
		$node_id = $_GET['node_id']; 
		$sql = "SELECT * FROM nodes WHERE id=$node_id";            // create SQL query
	} else { 
		error("No itis_id or node_id given.");
	}
	//$result = $db->queryRow($sql);
	$result = $db->getRow($sql);
	if(DB::IsError($result)) { error($result->getMessage(  )); }
	if (!empty($result)) {
		$result["node_max_age"] =  getValues("node_max_age", "node_id", $result['id'], "max_age" ) ;
		//$result["node_reproductive_strategy"] =  getValues("node_reproductive_strategy", "node_id", $result['id'], "reproductive_strategy" ) ;
		$result["node_range"] =  getValues("node_range", "node_id", $result['id'], "cite_id") ;
		// stages can be null here
		$result["stages"] =  getStages( $result['id']) ;
		//echo jsonprint( json_encode($result) );
		//echo ( json_encode($result) );
		return $result;
	} else {
		// return empty array if no results
		$result = Array( 'id'=> null, 'itis_id'=> $itis_id, 'non_itis_id'=> null, 'working_name' => null, 
				'functional_group_id' => "1", 'is_assemblage'=>"0" );
		// max_ages => Array( cite_id =>null, max_age=>null, authors=> Array() ), 
		// reproductive_strategy => Array(  cite_id =>null, reproductive_strategy=>null, authors=> Array()   ) );
		return $result;
	}
}


function getAllInteractionsForNode ( $node_id , $stage_1_or_2) {
	global $db;
	$response = Array ( );
	$response['interactions'] = Array();
	if ( isset( $node_id) && isset( $stage_1_or_2) ) { 
		$stage_number = "stage_" . $stage_1_or_2 . "_id";
		$other_stage_number = ($stage_1_or_2 == 1) ? "stage_2_id" : "stage_1_id";
		// first, get the stages for this node
		$sql = "SELECT * FROM stages WHERE node_id=" .  $db->quote( $node_id); 
		$results = $db->getAll($sql);
		if(DB::IsError($results)) { $response['error'] = $results->getMessage(  ); $response['sql'] = $sql; break; }

		for($k=0; $k< count($results); $k++ ) {
			// now get the interactions for each of the stages	
			$stage_id = $results[$k]['id'];
			$stage_name = $results[$k]['name'];
			$i_types = Array( "trophic", "competition", "facilitation", "parasitic");
			for( $i=0; $i < count($i_types); $i++) {
				$table =  $i_types[$i] . "_interactions";
				$sql = "SELECT $table.id, stages.name as stage_name, nodes.working_name as node_work_name, nodes.id as node_id from $table ";
				$sql .= " LEFT JOIN (stages,nodes) ON (stages.id=$table.$other_stage_number AND nodes.id=stages.node_id) ";
				$sql .= " WHERE  $stage_number=" . $db->quote( $stage_id );
				$sres = $db->getAll($sql);
				if(DB::IsError($sres)) { 
					$response['error'] = $sres->getMessage(  ); 
					$response['sql'] = $sql; 
					break;
				} else {
					// go through our results and ad them to our response
					for($j=0; $j< count($sres); $j++ ) {
						array_push( $response['interactions'] , Array( 'stage_name'=> $stage_name, 
									'interaction_type'=> $i_types[$i], 
									'node_id'=> $sres[$j]['node_id'], 
									'node_working_name'=> $sres[$j]['node_work_name'], 
									'node_stage_name'=> $sres[$j]['stage_name']  ) );
					}
				}
			}
		}
	} else {
		$response['error'] = "No stage_2_id or stage_1_id or interaction_type given. node_id: $node_id, stage_1_or_2: $stage_1_or_2";
	}
	return $response;
}
// ------------- Get params ------------------------------------------------------------//

$functionName="";
if ( !empty( $_GET['functionName']) ) { $functionName = $_GET['functionName']; }
if ( !empty( $_POST['functionName']) ) { $functionName = $_POST['functionName']; }


//if(!isset($_SESSION['is_logged_in'])) {
if(!is_authenticated()  ) {
	// display login form here
	error("not logged in");
} else {
	// we are logged in, let's roll with it

	$email = $_SESSION['username'];
	$user = $db->getRow( "SELECT * FROM users WHERE email=". $db->quote($email) );  
	if(DB::IsError($user)) { 
		error( $user->getMessage()) ;
	} 

	switch ($functionName) {
		case "listAllLocations":
			$result = getLocations();
			echo  json_encode($result);
			break;

		case "listAllCitationsByAuthor":
			$sql = "SELECT * FROM authors ORDER BY last_name"; 
			$results = $db->getAll($sql);
			if(DB::IsError($results)) { error($results->getMessage(  )); }
			else {
				for($i=0; $i < count($results); $i++ ) {
					$citations = Array();
					$q1= "SELECT * FROM author_cite WHERE author_id=". $db->quote($results[$i]['id']);
					$r1 = $db->getAll($q1);
					if(DB::IsError($r1)) { error($r1->getMessage(  )); }
					for ($j=0; $j < count($r1); $j++ ) {
						$q2= "SELECT id, title, year FROM citations WHERE id=". $db->quote($r1[$j]['cite_id'] . " ORDER BY year");
						$r2 = $db->getAll($q2);
						if(DB::IsError($r2)) { error($r2->getMessage(  )); }
						for ($k=0;$k <  count($r2); $k++){
							array_push($citations, $r2[$k]);
						}
					}
					$results[$i]['citations'] = $citations ;
				}
			}
			echo  json_encode($results);
			break;
	
		case "listAllCitations":
			$q2= "SELECT * FROM citations ORDER BY title";
			$citations = Array();
			$r2 = $db->getAll($q2);
			if(DB::IsError($r2)) { error($r2->getMessage(  )); }
			for ($k=0;$k <  count($r2); $k++){
				$cite = $r2[$k];
				$cite['authors'] = getAuthors($cite['id']);
				array_push($citations, $cite);
			}
			echo  json_encode($citations);
			break;

		case "setCitationClosed":
			$tmp = "Attempting to set citation open/close: ";
			if (!isset( $_GET['cite_id'] ) ) error( $tmp . "missing cite_id.");
			if (!isset( $_GET['open_or_closed'] ) ) error( $tmp . "missing open_or_closed");
			$response = Array();
			$sql = "UPDATE citations SET ";
			if (  $_GET['open_or_closed'] == "open" ) $sql .=  " closed=0";
			else  $sql .=  " closed=1";
			$sql .= " WHERE id=" . $db->quote( $_GET['cite_id'] );
			$result = $db->query($sql);
			if(DB::IsError($result)) { 
				$response['error'] = $result->getMessage();
				$response['sql'] = $sql;
			}
			echo json_encode( $response );
			break;

		case "listAllNodes":
			$sql = "SELECT id,itis_id,working_name FROM nodes ORDER BY working_name"; 
			$results = $db->getAll($sql);
			if(DB::IsError($results)) { error($results->getMessage(  )); }
			else {
				//foreach ($results as $r ) {
				for($i=0; $i < count($results); $i++ ) {
					$interactions1 = getAllInteractionsForNode($results[$i]['id'], 1);
					$interactions2 = getAllInteractionsForNode($results[$i]['id'], 2);
					//array_push( $results[$i], Array('interactions1' => $interactions1 ) );
					$results[$i]['interactions1'] = $interactions1['interactions'] ;
					$results[$i]['interactions2'] = $interactions2['interactions'] ;
					//array_push( $results[$i], Array('interactions2' => $interactions2 ) );
				}
			}
			echo  json_encode($results);
			break;
		case "getDisplayOptions":
			$result = Array();
			$result['functional_groups'] = getFunctionalGroups();
			$result['node_native_status'] = getEnumValues("nodes", "native_status");
			$result['non_itis_taxonomy_level'] = getEnumValues("non_itis", "taxonomy_level");
			$result['stage_vars'] = getStageVars();
			$result['stage_reproductive_strategy'] = getEnumValues("stage_reproductive_strategy", "reproductive_strategy");
			$result['stage_names'] = getEnumValues("stages", "name");
			$result['stage_consumer_strategy'] = getEnumValues("stage_consumer_strategy", "consumer_strategy");
			$result['stage_length_weight'] = getEnumValues("stage_length_weight", "length_weight");
			$result['stage_length_fecundity'] = getEnumValues("stage_length_fecundity", "length_fecundity");
			$result['stage_habitat'] = getEnumValues("stage_habitat", "habitat");
			$result['stage_lifestyle'] = getEnumValues("stage_lifestyle", "lifestyle");
			$result['stage_mobility'] = getEnumValues("stage_mobility", "mobility");
			$result['stage_residency'] = getEnumValues("stage_residency", "residency");
			$result['locations'] = getLocations();
			$result['trophic_interaction_observation_lethality'] = getEnumValues("trophic_interaction_observation", "lethality");
			$result['trophic_interaction_observation_structures_consumed'] = getEnumValues("trophic_interaction_observation", "structures_consumed");
			$result['trophic_interaction_observation_preference'] = getEnumValues("trophic_interaction_observation", "preference");
			$result['trophic_interaction_observation_observation_type'] = getEnumValues("trophic_interaction_observation", "observation_type");
			$result['trophic_interaction_observation_percentage_diet_by'] = getEnumValues("trophic_interaction_observation", "percentage_diet_by");
			$result['competition_interaction_observation_observation_type'] = getEnumValues("competition_interaction_observation", "observation_type");
			$result['competition_interaction_observation_competition_type'] = getEnumValues("competition_interaction_observation", "competition_type");
			$result['facilitation_interaction_observation_observation_type'] = getEnumValues("facilitation_interaction_observation", "observation_type");
			$result['facilitation_interaction_observation_facilitaton_type'] = getEnumValues("facilitation_interaction_observation", "facilitation_type");
			$result['parasitic_interaction_observation_observation_type'] = getEnumValues("parasitic_interaction_observation", "observation_type");
			$result['parasitic_interaction_observation_lethality'] = getEnumValues("parasitic_interaction_observation", "lethality");
			$result['parasitic_interaction_observation_endo_ecto'] = getEnumValues("parasitic_interaction_observation", "endo_ecto");
			$result['parasitic_interaction_observation_parasite_type'] = getEnumValues("parasitic_interaction_observation", "parasite_type");
			//$result['parasitic_interaction_observation_prevalence'] = getEnumValues("parasitic_interaction_observation", "prevalence");
			$result['citation_format'] = getEnumValues("citations", "format");
			echo  json_encode($result);
			//echo jsonprint( json_encode($result));
			break;
		case "getItisId":
			$sql = "";
			if ( !empty( $_GET['node_id']) ) {
				$node_id = $_GET['node_id']; 
				$sql = "SELECT itis_id FROM nodes WHERE id=$node_id";            // create SQL query
			} else { 
				error("No itis_id or node_id given.");
			}
			$result = $db->getRow($sql);
			if(DB::IsError($result)) { error($result->getMessage(  )); }
			echo json_encode($result);
			break;
		case "getCitationInfo":
			if ( !empty( $_GET['cite_id']) ) { 
				$cite_id = $_GET['cite_id'];
				$info = getCitationInfo( $cite_id );
				echo json_encode(  $info );
				//echo jsonprint( json_encode( $info ));
			} else {
				error("No cite_id given.");
			}
			break;
		case "getInteractionInfo":
			$response = Array ( );
			if ( isset( $_GET['stage_1_id']) && isset( $_GET['stage_2_id']) && isset( $_GET['interaction_type']) ) { 
				$table =  $_GET['interaction_type'] . "_interactions";
				$sql = "SELECT * from $table WHERE  stage_1_id=" . $db->quote(  $_GET['stage_1_id'] );
				$sql .= " AND stage_2_id=".  $db->quote(  $_GET['stage_2_id'] );
				$result = $db->getRow($sql);
				if(DB::IsError($result)) { 
						$response['error'] = $result->getMessage(  ); 
						$response['sql'] = $sql; 
				} else if ( $result['id']) {
					$response['id'] = $result['id'];
					$table = $_GET['interaction_type'] . "_interaction_observation";
					$match = $_GET['interaction_type'] . "_interaction_id";
					$sql = "SELECT * from $table WHERE $match=" . $result['id'];
					$result = $db->getAll($sql);
					if(DB::IsError($result)) { 
						$response['error'] = $result->getMessage(  ); 
						$response['sql'] = $sql; 
					} else if ( count( $result ) > 0) {
						$response['observations'] = $result;
					}
				}
			} else {
				$response['error'] = "No stage_2_id or stage_1_id or interaction_type given. 1:" 
					. $_GET['stage_1_id'] . " 2:". $_GET['stage_2_id'] . " int_type:".  $_GET['interaction_type'];
			}
		  echo ( json_encode($response) );
			break;	
		// this will get all the interactions for a given node.  stage_1_or_2 tells
		// whether or not it is the left or right hand side of the interaction.
		// 1 == left; 2 == right; 
		case "getAllInteractionsForNode":
			$response = getAllInteractionsForNode( $_GET['node_id'],  $_GET['stage_1_or_2'] );
		  echo ( json_encode($response) );
			break;	
		case "getStageVars":
			$result = getStageVars();
		  echo ( json_encode($result) );
			break;
		case "getStages":
			if ( empty( $_GET['node_id']) ) error("getStages requires a node_id"); 
			$result = getStages(  $_GET['node_id'] );
		  echo ( json_encode($result) );
			break;

		case "getNodeItems":
			$result = getNodeItems();
		  echo ( json_encode($result) );
			break;
		case "checkItisId":
			$result = Array();
			if (isset( $_GET['itis_id'])  ) {
				$result['itis_id'] = $_GET['itis_id'];
				$sql = "SELECT * FROM nodes WHERE itis_id=" . $_GET['itis_id'] ;
				$res = $db->getRow($sql);
				if(DB::IsError($res)) { 
          $result['error'] = $res->getMessage();
        } else if ( count($res) > 0 ) { 
					$result = getNodeItems();
          //$result['error'] = "Already have this ITIS id node in our DB";
				} else {
          $result['notfound'] = 1;
				}
			} else {
				$result['error'] = "Caling function checkItisId without var itis_id defined";
			}
		  echo ( json_encode($result) );
			break;
		case "addNewNodeCheck":
			// we want to check here if there are any nodes with a similar working name
			$result = Array();
			if ( isset( $_GET['working_name']) ) {
				$working_name = $_GET['working_name'];
				$result['similar_items'] = Array();
				$sql = "SELECT id, itis_id, working_name FROM nodes WHERE working_name LIKE " . $db->quote( '%'. $working_name . '%') . " ORDER BY working_name"; 
				$results = $db->getAll($sql);
				if(DB::IsError($results)) { error($results->getMessage(  )); }
				foreach( $results as $k => $v ) {
					$r = Array();
					$r["id"] = $v['id'];
					$r["working_name"] = $v['working_name'];
					$r["itis_id"] = $v['itis_id'];
					array_push( $result['similar_items'],  $r);
				}
			} else {
				$result['error'] = "To addNewNodeCheck, you must supply a working_name";
			}
		  echo json_encode( $result );
			break;	
		case "addNewNode":
			$result = Array();
			if (!canWrite($user) ) { error("No permissions to add New Node."); }
			$tmp = "Attempting to insert new node: ";
			if (!isset( $_GET['itis_id'] ) ) error( $tmp . "missing itis_id.");
			if (!isset( $_GET['working_name'] ) ) error( $tmp . "missing working_name.");
			if (!isset( $_GET['native_status'] ) ) error( $tmp . "missing native_status.");
			if (!isset( $_GET['functional_group_id'] ) ) error( $tmp . "missing functional_group_id .");
			if (!isset( $_GET['is_assemblage'] ) ) error( $tmp . "missing is_assemblage .");

			// first, we need to check if there is one with the same itis_id
			$sql = "SELECT * FROM nodes WHERE itis_id=" . $_GET['itis_id'] . " OR working_name=" . $db->quote( $_GET['working_name'] );
			$res = $db->getRow($sql);
			if(DB::IsError($res)) { 
				$result['error'] = $res->getMessage();
				$result['sql'] = $sql;
			} else if ( count($res) > 0 ) { 
				$result['error'] = "A node with this itis id ( " .$_GET['itist_id'] ." ) or working name ( ". $_GET['working_name'] . " ) already exists in the database.";
				$result['sql'] = $sql;
			} else {
				$sql = "INSERT into nodes ( itis_id, non_itis_id, working_name, native_status, functional_group_id, owner_id, is_assemblage ) VALUES (";
				$sql .= $db->quote($_GET['itis_id']) . ", ";
				$sql .=  "-1 , ";
				$sql .= $db->quote($_GET['working_name']) . ", ";
				$sql .= $db->quote($_GET['native_status']) . ", ";
				$sql .= $db->quote($_GET['functional_group_id']) . ", ";
				$sql .= $db->quote($user['id']) . ", ";
				$sql .= $db->quote($_GET['is_assemblage']) . ") ";
				$res = $db->query($sql);
				if(DB::IsError($res)) { 
					$result['error'] = $res->getMessage();
					$result['sql'] = $sql;
				} else { 
					// always make a general stage
					if (!canWrite($user) ) { error("No permissions to add New Stage."); }
						$node_id= $db->getOne("SELECT * from nodes WHERE id=LAST_INSERT_ID()");
					$sql = "INSERT into stages  ( node_id, name, owner_id) VALUES (";
					$sql .= $db->quote( $node_id ) . ", " . $db->quote("general") . ", ". $db->quote($user['id']) .  ")";
					$result = $db->query($sql);
					if(db::iserror($result)) { 
						$response['error'] = $result->getmessage();
						$response['sql'] = $sql;
					} else {
						$result = getNodeItems();
					}
				}
			}
		  echo json_encode( $result );
			break;
		case "addNewNonItisNodeCheck":
			// we want to check here if there are any nodes with a similar working name
			$result = Array();
			if ( isset( $_GET['working_name']) && isset( $_GET['latin_name']) ) {
				$working_name = $_GET['working_name'];
				$latin_name = $_GET['latin_name'];
				$result['similar_items'] = Array();
				$sql = "SELECT id, itis_id, working_name FROM nodes WHERE working_name LIKE " . $db->quote( '%'. $working_name . '%') . " ORDER BY working_name"; 
				$results = $db->getAll($sql);
				if(DB::IsError($results)) { error($results->getMessage(  )); }
				foreach( $results as $k => $v ) {
					$r = Array();
					$r["id"] = $v['id'];
					$r["working_name"] = $v['working_name'];
					$r["itis_id"] = $v['itis_id'];
					array_push( $result['similar_items'],  $r);
				}
				$sql = "SELECT * FROM non_itis WHERE latin_name LIKE " . $db->quote( '%'. $latin_name . '%') . " ORDER BY latin_name"; 
				$results = $db->getAll($sql);
				if(DB::IsError($results)) { error($results->getMessage(  )); }
				foreach( $results as $k => $v ) {
					$r = Array();
					$r["id"] = $v['id'];
					$r["latin_name"] = $v['latin_name'];
					$r["parent_id"] = $v['parent_id'];
					$r["parent_id_is_itis"] = $v['parent_id_is_itis'];
					$r["taxonomy_level"] = $v['taxonomy_level'];
					array_push( $result['similar_items'],  $r);
				}

			} else {
				$result['error'] = "To addNewNonItisNodeCheck, you must supply a working_name and latin_name";
			}
		  echo json_encode( $result );
			break;	

		case "addNewNonItisNode":
			$response = Array();
			if (!canWrite($user) ) { 
				error("No permissions to add New NonItis Node."); 
			}
			if ( !isset( $_GET['parent_id']) )  error("addNewNonItisNode: No parent id."); 
			if ( !isset( $_GET['parent_id_is_itis']) )  error("addNewNonItisNode: No parent_id_is_itis. "); 
			if ( !isset( $_GET['latin_name']) )  error("addNewNonItisNode: No latin_name."); 
			if ( !isset( $_GET['taxonomy_level']) )  error("addNewNonItisNode: No taxonomy_level."); 
			if ( !isset( $_GET['working_name']) )  error("addNewNonItisNode: No working_name."); 
			if ( !isset( $_GET['functional_group_id']) )  error("addNewNonItisNode: No functional_group_id."); 
			if ( !isset( $_GET['native_status']) )  error("addNewNonItisNode: No native_status."); 
			if ( !isset( $_GET['is_assemblage']) )  error("addNewNonItisNode: No is_assemblage."); 
			// first, we need to check if there is one with the same itis_id
			$sql = "SELECT * FROM non_itis WHERE latin_name=" . $db->quote( $_GET['latin_name'] );
			$res = $db->getRow($sql);
			if(DB::IsError($res)) { 
				$response['error'] = $res->getMessage();
				$response['sql'] = $sql;
			} else if ( count($res) > 0 ) { 
				$response['error'] = "A node with this latin name already exists in the database.";
				$response['sql'] = $sql;
			} else {
				$sql = "INSERT into non_itis ( parent_id, parent_id_is_itis, latin_name, owner_id, info, taxonomy_level ) VALUES (";
				$sql .= $db->quote($_GET['parent_id']) . ", ";
				$sql .= $db->quote($_GET['parent_id_is_itis']) . ", ";
				$sql .= $db->quote($_GET['latin_name']) . ", ";
				$sql .= $db->quote($user['id']) . ", ";
				$sql .= $db->quote($_GET['info']) . ", ";
				$sql .= $db->quote($_GET['taxonomy_level']) . ")";
				$res = $db->query($sql);
				if(DB::IsError($res)) { 
					$response['error'] = $res->getMessage();
					$response['sql'] = $sql;
				} else { 
					$non_itis_id= $db->getOne("SELECT * from non_itis WHERE id=LAST_INSERT_ID()");
					if (DB::IsError($non_itis_id)) { 
						$response['error'] = $res->getMessage(); 
						$response['sql'] = $sql;
					} else {
						$sql = "INSERT into nodes ( itis_id, non_itis_id, working_name, native_status, functional_group_id, owner_id, is_assemblage ) VALUES (";
						$sql .= $db->quote( -1 ) . ", ";
						$sql .=  $db->quote($non_itis_id) . ", ";;
						$sql .= $db->quote($_GET['working_name']) . ", ";
						$sql .= $db->quote($_GET['native_status']) . ", ";
						$sql .= $db->quote($_GET['functional_group_id']) . ", ";
						$sql .= $db->quote($user['id']) . ", ";
						$sql .= $db->quote($_GET['is_assemblage']) . ") ";
						$res = $db->query($sql);
						if(DB::IsError($res)) { 
							$response['error'] = $res->getMessage();
							$response['sql'] = $sql;
						} else { 
							$node_id= $db->getOne("SELECT * from nodes WHERE id=LAST_INSERT_ID()");
							$sql = "INSERT into stages  ( node_id, name, owner_id) VALUES (";
							$sql .= $db->quote( $node_id ) . ", " . $db->quote("general") . ", ". $db->quote($user['id']) .  ")";
							$res = $db->query($sql);
							if(db::iserror($res)) { 
								$response['error'] = $res->getmessage();
								$response['sql'] = $sql;
							} 
							$response['response'] ="alles klar" ;
						}
					} 
				}
			}
			echo json_encode( $response );
			break;

		case "deleteInteraction": 
			$response = Array();
			if ( isset( $_GET['stage_1_id']) && isset( $_GET['stage_2_id']) 
					&& isset( $_GET['interaction_type'])  && isset( $_GET['interaction_id']) ) { 
				$type = $_GET['interaction_type'];
				$table =  $type . "_interactions";
				$interaction_id = $_GET['interaction_id'];

				if (!canModify($user, $table, "id", $interaction_id) ) {
					error("No permissions to modify this entry, $table:$interaction_id");
				} 
				$sql = "DELETE from $table WHERE stage_1_id=" .  $db->quote($_GET['stage_1_id']);
				$sql .= " AND stage_2_id=" . $db->quote( $_GET['stage_2_id'] );
				$sql .= " AND id=" . $db->quote( $interaction_id );
				$result = $db->query($sql);
				if(DB::IsError($result)) { 
					$response['error'] = $result->getMessage(); $response['sql'] = $sql;
				} else {
					$response['response'] = "Deleted interaction";
					// now delete all Interaction Observations
					$sql = "DELETE from trophic_interaction_observation WHERE trophic_interaction_id=" . $db->quote( $interaction_id );
					$result = $db->query($sql);
					if(DB::IsError($result)) { $response['error'] .= $result->getMessage(); $response['sql'] .= $sql;}
					$sql = "DELETE from parasitic_interaction_observation WHERE parasitic_interaction_id=" . $db->quote( $interaction_id );
					$result = $db->query($sql);
					if(DB::IsError($result)) { $response['error'] .= $result->getMessage(); $response['sql'] .= $sql;}
					$sql = "DELETE from competition_interaction_observation WHERE competition_interaction_id=" . $db->quote( $interaction_id );
					$result = $db->query($sql);
					if(DB::IsError($result)) { $response['error'] .= $result->getMessage(); $response['sql'] .= $sql;}
					$sql = "DELETE from facilitation_interaction_observation WHERE facilitation_interaction_id=" . $db->quote( $interaction_id );
					$result = $db->query($sql);
					if(DB::IsError($result)) { $response['error'] .= $result->getMessage(); $response['sql'] .= $sql;}
					$result = $db->query($sql);
					if(DB::IsError($result)) { 
						$response['error'] = $result->getMessage(); 
						$response['sql'] = $sql;
					}
				}
			} else {
				$response['error'] = "No stage_1_id stage_2_id interaction_type or interaction_id";
			}
			echo json_encode( $response );
			break;

		case "deleteInteractionObservation": 
			$response = Array();
			if (!isset( $_GET['cite_id']) ) error("deleteInteractionObservation: Must have a cite_id");
			if (!isset( $_GET['interaction_id']) )  error("deleteInteractionObservation: must have interaction_id");
			if (!isset( $_GET['interaction_type']) ) error("deleteInteractionObservation: must have interaction_type");
			if (!isset( $_GET['location_id']) ) error("deleteInteractionObservation: must have location_id");
			if (!isset( $_GET['observation_type']) )  error("deleteInteractionObservation: must have observation_type");

			$type = $_GET['interaction_type'];
			$interaction_id= $_GET['interaction_id'];
			$table =  $type . "_interaction_observation";
			$idname = $type . "_interaction_id";
	
			if (!canModify($user, $table, $idname, $interaction_id) ) {
			error("No permissions to modify this entry, $table:$idname:$interaction_id");
			}
			$sql = "DELETE from $table WHERE cite_id=" .  $db->quote($_GET['cite_id']);
			$sql .= " AND location_id=" . $db->quote( $_GET['location_id'] ) ;
			$sql .= " AND observation_type=" . $db->quote( $_GET['observation_type'] ) ;
			$sql .= " AND $idname=" . $db->quote( $_GET['interaction_id'] );
			$result = $db->query($sql);
			if(DB::IsError($result)) { 
				$response['error'] = $result->getMessage();
				$response['sql'] = $sql;
			} 
			echo json_encode( $response );
			break;

		case "deleteCitedVar": 
			if ( !isset( $_GET['table']) ) error("you must provide table name in order to delete a cited variable.");
			if ( !isset( $_GET['cite_id']) ) error("you must provide cite_id in order to delete a cited variable.");
			if ( !isset( $_GET['node_id']) AND !isset( $_GET['stage_id']) ) 
				error("you must provide either a node_id or stage_id in order to delete a cited variable.");
			$foreign_ptr="node_id";
			if ( isset( $_GET['stage_id'])) {	$foreign_ptr="stage_id"; }
						
			if (!canModify($user, $_GET['table'], $foreign_ptr, $_GET[$foreign_ptr] )) {
				error("No permissions to modify/delete this cited var" . $_GET['table'] .":". $foreign_ptr .":". $_GET[$foreign_ptr]);
			}

			$response = Array();
			$sql = "DELETE from " .$_GET['table'] . " WHERE cite_id=" .  $db->quote($_GET['cite_id']);
			$sql .= " AND $foreign_ptr=" . $db->quote($_GET[$foreign_ptr]);
			$result = $db->query($sql);
			if(DB::IsError($result)) { 
				$response['error'] = $result->getMessage();
				$response['sql'] = $sql;
			} else {
				$response['success'] = $result;
			}	
			echo json_encode( $response );
			break;

		case "deleteStage": 
			$response = Array();
			if (!canWrite($user) ) { 
				error("No permissions to delete a stage."); 
			}
			if ( !isset( $_GET['stage_id']) )  error("deleteStage: no stage_id provided."); 
			$stage_id = $_GET['stage_id'];
			$response['stage_id'] =  $stage_id;
			$stage_vars = getStageVars();

			$result = $db->query("START TRANSACTION");
			if(DB::IsError($result)) {  
				error("Couldn't start transaction"); 
			}
			queryRollbackIfFail("DELETE  from stages WHERE stages.id=" .   $db->quote($stage_id ), $user, "stages", "id", $stage_id );
			foreach ($stage_vars as $s) {
				queryRollbackIfFail("DELETE FROM stage_$s  WHERE stage_id=" .   $db->quote($stage_id ), $user, "stage_$s", "stage_id", $stage_id );
			}
			
			$sql = "SELECT * from trophic_interactions WHERE stage_1_id=" .   $db->quote($stage_id ) . " OR stage_2_id=" . $db->quote($stage_id ) ;
			$results = $db->getAll($sql);
			if(DB::IsError($results)) { $db->query("ROLLBACK"); error("Couldn't select on trophic_interactions"); }
			for( $k=0; $k < count($results); $k++ ) {
				$id = $results[$k]['id'];
				queryRollbackIfFail( "DELETE from trophic_interactions WHERE id=" .   $db->quote($id ), $user, "trophic_interactions", "id", $id );
				queryRollbackIfFail( "DELETE from trophic_interaction_observation WHERE trophic_interaction_id=" .   $db->quote($id ), 
				$user, "trophic_interaction_observation", "trophic_interaction_id", $id );
			}

			$sql = "SELECT * from parasitic_interactions WHERE stage_1_id=" .   $db->quote($stage_id ) . " OR stage_2_id=" . $db->quote($stage_id ) ;
			$results = $db->getAll($sql);
			if(DB::IsError($results)) { $db->query("ROLLBACK"); error("Couldn't select on parasitic_interactions"); }
			for( $k=0; $k < count($results); $k++ ) {
				$id = $results[$k]['id'];
				queryRollbackIfFail( "DELETE from parasitic_interactions WHERE id=" .   $db->quote($id ), $user, "parasitic_interactions", "id", $id );
				queryRollbackIfFail( "DELETE from parasitic_interaction_observation WHERE parasitic_interaction_id=" .   $db->quote($id ),
			 	$user, "parasitic_interaction_observation", "parasitic_interaction_id", $id	);
			}

			$sql = "SELECT * from competition_interactions WHERE stage_1_id=" .   $db->quote($stage_id ) . " OR stage_2_id=" . $db->quote($stage_id ) ;
			$results = $db->getAll($sql);
			if(DB::IsError($results)) { $db->query("ROLLBACK"); error("Couldn't select on competition_interactions"); }
			for( $k=0; $k < count($results); $k++ ) {
				$id = $results[$k]['id'];
				queryRollbackIfFail( "DELETE from competition_interactions WHERE id=" .   $db->quote($id ), $user, "competition_interactions", "id", $id );
				queryRollbackIfFail( "DELETE from competition_interaction_observation WHERE competition_interaction_id=" .   $db->quote($id ),
			 	$user, "competition_interaction_observation", "competition_interaction_id", $id	);
			}

			$sql = "SELECT * from facilitation_interactions WHERE stage_1_id=" .   $db->quote($stage_id ) . " OR stage_2_id=" . $db->quote($stage_id ) ;
			$results = $db->getAll($sql);
			if(DB::IsError($results)) { $db->query("ROLLBACK"); error("Couldn't select on facilitation_interactions"); }
			for( $k=0; $k < count($results); $k++ ) {
				$id = $results[$k]['id'];
				queryRollbackIfFail( "DELETE from facilitation_interactions WHERE id=" .   $db->quote($id ), $user, "facilitation_interactions", "id", $id );
				queryRollbackIfFail( "DELETE from facilitation_interaction_observation WHERE facilitation_interaction_id=" .   $db->quote($id ),
			 	$user, "facilitation_interaction_observation", "facilitation_interaction_id", $id	);
			}


			$result = $db->query("COMMIT");
			if(DB::IsError($result)) { 
				$response['error'] = $result->getMessage();
				$response['sql'] = $sql;
			} 
			echo json_encode( $response );
			break;
		case "addNewCitationCheck":
			// we want to check here if there are any publications with a similar title 
			$result = Array();
			if ( isset( $_GET['title']) ) {
				$title = $_GET['title'];
				$result['similar_items'] = Array();
	
				$sql = "SELECT * FROM citations WHERE title LIKE " . $db->quote( '%'. $title . '%') . 
					" ORDER BY title"; 
				$similar_items = $db->getAll($sql);
				if(DB::IsError($similar_items)) { 
					error($similar_items->getMessage(  )); 
				}
				foreach( $similar_items as $k => $v ) {
					$r = Array();
					$r["id"] = $v['id'];
					$r["title"] = $v['title'];
					$r['authors'] = getAuthors($v['id']);
					array_push( $result['similar_items'],  $r);
				}
			} else {
				$result['error'] = "To addNewAuthorCheck, you must supply a first and last name";
			}
		  echo json_encode( $result );
			break;	
	
	
		case "addNewCitation":
			$response = Array();
			if (!canWrite($user) ) { error("No permissions to add New Citation."); }
			if ( !isset( $_GET['author_ids']) || count($_GET['author_ids']) < 1 ) { error("Need at least one author.");}
			if ( !isset( $_GET['title']) || empty( $_GET['title']  ) ) { error("Need at least one title.");}
			if ( !isset( $_GET['year']) || empty(  $_GET['year']  ) ) { error("Need to state the year.");}
			if ( !isset( $_GET['format']) || empty($_GET['format']) ) { error("Need format.");}

			if ( !isset( $_GET['document']) ) { $_GET['document'] = "No document.";}
			if ( !isset( $_GET['abstract']) ) { $_GET['abstract'] = "Need abstract.";}
			$sql = "INSERT into citations (title, document, year, abstract, format, format_title, number, pages, owner_id, publisher, volume) ";
			$sql .= " VALUES (" . $db->quote($_GET['title']);
			$sql .= ", " . $db->quote($_GET['document']);
			$sql .= ", " . $db->quote($_GET['year']);
			$sql .= ", " . $db->quote($_GET['abstract']);
			$sql .= ", " . $db->quote($_GET['format']);
			$sql .= ", " . $db->quote($_GET['format_title']);
			$sql .= ", " . $db->quote($_GET['number']);
			$sql .= ", " . $db->quote($_GET['pages']);
			$sql .= ", " . $db->quote($user['id']);
			$sql .= ", " . $db->quote($_GET['publisher']);
			$sql .= ", " . $db->quote($_GET['volume']);
			$sql .= ")";
			$result = $db->query($sql);
			if(DB::IsError($result)) { 
				$response['error'] = $result->getMessage();
				$response['sql'] = $sql;
			}else { 
				$cite_id = $db->getOne( "SELECT LAST_INSERT_ID() from citations" );  
				if (DB::IsError($cite_id)) {
					$response['error'] = $cite_id->getMessage();
					$response['sql'] = $sql;
				} else {
					foreach ( $_GET['author_ids'] as $a_id) {
						$sql = "INSERT into author_cite (author_id, owner_id, cite_id) VALUES";
						$sql .=	" (" .$db->quote($a_id) ."," .$db->quote($user['id']) ."," . $db->quote($cite_id) . ")";
						$res = $db->query($sql);
						// we won't worry about errors here
					}
					$response = getCitationInfo( $cite_id );
				}
			}
			echo json_encode(  $response );
			break;
		case "addNewAuthorCheck":
			// we want to check here if there are any authors with a similar working name
			$result = Array();
			if ( isset( $_GET['first_name']) &&  isset( $_GET['last_name'] ) ) {
				$first_name = $_GET['first_name'];
				$last_name = $_GET['last_name'];
				$result['similar_items'] = Array();
	
				$sql = "SELECT id, first_name, last_name FROM authors WHERE first_name LIKE " . $db->quote( '%'. $first_name . '%') . 
					" AND last_name LIKE " . $db->quote( '%'. $last_name . '%') . 
					" ORDER BY last_name"; 

				$similar_items = $db->getAll($sql);
				if(DB::IsError($similar_items)) { 
					error($similar_items->getMessage(  )); 
				}
				foreach( $similar_items as $k => $v ) {
					$r = Array();
					$r["id"] = $v['id'];
					$r["first_name"] = $v['first_name'];
					$r["last_name"] = $v['last_name'];
					array_push( $result['similar_items'],  $r);
				}
			} else {
				$result['error'] = "To addNewAuthorCheck, you must supply a first and last name";
			}
		  echo json_encode( $result );
			break;	
	
		case "addNewAuthor":
			$response = Array();
			if (!canWrite($user) ) { error("No permissions to add New Author."); }
			if ( !empty( $_GET['first_name']) && !empty( $_GET['last_name']) ) {
				$first_name = $_GET['first_name'];
				$last_name = $_GET['last_name'];
				$sql = "INSERT into authors (first_name, owner_id, last_name) VALUES (";
				$sql .= $db->quote($first_name) . "," . $db->quote($user['id']) ."," . $db->quote($last_name) ." )";	
				$result = $db->query($sql);
				if(DB::IsError($result)) { 
					$response['error'] = $result->getMessage();
					$response['sql'] = $sql;
				}else { 
					$res = $db->getRow( "SELECT * FROM authors WHERE last_name=". $db->quote($last_name) ." AND first_name=" . $db->quote($first_name) );  
					if(DB::IsError($res)) { 
						$response['error'] = $res->getMessage();
					} else {
						$response['id'] = $res['id'];
						$response['first_name'] = $res['first_name'];
						$response['last_name'] = $res['last_name'];
					}
				}
			} else {
				$response['error'] = "First or Last name is empty when trying to add new author";
			}
			echo json_encode( $response );
			break;
		case "addNewInteraction":
			$response = Array ( );
			if (!canWrite($user) ) { error("No permissions to add New Interaction."); }
			if ( isset( $_GET['stage_1_id']) && isset( $_GET['stage_2_id']) && isset( $_GET['interaction_type']) ) { 
				$table =  $_GET['interaction_type'] . "_interactions";
				$sql = "INSERT into $table ( stage_1_id, owner_id, stage_2_id) values (";
				$sql .= $db->quote( $_GET['stage_1_id'] ) . ", "  . $db->quote($user['id']) ."," . $db->quote($_GET['stage_2_id']) . ")";
				$result = $db->query($sql);
				if(DB::isError($result)) { 
					$response['error'] = $result->getMessage();
					$response['sql'] = $sql;
				} else { 
					$interaction = $db->getRow( "SELECT * from $table WHERE id=LAST_INSERT_ID()" );
					if(DB::isError($interaction)) { 
						$response['error'] = $result->getMessage();
						$response['sql'] = $sql;
					}else {
						$response = $interaction;
					}
				}	
			} else {
				$response['error'] = "Need stage_1_id, stage_2_id, and interaction_type.";
			}	
			echo json_encode( $response );
			break;
	
		case "addNewInteractionObservation":
			
			$response = Array ( );
			if (!canWrite($user) ) { error("No permissions to add New Interaction Observation."); }
			if ( !isset( $_GET['cite_id']) ) { error("Need a citation id"); }
			if ( !isset( $_GET['interaction_type'] ) ) {  error("Need an interaction type"); }
			if ( !isset( $_GET['location_id'] ) ) {  error("Need a location_id"); }

			$type = $_GET['interaction_type'];
			$table =  $type . "_interaction_observation";
			$sql = "INSERT into $table  ";
			switch ($type) {
			case "trophic":
				$sql .= "( cite_id, owner_id, trophic_interaction_id, location_id, lethality,";
				$sql .= "structures_consumed,percentage_consumed, percentage_diet, percentage_diet_by, ";
				$sql .= "preference, observation_type, comment, datum) ";
				$sql .= " VALUES ( ". $db->quote( $_GET['cite_id'] ) . ",";
				$sql .=  $db->quote( $user['id']) . ",";
				$sql .=  $db->quote( $_GET['interaction_id'] ) . ",";
				$sql .=  $db->quote( $_GET['location_id'] ) . ",";
				$sql .=  $db->quote( $_GET['lethality'] ) . ",";
				$sql .=  $db->quote( $_GET['structures_consumed'] ) . ",";
				if ( empty($_GET['percentage_consumed']) )
					$sql .=  "NULL,";
				else
					$sql .=  $db->quote( $_GET['percentage_consumed'] ) . ",";
				if ( empty($_GET['percentage_diet']) )
					$sql .=  "NULL,";
				else
					$sql .=  $db->quote( $_GET['percentage_diet'] ) . ",";
				if ( empty($_GET['percentage_diet_by']) )
					$sql .=  "NULL,";
				else
					$sql .=  $db->quote( $_GET['percentage_diet_by'] ) . ",";
	
				$sql .=  $db->quote( $_GET['preference'] ) . ",";
				$sql .=  $db->quote( $_GET['observation_type'] ) . ",";
				break;
			case "facilitation":
				$sql .= "( cite_id, owner_id, facilitation_interaction_id, location_id,";
				$sql .= "facilitation_type, observation_type, comment, datum ) ";
				$sql .= " VALUES ( ". $db->quote( $_GET['cite_id'] ) . ",";
				$sql .=  $db->quote( $user['id']) . ",";
				$sql .=  $db->quote( $_GET['interaction_id'] ) . ",";
				$sql .=  $db->quote( $_GET['location_id'] ) . ",";
				$sql .=  $db->quote( $_GET['facilitation_type'] ) . ",";
				$sql .=  $db->quote( $_GET['observation_type'] ) . ",";
			break;
			case "competition":
				$sql .= "( cite_id, owner_id, competition_interaction_id, location_id,";
				$sql .= "competition_type, observation_type, comment, datum) ";
				$sql .= " VALUES ( ". $db->quote( $_GET['cite_id'] ) . ",";
				$sql .=  $db->quote( $user['id']) . ",";
				$sql .=  $db->quote( $_GET['interaction_id'] ) . ",";
				$sql .=  $db->quote( $_GET['location_id'] ) . ",";
				$sql .=  $db->quote( $_GET['competition_type'] ) . ",";
				$sql .=  $db->quote( $_GET['observation_type'] ) . ",";
				break;
			case "parasitic":
				$sql .= "( cite_id, owner_id, parasitic_interaction_id, location_id,";
				$sql .= "endo_ecto, lethality, prevalence, intensity,  parasite_type, observation_type, comment, datum) ";
				$sql .= " VALUES ( ". $db->quote( $_GET['cite_id'] ) . ",";
				$sql .=  $db->quote( $user['id']) . ",";
				$sql .=  $db->quote( $_GET['interaction_id'] ) . ",";
				$sql .=  $db->quote( $_GET['location_id'] ) . ",";
				$sql .=  $db->quote( $_GET['endo_ecto'] ) . ",";
				$sql .=  $db->quote( $_GET['lethality'] ) . ",";
				$sql .=  $db->quote( $_GET['prevalence'] ) . ",";
				$sql .=  $db->quote( $_GET['intensity'] ) . ",";
				$sql .=  $db->quote( $_GET['parasite_type'] ) . ",";
				$sql .=  $db->quote( $_GET['observation_type'] ) . ",";
				break;
			default:
				break;
			}

			if ( empty($_GET['comment']) ) $sql .=  "NULL,";
			else $sql .=  $db->quote( $_GET['comment'] ) . ",";
			if ( empty($_GET['datum']) ) $sql .=  "NULL )";
			else $sql .=  $db->quote( $_GET['datum'] ) . ")";
	
			$result = $db->query($sql);
			if(DB::isError($result)) { 
				$response['error'] = $result->getMessage();
				$response['sql'] = $sql;
			} else { 
				$response = $_GET;
			}	
			echo json_encode( $response );
			break;
		// add stages to a node, return the node
		case "addNewStages":
			if (isset( $_GET['node_id'] ) && isset( $_GET['stage_names'] )){
				$response =Array();
				$stage_names = explode(",", $_GET['stage_names'] );
				if (!canWrite($user) ) { error("No permissions to add New Stage."); }
				foreach ($stage_names as $stage_name) {
					$sql = "INSERT into stages  ( node_id, name, owner_id) VALUES (";
					$sql .= $db->quote( $_GET['node_id'] ) . ", " . $db->quote($stage_name) . ", ". $db->quote($user['id']) .  ")";
					$result = $db->query($sql);
					if(db::iserror($result)) { 
						$response['error'] = $result->getmessage();
						$response['sql'] = $sql;
					} //else { 
						//$stage = $db->getrow( "SELECT * from stages WHERE id=last_insert_id()" );
						//$response[ $stage_name ] = getStage($stage);
					//}	
				}
				if (!isset( $response['error'] ) )
					$response = getNodeItems();
				echo json_encode( $response );
			} else {
				error("No node_id or stage_names given, need both.");
			}	
			break;
		case "addNewStage":
			if (isset( $_GET['node_id'] ) && isset( $_GET['stage_name'] )){
				$response =Array();
				if (!canWrite($user) ) { error("No permissions to add New Stage."); }
				$sql = "INSERT into stages  ( node_id, name, owner_id) VALUES (";
				$sql .= $db->quote( $_GET['node_id'] ) . ", " . $db->quote($_GET['stage_name']) . ", ". $db->quote($user['id']) .  ")";
				$result = $db->query($sql);
				if(db::iserror($result)) { 
					$response['error'] = $result->getmessage();
					$response['sql'] = $sql;
				} else { 
					$stage = $db->getrow( "SELECT * from stages WHERE id=last_insert_id()" );
					$response = getStage($stage);
				}	
				echo json_encode( $response );
			} else {
				error("no node_id or stage_name given, need both.");
			}	
			break;
		case "addNewCitedVar":
			if ( !isset( $_GET['table']) ) error("you must provide table name for citation data");
			if ( !isset( $_GET['fields']) ) error("you must provide field names for citation data");
			if ( !isset( $_GET['values']) ) error("you must provide values for citation data");
			if ( !isset( $_GET['cite_id']) ) error("you must provide cite_id for citation data");
			if ( !isset( $_GET['node_id']) AND !isset( $_GET['stage_id']) ) error("you must provide either a node_id or stage_id for citation data");
			if (!canWrite($user) ) { error("No permissions to add Cited Variable."); }
			$foreign_ptr="node_id";
			if ( isset( $_GET['stage_id'])) {	$foreign_ptr="stage_id"; }
			$sql = "INSERT into " .$_GET['table'] . " ( cite_id, owner_id, ". $foreign_ptr;
			if ( isset( $_GET['comment']) ) $sql .= ", comment";
			if ( isset( $_GET['datum']) )   $sql .= ", datum";
			foreach( $_GET['fields'] as $f ) { $sql .= ', ' . $f;	}
			$sql .= ") VALUES ( " . $db->quote($_GET['cite_id']) . ', ' . $db->quote($user['id']) .', '. $db->quote($_GET[$foreign_ptr]);
			if ( isset( $_GET['comment']) ) $sql .=  "," . $db->quote($_GET['comment']);
			if ( isset( $_GET['datum']) ) $sql .=  "," . $db->quote($_GET['datum']);
			foreach( $_GET['values'] as $v ) { $sql .= ', '. $db->quote($v);	}
				$sql .= ")";
			$result = $db->query($sql);
			if(DB::IsError($result)) { 
				$tmp = Array();
				$tmp['error'] = $result->getMessage();
				$tmp['sql'] = $sql;
				echo json_encode( $tmp );
			} else { 
				$tmp = Array();
				$values = getValues($_GET['table'], $foreign_ptr, $_GET[$foreign_ptr], $foreign_ptr ) ;	
				$tmp[$_GET['table']] = $values;
				echo json_encode( $tmp );
			}
			break;
	
		case "addNewCitedVars":
			if ( empty( $_GET['json']) ) {  
				error("you must provide citation data");
			}
			if (!canWrite($user) ) { error("No permissions to add Cited Variable."); }
			$request =  $_GET['json'] ;
			$response = Array ( );
			foreach ($request as $req) {
				$foreign_ptr="node_id";
				if ( isset( $req['stage_id'])) {	$foreign_ptr="stage_id"; }
				$sql = "INSERT into " .$req['table'] . " ( cite_id, owner_id, ". $foreign_ptr;
				foreach( $req['fields'] as $f ) { $sql .= ', ' . $f;	}
				$sql .= ") VALUES ( " . $db->quote($req['cite_id']) . ', ' . $db->quote($user['id']) .', '. $db->quote($req[$foreign_ptr]);
				foreach( $req['values'] as $v ) { $sql .= ', '. $db->quote($v);	}
				$sql .= ")";
				$result = $db->query($sql);
				if(DB::IsError($result)) { 
					$tmp = Array();
					$tmp['error'] = $result->getMessage();
					$tmp['sql'] = $sql;
					array_push($response, $tmp);
				} else { 
					$tmp = Array();
					$values = getValues($req['table'], $foreign_ptr, $req[$foreign_ptr], $foreign_ptr ) ;	
					$tmp[$req['table']] = $values;
					array_push($response, $tmp);
				}
			}
			echo json_encode( $response );
			break;
	
		case "updateTable":
			$response = Array();
			if ( isset( $_GET['table_name']) &&  isset( $_GET['fields']) && isset( $_GET['values'])  && isset( $_GET['id'])  ) {

				if (!canModify($user,  $_GET['table_name'], "id",  $_GET['id']) ) {
						error("No permissions to modify this table" . $_GET['table_name'] .":id:". $_GET['id']);
				}

			  $sql = "UPDATE " . $_GET['table_name'] . " SET ";
				for($i=0; $i < count($_GET['fields']);$i++) {	
					if ($i >0) $sql .= ", ";
					$sql .=  $_GET['fields'][$i]	. "=" . $db->quote($_GET['values'][$i]); 
				}
				$sql .= " WHERE id=" . $db->quote( $_GET['id'] );
				$result = $db->query($sql);
				if(DB::IsError($result)) { 
					$response['error'] = $result->getMessage();
					$response['sql'] = $sql;
				} 
			}else{
				$response['error'] = "Need more variables to update " . $_GET['table_name'];
			}
		  echo json_encode( $response );
			break;
		default:
			break;
	}


}


?>
