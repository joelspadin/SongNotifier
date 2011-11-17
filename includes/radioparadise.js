// ==UserScript==
// @include http://www.radioparadise.com/flash_player.php*
// @include http://www.radioparadise.com/flash_player_32.php*
// ==/UserScript==



if (window.top == window.self) {
	
var connected = false;

window.addEventListener('load', function() {
	if (connected)
		return;
	
	
	connected = true;
	function $(sel) {
		return document.querySelector(sel);
	}
	
	var lastStatus = {};
	
	function setup() {
	
		$('#playlist_content').addEventListener('DOMNodeInserted', function(e) {
			// Run a moment after the song starts so that the
			// album art has time to update.
			setTimeout(function() {

				var text = $('#playlist_content div a b').textContent.split(' - ');

				var status = {
					status: 'playing',
					song: text[1],
					artist: text[0],
					album: '',
					art: $('#playlist_content img').src,
				}

				if (!songsEqual(status, lastStatus)) {
					opera.extension.postMessage({
						action: 'update',
						status: status,
						source: window.location.href,
					});
				}

				lastStatus = status;
			}, 500);
		}, false);
	}
	
	function songsEqual(a, b) {
		return !!a && !!b && 
			a.song == b.song && 
			a.artist == b.artist && 
			a.album == b.album; 
	}
	
	var setupDone = false;
	document.body.addEventListener('DOMNodeInserted', function() {
		if (!setupDone && !!$('#playlist_content')) {
			setupDone = true;
			setup();
		}
	})
	
}, false);


}