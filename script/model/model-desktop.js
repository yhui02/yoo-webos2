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
	var setContainerHeight = function() {
		containerObj.height(document.body.offsetHeight - $('header').height() - 4);
	};
	var DIALOGID_EXT = 'Dialog';
	var _init = function() {
		$(function() {
			setContainerHeight.apply();
			
			var iconsConEle = $('<div id="iconsCon"></div>');
			containerObj.append(iconsConEle);
			iconsConObj = $('#iconsCon');
		});
	};
	
	exports.dialogOpen = function(oId, url, type, refresh) {
		var _dialogObj = $('#' + oId + DIALOGID_EXT);
		
		if (!_dialogObj.dialog('isOpen') || (refresh||false)) {
			var _url = url||$('#' + oId).attr('href');
			_url = decodeURIComponent(_url);
			var _type = type||$('#' + oId).attr('data-type');
			if (_type == 'html')
				_dialogObj.dialog('open').load(_url);
			else
				_dialogObj.dialog('open').html('<iframe border="0" frameborder="0" src="' + _url + '"></iframe>');
			
			setTimeout(function() {
				_dialogObj.removeClass('dialogLoading');
			}, 1200);
		}
		_dialogObj.dialog('moveToTop').parent().show('fade');
	};
		
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
		require([ 'order!jquery', 'order!script/library/jquery-ui/js/jquery-ui-1.8.21.custom.min.js' ], function(){
		
			$(function() {
				// icons elements
				var _iconsHtmlEle = [];
				$.each(data, function(i, n) {
					_iconsHtmlEle.push('<div class="span1 dd">');
					_iconsHtmlEle.push('  <a id="' + n.id + '" class="dialogBtn btn btn-inverse" href="' + n.url 
							+ '" rel="tooltip" title="' + n.title + '" data-type="' + n.type + '">');
					_iconsHtmlEle.push('  <i class="icon-folder-close icon-white"></i><br />' + n.name + '</a>');
					_iconsHtmlEle.push('</div>');
				});
				iconsConObj.append(_iconsHtmlEle.join(''));
				require(['bootstrap-tooltip'], function(){
					iconsConObj.find('a').tooltip({'placement':'right'});
				});
				
				// dilaog elements register
				var _dialogHtmlEle = [];
				$.each(data, function(i, n) {
					var _id = n.id + DIALOGID_EXT;
					_dialogHtmlEle.push('<div id="' + _id + '" class="yooDialog dialogLoading" title="' + n.name + '">');
					_dialogHtmlEle.push('</div>');
				});
				$('body').append(_dialogHtmlEle.join(''));
				
				
				var getHtmlHeightForDial = function() {
					var _height = $('html').height() - 40;
					return _height > 2000 ? 2000 : _height;
				};
				var getHtmlWidthForDial = function() {
					var _width = $('html').width();
					return _width > 900 ? 900 : _width;
				};
				
				/*
				 * dialog事件
				 */
				var _dialog = {
					// 最大化
					max : function(dialogObj) {
						var fw = $('html').width() - 2,
							fh = $('html').height() -2,
							ft = 0;
							fl = 0;
						var _w = 0, _h = 0, _t = 0, _l = 0;
						if (fw == dialogObj.dialog('option', 'width') && fh == dialogObj.dialog('option', 'height')) {
							_w = dialogOption[dialogObj[0].id].width;
							_h = dialogOption[dialogObj[0].id].height;
							_t = dialogOption[dialogObj[0].id].top;
							_l = dialogOption[dialogObj[0].id].left;
						} else {
							_w = fw;
							_h = fh;
							_t = ft;
							_l = fl;
						}
						dialogObj.parent().css({top:_t, left:_l});
						//dialogObj.dialog('option', 'position', [_t, _l]);
						dialogObj.dialog({width: _w, height: _h});
					},
					
					// 重设大小
					resize : function() {
						if ($.browser.msie && $.browser.msie.version <= 6) {
							//
						} else {
							$('.yooDialog').dialog({height: getHtmlHeightForDial()});
						}
					},
					
					// 位置、大小信息
					dialogOption : function(dialogObj) {
						return {
							width : dialogObj.dialog('option', 'width'),
							height : dialogObj.dialog('option', 'height'),
							top : dialogObj.parent().position().top,
							left : dialogObj.parent().position().left
						};
					}
				};
				
				// 初始化 dialog
				$.each(data, function(i, n) {
					var _dialogObj = $('#' + n.id + DIALOGID_EXT);
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
							
							dialogOption[n.id + DIALOGID_EXT] = _dialog.dialogOption(_dialogObj);
						},
						resizeStart : function(event, ui) {
							window.onresize = null;
							_dialogObj.css({
								display : 'none'
							}).parent().addClass('dialogLoading');
						},
						resizeStop : function(event, ui) {
							window.onresize = _dialog.resize;
							_dialogObj.css({
								display : ''
							}).parent().removeClass('dialogLoading');
							
							dialogOption[n.id + DIALOGID_EXT] = _dialog.dialogOption(_dialogObj);
						},
						close : function() {
							//_dialogObj.dialog('destroy');
						},
						create : function() {
							var _this = $(this);
							var _html = [];
							_html.push('<a href="javascript:;" class="ui-dialog-titlebar-open ui-corner-all" role="button"><span class="ui-icon ui-icon-extlink">open</span></a>');
							_html.push('<a href="javascript:;" class="ui-dialog-titlebar-min ui-corner-all" role="button"><span class="ui-icon ui-icon-minus">min</span></a>');
							_html.push('<a href="javascript:;" class="ui-dialog-titlebar-max ui-corner-all" role="button"><span class="ui-icon ui-icon-newwin">max</span></a>');
							_this.prev().find('.ui-dialog-title').after(_html.join(''));
							_this.parent().find('.ui-dialog-titlebar-open').click(function() {
								window.open($('#' + n.id)[0].href, '_blank');
							});
							_this.parent().find('.ui-dialog-titlebar-min').click(function() {
								//_this.dialog('close');
								_this.parent().hide();
							});
							_this.parent().find('.ui-dialog-titlebar-max').click(function() {
								_dialog.max(_dialogObj);
							});
						},
						open : function() {
							window.dialogOption = {};
							dialogOption[n.id + DIALOGID_EXT] = _dialog.dialogOption(_dialogObj);
							return false;
						}
					});
				});
				
				// 绑定 icon 点击事件
				$('.dialogBtn').click(function() {
					var oId = $(this).attr('id');
					var url = $(this).attr('href');
					var type = $(this).attr('data-type');
					//exports.dialogOpen(oId, url, type, true);
					location.hash = '#dialog/' + oId;
					
					$(this).css({
						color : '#999'
					}).find('i').addClass('icon-folder-open');
					
					return false;
				});
				
				/*
				 * dialog 追加事件
				 */
				// 标题双击最大化处理
				$('.ui-dialog-titlebar').dblclick(function() {
					var _thisDialogObj = $(this).next();
					_dialog.max(_thisDialogObj);
				});
				
				window.onresize = function() {
					setContainerHeight.apply();
					_dialog.resize.apply();
				};
			});
		});
	};
	
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
			_iconsHtmlEle.push('  <a id="' + n.id + '" class="dialogBtn" href="' + n.url + '" data-type="' + n.type + '">');
			_iconsHtmlEle.push('  <i class="icon-folder-close"></i>' + n.name + '</a>');
			_iconsHtmlEle.push('</div>');
		});
		_iconsHtmlEle = $(_iconsHtmlEle.join(''));
		$(function() {
			iconsConObj.append(_iconsHtmlEle);
			
			// 绑定 icon 点击事件
			$('.dialogBtn').click(function() {
				var _containerObj = $('#pageIframe');
				var _src = $(this).attr('href');
				var _type = $(this).attr('data-type');
				if (_type == 'html') {
					_containerObj.load(_src).height('100%');
				} else {
					var _iframHtml = '<iframe id="pageIframeCon" name="pageIframeCon" border="0" class="dialogLoading"'
						+ 'frameborder="0" src="' + _src + '"></iframe>';
					_containerObj.html(_iframHtml).height('100%');
				}
				$(this).css({
					color : '#999'
				}).find('i').addClass('icon-folder-open');
				$(this).siblings().css({
					color : '#333'
				}).find('i').removeClass('icon-folder-open');
				
				return false;
			});
		});
	};
});
