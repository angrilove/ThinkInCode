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
    var args = arguments;
    if (!! args) {
        if (window.console) {
           console.log( args ); 
        } else {
            alert(args);
        }
    }
};

// shot name
window.d = window.zd = zdebugger;
})();