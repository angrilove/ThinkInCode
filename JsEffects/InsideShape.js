
/**
 * required jquery-1.4.4.js+
 */
function inside($box, $p) {
	if ( !!$box && !!$p ) {
		var bOffset = $box.offset(),
			pOffset = $p.offset();
		console.log(bOffset, pOffset);
		if ((pOffset.left - bOffset.left) > 0 && (pOffset.top - bOffset.top) > 0) {
			return true;
		} else {
			return false;
		}
	}
}
