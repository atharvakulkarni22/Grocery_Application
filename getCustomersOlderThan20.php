<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT c.CustomerID, c.FirstName, c.LastName, COUNT(DISTINCT t.TransactionID) AS TransactionCount
FROM customers c
JOIN carts ct ON c.CustomerID = ct.CustomerID
JOIN transactions t ON ct.TransactionID = t.TransactionID
WHERE c.Age > 20
GROUP BY c.CustomerID, c.FirstName, c.LastName
HAVING TransactionCount > 3";

$result = $conn->query($sql);

$customersData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $customersData[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($customersData);

$conn->close();
?>