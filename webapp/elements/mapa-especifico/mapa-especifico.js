Polymer('mapa-especifico', {
	page: 0,
	retornar: function() {
		console.log(this.parentNode.parentNode.$);
		this.parentNode.parentNode.$.pages.selected=0;
		// document.querySelector(".pages").selected=0;
		// this.$.pages.selected=0;
	},
	ready: function() {
		console.log("mapa especifico listo");
	},
	drop: function(ev) {
		console.log(ev);
		var data = ev.dataTransfer.getData("text");
		var dropArea = this.$.dropArea;
	},
});