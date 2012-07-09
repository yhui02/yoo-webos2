(function($, window, document, undefined) {

	$.event.special.hashchange = $.event.special.hashchange || (function() {

		var loc = window.location;
		var nativeSupport = ('onhashchange' in window) && (!document.documentMode || document.documentMode > 7);
		var oldHash = "";
		var duration = 30;
		var tickerId = null;

		var observeHashChange = function() {
			var currentHash = loc.hash;

			if(currentHash !== oldHash) {
				$(window).trigger('hashchange');
				oldHash = currentHash;
			}
		}

		return {
			setup: function() {

				if(nativeSupport) {
					return false;
				}

				oldHash = loc.hash;

				tickerId = setInterval(observeHashChange, duration);
			},


			add: function (handleObject) {
				var _handler = handleObject.handler; 

				handleObject.handler = function(evt) {
					evt.hashFragment = loc.hash.replace(/^#/, '');

					_handler.apply(this, arguments);
				}
			},

			teardown: function() {

				if(nativeSupport) {
					return false;
				}

				clearInterval(tickerId);

				oldHash = null;
			}
		};

	})();
})(jQuery, window, document)