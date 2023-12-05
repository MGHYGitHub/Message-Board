document.addEventListener('DOMContentLoaded', function () {
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.getElementById('messages-container');

    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');

        const name = nameInput.value;
        const message = messageInput.value;

        if (name && message) {
            // 向后端发送留言数据
            saveMessage(name, message);

            // 清空表单
            nameInput.value = '';
            messageInput.value = '';
        } else {
            alert('请填写姓名和留言内容');
        }
    });

    // 从后端获取留言并显示
    fetchMessages();

    function saveMessage(name, message) {
        // 使用 fetch 向后端发送数据
        fetch('../php/save_message.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchMessages(); // 刷新留言列表
            } else {
                alert('留言保存失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function fetchMessages() {
        // 使用 fetch 从后端获取留言
        fetch('../php/get_messages.php')
            .then(response => response.json())
            .then(data => {
                // 显示第一页，每页显示 5 条留言（您可以根据需要调整）
                displayMessages(data, 5, 1);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // 在 fetchMessages 函数中
    function fetchMessages() {
        // 使用 fetch 从后端获取留言
        fetch('../php/get_messages.php')
            .then(response => response.json())
            .then(data => {
                // 显示第一页，每页显示 5 条留言
                displayMessages(data, 7, 1);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayMessages(messages, pageSize, currentPage) {
        // 清空原有留言
        messagesContainer.innerHTML = '';
    
        // 反转留言数组，以确保最新的留言在最前面显示
        messages.reverse();
    
        // 计算当前页的留言起始和结束索引
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
    
        // 显示当前页的留言
        const currentPageMessages = messages.slice(startIndex, endIndex);
        currentPageMessages.forEach(function (message) {
            const messageElement = document.createElement('div');
            const formattedTime = formatMessageTime(message.timestamp);
            messageElement.innerHTML = `<strong>${message.name}</strong> (${formattedTime}): ${message.message}`;
            messagesContainer.appendChild(messageElement);
        });
    
        // 创建分页导航
        const totalPages = Math.ceil(messages.length / pageSize);
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
    
        // 创建上一页按钮
        const prevButton = document.createElement('span');
        prevButton.innerHTML = '&lt;'; // 使用 HTML 实体表示“<”
        prevButton.style.cursor = 'pointer';
        prevButton.addEventListener('click', function () {
            const prevPage = currentPage > 1 ? currentPage - 1 : 1;
            if (prevPage !== currentPage) {
                displayMessages(messages, pageSize, prevPage);
            }
        });
        paginationContainer.appendChild(prevButton);
    
        // 创建数字页码按钮
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('span');
            pageLink.textContent = i;
            pageLink.style.cursor = 'pointer';
    
            // 高亮当前页码
            if (i === currentPage) {
                pageLink.classList.add('current-page');
            }
    
            pageLink.addEventListener('click', function () {
                if (i !== currentPage) { // 仅当点击的页码不是当前页码时触发
                    displayMessages(messages, pageSize, i);
                }
            });
            paginationContainer.appendChild(pageLink);
        }
        
        // 创建下一页按钮
        const nextButton = document.createElement('span');
        nextButton.innerHTML = '&gt;'; // 使用 HTML 实体表示“>”
        nextButton.style.cursor = 'pointer';
        nextButton.addEventListener('click', function () {
            const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
            if (nextPage !== currentPage) {
                displayMessages(messages, pageSize, nextPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    
        messagesContainer.appendChild(paginationContainer);
    }

    function formatMessageTime(timestamp) {
        const messageDate = new Date(timestamp * 1000); // 乘以1000转换为毫秒
    
        // 手动格式化日期和时间
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // 使用 24 小时制
        };
    
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(messageDate);
    
        // 提取年、月、日、小时、分钟
        const [date, time] = formattedTime.split(', ');
        const [month, day, year] = date.split('/');
        const [hour, minute] = time.split(':');
    
        // 重新拼接为所需格式，去除括号
        const formattedDateTime = `${year}/${month}/${day},${hour}:${minute}`;
    
        return formattedDateTime;
    }


});
