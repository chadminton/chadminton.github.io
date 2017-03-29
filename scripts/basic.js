
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

String.prototype.padLeft(len, pad) {
	var ret = this;
	while (ret.length < len) {
		ret = pad + ret;
	}
	return ret;
};

Date.prototype.getMonthName = function () {
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return monthNames[this.getMonth()];
}

Date.prototype.getDayName = function () {
	var dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	return dayNames[this.getDay()];
}

Date.prototype.get12Hours = function () {
	var hour = this.getHours() % 12;
	if (hour == 0) hour = 12;
	return hour;
}

Date.prototype.toStringFormat = function (format) {
	format = format.replace(/yyyy/g, this.getFullYear());
	format = format.replace(/yy/g, this.getFullYear().toString().substring(2));
	
	format = format.replace(/MMMM/g, this.getMonthName());
	format = format.replace(/MMM/g, this.getMonthName().substring(0, 3).toUpperCase());
	format = format.replace(/MM/g, (this.getMonth() + 1).toString().padLeft(2, '0'));
	format = format.replace(/M/g, (this.getMonth() + 1));
	
	format = format.replace(/dddd/g, this.getDayName());
	format = format.replace(/ddd/g, this.getDayName().substring(0, 3).toUpperCase());
	format = format.replace(/dd/g, this.getDate().toString().padLeft(2, '0'));
	format = format.replace(/d/g, (this.getDate() + 1));
	
	format = format.replace(/HH/g, this.getHours().toString().padLeft(2, '0'));
	format = format.replace(/H/g, this.getHours());
	format = format.replace(/hh/g, this.get12Hours().toString().padLeft(2, '0'));
	format = format.replace(/h/g, this.get12Hours());
	
	format = format.replace(/mm/g, this.getMinutes().toString().padLeft(2, '0'));
	format = format.replace(/m/g, this.getMinutes());
	
	format = format.replace(/ss/g, this.getSeconds().toString().padLeft(2, '0'));
	format = format.replace(/s/g, this.getSeconds());
	
	format = format.replace(/ampm/g, this.getHours() > 11 ? 'pm' : 'am');
	
	return format;
}

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

Array.prototype.query = function (where, fields) {
	var results = [];
	for (var i=0; i < this.length; i++) {
		var obj = this[i];
		var match = true;
		for (var key in where) {
			match = match && obj[key] == where[key];
		}
		if (match) {
			if (fields) {
				var copy = {};
				for(var f=0; f < fields.length; f++) {
					var field = fields[f]; 
					copy[field] = obj[field];
				}
				results.push(copy);
			} else {
				results.push(obj);
			}
		}
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