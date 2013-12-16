(function($) {
	$.extend($.fn, {
		jPanel: function(options) {
			var op = $.extend({header: "panelHeader", headerContent: "panelHeaderContent", content: "panelContent", footer: "panelFooter", footerContent: "panelFooterContent"}, options);
			
			return this.each(function() {
				var $panel = $(this).wrap("<div><div></div></div>");
				var $title = $("h1", $panel).
			});
		}
	});
})(jQuery);