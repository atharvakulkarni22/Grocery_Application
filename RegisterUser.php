<?php

$host = "localhost";
$user = "root";
$password = "atharva";
$database = "grocery";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function calculateAge($birthdate) {
    $today = new DateTime();
    $birthDate = DateTime::createFromFormat('m/d/Y', $birthdate);

    if ($birthDate === false) {
        // Handle invalid date format
        return "Invalid date format";
    }

    $age = $today->diff($birthDate)->y;
    return $age;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_POST["userName"];
    $password = $_POST["password"];
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $dob = $_POST["dob"];
    $email = $_POST["email"];
    $address = $_POST["address"];

    // Perform server-side validation if needed
    $age = calculateAge($dob);
    // Generate a unique CustomerID using UUID
    $customerID = random_int(1, 1000);

    // Insert data into Customers table
    $insertCustomerQuery = "INSERT INTO Customers (CustomerID, FirstName, LastName, Age, Email, Address) VALUES ('$customerID', '$firstName', '$lastName', '$age', '$email', '$address')";

    if ($conn->query($insertCustomerQuery) === TRUE) {
        // Use the same CustomerID for inserting into the Users table

        $insertUserQuery = "INSERT INTO Users (CustomerID, UserName, Password) VALUES ('$customerID', '$userName', '$password')";

        if ($conn->query($insertUserQuery) === TRUE) {
            echo "Registration successful!";
        } else {
            echo "Error inserting into Users table: " . $conn->error;

            // If an error occurs, you might want to consider rolling back the insertion into the Customers table
            $rollbackQuery = "DELETE FROM Customers WHERE CustomerID = '$customerID'";
            $conn->query($rollbackQuery);
        }
    } else {
        echo "Error inserting into Customers table: " . $conn->error;
    }

    $conn->close();
}

?>