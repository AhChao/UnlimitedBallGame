var hasGP = false;
var repGP;
var gpUPDown = false;
var gpLeftDown = false;
var gpRightDown = false;

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];
    var html = "";
        html += "Pad id: "+gp.id+" | ";
    html+= "pressed : ";

    e = $.Event('keydown');
    if(gp.buttons[9].pressed)
    {
      html+= "Start ";
      e.keyCode= 90;
      $('input').trigger(e);
    }
    if(gp.buttons[12].pressed||gp.buttons[0].pressed)
    {
      html+= "Jump ";
      gpUPDown=true;
      e.keyCode= 38; // up and A
      $('input').trigger(e);
    } 
    if(gp.buttons[14].pressed)
    {
      html+= "Left ";
      gpLeftDown=true;
      e.keyCode= leftKey;
      $('input').trigger(e);
    } 
    if(gp.buttons[15].pressed)
    {
      html+= "Right ";
      gpRightDown=true;
      e.keyCode= rightKey;
      $('input').trigger(e);
    }

    e = $.Event('keyup');
    if(gpUPDown==true&&!gp.buttons[12].pressed&&!gp.buttons[0].pressed)
    {
      e.keyCode=38;
      gpUPDown=false;
      $('input').trigger(e);
    }
    if(gpLeftDown==true&&!gp.buttons[14].pressed)
    {
      e.keyCode=leftKey;
      gpLeftDown=false;
      $('input').trigger(e);
    }
    if(gpRightDown==true&&!gp.buttons[15].pressed)
    {
      e.keyCode=rightKey;
      gpRightDown=false;
      $('input').trigger(e);
    }

    $("#gamepadDisplay").html(html);
}

$(document).ready(function() { 

if(canGame()) {
    var prompt = "【To begin using your gamepad, connect it and press any button!】";
    $("#gamepadPrompt").text(prompt);

    $(window).on("gamepadconnected", function() {
        hasGP = true;
        $("#gamepadPrompt").html("【Gamepad connected!】");
        console.log("connection event");
        repGP = window.setInterval(reportOnGamepad,timeInterval);
    });

    $(window).on("gamepaddisconnected", function() {
        console.log("disconnection event");
        $("#gamepadPrompt").text(prompt);
        window.clearInterval(repGP);
    });

    //setup an interval for Chrome
    var checkGP = window.setInterval(function() {
        //console.log('checkGP');
        if(navigator.getGamepads()[0]) {
            if(!hasGP) $(window).trigger("gamepadconnected");
            window.clearInterval(checkGP);
        }
    }, 500);
}

});