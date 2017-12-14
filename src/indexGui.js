var gui = new dat.gui.GUI({ width:300,});
var gameCategory = gui.addFolder('AboutTheGame');
var optionCategory = gui.addFolder('Option');
var replayCategory = gui.addFolder('Replay');
var testCategory = gui.addFolder('Testing');
gameCategory.open();
jQuery(document).ready(function () {
jQuery('a.gallery').colorbox({ opacity:0.5 , rel:'group1',/*width:480,height:200*/ });
});

var guiAboutGame = {
	"Control" : function() {
		var a = document.getElementById("controlMsg");
		a.click();		
    },
	"AboutCube" : function(){
		var a = document.getElementById("cubeMsg");
		a.click();
	},
	"SelectStage" : "1212AWallIsBehindYouAndItsAngry",
	//"SelectStage" : "WorkingStage",
};

var guiDataSet = {
	"SavetheReplay" : function() { 
        document.getElementById('saveRPBtn').click();
    },
	"LoadtheReplay" : function() { 
        document.getElementById('loadRPBtn').click();
    },
};

var guiOption = {
	"SwitchTimerMode" : function(){
		e = $.Event('keydown');
		e.keyCode= 88;
		$('input').trigger(e);
	},
	"PlayerColor": "#FCE0CA", // CSS string
	"SkinModeOn":false,
	"UploadSkinImg" : function() { 
        document.getElementById('uploadImage').click();
    },
	"Respawn" : function(){
		e = $.Event('keydown');
		e.keyCode= 82;
		$('input').trigger(e);
	},
	"SwitchShadowMode" : function(){
		e = $.Event('keydown');
		e.keyCode= 67;
		$('input').trigger(e);
	},//67 86 66
	"SwitchShadowRec" : function(){
		e = $.Event('keydown');
		e.keyCode= 86;
		$('input').trigger(e);
	},
	"SwitchShadowPlay" : function(){
		e = $.Event('keydown');
		e.keyCode= 66;
		$('input').trigger(e);
	},
};
var guiTest =
{
	"小朋友才滑牆壁":false,
	"TouchButton":false,	
};

gameCategory.add(guiAboutGame, 'Control');
gameCategory.add(guiAboutGame, 'AboutCube');
var selectAnotherStage = gameCategory.add(guiAboutGame, 'SelectStage',["1212AWallIsBehindYouAndItsAngry","1208TheTruePath","1206PurpleStars","1205TryToUnlock","1204Move.gif","1130IceMelted","1129BumpBumpJump","1128PatientStage","1124WeeklyChallenge","BasicStage"]);

replayCategory.add(guiDataSet,"SavetheReplay");
replayCategory.add(guiDataSet,"LoadtheReplay");

optionCategory.add(guiOption,"SwitchTimerMode");
optionCategory.add(guiOption,"Respawn");
var playerColorSet = optionCategory.addColor(guiOption,"PlayerColor");
var skinOption = optionCategory.add(guiOption,"SkinModeOn");
optionCategory.add(guiOption,"UploadSkinImg");
optionCategory.add(guiOption,"SwitchShadowMode");
optionCategory.add(guiOption,"SwitchShadowRec");
optionCategory.add(guiOption,"SwitchShadowPlay");

var slideOnWallOption = testCategory.add(guiTest,"小朋友才滑牆壁");
var touchButtonOption = testCategory.add(guiTest,"TouchButton");


playerColorSet.onFinishChange(function(value) {
  document.getElementById("jumperColor").value = value;
  Respawn();
});
selectAnotherStage.onFinishChange(function(value) {
  document.getElementById("stageSelect").value = value;
  document.activeElement.blur();
  init();
});
slideOnWallOption.onChange(function(value){
		couldSlide=value;
});
touchButtonOption.onChange(function(value){
		showTouchButton=value;
});
skinOption.onChange(function(value){
		skinMode=value;
});