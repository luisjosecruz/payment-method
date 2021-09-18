<?php 

define('ACCESS_TOKEN', $_POST['access_token']);

$data = $_POST;

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.wompi.sv/TransaccionCompra",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($data),
  CURLOPT_HTTPHEADER => array(
    "authorization: Bearer " . ACCESS_TOKEN,
    "content-type: application/json"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

//$data = json_decode($response, true);

echo $response;

?>