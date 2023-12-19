<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT ItemNumber,Name,Category,Subcategory,UnitPrice,Quantity FROM inventory WHERE Quantity < 3";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $inventoryData = array();
    while($row = $result->fetch_assoc()) {
        $inventoryData[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($inventoryData);
} else {
    echo json_encode(array('message' => 'No inventory data available.'));
}

$conn->close();
?>
