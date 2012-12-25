

this.getNotifierColors = function(data) {
	data = data || {};
	var alphaScale = 1;
	data.backgroundColor = rgba(
		settings.bkg_color, 
		settings.bkg_alpha * alphaScale);
	data.color = rgba(
		settings.text_color, 
		settings.text_alpha * alphaScale);
	return data;
}

/**
 * Mixes an rgb color with an opacity and returns it in rgba() form
 */
this.rgba = function(color, opacity) {
	var a = parseInt(opacity) / 256;

	var match = color.match(/^#?([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})$/);
	if (!match)
		return 'rgba(0,0,0,' + a + ')';

	var r,g,b;
	r = parseInt(match[1], 16);
	g = parseInt(match[2], 16);
	b = parseInt(match[3], 16);

	return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}


