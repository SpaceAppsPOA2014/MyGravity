function Sidebar(selector){
	this.view = L.control.sidebar(selector, {
      closeButton: false,
      position: 'left'
  });
}

Sidebar.prototype.show = function() {
	this.view.show();
};