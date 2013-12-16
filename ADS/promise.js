// 
// http://www.cnblogs.com/iamzhanglei/archive/2013/02/24/2924680.html
// 实现了顺序执行的方法
var Promise = function() {
	this.thens = [];
}

Promise.prototype = {
	resolve: function() {
		var fn = this.thens.shift(), ret;
		fn && (ret = fn.apply(null, arguments), ret instanceof Promise && (ret.thens = this.thens));
//		if (fn)
//			ret = fn.apply(null, arguments);
//		if (ret instanceof Promise)
//			ret.thens = this.thens;
	},
	then: function(fn) {
		// this.thens.push(n); return this;
		return this.thens.push(fn), this;
	}
}
/**
function f1() {
	var promise = new Promise();
	setTimeout(function () {
	   
		alert(1);
		promise.resolve();
	}, 1500)

	return promise;
}

function f2() {
	var promise = new Promise();
	setTimeout(function () {

		alert(2);
		promise.resolve();
	}, 1500)

	return promise;
}

function f3() {
	var promise = new Promise();
	setTimeout(function () {

		alert(3);
		promise.resolve();
	}, 1500)

	return promise;

}

function f4() {
	alert(4);
}

f1().then(f2).then(f3).then(f4);


$$.ajax('assets/get.php', {
	method: 'GET',
	data: 'q=1&_' + Math.random()
}).then(function(msg) {
	alert(msg.responseText);
});


*/
