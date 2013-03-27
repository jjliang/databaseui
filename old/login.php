<?php 
/////////////////////////////////////////////////////////////////////////////
//
// LOGIN PAGE
//
//   Server-side:
//     1. Start a session
//     2. Clear the session
//     3. Generate a random challenge string
//     4. Save the challenge string in the session
//     5. Expose the challenge string to the page via a hidden input field
//
//  Client-side:
//     1. When the completes the form and clicks on Login button
//     2. Validate the form (i.e. verify that all the fields have been filled out)
//     3. Set the hidden response field to HEX(MD5(server-generated-challenge + user-supplied-password))
//     4. Submit the form
//////////////////////////////////////////////////////////////////////////////////
session_start();
session_unset();
srand();
$challenge = "";
for ($i = 0; $i < 80; $i++) {
	$challenge .= dechex(rand(0, 15));
}
$_SESSION['challenge'] = $challenge;
?>

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" >
<meta http-equiv="content-language" content="EN">
<meta name="Author" content="August Black">
<meta name="Publisher" content="August Black">

<title>FoodWeb Interaction Database</title>
<link type="text/css" href="css/custom-theme/jquery-ui-1.8.6.custom.css" rel="stylesheet" />	
<link type="text/css" href="css/kelpstyle.css" rel="stylesheet" />	
<script type="text/javascript" src="js/md5.js"></script>

<script type="text/javascript">

function login(e) {
	e = e || window.event;
	e.preventDefault();
	var loginForm = document.getElementById("loginForm");
	if (loginForm.username.value == "") {
		alert("Please enter your user name.");
		return false;
	}
	if (loginForm.password.value == "") {
		alert("Please enter your password.");
		return false;
	}
	var submitForm = document.getElementById("submitForm");
	submitForm.username.value = loginForm.username.value;
	submitForm.response.value = hex_md5(loginForm.challenge.value+loginForm.password.value);
	submitForm.submit();
}
</script>
</head>
<body>
<h1>Please Login</h1>
<form id="loginForm" onsubmit="login(event)">
<table>
<?php if (isset($_REQUEST['error'])) { ?>
	<tr>
		<td>Error</td>
		<td style="color: red;"><?php echo $_REQUEST['error']; ?></td>
		</tr>
		<?php } ?>
		<tr>
		<td>User Name (email):</td>
		<td><input type="text" name="username" /></td>
		</tr>
		<tr>
		<td>Password:</td>
		<td><input type="password" name="password" /></td>
		</tr>
		<tr>
		<td>&nbsp;</td>
		<td>
		<input type="hidden" name="challenge" value="<?php echo $challenge; ?>"/>
		<input type="submit" name="submit" style="width:auto;border:1px solid black;padding:2px 4px 2px 4px;border-radius: 6px 6px 6px 6px;" value="Login" />
		</td>
		</tr>
		</table>
		</form>
		<form id="submitForm" action="authenticate.php" method="post">
		<div>
		<input type="hidden" name="username"/>
		<input type="hidden" name="response"/>
		</div>
	</form>
</body>
</html>
