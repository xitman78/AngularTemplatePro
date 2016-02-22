<?php

header('Content-Type: application/json');

$dir    = '../slides';

$files1 = scandir($dir);

$res_arr = array();

foreach( $files1 as $index => $filename ) {
    if(strpos($filename, '.') == 0) continue;
    array_push($res_arr, $filename);
}

echo json_encode($res_arr);

?>