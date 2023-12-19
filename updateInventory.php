<?php
error_reporting(E_ALL);
echo "Script is called!";
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "atharva";
$dbname = "grocery";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$item_number = $_POST['itemNumber'];
$quantity = $_POST['quantity'];

$item_number = mysqli_real_escape_string($conn, $item_number);

$stmt = $conn->prepare("UPDATE inventory SET quantity = quantity - ? WHERE itemNumber = ?");
$stmt->bind_param("ii", $quantity, $item_number);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo "Success";
} else {
    echo "No rows updated";
}

$stmt->close();
$conn->close();
?>