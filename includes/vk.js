// ==UserScript==
// @include http://vk.com/*
// @include https://vk.com/*
// @include http://vkontakte.ru/*
// @include https://vkontakte.ru/*
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
		var oldPlayFn = window.audioPlayer.setIcon;
		
        window.audioPlayer.setIcon = function() {
            var plr = window.audioPlayer;
            var song = plr.lastSong;
            //alert('!')
            oldPlayFn.apply(this, arguments);
            if(arguments[0] === 'playicon'){
                var status = {
                    status: 'playing',
                    song: song ? unescape(song[6]) : null,
                    artist: song ? unescape(song[5]) : null,
                    album: null,
                    art: null
                }

                if (!songsEqual(status, lastStatus)){
                    opera.extension.postMessage({
                        action: 'update',
                        status: status,
                        source: window.location.href
                    });
                }

                lastStatus = status;

            }

        }
	}
	
	function songsEqual(a, b) {
		return !!a && !!b && 
			a.song == b.song && 
			a.artist == b.artist
	}
	
	function unescape(html) {
		var p = document.createElement('p');
		p.innerHTML = html;
		return p.textContent;
	}
	
	var setupDone = false;
	document.body.addEventListener('DOMNodeInserted', function() {
		if (!setupDone && !!window.audioPlayer) {
			setupDone = true;
			setup();
		}
	})
	
}, false);


}