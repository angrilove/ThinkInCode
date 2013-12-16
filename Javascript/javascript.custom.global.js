/*!
 * file ./javascript.custom.global.js
 *
 * 自定义常用函数方法
 */

/**
 * 为函数添加方法
 * @param {String} name
 * @param {Function} fn
 * @return this
 */
Function.prototype.method = function (name, fn) {
    if (!this.prototype[name] && typeof fn === 'function') {
        this.prototype[name] = fn;
    }
    return this;
};

/**
 * 为函数(方法)重命名
 * @param {String} oldname
 * @param {String} newname
 * @return this
 */
Function.method('rename', function (oldname, newname) {
    if (oldname && this.prototype[oldname] && newname       // && hasOwnProperty(oldname)
        && typeof this.prototype[oldname] === 'function' 
        && typeof oldname === 'string' && typeof newname === 'string') {
        this.prototype[newname] = this.prototype[oldname];
        delete this.prototype[oldname]; // 注意，当名为oldname的函数是系统方法时，将无法删除
    }
    /* return */
    return this;
});