// HTML button elements
var buttonMove = document.getElementById('btnMove');
var buttonStop = document.getElementById('btnStop');

//Variable to store setTimeout - Used to control Smurf movement
var setTimeoutVar;

//Create the smurf object
var smurf =
{
    // Variables to determine location on canvas
	x: 0,
	y: 64,

    //The tilesheet image, its size, and the number of columns it has
    IMAGE: "_images/smurf_sprite.png",
    SIZE: 128,
    COLUMNS: 4,

    //The numbers of the animation frames and the starting frame
    numberOfFrames: 15,
    currentFrame: 0,

    //Properties of the animation frames's x and
    //y positions on the tile sheet.
    //They're 0 when this object first loads
    sourceX: 0,
    sourceY: 0,

    //A variable to control the direction of the loop
    forward: true,

    //The smurf's updateAnimation method
    updateAnimation: function()
    {
    this.sourceX = Math.floor(this.currentFrame % this.COLUMNS) * this.SIZE;
    this.sourceY = Math.floor(this.currentFrame / this.COLUMNS) * this.SIZE;

      //If the last frame has been reached, set forward to false
      if(this.currentFrame === this.numberOfFrames)
    {
      this.forward = false;
    }

    //If the first frame has been reached, set forward to true
    if(this.currentFrame === 0)
    {
      this.forward = true;
    }

    //Add 1 to currentFrame if forward is true, subtract 1 if it's false
	  if(this.forward)
	  {
	    this.currentFrame++;
	  }
	  else
	  {
	   this.currentFrame--;
	  }
  }
};

//Set up the canvas and drawing surface
var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

//Load the animation tile sheet
var image = new Image();
image.src = smurf.IMAGE;
// image.addEventListener("load", render(), false);

function loadHandler()
{
    //Start the animation
    updateAnimation();
}

function updateAnimation()
{
    //Set a timer to call updateAnimation every 33 milliseconds - approx. 30FPS
    setTimeoutVar = setTimeout(updateAnimation, 33);

    //Update the smurf's animation frames
    smurf.updateAnimation();

    //Update the X position of the smurf
    if (smurf.x + smurf.SIZE > canvas.width) {
        smurf.x = canvas.width - smurf.SIZE;
    } else {
        smurf.x = smurf.x + 1;
    }

    //Render the animation
    render();
}

function render()
{
    //Clear the canvas of any previous frames
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

    //Draw the smurf's current animation frame
    drawingSurface.drawImage
    (
        image,
        smurf.sourceX, smurf.sourceY, smurf.SIZE, smurf.SIZE,
        Math.floor(smurf.x), Math.floor(smurf.y), smurf.SIZE, smurf.SIZE
    );
}

// Function to stop animation
function stopAnimation() {
    clearTimeout(setTimeoutVar);
}

// Event Listeners
window.addEventListener("load", render, true);
buttonMove.addEventListener('click', loadHandler, false);
buttonStop.addEventListener('click', stopAnimation, false);
