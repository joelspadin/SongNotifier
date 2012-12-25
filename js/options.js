$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

// Utility functions for HTML elements

HTMLElement.prototype.hasClass = function(className) {
	return this.className.split(' ').indexOf(className) != -1;
}

HTMLElement.prototype.addClass = function(className) {
	if (!this.hasClass(className))
		this.className = (this.className + ' ' + className).trim();
}

HTMLElement.prototype.removeClass = function(className) {
	this.className = this.className.split(' ').filter(function(item) {
		return item != className;
	}).join(' ');
}

HTMLElement.prototype.appendChildren = function(newChildren) {
	for (var i = 0; i < newChildren.length; i++) {
		this.appendChild(newChildren[i]);
	}
}

HTMLElement.prototype.setClass = function(className, enable) {
	if (enable)
		this.addClass(className);
	else
		this.removeClass(className);
}

HTMLElement.prototype.removeSelf = function() {
	this.parentNode.removeChild(this);
}

function secondsToMs(seconds) {
	return seconds * 1000;
}

function msToSeconds(ms) {
	return ms / 1000;
}



addEventListener('DOMContentLoaded', function() {
	var meta = {
		'#widget-name': widget.name,
		'#widget-author': widget.author,
		'#widget-version': widget.version,
	}

	for (sel in meta) {
		if (meta.hasOwnProperty(sel)) {
			document.querySelector(sel).textContent = meta[sel];
		}
	}

	var notifier = $('#notifier');
	var posbuttons = Array.prototype.slice.call($$('.posbutton'));

	posbuttons.forEach(function(button) {
		button.innerHTML = notifier.innerHTML;
		
		if (settings.position == button.dataset.value)
			button.addClass('selected');

		button.addEventListener('click', function(e) {
			posbuttons.forEach(function(x) { x.removeClass('selected') });
			e.target.addClass('selected');
			settings.position = e.target.dataset.value
		}, false);
	});

	var notifierStyle = document.createElement('style');
	document.head.appendChild(notifierStyle);

	function updateNotifier() {
		var ct = $('#positionbox');

		ct.setClass('noart', !settings.show_art);
		ct.setClass('noartist', !settings.show_artist);
		ct.setClass('noalbum', !settings.show_album);

		var colors = getNotifierColors();
		notifierStyle.innerHTML = '.notifier {' +
			'color:' + colors.color + ';' +
			'background-color:' + colors.backgroundColor + ';';
	}

	var deferNotifierUpdate = setTimeout.bind(null, updateNotifier, 0);
	['#show_art', '#show_artist', '#show_album', '#bkg_color', '#bkg_alpha', '#text_color', '#text_alpha']
		.forEach(function(item) {
			$(item).addEventListener('change', deferNotifierUpdate, false);
		});

	updateNotifier();

}, false);

addEventListener('keypress', function(e) {

	// Press ~ to list storage
	if (e.keyCode == 96) {
		$('#storage_list').innerHTML = '';
		$('#storage_list').appendChild(OptionsPage.debugStorage(natcompare));
		$('#options_debug').style.display = 'block';
	}
	// Press Shift + ~ to hide storage
	else if (e.keyCode == 126) {
		$('#options_debug').style.display = 'none';
	}

}, false);