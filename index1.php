<?php
header("Content-Type: text/html; charset=utf-8");
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <script src="getHmlHttpRequest.js" type="text/javascript"></script>
    <script src="sum.js" type="text/javascript"></script>
    <title></title>
</head>
<body id="id">
    <div>
        <button id="addFieldToSearch">Добавить поля для поиска</button>
        <select id="searchTag"></select>
        <p>В каком разделе ищем</p>
        <select id="city"></select>
        <p>В каком городе ищем</p>
        <table id="searchTable">
            <tbody>
                <tr>
                    <td align="center">Что ищем</td>
                    <td align="center">Чего не должно быть</td>
                </tr>
            </tbody>
        </table>
        <button id="sendDataToSearch">Отправить данные на обработку</button>
    </div>
</body>
</html>