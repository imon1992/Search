<?php
require_once '../DOU/SearchQuery.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $searchParams = json_decode($json);
    $url = array_shift($searchParams);
    $searchQuery = new searchQuery();
    $searchResponse = $searchQuery->search($url,$searchParams);
    $searchResponse = json_encode($searchResponse);
    echo $searchResponse;
}

