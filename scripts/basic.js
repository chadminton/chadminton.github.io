
var get = function (query) {
	return document.querySelectorAll(query);
};

var getFile = function (filename, callback) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
	// code for older browsers
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(this.responseText);
		}
	};

	if (window.location.protocol == 'file:') {
		switch(filename) {
			default:
				return '';
		}
	} else {
		xmlhttp.open("GET", filename, true);
		xmlhttp.send();
	}
};
		
var getJSONfile = function (filename, callback) {
	getFile(filename, function (value) {
		var o;
		try {
			o = JSON.parse(value);
		} catch (ex) {
			o = ex;
		}
		callback(o);
	});
};

Object.prototype.each = function (callback) {
	var keys = Object.keys(this);
	for (var i=0; i < keys.length; i++) {
		callback(this[keys[i]], keys[i], this);
	}
}

Array.prototype.each = function (callback) {
	for (var i=0; i < this.length; i++) {
		callback(this[i], i, this);
	}
}

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