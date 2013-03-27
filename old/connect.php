<?
require_once("DB.php"); 

// --------  DATABASE CONFIGURE OPTIONS ---------------------------------------------- //

$DB_host    = "localhost";  // the hostname of the database server
$DB_port = 3306;
$DB_user    = "";           // the username to connect with
$DB_pass    = "";      // the user's password
$DB_dbName  = "kelpforest";         // the name of the database to connect to
$DB_dbType  = "mysql";           // the type of database server.

//----------- Connect to database ------------------------------------------------------//
$dsn = $DB_dbType . "://"               // Build a DSN string (Data Source Name)
. $DB_user . ":"                // Required by DB::connect()
. $DB_pass . "@" 
. $DB_host . ':' . $DB_port . "/" 
. $DB_dbName;

$db = DB::connect($dsn);                // connect to database
if (DB::isError($db)) {                 // Check for error at connect time
	//unset($_SESSION['is_logged_in']);
	//unset($_SESSION['username']);
	//unset($_SESSION['password']);
	echo $db->getMessage();             // Print out error message and exit 
	exit();
} else {
	//$_SESSION['is_logged_in'] = 1;
	$db->setFetchMode(DB_FETCHMODE_ASSOC);
}

?>
