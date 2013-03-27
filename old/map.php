<?php
require('DB.php');
$dbh = DB::connect("mysql://root:root@localhost:8889/kelpforest");
$default_table = "locations";
$default_data_table = "location_data";

$table = (!empty($_REQUEST['table'])) ? $_REQUEST['table']: $default_table;
$data_table = (!empty($_REQUEST['data_table'])) ? $_REQUEST['data_table']: $default_data_table;

function getRectWKT($bbox)
{
	list($left,$bottom,$right,$top) = explode(',',$bbox);
	return "POLYGON(($left $bottom, $left $top, $right $top, $right $bottom, $left $bottom))";
}

if ($_REQUEST['op'] == 'select_region') {
	$id = $_REQUEST['id'];
	$sql = "SELECT AsText(region) AS region, AsText(centroid) AS centroid FROM {$table} WHERE id = ?";
	$r = $dbh->getAll($sql,array($id),DB_FETCHMODE_ASSOC);
	print json_encode($r);
} else if ($_REQUEST['op'] == 'visible_regions') {
	$bbox = $_REQUEST['bbox'];
	$rect = getRectWKT($bbox);
	$zoom = $_REQUEST['zoom'];
	$ignore = isset($_REQUEST['exclude']) ? $_REQUEST['exclude'] : '';
	$sql = "SELECT AsText(region) AS region, AsText(centroid) AS centroid, z_index AS z_index, visible AS visible, parent AS parent,
					id AS id, AsText(Envelope(region)) AS envelope, zoom_min AS zoom_min, zoom_max AS zoom_max, lft AS rank
					FROM {$table}
					WHERE ( (zoom_min <= ? AND zoom_max >= ?)\n";
	if (isset($_REQUEST['exclude']) && count($ignore) > 0) {
		$qmrk = str_repeat('?,',count($ignore)-1).'?';
		$sql .= " AND id NOT IN ({$qmrk})\n";
	}
	$sql .= 	" AND MBRIntersects(GeomFromText(?),region) )";
	$p = (isset($_REQUEST['exclude']) && count($ignore) > 0) ? array_merge(array($zoom,$zoom),$ignore,array($rect)) : array($zoom,$zoom,$rect);
	$r = $dbh->getAll($sql,$p,DB_FETCHMODE_ASSOC);
	print json_encode($r);
} 
else if ($_REQUEST['op'] == 'get_children') {
	$id = (int)$_REQUEST['id'];
	$sql = "SELECT node.id AS id, node.name AS name, (COUNT(children.id) - 1) AS children,
		node.zoom_min AS zoom_min, node.zoom_max AS zoom_max, AsText(node.centroid) AS centroid, node.parent AS parent
		FROM {$table} AS node, {$table} as children
		WHERE children.lft BETWEEN node.lft AND node.rgt
		AND node.parent = ?
		AND node.visible = 1
		AND node.active = 1
		AND children.visible = 1
		AND children.active = 1
		GROUP BY node.id";

	$result = array();
	$res = $dbh->query($sql,array($id));
	while ($row = $res->fetchRow(DB_FETCHMODE_ASSOC)) {
		$result[] = array(
			"attr" => array("id" => "node_".$row['id']),
			"data" => $row['name'],
			"state" => ((int)$row['children'] >= 1) ? "closed" : "",
			"zoom_min" => $row['zoom_min'],
			'zoom_max' => $row['zoom_max'],
			"centroid" => $row['centroid'],
			'parent' => $row['parent']
		);
	}
	print json_encode($result);
}
else if ($_REQUEST['op'] == 'search') {
	$id = $_REQUEST['srch'];
	$sql = "SELECT DISTINCT found.id 
		FROM locations srch, locations found
		WHERE 0 OR (found.lft < srch.lft AND found.rgt > srch.rgt) 
		AND srch.id = ?
		AND srch.visible = 1
		AND srch.active = 1
		ORDER BY found.lft ASC";
	$sth = $dbh->query($sql,array($id));
	if (!DB::isError($sth))
	{
		$result = array();
		while ($row = $sth->fetchRow(DB_FETCHMODE_ARRAY)) {
			$result[] = "#node_".$row[0];
		}
		print json_encode($result);
	}
	else {
		print "[]";
	}
}
?>
