
window.addEventListener('load', function() {
	settings.init();
}, false);

opera.extension.onmessage = function(e) {
	switch (e.data.action) {
		case 'update':
			if (e.data.status.status != 'playing')
				break;

			opera.extension.broadcastMessage({
				action: 'show',
				source: settings.hide_on_source ? e.data.source : null,
				status: e.data.status,
				position: settings.position,
				duration: settings.duration,
				fields: getFieldFlags(),
				colors: getNotifierColors(),
			});
			break;
	}
}

function getFieldFlags() {
	var fields = {
		art: 0x1,
		artist: 0x2,
		album: 0x4,
	}

	var flags = 0;
	if (settings.show_art)
		flags |= fields.art;
	if (settings.show_artist)
		flags |= fields.artist;
	if (settings.show_album)
		flags |= fields.album;
	return flags;
}



