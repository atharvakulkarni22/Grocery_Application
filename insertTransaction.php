<?php
// Assuming you have a MySQL database connection
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

// Get product information from the POST request
$data = json_decode(file_get_contents("php://input"));
$price = $data->totalCost;
$transactionID = $data->transactionID;
$customerID = $data->customerID;

//echo "'$transactionID'";

// Start a transaction
$conn->begin_transaction();

if ($transactionID == 0) {
    $transactionID = random_int(1,1000);

    // Insert the item into the cart table (Assuming you have a 'cart' table with columns like 'userID', 'productID', 'quantity', etc.)
    $sqlInsertCart = "INSERT INTO Transactions (TransactionID, TransactionStatus, TransactionDate, TotalPrice, CustomerID) VALUES ('$transactionID', 'In Cart', NOW(), '$price', '$customerID')";
    $resultInsertCart = $conn->query($sqlInsertCart);
    
    // Check if the insertion was successful
    if ($resultInsertCart === TRUE) {
    
        // You can do additional processing here, update other tables, etc.
    
        // Commit the transaction
        $conn->commit();
    
        // Send the JSON response with the transaction ID
        $response = array('transactionID' => $transactionID);
    } else {
        // Rollback the transaction if an error occurred
        $conn->rollback();
    
        // Send an error response
        $response = array('error' => 'Error adding item to cart');
    }
} else {
    $sqlInsertCart = "UPDATE transactions SET TotalPrice = '$price' WHERE TransactionID = '$transactionID'";
    $resultInsertCart = $conn->query($sqlInsertCart);
    if ($resultInsertCart === TRUE) {
    
        // You can do additional processing here, update other tables, etc.
    
        // Commit the transaction
        $conn->commit();
        $response = array('transactionID' => $transactionID);
    } else {
        // Rollback the transaction if an error occurred
        $conn->rollback();
    
        // Send an error response
        $response = array('error' => 'Error adding item to cart');
    }
}

// Close the database connection
$conn->close();

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>