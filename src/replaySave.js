function saveReplay()
{	
	var jsonFinData = JSON.stringify(shadowLoaction);
	var name = document.getElementById("stageSelect").value+"RP"+arriveTime+".txt";
	var type = "text/plain"
    var a = document.createElement("a");
    var file = new Blob([jsonFinData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

var loadReplay = function(event) 
{
	document.activeElement.blur();
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var text = reader.result;
        var oldData = JSON.parse(text);
        shadowLoaction = oldData;
    };
    reader.readAsText(input.files[0]);
};