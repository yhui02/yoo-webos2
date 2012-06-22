/**
 * @author yohann
 */
define(function(require, exports, module) {
	require('jquery');
	
	/*
	 * init
	 */
	var containerObj = $('#container');
	var iconsConObj;
	var _init = function() {
		var setContainerHeight = function() {
			containerObj.height(document.body.offsetHeight - $('header').height() - 4);
		}
		window.onresize = setContainerHeight;
		
		$(function() {
			setContainerHeight.apply();
			
			var iconsConEle = $('<div id="iconsCon"></div>');
			containerObj.append(iconsConEle);
			iconsConObj = $('#iconsCon');
		})
	}
	
	/*
	 * desktopDialog build
	 */
	exports.desktopDialog = function(data) {
		if (iconsConObj === undefined) {
			$('html').css('overflow', 'hidden');
			_init.apply();
		}
		
		var _T = require('tools');
		_T.loadCss('library/jquery-ui/css/smoothness/jquery-ui-1.8.21.custom.css');
		require([ 'order!jquery', 'order!script/library/jquery-ui/js/jquery-ui-1.8.21.custom.min.js' ]);
		
		$(function() {
			// icons elements
			var _iconsHtmlEle = [];
			$.each(data, function(i, n) {
				_iconsHtmlEle.push('<div class="span1 dd">');
				_iconsHtmlEle.push('  <a id="' + n.id + '" class="dialogBtn btn btn-inverse" href="' + n.url + '" rel="tooltip" title="' + n.title + '">');
				_iconsHtmlEle.push('  <i class="icon-folder-close icon-white"></i><br />' + n.name + '</a>');
				_iconsHtmlEle.push('</div>');
			})
			_iconsHtmlEle = $(_iconsHtmlEle.join(''));
			iconsConObj.append(_iconsHtmlEle);
			require(['bootstrap-tooltip'], function(){
				iconsConObj.find('a').tooltip({'placement':'right'});
			});
			
			// dilaog elements register
			var _dialogHtmlEle = [];
			var _dialogIdExt = 'Dialog';
			$.each(data, function(i, n) {
				var _id = n.id + _dialogIdExt;
				_dialogHtmlEle.push('<div id="' + _id + '" class="yooDialog dialogLoading" title="' + n.name + '">');
				_dialogHtmlEle.push('</div>');
			})
			_dialogHtmlEle = $(_dialogHtmlEle.join(''))
			$('body').append(_dialogHtmlEle);
			
			
			var getHtmlHeightForDial = function() {
				var _height = $('html').height() - 40;
				return _height > 2000 ? 2000 : _height;
			};
			var getHtmlWidthForDial = function() {
				var _width = $('html').width();
				return _width > 860 ? 860 : _width;
			};
			
			// 初始化 dialog
			$.each(data, function(i, n) {
				var _dialogObj = $('#' + n.id + _dialogIdExt);
				_dialogObj.dialog({
					autoOpen : false,
					height : getHtmlHeightForDial(),
					width : getHtmlWidthForDial(),
					minHeight : 180,
					minWidth : 380,
					show : 'fade',
					dragStart : function(event, ui) {
						_dialogObj.css({
							display : 'none'
						}).parent().addClass('dialogLoading');
					},
					dragStop : function(event, ui) {
						_dialogObj.css({
							display : ''
						}).parent().removeClass('dialogLoading');
					},
					resizeStart : function(event, ui) {
						window.onresize = null;
						_dialogObj.css({
							display : 'none'
						}).parent().addClass('dialogLoading');
					},
					resizeStop : function(event, ui) {
						window.onresize = _dialogResize;
						_dialogObj.css({
							display : ''
						}).parent().removeClass('dialogLoading');
					},
					close : function() {
						//_dialogObj.dialog('destroy');
					}
				})
			})
			
			// 绑定 icon 点击事件
			$('.dialogBtn').click(function() {
				var _oId = $(this).attr('id');
				var _dialogObj = $('#' + _oId + _dialogIdExt);
				var _src = $(this).attr('href');
				if (_dialogObj.dialog('isOpen')) 
					_dialogObj.dialog('moveToTop');
				else
					_dialogObj.dialog('open').html('<iframe border="0" frameborder="0" src="' + _src + '"></iframe>');
				
				$(this).css({
					color : '#999'
				}).find('i').addClass('icon-folder-open');
				
				return false;
			})
			
			/*
			 * dialog 追加事件
			 */
			// 标题双击最大化处理
			$('.ui-dialog-titlebar').dblclick(function() {
				var fw = $('html').width() - 2,
					fh = $('html').height() -2,
					ft = 0;
					fl = 0;
				var _thisDialogObj = $(this).next();
				
				var _w = 0, _h = 0, _t = 0, _l = 0;
				if (fw == _thisDialogObj.dialog('option', 'width') && fh == _thisDialogObj.dialog('option', 'height')) {
					_w = 720;
					_h = 500;
					_t = 32;
					_l = 40;
				} else {
					_w = fw;
					_h = fh;
					_t = ft;
					_l = fl;
				}
				_thisDialogObj.dialog('option', 'position', [_t, _l]);
				_thisDialogObj.dialog({width: _w, height: _h});
			})
			
			var _dialogResize = function() {
				if ($.browser.msie && $.browser.msie.version <= 6) {
					//
				} else {
					//$('.yooDialog').dialog({height: getHtmlHeightForDial(), width: getHtmlWidthForDial()});
					$('.yooDialog').dialog({height: getHtmlHeightForDial()});
				}
			}
			
			window.onresize = _dialogResize;
		})
	}
	
	/*
	 * desktopPage build
	 */
	exports.desktopPage = function(data) {
		if (iconsConObj === undefined)
			_init.apply();
		// icons elements
		var _iconsHtmlEle = [];
		$.each(data, function(i, n) {
			_iconsHtmlEle.push('<div class="span1 dp">');
			_iconsHtmlEle.push('  <a id="' + n.id + '" class="dialogBtn" href="' + n.url + '">');
			_iconsHtmlEle.push('  <i class="icon-folder-close"></i>' + n.name + '</a>');
			_iconsHtmlEle.push('</div>');
		})
		_iconsHtmlEle = $(_iconsHtmlEle.join(''));
		$(function() {
			iconsConObj.append(_iconsHtmlEle);
			
			// 绑定 icon 点击事件
			$('.dialogBtn').click(function() {
				var _src = $(this).attr('href');
				var _iframHtml = '<iframe id="pageIframe" name="pageIframe" border="0" class="dialogLoading"'
					+ 'frameborder="0" src="' + _src + '"></iframe>';
				$('#pageIframe').html(_iframHtml).height('100%');
				
				$(this).css({
					color : '#999'
				}).find('i').addClass('icon-folder-open');
				$(this).siblings().css({
					color : '#333'
				}).find('i').removeClass('icon-folder-open');
				
				return false;
			})
		})
	}
});
