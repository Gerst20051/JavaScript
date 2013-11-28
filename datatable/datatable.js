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
	this.data = {}; // original (unsorted) data
	this.filteredData = {}; // this.data without objects and arrays (this is used not this.data)
	this.sortedData = {}; // this.filteredData sorted according to this.sortField
	this.primers = {}; // primer function for data keys
	this.headers = []; // values of keys that act as headers in table
	this.isSort = false;
	this.isReverse = false;
	this.sortField = "";
	this.selector = "";
	this.table = "";

	this.init = function(selector){
		this.data = data;
		this.selector = selector;
		this.run();
	};

	this.run = function(){
		this.filterData();
		this.getHeaders();
		this.sortData();
		this.makeTable();
		this.insertTable();
		this.attachHandlers();
	};

	this.insertTable = function(){
		$(this.selector).html(this.table);
	};
};

DataTable.prototype.setPrimers = function(primers){
	this.primers = primers;
};

DataTable.prototype.filterData = function(){

};

DataTable.prototype.getHeaders = function(){
	this.headers = Object.keys(this.data[0]);
	this.sortField = this.headers[0];
	// filter out objects and arrays
};

DataTable.prototype.sortData = function(){
	var data;
	if (this.isSort && this.sortField.length) {
		data = this.filteredData;
		this.sortedData = data.sort(sort_by(this.sortField, this.isReverse));
	}
};

DataTable.prototype.reverse = function(){
	this.isReverse = !this.isReverse;
};

DataTable.prototype.updateData = function(data){
	this.data = data;
	this.run();
};

DataTable.prototype.parseData = function(){

};

DataTable.prototype.makeTable = function(){
	var data, table, header, body;

	if (this.isSort) {
		data = this.data;
	} else {
		data = this.sortedData;
	}

	table = "<table id=\"crunchbase\" border=\"1\">";
	header = "<thead><tr>";

	for (var i = 0; i < data.length; i++) {
		header += "<th>" + i + "</th>";
	}

	header += "</tr>";
	body = "<tbody>";

	for (var i = 0; i < data.length; i++) {
		body += "<tr>";
		body += "<td>" + i + "</td>";
		body += "</tr>";
	}

	body += "</tbody>";
	table += header + body;
	table += "</table>";

	this.table = table;
};

DataTable.prototype.refresh = function(){

};

DataTable.prototype.attachHandlers = function(){
	var $div = $(this.selector), $table = $div.find("table");

};
