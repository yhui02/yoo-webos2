/**
 * @author yohann
 */
define(['require', 'exports', 'jquery-hashchange'], function(require, exports, jqueryHashchange) {
	$(function() {
		var $window = $(window);
		$window.bind('hashchange', function(evt) {
			var fragment = evt.hashFragment;
			var path = fragment.split('/');
			// E is a global obj
			if (typeof E[path[0]] == 'function') {
				E[path[0]](path);
			} else if (fragment != '') {
				if (path[0] != 'dialog' && path[0] != 'page')
					alert('"' + path[0] + '" is not a function');
			}
		});
		setTimeout(function(){
			$window.trigger('hashchange');
		}, 50);
	});
	
	exports.test = function() {
		alert(1);
	};
});