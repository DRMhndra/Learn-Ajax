<?php 
  $requestPayload = file_get_contents('php://input');
  $object = json_decode($requestPayload, true);
  echo json_encode($object);