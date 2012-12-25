// ==UserScript==
// @include http://music.google.com/music/listen*
// @include https://music.google.com/music/listen*
// @include http://play.google.com/music/listen*
// @include https://play.google.com/music/listen*
// ==/UserScript==

if (window.top == window.self) {
	
var connected = false;

window.opera.addEventListener('AfterEvent.load', function() {
	if (connected || window.USER_ID === undefined)
		return;
	
	connected = true;
	var $ = function(a) { return document.querySelector(a) };
	
	var lastStatus = {};
	
	$('#player .player-left').addEventListener('DOMNodeInserted', function(e) {
		
		if (!window.playerSongTitle || e.srcElement.id != 'playerSongTitle')
			return;
		
		// Run a moment after the song starts so that the
		// album art has time to update.
		window.setTimeout(function() {
			
			var status = {
				status: 'playing',
				song: window.playerSongTitle.textContent,
				artist: window.playerArtist.textContent,
				album: null,
				art: window.playingAlbumArt.src,
			}
			
			// Attempt to find the album's title
			var indicator = $('#song_indicator');
			if (indicator && indicator.parentNode && indicator.parentNode.parentNode
					&& indicator.parentNode.parentNode.parentNode) {
				var row = indicator.parentNode.parentNode.parentNode;
				var album = row.querySelector('td:nth-child(4)');
				if (album) {
					status.album = album.textContent;
				}
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
	
	function songsEqual(a, b) {
		return !!a && !!b && 
			a.song == b.song && 
			a.artist == b.artist && 
			a.album == b.album; 
	}
	
}, false);


}