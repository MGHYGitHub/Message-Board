<?php

session_start(); // 启动会话


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
$username = $data['username'];
$password = $data['password'];

// 验证用户名和密码的逻辑
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // 用户存在，验证密码
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        // 登录成功
        $_SESSION['user_id'] = $row['id']; // 将用户 ID 存储在会话中
        $response['success'] = true;
    } else {
        $response['message'] = '密码不正确';
    }
} else {
    $response['message'] = '用户不存在';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
