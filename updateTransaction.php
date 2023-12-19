<?php

error_reporting(E_ALL);
echo "Script is called!";
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "atharva";
$dbname = "grocery";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$transactionID = $_POST['transactionID'];
$transactionStatus = $_POST['transactionStatus'];

// Sanitize input (optional, but recommended)
$transactionID = mysqli_real_escape_string($conn, $transactionID);
$transactionStatus = mysqli_real_escape_string($conn, $transactionStatus);

$sql = "UPDATE transactions SET TransactionStatus = '$transactionStatus' WHERE TransactionId = '$transactionID';";

$result = $conn->query($sql);
if ($result === TRUE) {
    echo "Success";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>