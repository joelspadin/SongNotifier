// ==UserScript==
// @include http://rdio.com/*
// @include http://www.rdio.com/*
// ==/UserScript==

if (window.top == window.self) {
	
var connected = false;

window.opera.addEventListener('AfterEvent.load', function() {
	if (connected || !window.API)
		return;
	
	connected = true;
	var player = window.API.player;
	
	player.addListener({
		playStateChanged: update,
		playingTrackChanged: update,
	});
	
	var lastStatus = {};
	
	function update() {
		var status = {
			status: ['paused', 'playing', 'stopped', 'buffering', 'offline'][player.playState],
			song: player.currentTrack.name,
			artist: player.currentTrack.artist,
			album: player.currentTrack.album,
			art: player.currentTrack.icon,
		}
		
		if (!songsEqual(status, lastStatus)) {
			opera.extension.postMessage({
				action: 'update',
				status: status,
				source: window.location.href,
			});
		}

		if (status.status == 'playing') {
			lastStatus = status;
		}
	}
	
	function songsEqual(a, b) {
		return !!a && !!b && 
			a.song == b.song && 
			a.artist == b.artist && 
			a.album == b.album; 
	}
	
}, false);


}