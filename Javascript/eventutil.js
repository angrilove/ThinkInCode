/*!
 * $EventUtil.js Copyright (C) Zhang Biao 2012-05-05 09:18$
 * 提供跨平台的事件模型
 * 版本：V0.0.1
 */
 
// root of event 
var EventUtil = new Object(); // Or var EventUtil = {};

/**
 * 添加事件处理函数
 * @param target The source of event
 * @param eventType The name of event
 * @param fn The function used to handle event
 */
EventUtil.addEventHandler = function(target, eventType, fn) {
    if (target.addEventListener) // For DOM-compliant browsers, IE9 already support addEventListener function
        target.addEventListener(eventType, fn, false);
    else if (target.attachEvent) // For ie
        target.attachEvent('on' + eventType, fn);
    else target['on' + eventType] = fn; // For all others
}

/**
 * 移除事件处理函数
 * @param target The source of event
 * @param eventType The name of event
 * @param fn The function used to handle event
 */
EventUtil.removeEventHandler = function(target, eventType, fn) {
    if (target.removeEventListener) // For the DOM-compliant browsers
        target.removeEventListener(eventType, fn, false);
    else if (browser.msie) // For ie
        target.detachEvent('on' + eventType, fn);
    else target['on' + eventType] = null; // For all other browers
}

/**
 * 获取事件对象(event)
 * @returns event
 */
EventUtil.getEvent = function() {
    if (browser.msie)
        return this.formatEvent(window.event);
    else return EventUtil.getEvent.caller.arguments[0]; // DOM
}

/**
 * 格式化事件对象(event)
 * @param event
 */
EventUtil.formatEvent = function(event) {
    if (browser.msie) {
        event.charCode = (event.type === 'keypress') ? event.keyCode : 0;
        event.eventPhase = 2; // 冒泡阶段
        event.isChar = (event.charCode > 0);
        
        event.pageX = event.clientX + document.body.scrollLeft;
        event.pageY = event.clientY + document.body.scrollTop;
        
        event.preventDefault = function() {
            this.returnValue = false;   // IE8中此属性不存在
        };
        
        // event.relatedTarget = event.type === 'mouseout' ? event.toElement : event.type === 'mouseover' ? event.fromElement : event.target;
        if (event.type === 'mouseout')
            event.relatedTarget = event.toElement;
        else if (event.type === 'mouseover')
            event.relatedTarget = event.fromElement;
        
        event.stopPropagation = function() {
            this.cancelBubble = true;
        };
        
        event.target = event.srcElement;
        event.time = (new Date()).getTime();
    }
    
    return event;
}

/**
 * 检测浏览器
 * 此处参考jQuery，详见jQuery-1.0.1
 */
new function() {
	var b = navigator.userAgent.toLowerCase();

	// Figure out what browser is being used
	browser = {
		safari: /webkit/.test(b),
		opera: /opera/.test(b),
		msie: /msie/.test(b) && !/opera/.test(b),
		mozilla: /mozilla/.test(b) && !/compatible/.test(b)
	};

	// Check to see if the W3C box model is being used
	window.boxModel = !browser.msie || document.compatMode == "CSS1Compat";
    
    window.browser = browser;
};