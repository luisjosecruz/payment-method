<?php 

require_once("config/env.php");
require_once("config/db.php");
require_once("config/token.php");

(new Env())->load();

$conn = (new Database())->getConnection();

$token = (new Token())->getToken();

?>