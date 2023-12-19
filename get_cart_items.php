<?php
$servername = "localhost";
$username = "root";
$password = "atharva";
$dbname = "grocery";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the transactionId from the query string
$transactionId = $_POST['transactionId'];

// Fetch cart items for the specified transactionId
$sql = "SELECT * FROM carts WHERE TransactionID = $transactionId";
$result = $conn->query($sql);

$cartItems = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return JSON-encoded array of cart items
header('Content-Type: application/json');
echo json_encode($cartItems);
?>