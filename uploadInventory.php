<?php

$host = "localhost";
$dbname = "grocery";
$username = "root";
$password = "atharva";

$connection = mysqli_connect($host, $username, $password, $dbname);

$file = $_FILES['file'];
$fileType = $_POST['fileType'];

// $uploadDir = 'uploads/';
// $targetFile = $uploadDir . basename($file['name']);
// $response = array();
// $response[] = $targetFile;
// header('Content-Type: application/json');
// echo json_encode($response);

//Check if a file is uploaded
$nextItemNo = "";
if ($file) {
    // $file = $data->file;
    // $fileType = $data->fileType;

    $uploadDir = 'uploads/';
    $targetFile = $uploadDir . basename($file['name']);
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        $sql = "SELECT COUNT(ItemNumber) AS count FROM inventory";
        $result = $connection->query($sql);
        $nextItemNo = $result->fetch_assoc()['count'];
        if ($fileType == 'xml') {
            $response = handleXMLFile($targetFile, $connection, $nextItemNo);
        } elseif ($fileType == 'json') {
            $response = handleJSONFile($targetFile, $connection, $nextItemNo);
        }

        // $response['success'] = true;
        // $response['message'] = 'File uploaded and inventory updated successfully';
    } else {
        $response['success'] = false;
        $response['message'] = 'Error uploading file';
    }
} else {
    $response['success'] = false;
    $response['message'] = 'No file uploaded';
}

//Function to handle XML file
function handleXMLFile($filePath, $connection, $nextItemNo) {
    
    if (file_exists($filePath)) {
        $xml = simplexml_load_file($filePath);
        foreach ($xml->item as $item) {
            $name = (string)$item->name;
            $category = (string)$item->category;
            $subcategory = (string)$item->subcategory;
            $price = (float)$item->price;
            $quantity = (int)$item->quantity;
            $image = (string)$item->image;
            $nextItemNo++;
            $nextItemNo = updateInventory($nextItemNo, $name, $category, $subcategory, $price, $quantity, $image, $connection);
        }
    }
    return $nextItemNo;
}


//Function to handle JSON file
function handleJSONFile($filePath, $connection, $nextItemNo) {
    if (file_exists($filePath)) {
        $jsonContent = file_get_contents($filePath);
        $jsonData = json_decode($jsonContent, true);
        foreach ($jsonData['products'] as $item) {
            $name = (string)$item['name'];
            $category = (string)$item['category'];
            $subcategory = (string)$item['subcategory'];
            $price = (float)$item['price'];
            $quantity = (int)$item['quantity'];
            $image = (string)$item['image'];
            $nextItemNo++;
            $nextItemNo = updateInventory($nextItemNo, $name, $category, $subcategory, $price, $quantity, $image, $connection);
        }
    }
    return $nextItemNo;
}

function updateInventory($itemNo, $name, $category, $subcategory, $price, $quantity, $image, $connection) {
    $sql = "SELECT Quantity FROM inventory WHERE Name = '$name'";
    $result = $connection->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $oldQuantity = $row['Quantity'];
        $newQuantity = (int)$oldQuantity + (int)$quantity;
        $query = "UPDATE inventory SET Category = '$category', Subcategory = '$subcategory', UnitPrice = '$price', Quantity = '$newQuantity', Image = '$image' WHERE Name = '$name'"; 
        $updateResult = $connection->query($query);
        $itemNo--;
    }
    else {
        $query = "INSERT INTO inventory (ItemNumber, Name, Category, Subcategory, UnitPrice, Quantity, Image) 
          VALUES ('$itemNo', '$name', '$category', '$subcategory', '$price', '$quantity', '$image')";
        $insertResult = $connection->query($query);
    }
    return $itemNo;
}

// function getNextItemNo($connection) {
//     $query = "SELECT COUNT(*) AS rowCount FROM inventory";
//     $result = mysqli_query($connection, $query);
//     $row = mysqli_fetch_assoc($result);
//     $rowCount = $row['rowCount'];
//     return $rowCount + 1;
// }
header('Content-Type: application/json');
echo json_encode($response);

mysqli_close($connection);
?>
