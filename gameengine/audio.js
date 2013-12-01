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
