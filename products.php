<?php

// Connect to your MySQL database
$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$connection = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
} 

$stmt = mysqli_stmt_init($connection);

if (isset($_GET['category']) && isset($_GET['subcategory'])) {
    $category = $_GET['category'];
    $subcategory = $_GET['subcategory'];
    $query = "SELECT * FROM inventory WHERE Category = ? AND Subcategory = ?";
    if (!mysqli_stmt_prepare($stmt, $query)) {
        $error = array('error' => mysqli_error($connection));
        header('Content-Type: application/json');
        echo json_encode($error);
        exit;
    }
    mysqli_stmt_bind_param($stmt, "ss", $category, $subcategory);
} 
else {
    $category = $_GET['category'];
    $query = "SELECT * FROM inventory WHERE Category = ?";
    if (!mysqli_stmt_prepare($stmt, $query)) {
        $error = array('error' => mysqli_error($connection));
        header('Content-Type: application/json');
        echo json_encode($error);
        exit;
    }
    mysqli_stmt_bind_param($stmt, "s", $category);
}

$success = mysqli_stmt_execute($stmt);
if ($success) {
    $result = mysqli_stmt_get_result($stmt);
} else {
    $error = array('error' => mysqli_stmt_error($stmt));
    header('Content-Type: application/json');
    echo json_encode($error);
    exit;
}

// Fetch data and output as JSON
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Output JSON
header('Content-Type: application/json');
echo json_encode($data);

// Close the connection
mysqli_close($connection);

?>