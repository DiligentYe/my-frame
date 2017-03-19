(function(myFrame) {
    // 正则实现trim函数
    myFrame.trim = function(str) {
        // '  hello world  '
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };

    // 查询字符串处理函数 queryString
    myFrame.queryString = function(str) {
        var qs = str.substring(1);

        var args = {};

        var items = qs.length ? qs.split('&') : [];

        var key = '',
            value = '';

        for (var i = 0, len = items.length; i < len; ++i) {
            var item = items[i].split('=');
            key = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);

            args[key] = value;
        }

        return args;
    };
    window.myFrame = myFrame;
})(window.myFrame || {});