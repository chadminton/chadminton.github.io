
var get = function (query) {
	return document.querySelectorAll(query);
};

		
var getJSONfile = function (filename, callback) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
	// code for older browsers
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			try {
				callback(JSON.parse(this.responseText));
			} catch (ex) {
				callback(ex);
			}
		}
	};

	if (window.location.protocol == 'file:') {
		switch(filename) {
			default:
				return [];
		}
	} else {
		xmlhttp.open("GET", filename, true);
		xmlhttp.send();
	}
};

Array.prototype.getElementById = function (id) {
	var value = null;
	for (var i in this) {
		if (this[i].id == id) {
			value = this[i];
			break;
		}
	}
	return value;
}

var getLocalValue = function (key) {
	var value = window.localStorage.getItem(key);
	if (typeof value == 'undefined' || value == 'undefined') {
		window.localStorage.removeItem(key);
		value = null;
	}
	try {
		if (value) {
			value = JSON.parse(value);
		}
	} catch (e) { }

	return value;
};

var setLocalValue = function (key, value) {
	try {
		if (typeof value == 'undefined' || value == 'undefined') {
			return;
		}
		value = JSON.stringify(value);
	} catch (e) { }

	window.localStorage.setItem(key, value);
	};

var clearLocalValue = function (key) {
	window.localStorage.removeItem(key);
};