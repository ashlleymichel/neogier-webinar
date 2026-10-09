<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$input = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

$limits = [
    'nome' => 150,
    'empresa' => 150,
    'email' => 254,
    'cargo' => 150,
    'pergunta' => 2000,
];

$payload = [];
foreach ($limits as $field => $limit) {
    if (isset($input[$field]) && !is_string($input[$field])) {
        http_response_code(400);
        echo json_encode(['ok' => false]);
        exit;
    }

    $value = trim((string) ($input[$field] ?? ''));
    if (mb_strlen($value, 'UTF-8') > $limit) {
        http_response_code(400);
        echo json_encode(['ok' => false]);
        exit;
    }
    $payload[$field] = $value;
}

$id = (string) ($input['id'] ?? '');
$validEmail = filter_var($payload['email'], FILTER_VALIDATE_EMAIL) !== false;
$validId = preg_match('/^[a-f0-9-]{36}$/i', $id) === 1;

if ($payload['nome'] === '' || $payload['empresa'] === '' || !$validEmail || !$validId) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

$payload['id'] = $id;
$endpoint = 'https://script.google.com/macros/s/AKfycbxU8iYtKHJxX1C_CDgNTKw5jQ5luL8HW0MjkV7cJeTS84TuGpiVrNRo3t7Matxe5WEiSg/exec';

$curl = curl_init($endpoint);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 25,
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
]);

$responseBody = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_errno($curl);
curl_close($curl);

$result = is_string($responseBody) ? json_decode($responseBody, true) : null;
$confirmed = $curlError === 0
    && $status >= 200
    && $status < 300
    && is_array($result)
    && ($result['ok'] ?? false) === true
    && ($result['id'] ?? '') === $id;

if (!$confirmed) {
    http_response_code(502);
    echo json_encode(['ok' => false]);
    exit;
}

echo json_encode(['ok' => true, 'id' => $id]);
