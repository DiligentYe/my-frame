(function(myFrame) {
    // 正则实现trim函数
    myFrame.trim = function(str) {
        // '  hello world  '
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    window.myFrame = myFrame;
})(window.myFrame || {});
