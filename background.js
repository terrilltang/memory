chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        type: 'normal',
        title: '添加到MEMORY',
        contexts: ['selection'],
        onclick: function(data) {
            notice('好赞', '你选择并添加了一些词:' + data.selectionText)
            $.ajax({
                url: 'http://fanyi.youdao.com/openapi.do?keyfrom=learn-language&key=1121096897&type=data&doctype=json&only=translation&version=1.1&q=' + data.selectionText,
            }).done(function(data) {
                var tran = '';
                data.translation.forEach(function(obj) {
                    return tran += obj;
                })
                console.log(tran)
                notice('翻译结果:', tran)
            })
        }
    }, function() {
        notice('好赞', 'CREATE CONTEXTMENUS SUCCESS')
    });
})




function notice(title, message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: './icons/48.png',
        title: title,
        message: message
    }, function(notificationId) {
        console.log(notificationId)
    })
}

var socket = io('http://localhost');
socket.on('news', function(data) {
    console.log(data);
    notice('第' + (data.index + 1) + '条消息:', "" + data.hello)
});