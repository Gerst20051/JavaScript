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
	this.data = {};
	this.sortedData = {};
	this.headers = [];
	this.isSort = false;
	this.isReverse = false;
	this.sortField = "";
	this.selector = "";
	this.table = "";

	this.init = function(selector){
		this.data = data;
		this.selector = selector;
		this.getHeaders();
		this.sortData();
		this.attachHandlers();
	};

	this.insertTable = function(){
		$(this.selector).html(this.table);
	};
};

DataTable.prototype.sortData = function(){
	if (this.isSort) {

	}
};

DataTable.prototype.updateData = function(data){
	this.data = data;
};

DataTable.prototype.parseData = function(){

};

DataTable.prototype.reverse = function(){
	this.isReverse = !this.isReverse;
};

DataTable.prototype.getHeaders = function(){
	this.headers = Object.keys(this.data[0]);
	this.sortField = this.headers[0];
	// filter out objects and arrays
};

DataTable.prototype.makeTable = function(){

	var data = this.sortedData, table;

	homes.sort(sort_by('price', true, parseInt));

	for (var i = 0; i < data.length; i++) {
		table += '<li>- ' + homes[i].price + ', ' + homes[i].city + '</li>';
	}

	homes.sort(sort_by('city', false, function(a){
		return a.toUpperCase();
	}));

	var u2 = document.getElementById('u2');
	for (i = 0; i < homes.length; i++) {
		u2.innerHTML += '<li>- ' + homes[i].city + ', ' + homes[i].price + '</li>';
	}
};

DataTable.prototype.refresh = function(){

};

DataTable.prototype.attachHandlers = function(){
	var div = $(this.selector);

};
