
// Utility functions to manipulate the DOM
var dom = new function DomUtils() {
	// makes a new element given its type, modifiers, and inner HTML
	this.make = function(element, modifiers, content) {
		var el = document.createElement(element);
		if (modifiers) {
			var mod = modifiers.split(' ');
			for (var i = 0; i < mod.length; i++) {
				if (mod[i][0] == '.') {
					el.addClass(mod[i].substr(1));
				}
				else if (mod[i][0] == '#') {
					el.id = mod[i].substr(1);
				}
				else if (mod[i][0] == '[') {
					var match = mod[i].match(/\[(.+?)(?:=(.+?))?\]/);
					if (match) 
						el.setAttribute(match[1], match[2] || '');
				}
			}
		}
		if (content)
			el.innerHTML = content;
		return el;
	}
	
	// Sets the value of a <select> element
	this.setOption = function(select, value) {
		for (var i = 0; i < select.options.length; i++) {
			if (select.options[i].value == value) {
				select.selectedIndex = i;
				return true;
			}
		}
		return false;
	}

	// Gets the checked value of a set of radio boxes
	this.getRadioValue = function(element) {
		var name = element.name;
		var inputs = element.form.elements[name];
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].checked)
				return inputs[i].value;
		}
		return null;
	}
	
}



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

HTMLElement.prototype.removeSelf = function() {
	this.parentNode.removeChild(this);
}

