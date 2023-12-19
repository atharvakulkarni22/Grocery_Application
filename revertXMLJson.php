<?php

$productNames = $_POST['productName'];
$quantityChanges = $_POST['quantityChange'];

$xmlFile = 'listitems.xml'; 
$xml = simplexml_load_file($xmlFile);

foreach ($xml->items as $item) {
    $productName = (string)$item->tag;
    echo $productName;
    $index = array_search($productName, $productNames);

    if ($index !== false) {
        $quantityChange = intval($quantityChanges[$index]);
        $item->max = intval($item->max) + $quantityChange;
    }
}

$xml->asXML($xmlFile);

$jsonFile = 'jsonitems.json';
$jsonData = file_get_contents($jsonFile);
$data = json_decode($jsonData, true);

foreach ($data['items'] as &$item) {
    $productName = $item['name'];
    $index = array_search($productName, $productNames);

    if ($index !== false) {
        $quantityChange = intval($quantityChanges[$index]);
        $item['max'] += $quantityChange;
    }
}

$updatedJsonData = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents($jsonFile, $updatedJsonData);

echo 'XML and JSON files updated successfully';
?>