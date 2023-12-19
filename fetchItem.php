<?php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "atharva";
$dbname = "grocery";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$data = json_decode(file_get_contents("php://input"));
$itemName = $data->item;

// SQL query to fetch items based on item name
$sql = "SELECT * FROM inventory WHERE Name = '$itemName'";

// Execute the query
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();
    $response = array('ItemNumber' => $row['ItemNumber'], 'Name' => $row['Name'], 'Category' => $row['Category'], 'Subcategory' => $row['Subcategory'], 'UnitPrice' => $row['UnitPrice'], 'Quantity' => $row['Quantity'],);
    echo json_encode($response);

} else {
    echo "No results found for '$itemName'";
}

// Close the connection
$conn->close();
?>