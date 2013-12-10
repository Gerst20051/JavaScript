/*
 ***********************************************
 *** CalendarBuilder created by Andrew Gerst ***
 ***********************************************
 */

 /*

 Each event is represented by a JS object with a start and end attribute.
 The value of these attributes is the number of minutes since 9am.
 So {start:30, end:90) represents an event from 9:30am to 10:30am.
 The events should be rendered in a container that is
 620px wide (600px + 10px padding on the left/right) and
 720px high (the day will end at 9pm).

 */

var sort_by = function(field, reverse, primer){
	var key = function(x){
		return primer ? primer(x[field]) : x[field];
	};

	return function(a,b){
		var A = key(a), B = key(b);
		return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1,1][+!!reverse];                  
	}
};

var CalendarEvent = function(start, end){
	this.start = start;
	this.end = end;
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.order = 0;
	this.depth = 1;

	this.compute = function(){
		this.w = 600 / this.depth;
		this.h = this.end - this.start;
		this.x = this.order * this.w;
		this.y = this.start;
	};
};

var CalendarBuilder = function(){
	this.data = [];
	this.sortedData = [];
	this.selector = "";
	this.startHour = 9;
	this.endHour = 21;
	this.events = [];
	this.output = [];
	this.tree = [];

	this.config = function(selector){
		this.selector = selector;
		return this;
	};

	this.run = function(){
		this.events.length = 0;
		this.output.length = 0;
		this.tree.length = 0;
		this.sortData();
		this.parseEvents();
		this.findDepths();
		this.setupCalendar();
		this.printCalendar();
	};
};

CalendarBuilder.prototype.sortData = function(){
	this.sortedData.sort(sort_by('start', true));
};

CalendarBuilder.prototype.setEvents = function(data){
	this.data = data || [];
	this.sortedData = JSON.parse(JSON.stringify(this.data));
	return this;
};

CalendarBuilder.prototype.updateEvents = function(data){
	if (data) {
		this.output.length = 0;
		if (typeof data == "object") {
			this.data = data;
			this.sortedData = JSON.parse(JSON.stringify(data));
		} else if (typeof data == "string") {
			this.data = JSON.parse(data);
			this.sortedData = JSON.parse(data);
		}
		this.run();
	}
};

CalendarBuilder.prototype.parseEvents = function(){
	_this = this;
	this.sortedData.forEach(function(event){
		var evt = new CalendarEvent(event.start, event.end);
		evt.compute();
		_this.events.push(evt);
	});
};

CalendarBuilder.prototype.findDepths = function(){
	_this = this;
	this.events.forEach(function(event, index){
		for (var i = index + 1; i < _this.events.length; i++) {
			if (_this.events[i].begin <= event.end) {
				event.depth++;
				_this.events[i].depth++;
				_this.events[i].order++;
			}
		}
	});
};

CalendarBuilder.prototype.createEvent = function(e){
	var html = [], style = 'height: ' + e.h + 'px; left: ' + (e.x + 10) + 'px; top: ' + e.y + 'px; width: ' + e.w + 'px;';
	html.push('<div class="calendarevent" style="' + style + '">');
	html.push('<div class="eventborder"></div>');
	html.push('<div class="eventcontent">');
	html.push('<div class="eventdisplay">');
	html.push('<div class="eventtitle">Sample Item</div>');
	html.push('<div class="eventtext">Sample Location</div>');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');
	return html.join('');
};

CalendarBuilder.prototype.createTimeline = function(){
	var html = [],
		currentHour = this.startHour,
		hours = ((this.endHour - this.startHour) * 2) + 1,
		prefix = "AM",
		hour = this.startHour,
		i;

	for (i = 0; i < hours; i++) {
		html.push('<div>');
		if (currentHour === 12) { prefix = "PM"; }
		if (currentHour === 24) { prefix = "AM"; }
		if (hour === 0) hour = 12;
		if (i % 2 === 0) {
			html.push('<span class="bigtime">' + hour + ':00</span>');
			html.push('<span class="smalltime">' + prefix + '</span>');
		} else {
			html.push('<span class="smalltime">' + hour + ':30</span>');
			currentHour++;
			hour++;
			if (hour > 12) hour = 1;
		}
		html.push('</div>');
	}
	return html.join('');
};

CalendarBuilder.prototype.setupCalendar = function(){
	var html = [], _this = this;
	html.push('<div class="calendartimeline">' + this.createTimeline() + '</div>');
	html.push('<div class="calendardisplay">');
	this.events.forEach(function(event){
		//console.log(event);
		html.push(_this.createEvent(event));
	});
	html.push('</div>');
	this.output.push(html.join(''));
};

CalendarBuilder.prototype.printCalendar = function(){
	document.getElementById(this.selector.slice(1)).innerHTML = this.output.join('');
};
