// ==UserScript==
// @include http://pandora.com/*
// @include http://www.pandora.com/*
// ==/UserScript==



if (window.top == window.self) {
	
var connected = false;

window.opera.addEventListener('AfterEvent.load', function() {
	if (connected || !window.Backbone)
		return;
	
	connected = true;
	var $ = window.$;
	
	$('.playerBarSong').bind('DOMNodeInserted', function(e) {
		// Run a moment after the song starts so that the
		// album art has time to update.
		window.setTimeout(function() {
			
			var status = {
				status: 'playing',
				song: $('.playerBarSong').text(),
				artist: $('.playerBarArtist').text(),
				album: $('.playerBarAlbum').text(),
				art: $('.playerBarArt').attr('src'),
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