<?php
header('Content-Type: application/json');

// 固定的秘钥，用于注册
$fixedKey = "admin";

// 连接到数据库（请替换为您自己的数据库信息）
$servername = "localhost";
$username = "test2_top";
$password = "test2_top";
$dbname = "test2_top";

$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 获取前端传递的数据
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT); // 哈希密码
$providedKey = $data['key'];

$response = ['success' => false];

// 检查提供的秘钥是否匹配固定的秘钥
if ($providedKey === $fixedKey) {
    // TODO: 在这里执行注册逻辑，将用户信息插入到数据库中

    // 示例：假设注册成功
    if ($username && $password) {
        // 将用户信息插入到数据库中
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $password);

        if ($stmt->execute()) {
            $response['success'] = true;
        }
    }
} else {
    $response['message'] = '提供的秘钥不正确';
}

$conn->close();

echo json_encode($response);
?>
