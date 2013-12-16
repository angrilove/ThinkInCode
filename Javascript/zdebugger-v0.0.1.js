/*!
 * Cross-browser zdebugger v0.0.1 Copyright(C) 2012-05-04 Zhang Biao
 * You can copy it from everywhere and use everywhere, it's free.
 */
(function() {
/**
 * The root of debugger
 * @scope public
 */
zdebugger = {
    version: 'v0.0.1',
    copyrigth: 'zb',
    createDate: '2012-05-04 09:30:22',
    lastModifyDate: ''
};

zdebugger.log = function() {
    var args = arguments; /* likes array */
    var arr = [];
    
    for ( var i in args )
        arr.push(args[i]);
        
    if ( window.console )
        console.log(arr);
    // else alert(_showMsg(args));
};

/**
 * Private function _showMsg
 * @scope private
 * @param args
 * @returns {String} A String of msg
 */
function _showMsg(args /* likes array or it's function of arguments */) {
    var arr = [];
    
    for ( var i = 0; i < args.length; i++ ) {
        arr.push(args[i]);
    }
    
    var o = document.createElement("div");
    o.id = "console";
    // return arr.join('');
};

// shot name
this.zb = window.zb = zdebugger;
})();