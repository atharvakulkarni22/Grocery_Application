<?php
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
$customerID = $_POST['customerID'];
$itemNumber = $_POST['itemNumber'];


    $sql = "UPDATE carts SET CartStatus = 'Cancelled' WHERE TransactionID = '$transactionID' AND CustomerID = '$customerID' AND ItemNumber = '$itemNumber'";
    $result = $conn->query($sql);
    if ($result === TRUE) {
    echo "Success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }



$conn->close();
?>