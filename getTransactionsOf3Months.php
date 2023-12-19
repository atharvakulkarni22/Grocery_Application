<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$customerID = $_POST['customerID'];

$sql = "SELECT DISTINCT t.TransactionID, t.TransactionStatus, t.TransactionDate, t.TotalPrice
FROM transactions t
JOIN carts ct ON t.TransactionID = ct.TransactionID
WHERE ct.CustomerID = '$customerID' AND TransactionDate >= DATE_SUB(NOW(), INTERVAL 3 MONTH)";

$result = $conn->query($sql);
$transactions = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($transactions);
}
else {
    // No customers found with more than 2 transactions in the specified month and zip code
    echo json_encode(array('message' => 'No transactions found.'));
}
$conn->close();
?>