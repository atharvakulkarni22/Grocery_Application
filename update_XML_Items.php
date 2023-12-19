<?php

$productName = $_POST['productName'];
$quantityChange = intval($_POST['quantityChange']);

$xmlFile = 'listitems.xml'; 
$xml = simplexml_load_file($xmlFile);

foreach ($xml->items as $item) {
    if ($item->tag == $productName) {
        $item->max = intval($item->max) - $quantityChange;
        break; 
    }
}

$xml->asXML($xmlFile);

echo 'XML file updated successfully';
?>