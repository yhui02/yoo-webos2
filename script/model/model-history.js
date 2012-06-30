/**
 * 异步、动态加载页面，产生浏览器历史记录
 * @author Yohann
 */
define(['jquery-history'], function() {
	(function(window, undefined) {
		// Establish Variables
		var History = window.History,
			State = History.getState();
		
		// Log Initial State
		History.log('initial:', State.data, State.title, State.url);
	
		// Bind to State Change 
		// Note: using statechange instead of popstate
		History.Adapter.bind(window, 'statechange', function() {
			var State = History.getState();
			// Log
			History.log('initial:', State.data, State.title, State.url);
			var helper = require('page-helper');
			helper._loadPage(State.data.id, State.url);
		});
	})(window);
	
	
	var obj = {};
	
	obj.loadPage = function(data, title, url) {
		History.pushState(data||{}, title||'', url||'');
		return false;
	};
	
	obj.init = function(linkEleObj) {
		$.each(linkEleObj, function(i, n) {
			$(n).click(function(e) {
				var url = $(this).attr('href'),
					title = $(this).attr('data-title'),
					data = {fns:function(){},p:'v1,v2',id:$(this).attr('data-eid')};
				return obj.loadPage(data, title, url);
			});
		});
	};
	
	return obj;
});
