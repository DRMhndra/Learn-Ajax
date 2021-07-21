<?php
  $jsonData = file_get_contents('testing.json');
  // echo $jsonData;

  $requestPayload = file_get_contents('php://input',true);
  $object = json_decode($requestPayload, true);

  $tempJson = json_decode($jsonData);
  
  array_push($tempJson, $object);
  // var_dump($tempJson);
  $jsontest = json_encode($tempJson);

  file_put_contents('testing.json', $jsontest);
  echo $jsontest;