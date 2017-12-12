function jumpControlSim()
{
  e = $.Event('keydown');
  e.keyCode= 38; // up and A
  $('input').trigger(e);
}
function leftControlSim()
{
  e = $.Event('keydown');
  e.keyCode= leftKey;
  $('input').trigger(e);
}
function rightControlSim()
{
  e = $.Event('keydown');
  e.keyCode= rightKey;
  $('input').trigger(e);
}
function jumpControlSimUp()
{
  e = $.Event('keyup');
  e.keyCode= 38; // up and A
  $('input').trigger(e);
}
function leftControlSimUp()
{
  e = $.Event('keyup');
  e.keyCode= leftKey;
  $('input').trigger(e);
}
function rightControlSimUp()
{
  e = $.Event('keyup');
  e.keyCode= rightKey;
  $('input').trigger(e);
}