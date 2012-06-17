/**
 * @author Yohann
 */
define(function(require, exports, module) {

	/*
	 * css loader
	 */
	var _CSS_URLS = [];
	exports.loadCss = function(url) {
		url = require.toUrl(url);
		// 已存在时跳出
		if (_CSS_URLS.length > 0 && _CSS_URLS.indexOf(url) != -1)
			return;
		
		_CSS_URLS.push(url);
	    var link = document.createElement('link');
	    link.type = 'text/css';
	    link.rel = 'stylesheet';
	    link.href = url;
	    document.getElementsByTagName('head')[0].appendChild(link);
	}

	/*
	 * 字符长度（中文按两个字符计算）
	 */
	exports.strLength = function(str) {
		var str_length = 0;
		var str_len = 0;
		str_cut = new String();
		str_len = str.length;
		for ( var i = 0; i < str_len; i++) {
			a = str.charAt(i);
			str_length++;
			if (escape(a).length > 4) { // 中文字符的长度经编码之后大于4
				str_length++;
			}
		}
		return str_length;
	}

	/*
	 * 字符长度（非中文2个当一个）
	 */
	exports.strLength1 = function(str) {
		str = str || '';
		var width = len = str.length;
		for ( var i = 0; i < len; i++) {
			if (str.charCodeAt(i) >= 255)
				width++;
		}
		return Math.ceil(width / 2);
	}

	// 当前年月日（字符串）
	exports.getDate = function() {
		var _f = function(v) {
			return v < 10 ? '0' + v : v;
		}
		var _date = new Date();
		return _date.getFullYear() + '-' + _f((_date.getMonth() + 1)) + '-' + _f(_date.getDate());
	}

	/*
	 * 返回js日期
	 */
	exports.dateFormat = function(dateStr) {
		dateStr = dateStr.replace(/-/g, '/');
		return new Date(dateStr);
	}
	
	/*
	 * 执行OBJ对所有方法
	 */
	exports.applyObj = function(obj) {
		for ( var i in obj) {
			if (typeof (obj[i]) == 'function') {
				obj[i].apply();
			}
		}
	}
	
	/*
	 * OBJ合并
	 * 类似jQuery.extend()
	 */
	exports.extend = function(des, src, override) {
		if(src instanceof Array){
	    	for(var i = 0, len = src.length; i < len; i++)
	        	exports.extend(des, src[i], override);
		}
		for( var i in src){
			if(override || !(i in des)){
				des[i] = src[i];
			}
		} 
		return des;
	}
});
