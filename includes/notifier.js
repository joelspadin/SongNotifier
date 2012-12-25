
if (window.top === window.self) {

var notifier = null;
var timer;
var fadeTimer;
var duration = 7000;
var maxWidth = '280px';

opera.extension.onmessage = function(e) {
	if (e.data.action === 'show') {
		if (e.data.source === window.location.href)
			return;
		
		duration = e.data.duration;
		if (notifier) 
			update(e.data.status, e.data.position, e.data.fields, e.data.colors);
		else
			show(e.data.status, e.data.position, e.data.fields, e.data.colors);
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
	var s = el.style;
	s.position = 'fixed !important';
	s.textAlign = 'left !important';
	s.fontFamily = 'sans-serif !important';
	s.margin = '0 !important';
	s.padding = '14px !important';
	s.borderRadius = '10px !important';
	s.backgroundColor = colors.backgroundColor + ' !important';
	s.opacity = '0 !important';
	s.zIndex = '9999999 !important';
	s.OTransition = 'opacity 0.5s !important';
	s.width = el.style.height = 'auto !important';

	if (pos & posFlags.top)
		el.style.top = '10px !important';
	if (pos & posFlags.right)
		el.style.right = '10px !important';
	if (pos & posFlags.bottom)
		el.style.bottom = '10px !important';
	if (pos & posFlags.left)
		el.style.left = '10px !important';

	var info = document.createElement('div');
	s = info.style;
	s.cssFloat = 'left !important';
	s.minWidth = '90px !important';
	s.margin = '0 !important';
	s.padding = '0 !important';
	s.width = info.style.height = 'auto !important';
	
	var title = document.createElement('div');
	title.textContent = status.song;
	s = title.style;
	s.color = colors.color + ' !important';
	s.fontWeight = 'bold !important';
	s.fontSize = '15px !important';
	s.lineHeight = '23px !important';
	s.margin = '0 !important';
	s.padding = '0 !important';
	s.overflow = 'hidden !important';
	s.textOverflow = 'ellipsis !important';
	s.whiteSpace = 'nowrap !important';
	s.maxWidth = maxWidth + ' !important';
	
	info.appendChild(title);

	if (fields & fieldFlags.artist) {
		var artist = document.createElement('div');
		artist.textContent = status.artist;
		s = artist.style;
		s.color = colors.color + ' !important';
		s.fontSize = '14px !important';
		s.lineHeight = '18px !important';
		s.margin = '0 !important';
		s.padding = '0 !important';
		s.overflow = 'hidden !important';
		s.textOverflow = 'ellipsis !important';
		s.whiteSpace = 'nowrap !important';
		s.maxWidth = maxWidth + ' !important';

		info.appendChild(artist);
	}
	
	if (fields & fieldFlags.album) {
		var album = document.createElement('div');
		album.textContent = status.album;
		s = album.style;
		s.color = colors.color + ' !important';
		s.fontSize = '14px !important';
		s.lineHeight = '18px !important';
		s.margin = '0 !important';
		s.padding = '0 !important';
		s.overflow = 'hidden !important';
		s.textOverflow = 'ellipsis !important';
		s.whiteSpace = 'nowrap !important';
		s.maxWidth = maxWidth + ' !important';
		
		info.appendChild(album);
	}
	
	el.appendChild(info);
	document.body.appendChild(el);

	if (fields & fieldFlags.art && status.art) {
		var art = document.createElement('img');
		art.src = status.art;
		s = art.style;
		s.display = 'block !important';
		s.cssFloat = 'left !important';
		s.margin = '0 10px 0 0 !important';
		s.padding = '0 !important';
		
		art.height = el.offsetHeight - 28;
		art.width = el.offsetHeight - 28;
		s.height = art.height + 'px !important';
		s.width = art.height + 'px !important';
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
	
	var art = notifier.art,
		s = art.style;

	art.src = status.art;
	art.height = notifier.el.offsetHeight - 28;
	art.width = notifier.el.offsetHeight - 28;
	s.height = art.height + 'px !important';
	s.width = art.height + 'px !important';
}

function hide() {
	if (!notifier)
		return;
	
	clearTimeout(fadeTimer);
	
	fadeTimer = setTimeout(clean, 500);
	notifier.el.style.opacity = '0 !important';
}

function clean() {
	notifier.el.parentNode.removeChild(notifier.el);
	notifier = null;
}

function setTimer() {
	clearTimeout(fadeTimer);
	clearTimeout(timer);
	fadeTimer = null;
	timer = setTimeout(hide, duration);
	notifier.el.style.opacity = '1 !important';
}

}