<?php 

require_once("bootstrap.php");

echo getToken();

// Getting the api token
function getToken() {
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://id.wompi.sv/connect/token",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "grant_type=client_credentials&client_id=".getenv('APP_ID')."&client_secret=".getenv('API_SECRET')."&audience=".getenv('APP_ID'),
    CURLOPT_HTTPHEADER => array(
      "content-type: application/x-www-form-urlencoded"
    ),
  ));
  
  $response = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);
  
  return ($err) ? "cURL Error #:" . $err : $response;
}

?>