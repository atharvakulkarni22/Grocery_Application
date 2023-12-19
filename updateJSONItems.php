<?php
echo 'Inside update json php file';
$jsonFile = 'jsonitems.json';
$jsonData = file_get_contents($jsonFile);

$data = json_decode($jsonData, true);

$productName = $_POST['productName'];
$quantityChange = intval($_POST['quantityChange']);

foreach ($data['items'] as &$item) {
    if ($item['name'] === $productName) {
        $item['max'] -= $quantityChange;
        break;
    }
}

$updatedJsonData = json_encode($data, JSON_PRETTY_PRINT);

file_put_contents($jsonFile, $updatedJsonData);

echo 'JSON file updated successfully';
?>