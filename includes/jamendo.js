// ==UserScript==
// @include http://www.jamendo.com/*
// ==/UserScript==

if (window.top == window.self) {

	var connected = false;

	window.opera.addEventListener('AfterEvent.load', function() {
		if (connected || !window.Jamendo_JsConfig || !window.$)
			return;

		connected = true;
		var $ = window.$;

		$('#player .currenttrack').bind('DOMNodeInserted', function(e) {
			// Run a moment after the song starts so that the
			// album art has time to update.
			window.setTimeout(function() {

				var status = {
					status: 'playing',
					song: $('#player .currenttrack .title').text(),
					artist: $('#player .currenttrack .subtitle a:first-child').text(),
					album: $('#player .currenttrack .subtitle a:last-child').text(),
					art: $('#player .currenttrack .artwork img').attr('src'),
				}

				opera.extension.postMessage({
					action: 'update',
					status: status,
					source: window.location.href,
				});
			}, 0);
		});


	}, false);


}