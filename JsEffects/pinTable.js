
(function($) {
	/**
	 * pinTable.js
	 */
	$.fn.extend({
		// extend jQuery
		pinTable: function(row) {
			return this.each(function() {
				var $this = $(this);
				if (!$this.is("table") || !row || row < 1 ) {
					return;
				}
				var $headRow = $this.find("tr").eq(row - 1),
					width = $this.outerWidth();
				var wrapDivHeader = '<div id="divHeader" style="border-bottom-style: solid; border-bottom-width: 1px; border-bottom-color: red;" />',
					wrapTableHeader = '<table style="border-collapse: collapse; width: ' + width + '"><thead>' + $headRow.html() + '</thead></table>',
					outerWrapDiv = '<div id="outerWrapDiv" style="border: 1px solid gray; background: pink;" />',
					tableScrollDiv = '<div id="tableScrollDiv" style="border: 1px dashed #ee3ff3; overflow: auto; height: 300px;" />';
				$this.wrap(outerWrapDiv);
				$this.wrap(tableScrollDiv);
				$this.parent().parent().prepend($(wrapTableHeader).wrap(wrapDivHeader).parent());
				$this.css("width", width);
				$headRow.remove();
			});
		}
	});
})(jQuery);