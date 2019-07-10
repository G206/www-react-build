// Variables to grab buttons used
var enterBTN = document.getElementById("enterBTN");
var clearBTN = document.getElementById("clearBTN");

//	Function to convert RGB to HEX Value - From http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
    }
    function setHex (r,g,b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

// function to change background color in output box
function setColor () {
//	Variables to grab all input and output elements and hold color values
    var outputBox = document.getElementById("outputBox");
    var redVal = document.getElementById("redInput");
    var greenVal = document.getElementById("greenInput");
    var blueVal = document.getElementById("blueInput");
    var r = parseInt(redVal.value);
    var g = parseInt(greenVal.value);
    var b = parseInt(blueVal.value);
	var outputText = document.getElementById("outputText");
    var hexValue = document.getElementById("hexValue");
	var hexRGB;
	
//	Checks to see if value is within allowed range and for null values. Only passing checks is the proper disply shown
	if (isNaN(r) || isNaN(g) || isNaN(b)) {
		outputText.textContent = "Please Enter a Number in All Boxes";
	} else if ((r<0 || r>255) || (g<0 || g>255) || (b<0 || b>255)) {
		outputText.textContent = "Please Enter a Value 0 to 255";
	} else {
		outputBox.style.backgroundColor = "rgb("+r+","+g+","+b+")";
		hexRGB = setHex (r,g,b);
		hexValue.textContent = hexRGB;
		outputText.textContent = "Color Chosen Displayed";
	}
	
}
// function to clear the values in the input box and reset to default
function setClear () {
    var redVal = document.getElementById("redInput");
    var greenVal = document.getElementById("greenInput");
    var blueVal = document.getElementById("blueInput");
	var outputBox = document.getElementById("outputBox");
	var outputText = document.getElementById("outputText");
	var hexValue = document.getElementById("hexValue");
	
	redVal.value = 255;
	greenVal.value = 255;
	blueVal.value = 255;
	outputBox.style.backgroundColor = "white";
	outputText.textContent = "Color Output Box";
	hexValue.textContent = "HEX Value";
}

// Click events
enterBTN.onclick = setColor;
clearBTN.onclick = setClear;
