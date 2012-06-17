/**
 * @author yohann
 * 
 * 2012-06-12
 */
if (!window.console) {
	window.console = {
		log : function(msg) {
		}
	};
}

/*
 * RequireJS config
 */
requirejs.onError = function(err) {
	console.log(err.requireType);
	if (err.requireType === 'timeout') {
		console.log('modules: ' + err.requireModules);
	}
	throw err;
};

require.config({
	baseUrl: './script/',
	paths: {
		'order'          : 'RequireJS/order',
		'text'           : 'RequireJS/text',
		'dojo'           : 'http://ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo',
		//'jquery'         : 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
		'jquery'         : 'jquery-1.7.2.min',
		'jquery-history' : 'jquery-history/jquery.history'
	},
	waitSeconds : 20,
	urlArgs: 'version=1.0.1'
});

define(function(require, exports, module) {
	/*
	 * 核心框架初始化
	 */
	window.T = require('tools') || {};

	var helper = require('page-helper');
	// 页面初始化操作
	T.applyObj(helper.init);
	
	// 扩展 helper 工具类到 T 上
	require('jquery');
	T = $.extend(T, helper);
	
	
	/*
	 * desktop 初始化
	 */
	require(['order!jquery', 'order!bootstrap/bootstrap-button']);
	
	var desktop = require('model/model-desktop');
	var iconJson = [{
		id: 'a1',
		name: '测试1',
		url: 'http://www.21tb.com'
	},{
		id: 'a2',
		name: '测试2',
		url: 'http://jqueryui.com/'
	},{
		id: 'a3',
		name: '测试3',
		url: 'http://www.virginamerica.com/search.do?cid=PRO_0321'
	},{
		id: 'a4',
		name: '测试4',
		url: 'https://www.xobni.com/learnmore/group/'
	},{
		id: 'a5',
		name: '测试5',
		url: 'http://mac.brothersoft.com/'
	},{
		id: 'a6',
		name: '测试6',
		url: 'http://mac.brothersoft.com/'
	},{
		id: 'a7',
		name: '测试7',
		url: 'html/test.html'
	}];
	$('.pageType a').click(function(){
		alert('刷新页面试试。');
	})
	var _hash = document.location.hash;
	if (_hash.indexOf('dialog') != -1)
		desktop.desktopDialog(iconJson);
	else
		desktop.desktopPage(iconJson);
	T = $.extend(T, desktop);
	
	
	///test
	console.log(T);
	
//	var q = 'apple';
//	require(['http://www.google.com/dictionary/json?callback=define&q='+q+'&sl=en&tl=zh&restrict=pr%2Cde&client=te'], function (trends) {
//		$('#con').html('<pre><code>' + JSON.stringify(trends) + '</code></pre>');
//	});
	
})
