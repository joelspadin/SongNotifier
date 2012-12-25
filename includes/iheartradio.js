// ==UserScript==
// @include http://iheart.com/*
// @include http://www.iheart.com/*
// ==/UserScript==

if (window.top == window.self) {
	
var connected = false;

window.opera.addEventListener('AfterEvent.load', function() {
	if (connected || !window.player)
		return;
	
	connected = true;
	var $ = window.$;
	
	$('#player .songDetails .title').bind('DOMNodeInserted', function(e) {
		// Run a moment after the song starts so that the
		// album art has time to update.
		window.setTimeout(function() {
			
			var status = {
				status: 'playing',
				song: $('#player .songDetails .title').text(),
				artist: $('#player .songDetails .artist').text(),
				album: null,
				art: $('#player .songArt img').attr('src'),
			}

			opera.extension.postMessage({
				action: 'update',
				status: status,
				source: window.location.href,
			});
		}, 500);
	});
	
	
}, false);


}