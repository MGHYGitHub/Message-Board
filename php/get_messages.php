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

// 从数据库中获取留言
$sql = "SELECT name, message, UNIX_TIMESTAMP(message_date) as timestamp FROM messages";
$result = $conn->query($sql);

$messages = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

$conn->close();

echo json_encode($messages);
?>
