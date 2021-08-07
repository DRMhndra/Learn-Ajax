<?php
  if(!isset($_POST['id']) && !isset($_POST['method'])) {
      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $jsonData = file_get_contents('testing.json');
        // echo $jsonData;

        $requestPayload = file_get_contents('php://input');
        $object = json_decode($requestPayload, true);

        $tempJson = json_decode($jsonData);
        
        array_push($tempJson, $object);
        // var_dump($tempJson);
        $jsontest = json_encode($tempJson);

        file_put_contents('testing.json', $jsontest);
        echo $jsontest;
      } else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $jsonData = file_get_contents('testing.json');
        $temp = json_decode($jsonData);

        $requestPayload = file_get_contents('php://input');
        $object = json_decode($requestPayload, true);
        $tempId = (int) $object['id'];
        $object['id'] = $tempId;

        foreach ($temp as $key => $value) {
          if ($value->id == $tempId) {
            $temp[$key] = $object;
          }
        }
        $hasil = json_encode($temp);
        file_put_contents('testing.json', $hasil);
        echo $hasil;
      } else {
        $jsonData = file_get_contents('testing.json');
        $temp = json_decode($jsonData);

        $requestPayload = file_get_contents('php://input');
        $tempDelete = json_decode($requestPayload, true);
        $tempDelete = (int) $tempDelete['id'];

        foreach ($temp as $key => $value) {
          if ($value->id == $tempDelete) {
            array_splice($temp, $key, 1);
          }
        }

        $hasil = json_encode($temp);
        file_put_contents('testing.json', $hasil);
        echo $hasil;
      }
  } else {
    if($_POST['method'] == 'Edit') {
      $jsonData = file_get_contents('testing.json');
      $jsonDecode = json_decode($jsonData, true);
      $idBlogs = (int)$_POST['id'];

      foreach ($jsonDecode as $data ) {
        if(in_array($idBlogs, $data)) {
          $encode = json_encode($data);
          echo $encode;
        }
      }
    } else {
      // echo "ini dari Delete";
      $jsonData = file_get_contents('testing.json');
      $jsonDecode = json_decode($jsonData, true);
      $idBlogs = (int)$_POST['id'];

      foreach ($jsonDecode as $data ) {
        if(in_array($idBlogs, $data)) {
          $encode = json_encode($data);
          echo $encode;
        }
      }
    }
  }