'use strict';

(function () {
	var hasScrolled = false;
	var autoScrolled = false;
	
	window.setTimeout(function () {
		document.body.onscroll = function () {
			if (autoScrolled) autoScrolled = false;
			else hasScrolled = true;
		};
	}, 100);
	
	window.setTimeout(function () {
		if (!hasScrolled && document.body.scrollTop == 0) {
			easyScroll();
		}
	}, 15000);
	
	var scrollTarget = 0;
	var scrollLeft = Math.min(600, window.innerHeight);
	var easyScroll = function () {
		if (hasScrolled) return;
		scrollTarget += scrollLeft/10;
		scrollLeft = 9*scrollLeft/10;
		autoScrolled = true;
		window.scrollTo(0, scrollTarget);
		if (scrollLeft > 1) {
			window.setTimeout(easyScroll, 24);
		}
	};
})();