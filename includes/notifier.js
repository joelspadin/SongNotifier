
if (window.top == window.self) {

var notifier = null;
var timer;
var fadeTimer;
var duration = 7000;
var maxWidth = '280px';

opera.extension.onmessage = function(e) {
	switch (e.data.action) {
		case 'show':
			if (e.data.source == window.location.href)
				break;
			
			duration = e.data.duration;
			if (notifier) 
				update(e.data.status, e.data.position, e.data.fields, e.data.colors);
			else
				show(e.data.status, e.data.position, e.data.fields, e.data.colors);
			break;
	}
}

function show(status, pos, fields, colors) {
	if (notifier)
		return;
	
	var posFlags = {
		top: 0x1,
		right: 0x2,
		bottom: 0x4,
		left: 0x8,
	}
	
	var fieldFlags = {
		art: 0x1,
		artist: 0x2,
		album: 0x4,
	}
	
	
	var el = document.createElement('div');
	el.style.position = 'fixed !important';
	el.style.textAlign = 'left !important';
	el.style.fontFamily = 'sans-serif !important';
	el.style.margin = '0 !important';
	el.style.padding = '14px !important';
	el.style.borderRadius = '10px !important';
	el.style.backgroundColor = colors.backgroundColor + ' !important';
	el.style.opacity = '0 !important';
	el.style.zIndex = '9999999 !important';
	el.style.OTransition = 'opacity 0.5s !important';

	if (pos & posFlags.top)
		el.style.top = '10px !important';
	if (pos & posFlags.right)
		el.style.right = '10px !important';
	if (pos & posFlags.bottom)
		el.style.bottom = '10px !important';
	if (pos & posFlags.left)
		el.style.left = '10px !important';

	var info = document.createElement('div');
	info.style.cssFloat = 'left !important';
	info.style.minWidth = '90px !important';
	info.style.margin = '0 !important';
	info.style.padding = '0 !important';
	
	var title = document.createElement('div');
	title.textContent = status.song;
	title.style.color = colors.color + ' !important';
	title.style.fontWeight = 'bold !important';
	title.style.fontSize = '15px !important';
	title.style.lineHeight = '23px !important';
	title.style.margin = '0 !important';
	title.style.padding = '0 !important';
	title.style.overflow = 'hidden !important';
	title.style.textOverflow = 'ellipsis !important';
	title.style.whiteSpace = 'nowrap !important';
	title.style.maxWidth = maxWidth + ' !important';
	
	
	info.appendChild(title);

	if (fields & fieldFlags.artist) {
		var artist = document.createElement('div');
		artist.textContent = status.artist;
		artist.style.color = colors.color + ' !important';
		artist.style.fontSize = '14px !important';
		artist.style.lineHeight = '18px !important';
		artist.style.margin = '0 !important';
		artist.style.padding = '0 !important';
		artist.style.overflow = 'hidden !important';
		artist.style.textOverflow = 'ellipsis !important';
		artist.style.whiteSpace = 'nowrap !important';
		artist.style.maxWidth = maxWidth + ' !important';
		
		
		info.appendChild(artist);
	}
	
	if (fields & fieldFlags.album) {
		var album = document.createElement('div');
		album.textContent = status.album;
		album.style.color = colors.color + ' !important';
		album.style.fontSize = '14px !important';
		album.style.lineHeight = '18px !important';
		album.style.margin = '0 !important';
		album.style.padding = '0 !important';
		album.style.overflow = 'hidden !important';
		album.style.textOverflow = 'ellipsis !important';
		album.style.whiteSpace = 'nowrap !important';
		album.style.maxWidth = maxWidth + ' !important';
		
		info.appendChild(album);
	}
	
	el.appendChild(info);
	document.body.appendChild(el);

	if (fields & fieldFlags.art) {
		var art = document.createElement('img');
		art.src = status.art;
		art.style.display = 'block !important';
		art.style.cssFloat = 'left !important';
		art.style.margin = '0 10px 0 0 !important';
		art.style.padding = '0 !important';

		art.height = el.offsetHeight - 28;
		art.width = el.offsetHeight - 28;
		el.insertBefore(art, info);
	}

	el.addEventListener('click', hide, false);
	notifier = {
		el: el,
		title: title,
		artist: artist,
		album: album,
		art: art,
	};
	
	setTimer();
}

function update(status, position, fields, colors) {
	if (!notifier) {
		show(status, position, fields, colors);
		return;	
	}
	
	setTimer();
	
	notifier.title.textContent = status.song;
	notifier.artist.textContent = status.artist;
	notifier.album.textContent = status.album;
	notifier.art.src = status.art;
}


function hide() {
	if (!notifier)
		return;
	
	if (fadeTimer)
		clearTimeout(fadeTimer);
	
	fadeTimer = setTimeout(clean, 500);
	
	notifier.el.style.opacity = '0 !important';
}

function clean() {
	notifier.el.parentNode.removeChild(notifier.el);
	notifier = null;
}

function setTimer() {
	if (timer) {
		clearTimeout(timer);
	}
	
	if (fadeTimer) {
		clearTimeout(fadeTimer);
		fadeTimer = null;
	}
	
	timer = setTimeout(hide, duration);
	notifier.el.style.opacity = '1 !important';
}

	
}