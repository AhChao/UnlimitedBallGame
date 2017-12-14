var skinChange = function(input) 
{
	document.activeElement.blur();
    if ( input.files && input.files[0] )
    {
        var FR= new FileReader();
        FR.onload = function(e) {
          //e.target.result = base64 format picture
          d3.select("#charPicSrc").attr("href",e.target.result);
        };       
        FR.readAsDataURL( input.files[0] );
    }
};