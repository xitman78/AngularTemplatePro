<?

header('Content-Type: application/json');

$params = json_decode(file_get_contents('php://input'),true);

$input = $params["json"];

$json = json_decode($input);

if(!is_array($json)) {
    echo json_encode("Error - not valid json array");
    exit;
}

$json_str = json_encode($json);

$res = file_put_contents("slides.json", $json_str);

if($res) {
    echo json_encode("ok");
    exit;
}
else {
    echo json_encode("Error - cannot write into file");
    exit;
}

?>