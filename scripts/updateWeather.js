'use strict';

Array.prototype.query = function (where, fields) {
	var results = [];
	for (var i=0; i < this.length; i++) {
		var obj = this[i];
		var match = true;
		if (where !== true) {
			var keys = Object.keys(where);
			for (var k=0; k < keys.length; k++) {
				var key = keys[k];
				if (key == 'each') continue;
				match = match && obj[key] == where[key];
			}
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
	return results;
}

var getWeather = function () {
	var wrapper = $('body > .header > #weather');
	if (wrapper.length == 0) {
		$('body > .header > .title').after('<div id="weather"></div>');
		wrapper = $('body > .header > #weather');
	}
	$.simpleWeather({
		location: 'Columbus, OH',
		zipcode: '43214',
		unit: 'f',
		success: function (weather) {
			var thu = weather;
			var display = 'Today';
			if (thu.day != 'Thu') {
				display = 'Thursday';
				thu = weather.forecast.query({ day: 'Thu' });
			}
			if (thu) {
				if (Array.isArray(thu)) thu = thu[0];
				wrapper.html(display + '&apos;s weather <span class="temperature">' + thu.high + '&deg;F</span><img src="' + thu.thumbnail + '" />' + thu.text);
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
	window.setTimeout(getWeather, 60000);
};

window.setTimeout(getWeather, 100);