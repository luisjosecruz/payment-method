<?php 
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database Connection
$servername = "db-multidigitos-aurora-instance-1.culbrckcaj13.us-west-2.rds.amazonaws.com";
$username = "jburmester";
$password = "Soporte1*";
$dbname = "cuotta";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Metodo
$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($requestMethod) {
    case 'POST':
        $_POST = (array) json_decode(file_get_contents('php://input'), true);
        handlePost($_POST, $conn);
        echo "POST";
        break;
    case 'GET':
        getData($conn);
        break;
    default:
        echo "Default";
        break;
}

function handlePost($post, $conn){
    $cliente = $post['Cliente'];
    $aplicativo = $post['Aplicativo'];

    $nombre = $cliente['Nombre'];
    $email = $cliente['EMail'];
    $mandamiento = $cliente['Mandamiento'];
    $nombreAplicativo = $aplicativo['Nombre'];
    $fechaTransaccion = $post['FechaTransaccion'];
    $monto = $post['Monto'];
    $idTransaccion = $post['IdTransaccion'];

    // $fechaTrans = date('Y-m-d', strtotime(date($fechaTransaccion)));
    // $horaTrans = date('H:i:s', strtotime(date($fechaTransaccion)));

    $fechaTrans = "2021-09-16";
    $horaTrans = "15:21:00";

    //$json = json_encode($post);

    $query = "
        INSERT INTO abonos(
            movID, abonoCorr, abonoFecha, abonoHora, abonoSucursal, abonoBruto, mandCorrelativo, abonoUsuario
        ) VALUES (
            '101-02', '$idTransaccion', '$fechaTrans', '$horaTrans', '$nombreAplicativo', $monto, '$mandamiento', 'admin1'
        )
    ";

    if($conn->query($query)){
        echo "Done! ";
    }else{
        echo "Error! ". $query;
    }

    mysqli_close($conn);
}

function getData($conn){
    $query = "SELECT * FROM abonos";

    if($result = $conn->query($query)){
        while($row = mysqli_fetch_array($result)){
            echo $row['abonoID']." - ".$row['abonoBruto']." | ";
        }
    }else{
        echo "Error! ". $query;
    }
}
?>