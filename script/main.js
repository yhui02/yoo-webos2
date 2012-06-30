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
		'order'            : 'library/requirejs/order',
		'text'             : 'library/requirejs/text',
		'dojo'             : 'http://ajax.googleapis.com/ajax/libs/dojo/1.7.2/dojo/dojo',
		//'jquery'           : 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
		'jquery'           : 'library/jquery-1.7.2.min',
		'jquery-history'   : 'library/jquery.history',
		'bootstrap-button' : 'library/bootstrap/bootstrap-button',
		'bootstrap-tooltip': 'library/bootstrap/bootstrap-tooltip'
	},
	packages: ['tools'],
	waitSeconds : 20,
	urlArgs: 'version=1.0.2'
});

define(function(require, exports, module) {
	/*
	 * 核心框架初始化
	 */
	window.T = require('tools') || {};

	var modelPage = require('model/model-page');
	// 页面初始化操作
	T.applyObj(modelPage.init);
	
	// 扩展 modelPage 工具类到 T 上
	T = $.extend(T, modelPage);
	
	
	/*
	 * desktop 初始化
	 */
	require(['order!jquery', 'order!bootstrap-button']);
	
	var desktop = require('model/model-desktop');
	var iconJson = require('menu.json');
	
	var _hash = document.location.hash;
	if (_hash.indexOf('page') != -1)
		desktop.desktopPage(iconJson);
	else
		desktop.desktopDialog(iconJson);
	T = $.extend(T, desktop);
	
	if (_hash == '') {
		$('.pageType a:first').addClass('active');
	} else {
		$('.pageType a').each(function(i, n) {
			if ($(n).attr('href').indexOf(_hash) != -1)
				$(n).addClass('active');
		});
	}
	
	require(['bootstrap-tooltip'], function() {
		$('.pageType a').tooltip({'placement':'bottom'});
	});

	///test
	console.log(T);
	
//	var q = 'apple';
//	require(['http://www.google.com/dictionary/json?callback=define&q='+q+'&sl=en&tl=zh&restrict=pr%2Cde&client=te'], function (trends) {
//		$('#con').html('<pre><code>' + JSON.stringify(trends) + '</code></pre>');
//	});
	
});
