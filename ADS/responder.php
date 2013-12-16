<?php
header("Content-Type: text/javascript; charset=UTF-8");
$callback = preg_replace("/[^A-Z0-9_]/i", "", $_GET["XSS_HTTP_REQUEST_CALLBACK"]);

ECHO "/* XSS request for callback: $callback */\n";

if ($callback)
	$date = date("r");
echo
<<<JSON
{$callback}({
	message: "response on {$date}"
});
JSON;
?>