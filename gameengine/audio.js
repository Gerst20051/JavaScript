(function(win, doc, undefined){

	var HNS = win.HNS || {};

	HNS.audio = (function(){

		this.sounds = ["cling","jump","stomp"];

		this.play = function(sound){
			alert(sound);
		};

		return {
			play: this.play
		};
	})();

	win.HNS = win.HNS || {}
	win.HNS.audio = HNS.audio;

})(window, document);

window.log = function(string){
	log.history = log.history || [];
	log.history.push(string);
	if (this.console) console.log(Array.prototype.slice.call(arguments));
};

window.log.clear = function(){
	log.history = log.history || [];
	log.history.length = 0;
};
