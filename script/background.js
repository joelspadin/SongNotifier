
var fields = {
	art: 0x1,
	artist: 0x2,
	album: 0x4,
}

window.addEventListener('load', function() {
	
	settings.init();
	
	var hideOnSource = settings.get('hide_on_source');
	var position = settings.get('position');
	var duration = settings.get('duration');
	var fieldFlags = getFieldFlags();
	var colors = getNotifierColors();
	
	opera.extension.onmessage = function(e) {
		switch (e.data.action) {
			case 'update':
				debug(e.data.status);
				if (e.data.status.status != 'playing')
					break;
				
				opera.extension.broadcastMessage({
					action: 'show',
					source: hideOnSource ? e.data.source : null,
					status: e.data.status,
					position: position,
					duration: duration,
					fields: fieldFlags,
					colors: colors,
				});
				break;
		}
	}
	
	
	function getFieldFlags() {
		var flags = 0;
		if (settings.get('show_art'))
			flags |= fields.art;
		if (settings.get('show_artist'))
			flags |= fields.artist;
		if (settings.get('show_album'))
			flags |= fields.album;
		return flags;
	}



	window.addEventListener('storage', function(e) {
		if (!e)
			return;
		
		debug(e.key);
		
		switch (e.key) {
			case 'position':
				position = settings.get('position');
				break;
			case 'duration':
				duration = settings.get('duration');
				break;
			case 'hide_on_source':
				hideOnSource = settings.get('hide_on_source');
				break;
			case 'show_art':
			case 'show_artist':
			case 'show_album':
				fieldFlags = getFieldFlags();
				break;
			case 'bkg_color':
			case 'bkg_alpha':
			case 'text_color':
			case 'text_alpha':
				colors = getNotifierColors();
				break;
		}
	}, false);
	
	
}, false);

