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
$quantity = $_POST['quantity'];
$cartStatus = $_POST['cartStatus'];
$flag = $_POST['flag'];

if ($flag == 0) {
    // $sql = "INSERT INTO carts (CustomerID, TransactionID, ItemNumber, Quantity, CartStatus) VALUES ('$customerID', '$transactionID', '$itemNumber', '$quantity', '$cartStatus');";

    // $result = $conn->query($sql);
    // if ($result === TRUE) {
    // echo "Success";
    // } else {
    //     echo "Error: " . $sql . "<br>" . $conn->error;
    // }

    // Check if the item already exists in the cart for the current user
    $queryCartCheck = "SELECT Quantity,CartStatus FROM carts WHERE CustomerID = '$customerID' AND TransactionID = '$transactionID' AND ItemNumber = $itemNumber";
    $result = $conn->query($queryCartCheck);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $cartstatus = $row['CartStatus'];
        // If the item exists for the current user, update the quantity
        if($cartstatus == "In Cart") {
            $queryCartUpdate = "UPDATE carts SET Quantity = '$quantity' WHERE CustomerID = '$customerID' AND TransactionID = '$transactionID' AND ItemNumber = '$itemNumber'";
            $result = $conn->query($queryCartUpdate);
        }
        else {
        // If the item does not exist or cartStatus is cancelled for the current user, insert a new record
            $queryCartInsert = "INSERT INTO carts (CustomerID, TransactionID, ItemNumber, Quantity, CartStatus) VALUES ('$customerID', '$transactionID', '$itemNumber', '$quantity', '$cartStatus')";
            $result = $conn->query($queryCartInsert);
            if ($result === TRUE) {
                echo "Success";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        }
    } else {
        // If the item does not exist or cartStatus is cancelled for the current user, insert a new record
        $queryCartInsert = "INSERT INTO carts (CustomerID, TransactionID, ItemNumber, Quantity, CartStatus) VALUES ('$customerID', '$transactionID', '$itemNumber', '$quantity', '$cartStatus')";
        $result = $conn->query($queryCartInsert);
        if ($result === TRUE) {
            echo "Success";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
} else {
    $sql = "UPDATE carts SET CartStatus = '$cartStatus' WHERE TransactionID = '$transactionID' AND CustomerID = '$customerID'";
    $result = $conn->query($sql);
    if ($result === TRUE) {
    echo "Success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}



$conn->close();
?>