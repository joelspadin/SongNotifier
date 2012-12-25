var position = {
	top: 0x1,
	right: 0x2,
	bottom: 0x4,
	left: 0x8,
}

var settings = new SettingStorage([
	['position', position.bottom | position.right],
	['duration', 7000],
	['show_art', true],
	['show_artist', true],
	['show_album', true],
	['hide_on_source', false],

	['bkg_color', '#000000'],
	['bkg_alpha', 191],
	['text_color', '#ffffff'],
	['text_alpha', 255],
]);
