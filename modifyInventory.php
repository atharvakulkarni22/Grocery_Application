<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$itemNo = $_POST['itemNo'];
$price = $_POST['price'];
$quantity = $_POST['quantity'];

$sql = "UPDATE inventory SET UnitPrice = '$price', Quantity = '$quantity' WHERE ItemNumber = '$itemNo'";

$result = $conn->query($sql);
if ($result === true) {
    $response['success'] = true;
    $response['message'] = "Update successful!";
}
else {
    $response['success'] = false;
    $response['message'] = "Error updating record: " . $conn->error;
}
header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
