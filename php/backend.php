<?php
// 数据库连接详细信息
$servername = "localhost";
$username = "test2_top";
$password = "test2_top";
$dbname = "test2_top";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE" && isset($_GET["id"])) {
    // 删除具有给定ID的消息
    $messageId = $_GET["id"];
    $sqlDelete = "DELETE FROM messages WHERE id = $messageId";
    $conn->query($sqlDelete);

    // 返回一个简单的 JSON 响应
    echo json_encode(["status" => "success"]);
    exit();
}

// Fetch all messages from the database
$sqlSelect = "SELECT * FROM messages";
$result = $conn->query($sqlSelect);

// Convert the result to JSON and echo it
$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);

// Close the connection
$conn->close();
?>
