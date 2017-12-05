var gui = new dat.gui.GUI();
var gameCategory = gui.addFolder('aboutTheGame');
var replayCategory = gui.addFolder('Replay');
replayCategory.open();
var guiDataSet = {
	"shadowMode" : shadowMode,
};

replayCategory.add(guiDataSet, 'shadowMode');