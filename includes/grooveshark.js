// ==UserScript==
// @include http://grooveshark.com/*
// @include http://www.grooveshark.com/*
// ==/UserScript==

if (window.top == window.self) {
	
var connected = false;

window.opera.addEventListener('AfterEvent.load', function() {
	if (connected || !window.Grooveshark)
		return;
	
	connected = true;
	//console.log('Grooveshark connected: ' + window.location.href);
	
	function callback(e) {
		var song = e.song;
		
		var status = {
			status: e.status,
			song: song ? song.songName : null,
			artist: song ? song.artistName : null,
			album: song ? song.albumName : null,
			art: song ? song.artURL : null,
		}
		
		opera.extension.postMessage({
			action: 'update',
			status: status,
			source: window.location.href,
		});
		
	}
	
	window.Grooveshark.setSongStatusCallback(callback);
	
}, false);


}