document.addEventListener("DOMContentLoaded", function () {
    // 从数据库获取数据并动态生成表格
    获取数据并生成表格();

    // 对删除按钮进行事件委托
    document.getElementById("messageTable").addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteBtn")) {
            // 从按钮的 data-id 属性中提取消息ID
            const messageId = event.target.dataset.id;
            // 调用 deleteMessage 函数并传入消息ID
            删除消息(messageId);
        }
    });
});

function 获取数据并生成表格() {
    // 从后端获取数据 (backend.php)
    fetch("../php/backend.php")
        .then(response => response.json())
        .then(data => {
            // 调用一个函数来使用获取到的数据生成表格
            生成表格(data);
        })
        .catch(error => console.error("获取数据时出错:", error));
}

function 生成表格(data) {
    const table = document.getElementById("messageTable");

    // 清空现有表格内容
    table.innerHTML = "";

    // 创建表头
    const headerRow = table.insertRow();
    const headerLabels = ["ID", "姓名", "留言", "留言时间", "操作"];
    headerLabels.forEach(label => {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });

    // 创建带有数据的表格行
    data.forEach(rowData => {
        const row = table.insertRow();
        for (const key in rowData) {
            const cell = row.insertCell();
            cell.textContent = rowData[key];
        }

        // 为每一行创建删除按钮
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "删除";
        deleteButton.className = "deleteBtn";
        deleteButton.dataset.id = rowData.id;
        deleteCell.appendChild(deleteButton);
    });
}

function 删除消息(messageId) {
    // 发送请求到后端删除具有给定ID的消息
    fetch(`../php/backend.php?id=${messageId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            // 如果删除成功，从表格中移除相应行
            const table = document.getElementById("messageTable");
            const rows = table.getElementsByTagName("tr");

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName("td");
                const cellId = cells[0].textContent; // 假设 ID 在第一列

                if (cellId === messageId) {
                    // 找到匹配的行，移除它
                    table.deleteRow(i);
                    break;
                }
            }
        })
        .then(() => {
            // 在删除成功后强制刷新页面
            location.reload();
        })
        .catch(error => console.error("删除消息时出错:", error.message));
}
