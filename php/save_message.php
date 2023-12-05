<?php
header('Content-Type: application/json');

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
$name = $data['name'];
$message = $data['message'];

// 使用预备语句防止 SQL 注入
$stmt = $conn->prepare("INSERT INTO messages (name, message) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $message);

$response = ['success' => false, 'message' => '留言添加失败'];

if ($stmt->execute()) {
    $response = ['success' => true, 'message' => '留言添加成功'];
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
