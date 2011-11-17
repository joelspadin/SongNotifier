
var position = {
	top: 0x1,
	right: 0x2,
	bottom: 0x4,
	left: 0x8,
}


var settings = new function SettingsStorage() {
	// settings: [name, defaultValue]
	this.settings = [
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
	];

	/**
	 * Initializes settings
	 */
	this.init = function() {
		if (!this.get('initialized')) {
			this.reset();
			this.set('initialized', true);
		}

		this.fillDefaults();
	}

	/**
	 * Resets a setting to its default values
	 */
	this.reset = function(name) {
		for (var i = 0; i < this.settings.length; i++) {
			if (this.settings[i][0] == name) {
				this.set(name, this.settings[i][1]);
				return;
			}
		}
	}

	/**
	 * Resets all settings to their default values
	 */
	this.resetAll = function() {
		for (var i = 0; i < this.settings.length; i++)
				this.set(this.settings[i][0], this.settings[i][1]);
	}

	this.fillDefaults = function() {
		for (var i = 0; i < this.settings.length; i++) {
			if (typeof widget.preferences[this.settings[i][0]] == 'undefined')
				this.set(this.settings[i][0], this.settings[i][1]);
		}
	}

	/**
	 * Gets the value of a setting
	 */
	this.get = function(name) {
		var data = widget.preferences[name];
		if (typeof data == 'undefined')
			return null;
		return JSON.parse(data);
	}

	/**
	 * Sets the value of a setting
	 */
	this.set = function(name, value) {
		var temp = JSON.stringify(value);
		try {
			widget.preferences[name] = temp;
		}
		catch (e) {
			opera.postError('Failed to save "' + name + '". Exception was:\n' + e.name + '\n' + e.message + 
				'\nsize of data was ' + temp.length + ' characters.');
		}
	}
}
