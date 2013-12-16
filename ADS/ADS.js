/*-------------------------------
 * ADS插件
 * 根据《JAVASCRIPT高级程序设计》编写，有删改。
 * 2013/2/23修订
 * @Anshen
 *-------------------------------
 */
/*global window:true, navigator:true*/
(function (window) {
	"use strict";
	var doc = window.document,
		/**
		 * 检查兼容性
		 */
		isCompatible = function (other) {
			if (other === false || !Array.prototype.push || !Object.hasOwnProperty || !doc.createElement || !doc.getElementsByTagName) {
				return false;
			}
			return true;
		},
		/**
		 * 根据元素id获取元素
		 */
		$ = function () {
			var elements = [], i, element, length;
			for (i = 0, length = arguments.length; i < length; i = i + 1) {
				element = arguments[i];
				if (typeof element === 'string') {
					element = doc.getElementById(element);
				}
				if (arguments.length === 1) {
					return element;
				}
				elements.push(element);
			}
			return elements;
		},
		/**
		 * 一个神奇的选择方法，哈哈，探究下
		 */
		$$ = function (selector, parent) {
			var elements = doc.querySelectorAll.bind(doc)(selector);
			return Array.prototype.slice.call(elements);
		},
		/**
		 * 添加事件
		 * 兼容MSIE, FF, Chrome, Safari, Opera
		 * @Object node 元素节点
		 * @String type 事件类型 
		 * @Function listener 事件
		 */
		addEvent = function (node, type, listener) {
			node = $(node);
			// 检测兼容性
			if (!isCompatible()) {
				return false;
			}
			if (!node) {
				/* !node || !node.nodeName */
				return false;
			}

			if (node.attachEvent) {
				// MSIE的写法
				// 定义事件属性
				node['e' + type + listener] = listener;
				node[type + listener] = function () {
					// 执行事件
					node['e' + type + listener](window.event);
				};
				node.attachEvent('on' + type, node[type + listener]);
			} else if (node.addEventListener) {
				// FF, Safari, Opera, Chrome
				node.addEventListener(type, listener, false);
			} else {
				return false;
			}
			return true;
		},
		/**
		 * 文档[标记载入完成]就绪时载入事件，而不是在所有元素加载完成
		 * @Function fn 文档就绪回调的函数
		 * @Boolean wait 是否等待文档资料全部载入
		 */
		addLoadEvent = function (fn, wait) {
			if (!isCompatible()) {
				return false;
			}
			// 如果等待文档完全就绪
			if (wait) {
				return addEvent(window, "load", fn);
			}

			if (doc.addEventListener) {
				doc.addEventListener("DOMContentLoaded", fn, false);
			}
			return true;
		},
		/**
		 * 移除事件
		 * 兼容MSIE, FF, Chrome, Safari, Opera
		 * @Object node 元素节点
		 * @String type 事件类型 
		 * @Function listener 事件
		 */
		removeEvent = function (node, type, listener) {
			node = $(node);
			if (!node) {
				/* !node || !node.tagName */
				return false;
			}

			if (node.removeEventListener) {
				node.removeEventListener(type, listener, false);
			} else if (node.detachEvent) {
				// MSIE
				node.detachEvent('on' + type + listener);
				node[type + listener] = null;
			} else {
				return false;
			}

			return true;
		},
		/**
		 * 获取元素节点
		 * 兼容MSIE, FF, Chrome, Safari, Opera
		 * @String className 类名称
		 * @String tag 元素名称 
		 * @Node parent 祖先节点
		 */
		getElementsByClassName = function (className, tag, parent) {
			parent = parent || doc;
			parent = $(parent);
			tag = tag || '*';
			if (!parent) {
				/* !parent || !parent.nodeType */
				return false;
			}

			var matchingElements = [],
				element,
				elements,
				i,
				len,
				allTags,
				regex;
			if (parent.getElementsByClassName) {
				elements = parent.getElementsByClassName(className);
				if (tag === '*') {
					matchingElements = elements;
				} else {
					for (i = 0, len = elements.length; i < len; i = i + 1) {
						// elements[i].nodeName.toUpperCase()
						if (elements[i].tagName.toUpperCase() === tag.toUpperCase()) {
							matchingElements.push(elements[i]);
						}
					}
				}
			} else {
				allTags = (tag === '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
				className = className.replace(/\-/g, '\\-');
				regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
				for (i = 0; i < allTags.length; i = i + 1) {
					element = allTags[i];
					if (regex.test(element.className)) {
						matchingElements.push(element);
					}
				}
			}

			return matchingElements;
		},
				/**
		 * 轮询显示
		 * @Object node 元素节点
		 * @String value display属性值（block/inline/none/inline-block等） 
		 */
		toggleDisplay = function (node, value) {
			node = $(node);
			if (!node) {
				/* !node || !node.nodeType */
				return false;
			}

			if (node.style.display !== 'none') {
				node.style.display = 'none';
			} else {
				node.style.display = value || '';
			}
			/*
			if (node.style.visibility !== 'hidden') {
				node.style.visibility = 'hidden';
			} else {
				node.style.visibility = value || 'visible';
			} */

			return true;
		},
		/**
		 * 显示节点
		 * @Node node 要显示的节点
		 */
		show = function (node) {
			node = $(node);
			if (!node) {
				/* !node || !node.tagName */
				return false;
			}
			node.style.display = ''; // Rather than 'block' or 'inline'
			node.style.visibility = 'visible';
		},
		/**
		 * 隐藏节点
		 * @Node node 要隐藏的节点
		 * @Boolean holdingplace 是否保留节点占据的位置
		 */
		hide = function (node, holdingplace) {
			node = $(node);
			if (!node) {
				return false;
			}

			holdingplace = holdingplace || false;
			if (holdingplace) {
				node.style.visibility = 'hidden';
			} else {
				node.style.display = 'none';
			}
		},
		/**
		 * 在节点后插入新节点
		 * @Node node 要插入的节点
		 * @Node referenceNode 被插入节点
		 */
		insertAfter = function (node, referenceNode) {
			node = $(node);
			if (!node) {
				return false;
			}
			referenceNode = $(referenceNode);
			if (!referenceNode) {
				return false;
			}
			// 返回添加的元素
			return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
		},
		/**
		 * 移除元素所有子节点
		 * @Node parent 目标节点
		 */
		removeChildren = function (parent) {
			parent = $(parent);
			if (!parent) {
				return false;
			}
			while (parent.firstChild) {
				parent.removeChild(parent.firstChild);
			}
			return parent;
		},
		/**
		 * 在元素节点第一个子节点前插入新节点
		 * @Node parent 目标节点
		 * @Node newChild 子节点
		 */
		prependChild = function (parent, newChild) {
			parent = $(parent);
			if (!parent) {
				return false;
			}
			newChild = $(newChild);
			if (!newChild) {
				return false;
			}

			if (parent.firstChild) {
				parent.insertBefore(newChild, parent.firstChild);
			} else {
				parent.appendChild(newChild);
			}
			return parent;
		},
		/*
		 * 获取事件对象
		 */
		getEventObject = function (e) {
			return e || window.event;
		},
		/**
		 * 阻止事件默认行为
		 * @Event e 事件
		 */
		preventDefault = function (e) {
			var userAgent = window.navigator.userAgent.toLowerCase();
			e = getEventObject(e);
			if (/msie/g.test(userAgent)) {
				e.returnValue = false;
			} else {
				e.preventDefault();
			}
			return false;
		},
		/**
		 * 阻止事件传播
		 * @Event e 事件
		 * @Description 当为冒泡事件时，仅在目标元素上触发；当为捕获事件时，仅在目标的根祖先元素上触发
		 */
		stopPropagation = function (e) {
			var userAgent = window.navigator.userAgent.toLowerCase();
			e = getEventObject(e);
			if (/msie/g.test(userAgent)) {
				e.cancelBubble = true;
			} else {
				e.stopPropagation();
			}
		},
		/**
		 * 为元素添加类
		 * @Node node 目标元素
		 * @String className 类名
		 */
		addClass = function (node, className) {
			node = $(node);
			if (!node) {
				return false;
			}
			var oldClasses = node.className.replace(/\s+/g, " ").split(" ");
			function hasClass(classes, cn) {
				var i;
				for (i in classes) {
					if (classes.hasOwnProperty(i) && classes[i] === cn) {
						return true;
					}
				}
				return false;
			}
			if (!hasClass(oldClasses, className)) {
				oldClasses.push(className);
			}
			node.className = oldClasses.join(" ");
			return node;
		},
		/**
		 * 移除类
		 * @Node node 目标元素
		 * @String className 类名
		 */
		removeClass = function (node, className) {
			node = $(node);
			if (!node) {
				return false;
			}
			var oldClass = node.className,
				regex;
			className = className.replace(/\-/g, '\\-');
			regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
			oldClass = oldClass.replace(regex, "");
			node.className = oldClass;
			return node;
			/*
			if (!(node = $(node))) {
				return false;
			}
			var oldClasses = node.className.split(/\s+/),
				index = 0,
				length = oldClasses.length;
				
			for (;index < length; index++)
				if (className === oldClasses[index])
					delete oldClasses[index];
			node.className = oldClasses.join(" ").replace(/\s+/g, " ");
			return node; */
		},
		/**
		 * 将字符串转换为UNICODE码
		 * @String str 目标字符串
		 */
		encodeUnicode = function (str) {
			str = str && (typeof str === 'string' || typeof str === 'number' ? str : String.toString(str));
			var unichars = [],
				i = 0,
				length = 0,
				ch;
			if (str) {
				for (length = str.length; i < length; i = i + 1) {
					ch = str.charCodeAt(i).toString(16);
					while (ch.length < 4) {
						ch = '0' + ch;
					}
					unichars.push(ch);
				}
			}
			// \u4f1a\u8bdd\u8d85\u65f6\uff01\u8bf7\u91cd\u65b0\u767b\u5f55
			return (unichars.length === 0 ? '' : '\\u' + unichars.join('\\u'));
		},
		/**
		 * 不推荐使用，此方法不确定。
		 * @Deprecated
		 */
		decodeUnicode = function (unicode) {
			if (!unicode) {
				throw new TypeError("没有参数0");
			}
			unicode = unicode.slice(2, unicode.length);
			unicode = unicode.split("\\u");
			var str = "",
				key;
			for (key in unicode) {
				if (unicode.hasOwerProperty(key)) {
					str += String.fromCharCode(Number.valueOf(unicode[key]).toString(10));
				}
			}
			return str;
		},
		/**
		 * 轮询元素类名
		 * @Node node 目标元素
		 * @String className 类名
		 */
		toggleClass = function (node, className) {
			node = $(node);
			if (!node) {
				return false;
			}
			var oldClass = node.getAttribute('class') || '';
			if (oldClass.indexOf(className) === -1) {
				addClass(node, className);
			} else {
				removeClass(node, className);
			}
			return node;
		},
		/**
		 * 将明文转换为实体字符串
		 */
		encodeEntityCharString = function (charString) {
			if (!charString) {
				throw new TypeError("Undefined arguments 0");
			}
			var newString = "",
				index,
				length;
			for (index = 0, length = charString.length; index < length; index = index + 1) {
				newString += "&#" + charString.charCodeAt(index) + ";";
			}
			return newString;
		},
		/**
		 * 将实体字符串转换为明文
		 * @String charString 实体字符串，如:"&#22123;&#12126;"
		 */
		decodeEntityCharString = function (charString) {
			if (!charString) {
				throw new TypeError("Undefined arguments 0");
			}
			charString = charString.slice(2, charString.length - 1);
			charString = charString.split(";&#");
			var newString = "",
				index;
			for (index in charString) {
				newString += String.fromCharCode(charString[index]);
			}
			return newString;
		},
		/**
		 * 绑定This
		 */
		bindFn = function (self, fn) {
			return function () {
				fn.apply(self, arguments);
			};
		},
		/**
		 * 将字符串转换为驼峰表示法
		 * @String str 目标字符串
		 * @Return {String} 转换后的字符串<br>
		 * 事例如下：
		 *  "font-size" -> "fontSize"
		 */
		camelize = function (str) {
			if (!str) {
				return str;
			}
			return str.replace(/-(\w)/g, function (m, r, n, s) {
				return r.toUpperCase();
			});
		},
		/**
		 * 去骆驼化
		 */
		uncamelize = function (str, split) {
			if (!str) {
				return str;
			}
			if (!split) {
				split = "-";
			}
			return str.replace(/([A-Z])/g, function (m, r, n, s) {
				return split + m.toLowerCase();
			});
		},
		/**
		 * 获取事件源触发对象（节点）
		 * @Event e 事件对象
		 */
		getTarget = function (e) {
			e = getEventObject(e);
			// W3CEvent or ie
			var target = e.target || e.srcElement;
			// for safari
			if (target.nodeType === window.Node.TEXT_NODE) {
				target = target.parentNode;
			}
			return target;
		},
		/**
		 * 获取鼠标按下的键
		 * @Event e 事件对象
		 * @Return {Object}
		 *         <p>
		 * {
		 *   left: false,
		 *   right: false,
		 *   middle: false 
		 * }
		 * </p>
		 */
		getMouseButton = function (e) {
			e = getEventObject(e);
			var buttons = {
				left: false,
				middle: false,
				right: false
			},
				btn;
			if (e.toString && /MouseEvent/i.test(e.toString())) {
				switch (e.button) {
				case 0:
					buttons.left = true;
					break;
				case 1:
					buttons.middle = true;
					break;
				case 2:
					buttons.right = true;
					break;
				}
			} else if (e.button) {
				// for ie
				switch (e.button) {
				case 1:
					buttons.left = true;
					break;
				case 2:
					buttons.middle = true;
					break;
				case 3:
					buttons.right = true;
					break;
				case 4:
					buttons.left = true;
					buttons.middle = true;
					break;
				case 5:
					buttons.middle = true;
					buttons.right = true;
					break;
				case 6:
					buttons.left = true;
					buttons.right = true;
					break;
				case 7:
					for (btn in buttons) {
						buttons[btn] = true;
					}
					break;
				}
			} else {
				return false;
			}
			return buttons;
		},
		/**
		 * 获取鼠标位置
		 * @Event e 事件对象
		 * @Return {Object} 坐标对象
		 */
		getPointerPositionInDocument = function (e) {
			e = getEventObject(e);
			var x = 0,
				y = 0;
			x = e.pageX || (e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft));
			y = e.pageY || (e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop));

			return {"x": x, "y": y};
		},
		/**
		 * 获取按下的按键
		 * @Event e 事件对象
		 */
		getPressedKey = function (e) {
			e = getEventObject(e);
			var keyCode = e.keyCode,
				value = String.fromCharCode(keyCode);

			return {
				"code": keyCode,
				"value": value
			};
		},

		setStyleById = function (element, styles) {
			element = $(element);
			if (!element) {
				return false;
			}
			var property;
			for (property in styles) {
				if (styles.hasOwnProperty(property)) {
					if (element.style.setProperty) {
						element.style.setProperty(uncamelize(property, "-"), styles[property], null);
					} else {
						element.style[camelize(property)] = styles[property];
					}
				}
			}
			return true;
		},
		setStyleByClassName = function (parent, tag, classname, styles) {
			parent = $(parent);
			if (!parent) {
				return false;
			}

			var elements = getElementsByClassName(classname, tag, parent),
				eleIndex,
				length;
			for (eleIndex = 0, length = elements.length; eleIndex < length; eleIndex = eleIndex + 1) {
				setStyleById(elements[eleIndex], styles);
			}
		},
		setStyleByTagName = function (tagname, styles, parent) {
			parent = $(parent);
			if (!parent) {
				return false;
			}
			var elements = parent.getElementsByTagName(tagname),
				eleIndex,
				length;
			for (eleIndex = 0, length = elements.length; eleIndex < length; eleIndex = eleIndex + 1) {
				setStyleById(elements[eleIndex], styles);
			}
		},
		getClassNames = function (node) {
			node = $(node);
			if (!node) {
				return false;
			}
			return node.className.split(/\s+/g);
		},
		hasClassName = function (node, classname) {
			node = $(node);
			if (!node || !classname) {
				return false;
			}
			var classes = node.className,
				clsIndex,
				length;
			for (clsIndex = 0, length = classes.length; clsIndex < length; clsIndex = clsIndex + 1) {
				if (classes[clsIndex] === classname) {
					return true;
				}
			}
			return false;
		},
		addClassName = function (node, classname) {
			node = $(node);
			if (!node || !classname) {
				return false;
			}
			node.className = (node.className ? " " : "") + classname;
			return true;
		},
		removeClassName = function (node, classname) {
			node = $(node);
			if (!node || !classname) {
				return false;
			}
			var classes = getClassNames(node),
				length = classes.length,
				i = 0;
			for (i = 0, length = classes.length; i < length; i = i + 1) {
				if (classes[i] === classname) {
					delete classes[i];
				}
			}
			return !(length === node.className.split(/\s+/g).length);
		},
		/**
		 * 切换风格
		 */
		setActiveStyleSheet = function (title) {
			if (!title) {
				return false;
			}
			var links = doc.getElementsByTagName("link"),
				i,
				length;
			for (i = 0, length = links.length; i < length; i = i + 1) {
				if (links[i].getAttribute("rel").indexOf("style") !== -1 && links[i].getAttribute("title")) {
					links[i].disabled = true;
					if (links.getAttribute("title") === title) {
						links[i].disabled = false;
					}
				}
			}
		},
		addStyleSheet = function (url, media) {
			if (!url) {
				return false;
			}
			media = media || "screen";
			var linkStyle = doc.createElement("link");
			linkStyle.setAttribute("href", url);
			linkStyle.setAttribute("media", media);
			linkStyle.setAttribute("type", "text/css");
			linkStyle.setAttribute("rel", "stylesheet");

			doc.getElementsByTagName("head")[0].appendChild(linkStyle);
			return true;
		},
		getStyleSheets = function (url, media) {
			var styleSheets = doc.styleSheets,
				styleSheet,
				retStyles = [],
				index,
				length,
				mediaText;
			for (index = 0, length = styleSheets.length; index < length; index = index + 1) {
				styleSheet = styleSheets[index];
				if (!!url && (!styleSheet.href || (!!styleSheet.href && styleSheet.href.indexOf(url) === -1))) {
					continue;
				}
				if (!!media) {
					media = media.replace(/,\s*/, ", ");
					mediaText = styleSheet.media.mediaText;
					if (!!mediaText) {
						mediaText = mediaText.replace(/,\s*/, ", ");
						// Safari会添加额外的逗号和空格
						mediaText = mediaText.replace(/,\s*$/, "");
					} else {
						// For ie
						mediaText = styleSheet.media.replace(/,\s*/, ", ");
					}
					if (media !== mediaText) {
						continue;
					}
				}
				retStyles.push(styleSheet);
			}
			return retStyles;
		},
		removeStyleSheet = function (url, media) {
			if (!url) {
				return false;
			}
			var linkStyles = getStyleSheets(url, media),
				index,
				linkStyle,
				node;
			if (!linkStyles) {
				return false;
			}
			for (index = linkStyles.length - 1; index > -1; index = index - 1) {
				linkStyle = linkStyles[index];
				node = linkStyle.ownerNode || linkStyle.owningElement;
				linkStyle.disabled = true;
				node.parentNode.removeChild(node);
			}
			return true;
		},
		editCSSRule = function (selector, styles, url, media) {
			var styleSheets = typeof url === "array" ? url : getStyleSheets(url, media),
				index,
				length,
				rules,
				rIndex,
				rLength,
				property;
			for (index = 0, length = styleSheets.length; index < length; index = index + 1) {
				// **W3C** && **msie**
				rules = styleSheets[index].cssRules || styleSheets[index].rules;
				if (!rules) {
					continue;
				}

				// ie下默认为大写
				selector = selector.toUpperCase();
				for (rIndex = 0, rLength = rules.length; rIndex < rLength; rIndex = rIndex + 1) {
					if (rules[rIndex].selectorText.toUpperCase() === selector) {
						for (property in styles) {
							if (!styles.hasOwnProperty(property)) {
								continue;
							}
							rules[rIndex].style[camelize(property)] = styles[property];
						}
					}
				}
			}
		},
		addCSSRule = function (selector, styles, index, url, media) {
			var declaration = "",
				property,
				// url?
				styleSheets = (typeof url === "array" ? url : getStyleSheets(url, media)),
				rIndex = 0,
				styleSheet,
				sIndex,
				length;
			// 构建声明字符串
			for (property in styles) {
				if (!styles.hasOwnProperty(property)) {
					continue;
				}
				declaration += property + ":" + styles[property] + "; ";
			}
			for (sIndex = 0, length = styleSheets.length; sIndex < length; sIndex = sIndex + 1) {
				styleSheet = styleSheets[sIndex];
				if (styleSheet.insertRule) {
					// For W3C
					rIndex = index >= 0 ? index : styleSheet.cssRules.length;
					styleSheet.insertRule(selector + "{" + declaration + "}", rIndex);
				} else if (styleSheet.addRule) {
					// For msie
					rIndex = (index >= 0 ? index : -1);
					styleSheet.addRule(selector, declaration, rIndex);
				}
			}
		},
		getComputedStyle = function (node, property) {
			node = $(node);
			if (!node || !!property) {
				return false;
			}
			var value = node.style[camelize(property)],
				cssStyles;
			if (!value) {
				if (doc.defaultView && doc.defaultView.getComputedStyle) {
					cssStyles = doc.defaultView.getComputedStyle(node, null);
					value = cssStyles ? cssStyles.getPropertyValue(property) : null;
				} else {
					// For ie
					value = node.currentStyle[camelize(property)];
				}
			}

			return value === "auto" ? "" : value;
		},
		getRequestObject = function (url, options) {
			var xhr = null;
			if (window.XMLHttpRequest) {
				xhr = new window.XMLHttpRequest();
			} else if (window.ActiveXObject) {
				try {
					xhr = new window.ActiveXObject("Microsfot.XMLHTTP");
				} catch (e) {
					try {
						xhr = new window.ActiveXObject("MsXml2.XMLHttp");
					} catch (ex) {
						throw new Error("无法创建XMLHttpRequest对象，TraceStack:" + ex);
					}
				}
			} else {
				throw new Error("不支持AJAX请求");
			}
			options = options || {};
			options.method = options.method || "GET";
			options.send = options.send || null;
			options.cache = options.cache === false ? false : true;
			if (!options.cache) {
				url += (url.indexOf("?") === -1 ? "?_=" : "&_") + (new Date()).getTime();
			}
			options.username = options.username || null;
			options.password = options.password || null;

			xhr.onreadystatechange = function () {
				switch (xhr.readyState) {
				case 1:
					if (options.loadListener) {
						options.loadListener.apply(xhr, arguments);
					}
					break;
				case 2:
					if (options.loadedListener) {
						options.loadedListener.apply(xhr, arguments);
					}
					break;
				case 3:
					if (options.interactiveListener) {
						options.interactiveListener.apply(xhr, arguments);
					}
					break;
				case 4:
					try {
						if (xhr.status && xhr.status === 200) {
							var contentType = xhr.getResponseHeader("Content-Type"),
								// Content-Type: text/html; charset=UTF-8
								mimeType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1],
								json;
							switch (mimeType) {
							case "application/javascript":
							case "text/javascript":
								if (options.jsResponseListener) {
									options.jsResponseListener.call(xhr, xhr.responseText);
								}
								break;
							case "application/json":
								try {
									json = window.parseJSON(xhr.responseText);
									if (options.jsonResponseListener) {
										options.jsonResponseListener.call(xhr, json);
									}
								} catch (e) {
									throw e;
								}
								break;
							case "text/xml":
							case "application/xml":
							case "application/xhtml+xml":
								if (options.xmlResponseListener) {
									options.xmlResponseListener.call(xhr, xhr.responseXML);
								}
								break;
							case "text/html":
								if (options.htmlResponseListener) {
									options.htmlResponseListener.call(xhr, xhr.responseText);
								}
								break;
							default:
								if (options.catchallListener) {
									options.catchallListener.call(xhr, xhr);
								}
								break;
							}
							if (options.completeListener) {
								options.completeListener.apply(xhr, arguments);
							}
							if (options.allCompleteListener) {
								options.allCompleteListener.apply(xhr, xhr);
							}
						} else {
							if (options.errorListener) {
								options.errorListener.apply(xhr, arguments);
							}
						}
					} catch (ex) {
						throw ex;
					}
					break;
				}
			};

			xhr.open(options.method, url, true, options.username, options.password);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			xhr.setRequestHeader("X-ADS-Ajax-Request", "AjaxRequest");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			return xhr;
		},
		ajaxRequest = function (url, options) {
			options.send = param( options.send );
			var xhr = getRequestObject(url, options);
			xhr.send(options.send);
			return xhr;
		},
		xssRequestCount = 0,
		// key/values into a query string
		param = function ( a ) {
			var s = [ ];

			function add( key, value ){
				s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
			};

			// Serialize the key/values
			for ( var i in a )
				if (a.hasOwnProperty(i)) {
					// If the value is an array then the key names need to be repeated
					if ( typeof ( a[i] ) === "object" && typeof ( a[i].slice ) === "function")
						for (var j in a[i]) {
							add( i, a[i][j]);
						}
					else
						add( i, typeof ( a[i] ) === "function" ? a[i]() : a[i] );
				}

			// Return the resulting serialization
			return s.join("&").replace(/%20/g, "+");
		},
		formSerilize = function (form) {
			form = $(form);
			var inputs = Array.prototype.slice( form.getElementsByTagName("input") ),
				s = [];
			for (var input in inputs) {
				s[ s.length ] = encodeURIComponent(input) + '=' + encodeURIComponent(inputs[input]);
			}
			return s.join("&").replace(/%20/g, "+");
		};

	function parseJSON(s, filter) {
		var j; // ？
		function walk(k, v) {
			var prop;
			if (v && typeof v === "object") {
				for (prop in v) {
					if (v.hasOwnProperty(prop)) {
						v[prop] = walk(prop, v[prop]);
					}
				}
			}

			return filter(k, v);
		}

		// 1 校验字符串
		if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {
			try {
				// 2 消除{}二义性
				j = eval("(" + s + ")");
			} catch (e) {
				throw e;
			}
		} else {
			throw new SyntaxError("parseJSON Error.");
		}
		// 3 自定义过滤
		if (typeof filter === "function") {
			// j = walk('', s);
			j = walk(null, s);
		}
		return s;
	}

	function makeCallback(method, target) {
		return function () {
			method.apply(target, arguments);
		};
	}

	/**
	 * 科隆对象
	 */
	function clone(sourceObject) {
		if (typeof (sourceObject) !== "object") {
			return sourceObject;
		}
		if (sourceObject === null) {
			return sourceObject;
		}
		var targetObject = {},
			property;
		for (property in sourceObject) {
			targetObject[property] = clone(sourceObject[property]);
		}

		return targetObject;
	}

	function XssRequestObject() {
		this.requestID = "XSS_HTTP_REQUEST_" + (xssRequestCount + 1);
	}

	XssRequestObject.prototype = {
		url: null,
		scriptObject: null,
		// responseType: "text/javascript",
		// response: null,
		// responseText: null,
		responseJSON: null,
		status: 0, // 1成功，2失败
		statusText: null,
		readyState: 0, // Unsent
		timeout: 10000,
		setReadyState: function (readyState) {
			if (this.readyState < readyState || readyState === 0) {
				this.readyState = readyState;
				this.onreadystatechange();
			}
		},
		onreadystatechange: function () {},
		open: function (url, timeout) {
			this.timeout = timeout || 10000;
			this.url = url + (url.indexOf("?")  !== -1 ? "&" : "?") + "XSS_HTTP_REQUEST_CALLBACK=" + this.requestID + "_CALLBACK";
			this.statusText = "UNSENT";
			this.setReadyState(0);
		},
		send: function () {
			var requestObject = this,
				timeWatcher,
				head;

			this.scriptObject = doc.createElement("script");
			this.scriptObject.setAttribute("id", this.requestID);
			this.scriptObject.setAttribute("type", "text/javascript");

			// 设置监听器，检测超时
			timeWatcher = window.setTimeout(function () {

				requestObject.scriptObject.parentNode.removeChild(requestObject.scriptObject);

				window[requestObject.requestID + "_CALLBACK"] = function () {};

				requestObject.statusText = "Timeout after " + requestObject.timeout + " milliseconds";

				requestObject.status = 2;
				requestObject.statusText = "HEADERS_RECEIVED";
				requestObject.setReadyState(2);
				requestObject.statusText = "LOADING";
				requestObject.setReadyState(3);
				requestObject.statusText = "DONE";
				requestObject.setReadyState(4);
			}, this.timeout);

			// 设置回调
			window[this.requestID + "_CALLBACK"] = function (JSON) {

				window.clearTimeout(timeWatcher);

				requestObject.statusText = "HEADERS_RECEIVED";
				requestObject.setReadyState(2);
				requestObject.statusText = "LOADING";
				requestObject.setReadyState(3);

				requestObject.responseJSON = JSON;

				requestObject.status = 1;
				requestObject.statusText = "DONE";
				requestObject.setReadyState(4);
			};

			head = $$("head")[0];
			this.scriptObject.setAttribute("src", this.url);
			head.appendChild(this.scriptObject);

			// Load.
			requestObject.statusText = "OPENED";
			requestObject.setReadyState(1);
		}
	};

	// 模拟jQuery on 方法
	window.Element.prototype.on = window.Element.prototype.addEventListener;
	window.NodeList.prototype.on = function (event, fn) {
		// 一大堆疑问飘过。。。？
		[].forEach.call(this, function (el) {
			el.on(event, fn);
		});
		return this;
	};

	// 事件触发 trigger
	window.Element.prototype.trigger = function (type, data) {
		var event = doc.createEvent("HTMLEvents");
		event.initEvent(type, true, true);
		event.data = data || {};
		event.eventName = type;
		event.target = this;
		this.dispatchEvent(event);
		return this;
	};
	window.NodeList.prototype.trigger = function (event) {
		[].forEach.call(this, function (el) {
			el.trigger(event);
		});
		return this;
	};

	if (!window.ADS) {
		/**
		 * 定义ADS命名空间
		 */
		window.ADS = {};
	}

	/**
	 * 枚举节点类型
	 */
	window.ADS.Node = {
		ELEMENT_NODE                 : 1,
		ATTRIBUTE_NODE               : 2,
		TEXT_NODE                    : 3,
		CDATA_SECTION_NODE           : 4,
		ENTITY_REFERENCE_NODE        : 5,
		ENTITY_NODE                  : 6,
		PROCESSING_INSTRUCTION_NODE  : 7,
		COMMENT_NODE                 : 8,
		DOCUMENT_NODE                : 9,
		DOCUMENT_TYPE_NODE           : 10,
		DOCUMENT_FRAGEMENT_NODE      : 11,
		NOTATION_NODE                : 12
	};

	function getXssRequestObject(url, options) {
		options = options || {};
		options.timeout = options.timeout || 10000;
		var xhr = new XssRequestObject();
		xhr.onreadystatechange = function () {
			switch (this.readyState) {
			case 1:
				// OPENED
				if (options.loadListener) {
					options.loadListener.apply(xhr, arguments);
				}
				break;
			case 2:
				// HEADERS_RECEIVED
				if (options.loadedListener) {
					options.loadedListener.apply(xhr, arguments);
				}
				break;
			case 3:
				// LOADING
				if (options.interactiveListener) {
					options.interactiveListener.apply(xhr, arguments);
				}
				break;
			case 4:
				// DONE
				if (xhr.status === 1) {
					if (options.completeListener) {
						options.completeListener.apply(xhr, arguments);
					}
				} else {
					if (options.errorListener) {
						options.errorListener.apply(xhr, arguments);
					}
				}
				break;
			}
		};
		xhr.open(url, options.timeout);
		return xhr;
	}

	function xssRequest(url, options) {
		var xhr = getXssRequestObject(url, options);
		xhr.send(null);
	}

	window.ADS.isCompatible = isCompatible;
	window.ADS.$ = $;
	window.ADS.$$ = $$;
	window.$$ = $$;
	window.ADS.addEvent = addEvent;
	window.ADS.addLoadEvent = addLoadEvent;
	window.ADS.removeEvent = removeEvent;
	window.ADS.getElementsByClassName = getElementsByClassName;
	window.ADS.toggleDisplay = toggleDisplay;
	window.ADS.show = show;
	window.ADS.hide = hide;
	window.ADS.insertAfter = insertAfter;
	window.ADS.removeChildren = removeChildren;
	window.ADS.prependChild = prependChild;
	window.ADS.preventDefault = preventDefault;
	window.ADS.stopPropagation = stopPropagation;
	window.ADS.addClass = addClass;
	window.ADS.removeClass = removeClass;
	window.ADS.toggleClass = toggleClass;
	window.ADS.encodeUnicode = encodeUnicode;
	window.ADS.decodeUnicode = decodeUnicode;
	window.ADS.encodeEntityCharString = encodeEntityCharString;
	window.ADS.decodeEntityCharString = decodeEntityCharString;
	window.ADS.bindFn = bindFn;
	window.ADS.camelize = camelize;
	window.ADS.uncamelize = uncamelize;
	window.ADS.getTarget = getTarget;
	window.ADS.getMouseButton = getMouseButton;
	window.ADS.getPointerPositionInDocument = getPointerPositionInDocument;
	window.ADS.getPressedKey = getPressedKey;
	window.ADS.setStyle = setStyleById;
	window.ADS.setStyleById = setStyleById;
	window.ADS.setStyleByClassName = setStyleByClassName;
	window.ADS.setStyleByTagName = setStyleByTagName;
	window.ADS.getStyleSheets = getStyleSheets;
	window.ADS.editCSSRule = editCSSRule;
	window.ADS.addCSSRule = addCSSRule;
	window.ADS.getComputedStyle = getComputedStyle;
	window.ADS.getStyle = getComputedStyle;
	window.ADS.getStyleById = getComputedStyle;
	window.ADS.getRequestObject = getRequestObject;
	window.ADS.ajaxRequest = ajaxRequest;
	window.ADS.xssRequest = xssRequest;

	// or pagerAction better?
	var actionPager = {
		lastHash: '',
		callbacks: [],
		safariHistory: false,
		msieHistory: false,
		ajaxifyClassName: '',
		ajaxifyRoot: '',
		init: function (ajaxifyClass, ajaxifyRoot, startingHash) {
			this.ajaxifyClassName = ajaxifyClass || "ADSActionLink";
			this.ajaxifyRoot = ajaxifyRoot || "";
			var ua = navigator.userAgent,
				location,
				watcherCallback,
				ajaxHash;
			if (/Safari/i.test(ua)) {
				this.safariHistory = [];
			} else if (/msie/i.test(ua)) {
				this.msieHistory = doc.createElement("iframe");
				this.msieHistory.setAttribute("id", "msieHistory");
				this.msieHistory.setAttribute("name", "msieHistory");
				setStyleById(this.msieHistory, {
					"width": "100px",
					"height": "100px",
					"border": "1px solid black",
					"visibility": "visible",
					"zIndex": "-1"
				});
				doc.body.appendChild(this.msieHistory);
				this.msieHistory = doc.frames.msieHistory;
			}
			// 将链接转换为AJAX链接
			this.ajaxifyLinks();
			// 取得当前地址
			location = this.getLocation();
			if (!location.hash && !startingHash) {
				startingHash = "start";
			}

			ajaxHash = this.getHashFromUrl(location) || startingHash;

			this.addBackButtonHash(ajaxHash);

			watcherCallback = makeCallback(this.watchLocationForChange, this);

			window.setInterval(watcherCallback, 200);
		},
		ajaxifyLinks: function () {
			// 将链接转换成锚以便AJAX进行处理
			var links = getElementsByClassName(this.ajaxifyClassName, 'a', doc),
				idx,
				length;
			for (idx = 0, length = links.length; idx < length; idx = idx + 1) {
				if (hasClassName(links[idx], "ADSActionPagerModified")) {
					continue;
				}
				links[idx].setAttribute(links[idx], "href", this.convertURLToHash(links[idx].getAttribute("href")));
				addClassName(links[idx], "ADSActionPagerModified");

				// 注册单击事件必要时添加历史记录
				addEvent(links[idx], "click", function () {
					if (this.href && this.href.indexOf("#") > -1) {
						actionPager.addBackButtonHash(
							actionPager.getHashFromURL(this.href)
						);
					}
				});
			}

		},
		addBackButtonHash: function (ajaxHash) {
			if (!ajaxHash) {
				return false;
			}
			if (this.safariHistory !== false) {
				if (this.safariHistory.length === 0) {
					this.safariHistory[window.history.length] = ajaxHash;
				} else {
					this.safariHistory[window.history.length + 1] = ajaxHash;
				}
			} else if (this.msieHistory !== false) {
				this.msieHistory.doc.execCommand("Stop");
				this.msieHistory.location.href = "/fakepage?hash=" + ajaxHash
					+ "&title=" + doc.title;
			} else {
				// 通过改变地址
				// 包装函数一边在函数内部用this引用aciontPager
				var timeoutCallback = makeCallback(function () {
					if (this.getHashFromURL(doc.location.href) !== ajaxHash) {
						window.location.replace(window.location.href + "#" + ajaxHash);
					}
				}, this);
				window.setTimeout(timeoutCallback, 200);
			}
			return true;
		},
		watchLocationForChange: function () {
			var newHash;
			// 获得新的hash值
			if (this.safariHistory !== false) {
				if (this.safariHistory[window.history.length]) {
					newHash = this.safariHistory[window.history.length];
				}
			} else if (this.msieHistory !== false) {
				newHash = window.location.href.split("&")[0].split("=")[1];
			} else if (window.location.hash !== "") {
				newHash = this.getHashFromURL(window.location.href);
			}
		}
	};
})(window);

// 为String对象做扩展
/**
 * 累加字符串本身
 * @Number num 累加的次数
 * @Return {String} 累加后的字符串
 */
if (!String.prototype.repeat) {
	String.prototype.repeat = function (num) {
		'use strict';
		// repeat itself num times.
		var array = [];
		array.length = num + 1;
		return array.join(this);
	};
}

if (!String.repeat) {
	String.repeat = function (self, num) {
		'use strict';
		if (!self) {
			throw new TypeError("Missing arguments 0");
		}
		num = !num ? 1 : num;
		if (num < 0) {
			throw new Error("Pelease Input Express Number");
		}
		return self.repeat(num);
	};
}

if (!String.prototype.isChinese) {
	// 判断是否是汉字
	String.prototype.isChinese = function () {
		'use strict';
		if (/[^\u4E00-\u9FA5]/.test(this)) {
			return true;
		}
		return false;
	};
}

if (!String.prototype.isAlphanumeric) {
	String.prototype.isAlphanumeric = function () {
		'use strict';
		if (/^\w+$/i.test(this)) {
			return true;
		}
		return false;
	};
}

/**
 * 去除字符串前后的空格
 * @Return {String}
 */
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		'use strict';
		this.replace(/^\s+|\s+$/, "");
	};
}

/**
 * 去除字符串前后的空格
 * @static
 * @Return {String}
 */
if (!String.trim) {
	String.trim = function (s) {
		'use strict';
		if (!s) {
			throw new TypeError("Missing arguments 0");
		}
		return s.trim();
	};
}
