var fontSize;
(function(doc, win) {
				var docEl = doc.documentElement,
					resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
					recalc = function() {
						var clientWidth = docEl.clientWidth < 768 ? docEl.clientWidth : 768;
						if (!clientWidth) return;
						docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
						fontSize = 100 * (clientWidth / 375)
					};
				recalc();
				if (!doc.addEventListener) return;
				win.addEventListener(resizeEvt, recalc, false);
})
(document, window);