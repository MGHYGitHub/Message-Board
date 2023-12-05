<?php
session_start(); // 启动会话

// 检查用户是否已登录（具有活动会话）
if (!isset($_SESSION['user_id'])) {
    // 用户未经身份验证，重定向到登录页面
    header("Location: login.html");
    exit();
}

// 检查用户登录时间戳
if (isset($_SESSION['last_login_timestamp'])) {
    $max_session_duration = 300; // 5分钟，单位秒
    $current_timestamp = time();

    // 如果距离上次登录超过规定时间，要求用户重新登录
    if ($current_timestamp - $_SESSION['last_login_timestamp'] > $max_session_duration) {
        // 清除会话数据
        session_unset();
        session_destroy();
        
        // 重定向到登录页面
        header("Location: login.html");
        exit();
    }
}

// 更新用户登录时间戳
$_SESSION['last_login_timestamp'] = time();

// 在这里继续处理用户已登录的情况
?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style2.css">
    <title>管理面板</title>
</head>
<body>
    <div class="right-align">
        <a href="login.html" class="common-btn">注册</a>
        <a href="index.html" class="common-btn">首页</a>
    </div>
    <h1>留言板</h1>
    <table id="messageTable">
        <!-- 表格内容将通过 JavaScript 动态生成 -->
    </table>
    <script src="./js/messageTableManager.js"></script>
</body>
</html>
