var sort_by = function(field, reverse, primer){
	var key = function(x){
		return primer ? primer(x[field]) : x[field];
	};

	return function(a,b){
		var A = key(a), B = key(b);
		return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1,1][+!!reverse];                  
	}
};

var DataTable = function(data){
	this.data = []; // original (unsorted) data
	this.filteredData = []; // this.data without objects and arrays (this is used not this.data)
	this.sortedData = []; // this.filteredData sorted according to this.sortField
	this.primers = {}; // primer function for data keys
	this.headers = []; // values of keys that act as headers in table
	this.isSort = false;
	this.isReverse = false;
	this.sortField = "";
	this.selector = "";
	this.table = "";

	this.init = function(selector){
		this.data = data;
		this.filteredData = JSON.parse(JSON.stringify(data));
		this.selector = selector;
		this.attachHandlers();
		this.run();
	};

	this.run = function(){
		this.filterData();
		this.getHeaders();
		this.refresh();
	};

	this.refresh = function(){
		this.sortData();
		this.makeTable();
		this.insertTable();
	};

	this.insertTable = function(){
		$(this.selector).html(this.table);
	};
};

DataTable.prototype.setPrimers = function(primers){
	this.primers = primers;
};

DataTable.prototype.filterData = function(){
	var data = this.filteredData, object = data[0], badkeys = [];
	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			if (typeof object[key] == "object" || object[key] instanceof Array) {
				badkeys.push(key);
			}
		}
	}
	for (var i = 0; i < data.length; i++) {
		object = data[i];
		for (key in object) {
			if (object.hasOwnProperty(key) && badkeys.indexOf(key) > -1) {
				delete object[key];
			}
		}
		data[i] = object;
	}
	this.sortedData = JSON.parse(JSON.stringify(data));
};

DataTable.prototype.getHeaders = function(){
	this.headers = Object.keys(this.filteredData[0]);
};

DataTable.prototype.sortData = function(){
	if (this.isSort && this.sortField.length) {
		this.sortedData.sort(sort_by(this.sortField, this.isReverse));
	}
};

DataTable.prototype.reverse = function(){
	this.isReverse = !this.isReverse;
};

DataTable.prototype.updateData = function(data){
	this.data = data;
	this.filteredData = JSON.parse(JSON.stringify(data));
	this.run();
};

DataTable.prototype.makeTable = function(){
	var data, i, ii, il, row, key, table, header, body;

	if (!this.isSort) {
		data = this.data;
	} else {
		data = this.sortedData;
	}

	table = "<table id=\"crunchbase\">";
	header = "<thead><tr>";

	for (i = 0, il = this.headers.length; i < il; i++) {
		header += "<th>" + this.headers[i] + "</th>";
	}

	header += "</tr></thead>";
	body = "<tbody>";

	for (i = 0; i < data.length; i++) {
		body += "<tr>";
		for (key in data[i]) {
			body += "<td>" + data[i][key] + "</td>";
		}
		body += "</tr>";
	}

	body += "</tbody>";
	table += header + body;
	table += "</table>";

	this.table = table;
};

DataTable.prototype.attachHandlers = function(){
	var $div = $(this.selector), self = this;
	$div.on('click', 'th', function(){
		var field = $(this).text();
		if (field.length) {
			self.isSort = true;
			if (field != self.sortField) {
				self.sortField = field;
			} else {
				self.reverse();
			}
			self.refresh();
		}
	});
};
