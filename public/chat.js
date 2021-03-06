window.onload = function () {
    'use strict';

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if (data.messageText) {
            messages.push(data);
            var html = '';
            messages.forEach(function (message) {
                html += '<strong>' + (message.username ? message.username : 'Server') + ': </strong>';
                html += message.messageText + '<br />';
            });
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
            // alternatively via jQuery (IE7-)
            // $("#content").scrollTop($("#content")[0].scrollHeight);
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function () {
        if (name.value.length === 0) {
            alert("Please type your name")
        } else {
            var text = field.value;
            socket.emit('send', { messageText: text, username: name.value });
            field.value = "";
        }
    };
}

$(document).ready(function () {
    $("#field").keyup(function (e) {
        if (e.keyCode === 13) {
            sendMessage();
        }
    });
});
