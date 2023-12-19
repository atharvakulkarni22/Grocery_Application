<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// $data = json_decode(file_get_contents("php://input"));
// $flag = $data->flag;

// if($flag == 1)
//     $sql = "SELECT ItemNo, Name, Category, Subcategory, UnitPrice, Quantity FROM inventory WHERE Quantity < 1";

// Query to select all rows from the inventory table
$sql = "SELECT ItemNumber, Name, Category, Subcategory, UnitPrice, Quantity FROM inventory";

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

// Close the database connection
$conn->close();

?>
