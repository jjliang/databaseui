<?php 
/////////////////////////////////////////////////////////////////////////////
//
// AUTHENTICATE PAGE
//
//   Server-side:
//     1. Get the challenge from the user session
//     2. Get the password for the supplied user (local lookup)
//     3. Compute expected_response = MD5(challenge+password)
//     4. If expected_response == supplied response:
//        4.1. Mark session as authenticated and forward to secret.php
//        4.2. Otherwise, authentication failed. Go back to login.php
//////////////////////////////////////////////////////////////////////////////////
require_once("connect.php");

function getPasswordForUser($username) {
	global $db;
	$res = $db->getRow( "SELECT * FROM users WHERE email=". $db->quote($username) );  
	if(DB::IsError($res)) { 
		return $res->getMessage() ;
	} else {
		return $res['password'];
	}
} 

function validate($challenge, $response, $password) {
	return md5($challenge . $password) == $response;
} 

function authenticate() {
	if (isset($_SESSION['challenge']) &&
			isset($_REQUEST['username']) &&
			isset($_REQUEST['response'])) {
		$password = getPasswordForUser($_REQUEST['username']);
		//echo $_REQUEST[username] . ":". $password;
		//exit();
		if (validate($_SESSION['challenge'], $_REQUEST['response'], $password)) {
			$_SESSION['authenticated'] = "yes";
			$_SESSION['username'] = $_REQUEST['username'];;
			unset($_SESSION['challenge']);
		} else {
			header("Location:login.php?error=".urlencode("Failed authentication"));
			exit;
		}
	} else {
		header("Location:login.php?error=".urlencode("Session expired"));
		exit;
	}
}

session_start();
authenticate();
header("Location:index.php");
exit();
?>

