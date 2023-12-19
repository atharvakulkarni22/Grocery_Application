<?php
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the zip code and month from the request
$zipCode = $_POST['zip'];
$specificMonth = $_POST['month'];

// Format the date in 'YYYY-MM-DD' format
//$formattedDate = date('Y-m-d', strtotime($specificMonth));
//$formattedDate = date('m', strtotime($specificMonth));

// Query to select customers with more than 2 transactions in the specified month and zip code
$sql = "SELECT
c.CustomerID,
c.FirstName,
c.LastName,
COUNT(DISTINCT t.TransactionID) as TransactionCount
FROM
customers c
JOIN
carts ct ON c.CustomerID = ct.CustomerID
JOIN
transactions t ON ct.TransactionID = t.TransactionID
WHERE
c.Address LIKE '%$zipCode%' AND DATE(t.TransactionDate) = '$specificMonth'
GROUP BY
c.CustomerID
HAVING
TransactionCount > 2";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $customersData = array();

    // Fetch each row and store it in the $customersData array
    while($row = $result->fetch_assoc()) {
        $customersData[] = $row;
    }

    // Output the customers data as JSON
    header('Content-Type: application/json');
    echo json_encode($customersData);
} else {
    // No customers found with more than 2 transactions in the specified month and zip code
    echo json_encode(array('message' => 'No customers found.'));
}

// Close the database connection
$conn->close();

?>
