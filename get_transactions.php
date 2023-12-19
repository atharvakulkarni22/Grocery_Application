<?php
$servername = "localhost";
$username = "root";
$password = "atharva";
$dbname = "grocery";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$customerID = $_POST['customerID'];
$flag = $_POST['flag'];

if ($flag == 0) {
    $sql = "SELECT * FROM transactions WHERE CustomerID = '$customerID' AND TransactionDate >= DATE_SUB(NOW(), INTERVAL 3 MONTH);";
    $result = $conn->query($sql);
    
    $transactions = array();
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $transactions[] = $row;
        }
    }
    
} else if ($flag == 1) {
    $sql = "SELECT * FROM transactions WHERE CustomerID = '$customerID' AND TransactionDate >= DATE_SUB(NOW(), INTERVAL 1 YEAR);";
    $result = $conn->query($sql);
    
    $transactions = array();
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $transactions[] = $row;
        }
    }
    
}

// Fetch transactions from the database

// Close the database connection
$conn->close();

// Return JSON-encoded array of transactions
header('Content-Type: application/json');
echo json_encode($transactions);
?>