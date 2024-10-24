<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:9000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json");

$headers = getallheaders();
error_log('Received headers: ' . print_r($headers, true));

$token = null;
if(isset($headers['Authorization'])){
    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);
}

error_log('Extracted token: ' . $token);

if($token) {
    if(verifyToken($token)) {
        echo json_encode([
          "user_id" => $user['id'],
          "first_name" => $user['first_name'],
          "last_name" => $user['last_name'],
          "email" => $user['email']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token']);
    }
} else {
    http_response_code(401);
    echo json_encode(['error' => 'No token provided']);
}

function verifyToken($token) {
    error_log('Verifying token: ' . $token);
    // Implement your token verification logic here
    // This is just a placeholder
    return $token === 'valid_token';
}
?>
