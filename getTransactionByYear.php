<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$year = $_POST['year'];
$customerID = $_POST['customerID'];

$sql = "SELECT DISTINCT t.TransactionID, t.TransactionStatus, t.TransactionDate, t.TotalPrice
FROM transactions t
JOIN carts ct ON t.TransactionID = ct.TransactionID
WHERE ct.CustomerID = '$customerID' AND YEAR(t.TransactionDate) = '$year'";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $transactions = array();
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($transactions);
}
else {
    echo json_encode(array('message' => 'No transactions found.'));
}
$conn->close();
?>