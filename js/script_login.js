document.addEventListener('DOMContentLoaded', function () {
    // 获取输入框元素
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const keyInput = document.getElementById('key');

    // 添加登录按钮点击事件
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', login);

    // 添加注册按钮点击事件
    const registerButton = document.getElementById('registerButton');
    registerButton.addEventListener('click', register);

    // 监听键盘事件
    usernameInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    passwordInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            login();
        }
    });

    keyInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            register();
        }
    });
});

function getFormValues() {
    // 获取用户名、密码和密钥的值
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const key = document.getElementById('key').value;

    return { username, password, key };
}

function login() {
    const { username, password, key } = getFormValues();

    // 向后端发送登录请求
    fetch('../php/login_backend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, key }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('登录成功');
            // 在这里添加页面跳转的代码
            window.location.href = '../admin.php';
        } else {
            alert('登录失败');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function register() {
    const { username, password, key } = getFormValues();

    // 向后端发送注册请求
    fetch('../php/register_backend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, key }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('注册成功');
            // 在这里添加页面跳转的代码
            window.location.href = '../admin.php';
        } else {
            alert('注册失败,您输入的密钥不正确');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
