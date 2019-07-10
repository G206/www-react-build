/*jshint esversion: 6 */

// Javascript File
// Variable for new map cell object. Used to store content of each location site
var mapCell = {
	xID: 0,
	yID: 0,
	cellID: function() {
		return this.xID.toString() + this.yID.toString();
	},
	location: function() {
		return document.getElementById(this.cellID());
	},
	itemPresent: false,
	item: "Special Items",
};

// Code to create 2 dimensional array from stackoverflow.com
var Matrix = function (rows, columns)  {
    this.rows = rows;
    this.columns = columns;
    this.myarray = new Array(this.rows);
    for (var i=0; i < this.columns; i +=1) {
        this.myarray[i]=new Array(this.rows);
    }
    return this.myarray;
};

// Variables used in game
var currentLocation;	// Variable to hold players current location on grid
// var originalLocation;	// Variable to hold players original starting location on grid
var monsterLocation;	// Variable to hold monster current location on grid
// var originalMLocation;	// Variable to hold monster original starting location on grid
// Variable to hold new location to first determine if the room is locked before actual move and if items are present in the room.
var newLocation;	 // Temporarily holds new position object
var command;		// Variable to store what command is being processed
var historyStr;		// Variable to hold your command history
var gameDone;	// Variable to hold if you are finished with the game
var firstGame = true;		// Variable to hold if this is the first time running the game
var commandsPossible = ["north", "south", "east", "west", "help"]; 		// Variable to store all possible commands.
var experienceStat = 0;
var hitPointsStat = 20;
var goldStat = 0;
var foodStat = 20;
var score = 0;
var shipID;		// Variable to store Original Ship location
var monsterID;	// Variable to store Original Monster Location

// Various X Y Variables to hold position in the map
var xPos;
var xPosOld;
var xPosMonster;
var xPosMonsterOld;
var yPos;
var yPosOld;
var yPosMonster;
var yPosMonsterOld;
// Variables to store differences between player and monster
var northDiff;
var southDiff;
var eastDiff;
var westDiff;
var shortestPath;
var shortestArray = [];
var CHASEDIFFICULTY = 3;

// HTML Element variables
var buttonStart = document.getElementById('btnStart');
var buttonReStart = document.getElementById('btnReStart');
var modalContainer = document.getElementById('modalSplash');
var splashStart = document.getElementById('splashStart');
var splashEnd = document.getElementById('splashEnd');
var theGame = document.getElementById('theGame');
var finalScore = document.getElementById('score');
var	endMsg = document.getElementById('endOutput');
var game = document.getElementById('gameOutput');
var mapStage = document.getElementById('stage');
var inputBox = document.getElementById('commandInput');
var dialogBox = document.getElementById('commandOutput');
var historyBox = document.getElementById('historyOutput');
var buttonSubmit = document.getElementById('btnSubmit');
var buttonClear = document.getElementById('btnClear');
var buttonHelp = document.getElementById('btnHelp');
var buttonExit = document.getElementById('btnExit');
var buttonAudio = document.getElementById('btnAudio');
var buttonStop = document.getElementById('btnStop');
var buttonN = document.getElementById('north');
var buttonS = document.getElementById('south');
var buttonE = document.getElementById('east');
var buttonW = document.getElementById('west');
var scorePoints = document.getElementById('scoreOutput');
var experiencePoints = document.getElementById('EPOutput');
var hitPoints = document.getElementById('HPOutput');
var gold = document.getElementById('goldOutput');
var food = document.getElementById('foodOutput');

// Variables to create and to hold the full map in a 2D grid
var rowSize = 10;
var colSize = 10;
var grid = Matrix(rowSize,colSize);

//The game map
var map =
[
	[1, 3, 0, 0, 2, 3, 0, 0, 0, 5],
	[0, 2, 3, 0, 0, 0, 0, 0, 3, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
	[0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 2, 3, 0, 0, 3, 0, 2],
	[2, 0, 0, 1, 0, 0, 1, 0, 0, 3],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 6, 0, 0, 0, 0, 2, 3, 1, 0],
	[4, 0, 0, 2, 3, 0, 0, 0, 0, 0]
];

//The game objects map
var gameObjects =
[
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//Map code
var WATER = 0;
var ISLAND = 1;
var FOOD = 2;
var PIRATE = 3;
var HOME = 4;
var SHIP = 5;
var MONSTER = 6;
var HOME_ID = "90";

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

// Function to initialize game environment
function initializeGame(rowSize, colSize) {
	var SIZE = 64;

	// Initialize Map Grid given the row and col size. Will only create objects if not ran already
	if (firstGame === true) {
		for (i=0; i<rowSize; i++){
			for (j=0; j<colSize; j++) {
				grid[i][j] = Object.create(mapCell);
				grid[i][j].xID = i;
				grid[i][j].yID = j;
				grid[i][j].item = map[i][j];
				//Populates the grid map with items from the map variable
				if	(grid[i][j].item > 0) {
					grid[i][j].itemPresent = true;
				} else {
					grid[i][j].itemPresent = false;
				}
				var cell = document.createElement("div");

				cell.id = i.toString() + j.toString();

				// Assigns the CSS Class to display the appropriate image on the map.
				switch (grid[i][j].item) {
					case 0:
						cell.className = "map_cell";
						break;
					case 1:
						cell.className = "map_cell island";
						break;
					case 2:
						cell.className = "map_cell food";
						break;
					case 3:
						cell.className = "map_cell pirate";
						break;
					case 4:
						cell.className = "map_cell home";
						break;
					case 5:
						cell.className = "map_cell ship";
						// shipID = cell.id;
						shipID = grid[i][j];
						grid[i][j].item = 0;
						grid[i][j].itemPresent = false;
						break;
					case 6:
						cell.className = "map_cell monster";
						// monsterID = cell.id;
						monsterID = grid[i][j];
						grid[i][j].item = 0;
						grid[i][j].itemPresent = false;
						break;
					default:
						break;
				}
				// Creates the actual map using DIV HTML elements with the appropriate size
				mapStage.appendChild(cell);
				cell.style.top = i * SIZE + "px";
	    		cell.style.left = j * SIZE + "px";
			}
		}
	}

	firstGame = false; 	// Makes sure objects are not recreated when Reinitialized

// Initialize / Reset game and HTML Variables
	newLocation = undefined;
	command = "";
	historyStr = "";
	gameDone = false;
	historyBox.textContent = "";
	currentLocation = document.getElementById(shipID.cellID());
	currentLocation.className = "map_cell ship";
	xPos = shipID.xID;
	yPos = shipID.yID;
	xPosOld = xPos;
	yPosOld = yPos;
	monsterLocation = document.getElementById(monsterID.cellID());
	monsterLocation.className = "map_cell monster";
	xPosMonster = monsterID.xID;
	yPosMonster = monsterID.yID;
	xPosMonsterOld = xPosMonster;
	yPosMonsterOld = yPosMonster;
	dialogBox.textContent = "";
	inputBox.value = "";
	experienceStat = 0;
	hitPointsStat = 20;
	goldStat = 0;
	foodStat = 20;
	score = 0;
	statsUpdate();
}

// Function to display appropriate image on grid
function classImage(gridContent) {
	var className;
	// Assigns the CSS Class to display the appropriate image on the map.
	switch (gridContent) {
		case 0:
			className = "map_cell";
			break;
		case 1:
			className= "map_cell island";
			break;
		case 2:
			className= "map_cell food";
			break;
		case 3:
			className = "map_cell pirate";
			break;
		case 4:
			className = "map_cell home";
			break;
		default:
			break;
	}
	return className;
}

// Function to update stats display
function statsUpdate() {
	experiencePoints.textContent = experienceStat;
	hitPoints.textContent = hitPointsStat;
	gold.textContent = goldStat;
	food.textContent = foodStat;
	score = experienceStat + (10 * goldStat);
	scorePoints.textContent = score;
}

// Function to determine if you finished the game and the final stats
function endGame() {
	console.log("End Game Call.");
	removeControls();

}

// Function to do the actual move in the game
function moveComplete (gameObject) {
	var x;
	var y;
	var xOld;
	var yOld;
	// Assign correct X & Y values to use in function
	switch (gameObject) {
		case SHIP:
			x = xPos;
			y = yPos;
			xOld = xPosOld;
			yOld = yPosOld;
			break;
		case MONSTER:
			x = xPosMonster;
			y = yPosMonster;
			xOld = xPosMonsterOld;
			yOld = yPosMonsterOld;
			break;
		default:
			break;
	}
	// Code to do the actual move based on object type
	newLocation = grid[x][y];
	switch (gameObject) {
		case SHIP:
			currentLocation.className = classImage(grid[xOld][yOld].item);
			currentLocation = grid[x][y].location();
			currentLocation.className = "map_cell ship";
			historyStr += command + "<br>";
			historyBox.innerHTML = historyStr;
			experienceStat ++;
			foodStat --;
			statsUpdate();
			if (newLocation.itemPresent === true) {
				switch (newLocation.item) {
					case FOOD:
						findFood();
						break;
					case ISLAND:
						findGold();
						break;
					case PIRATE:
						fight();
						break;
					default:
						break;
				}
			} else {
				dialogBox.textContent = "Command Successful. You have moved into a new area.";
			}
			break;
		case MONSTER:
			monsterLocation.className = classImage(grid[xOld][yOld].item);
			monsterLocation = grid[x][y].location();
			monsterLocation.className = "map_cell monster";
			break;
		default:
			break;
	}
	//Update X and Y position holder to be the same with successful move
	switch (gameObject) {
		case SHIP:
			xPosOld = x;
			yPosOld = y;
			break;
		case MONSTER:
			xPosMonsterOld = x;
			yPosMonsterOld = y;
			break;
		default:
			break;
	}
}

// Function to move the SHIP around in the game.
function movePlayer(commandStr) {
	console.log("commandStr: " + commandStr);
	// Function to display output for being next to a wall
	function nextToWall() {
		dialogBox.textContent = "You are at the edge of the world. You cannot go that direction.";
	}

	// 4 Directional movements only occur if not next to wall. If so, special handle function is called.
	switch (commandStr) {
		case "north":
			if (xPos !== 0) {
				xPosOld = xPos;
				xPos = xPos - 1;
				moveComplete (SHIP);
			} else {
				nextToWall() ;
			}
			break;
		case "south":
			if (xPos !== (rowSize-1)) {
				xPosOld = xPos;
				xPos = xPos + 1;
				moveComplete (SHIP);
			} else {
				nextToWall() ;
			}
			break;
		case "west":
			if (yPos !== 0) {
				yPosOld = yPos;
				yPos = yPos - 1;
				moveComplete (SHIP);
			} else {
				nextToWall() ;
			}
			break;
		case "east":
			if (yPos !== (colSize-1)) {
				yPosOld = yPos;
				yPos = yPos + 1;
				moveComplete (SHIP);
			} else {
				nextToWall() ;
			}
			break;
		default:
	}
	console.log("Monster Move Call");
	moveMonster();
	if (currentLocation.id == monsterLocation.id) {
		endMsg.textContent = "You have been DESTROYED by the Sea Monster. You have Lost.";
		dialogBox.textContent = "You have been DESTROYED by the Sea Monster. Click on the Exit Game button.";
		endGame();
	}
	if (currentLocation.id == HOME_ID) {
		endMsg.textContent = "You have made it the HOME PORT. You have WON.";
		dialogBox.textContent = "You have made it the HOME PORT. Your Final Score is " + score + ".Click on the Exit Game button.";
		endGame();
	}
	if (foodStat <= 0) {
		endMsg.textContent = "You have ran out of FOOD. You're crew has thrown you overboard.  You have Lost.";
		dialogBox.textContent = "You have ran out of FOOD. You're crew has thrown you overboard. Click on the Exit Game button.";
		endGame();
	}
	if (hitPointsStat <= 0 ) {
		endMsg.textContent = "You have ZERO Hit Points. You are DEAD in the water.  You have Lost.";
		dialogBox.textContent = "You have ZERO Hit Points. You are DEAD in the water. Click on the Exit Game button.";
		endGame();
	}
}
// Function to move MONSTER object
function moveMonster()
{
	//An array to store the valid direction that
	//the monster is allowed to move in
	var validDirections = [];

	//The final direction that the monster will move in
	var direction;

	// Variables to store differences between player and monster
	northDiff = xPosMonster - xPos;
	southDiff = xPos - xPosMonster;
	eastDiff = yPos - yPosMonster;
	westDiff = yPosMonster - yPos;
	shortestArray = [];
	// Determine which direction is the shortest from monster to player
	if (northDiff > 0) {
		shortestArray.push(northDiff);
	}
	if (southDiff > 0) {
		shortestArray.push(southDiff);
	}
	if (eastDiff > 0) {
		shortestArray.push(eastDiff);
	}
	if (westDiff > 0) {
		shortestArray.push(westDiff);
	}

	shortestPath = 1000;
	for (let i = 0; i < shortestArray.length; i++) {
		if (shortestPath > shortestArray[i]) {
			shortestPath = shortestArray[i];
		}
	}

	console.log("Monster X & Y: " + xPosMonster + yPosMonster);
	//Find out what kinds of things are in the cells
	//that surround the monster. If the cells contain water OR current SHIP location,
	//push the corresponding direction into the validDirections array

	if(xPosMonster > 0)
	{
		var thingAbove = grid[xPosMonster - 1][yPosMonster];
		if(thingAbove.item === WATER || thingAbove.cellID() === currentLocation.id)
		  {
			if (northDiff > southDiff) {
				if (northDiff == shortestPath) {
					for (let i = 0; i < CHASEDIFFICULTY; i++) {
						validDirections.push("north");
					}
				}
				for (let i = 0; i < CHASEDIFFICULTY; i++) {
				validDirections.push("north");
				}
			}
			validDirections.push("north");
		  }
	}
	if(xPosMonster < rowSize - 1)
	{
		var thingBelow = grid[xPosMonster + 1][yPosMonster];
		if(thingBelow.item === WATER || thingAbove.cellID() === currentLocation.id)
		  {
			  if (southDiff > northDiff) {
				  if (southDiff == shortestPath) {
					for (let i = 0; i < CHASEDIFFICULTY; i++) {
						validDirections.push("south");
					}
  				  }
		  		for (let i = 0; i < CHASEDIFFICULTY; i++) {
		  		validDirections.push("south");
		  		}
			  }
			  validDirections.push("south");
		  }
	}
  if(yPosMonster > 0)
	{
		var thingToTheLeft = grid[xPosMonster][yPosMonster - 1];
		if(thingToTheLeft.item === WATER || thingAbove.cellID() === currentLocation.id)
		  {
			  if (westDiff > eastDiff) {
					if (westDiff == shortestPath) {
						for (let i = 0; i < CHASEDIFFICULTY; i++) {
							validDirections.push("west");
						}
					}
			  		for (let i = 0; i < CHASEDIFFICULTY; i++) {
			  		validDirections.push("west");
			  		}
			  }
			  validDirections.push("west");
		  }
	}
  if(yPosMonster < colSize - 1)
	{
		var thingToTheRight = grid[xPosMonster][yPosMonster + 1];
		if(thingToTheRight.item === WATER || thingAbove.cellID() === currentLocation.id)
		  {
			  if (eastDiff > westDiff) {
					if (eastDiff == shortestPath) {
						for (let i = 0; i < CHASEDIFFICULTY; i++) {
							validDirections.push("east");
						}
					}
			  		for (let i = 0; i < CHASEDIFFICULTY; i++) {
			  		validDirections.push("east");
			  		}
			  }
			  validDirections.push("east");
		  }
	}

  //The validDirections array now contains 0 to 4 directions that the
  //contain WATER cells. Which of those directions will the monster
  //choose to move in?

  //If a valid direction was found, Randomly choose one of the
  //possible directions and assign it to the direction variable
  if(validDirections.length !== 0)
  {
    var randomNumber = Math.floor(Math.random() * validDirections.length);
    direction = validDirections[randomNumber];
  }
	console.log("Monster Directions Available: "+ validDirections);
	console.log("Monster Direction Chosen: " + direction);
  //Move the monster in the chosen direction
  switch (direction) {
	  case "north":
		  xPosMonsterOld = xPosMonster;
		  xPosMonster --;
		  moveComplete (MONSTER);
		  break;
	  case "south":
		  xPosMonsterOld = xPosMonster;
		  xPosMonster ++;
		  moveComplete (MONSTER);
		  break;
	  case "west":
		  yPosMonsterOld = yPosMonster;
		  yPosMonster --;
		  moveComplete (MONSTER);
		  break;
	  case "east":
		  yPosMonsterOld = yPosMonster;
		  yPosMonster ++;
		  moveComplete (MONSTER);
		  break;
	  default:
  }
}

// Function to handle finding food on island
function findFood() {
	var itemsFound = Math.ceil(Math.random() * 5);
	foodStat += itemsFound;
	dialogBox.textContent = "You have searched the island and found  food. Stats updated";
	statsUpdate();
}

// Function to handle finding gold on island
function findGold() {
	var itemsFound = Math.ceil(Math.random() * 5);
	goldStat += itemsFound;
	dialogBox.textContent = "You have searched the island and found gold. Stats updated";
	statsUpdate();
}

// Function to handle fighting Pirates
function fight() {
	//The ships strength
    var shipStrength = Math.ceil((hitPointsStat + experienceStat) / 2);

    //A random number between 1 and the ship's strength
    var pirateStrength = Math.ceil(Math.random() * shipStrength * 2);

    if(pirateStrength > shipStrength)
    {
	      //The pirates ransack the ship
	      var stolenGold = Math.round(pirateStrength / 2);
		  var hitPointsLost = Math.ceil(Math.random() * 5);
	      goldStat -= stolenGold;
		  if (goldStat < 0) {
		  	goldStat = 0;
		  }
	      //Give the player some experience for trying
	      experienceStat += 10;
		  //Loose Hit Points for loosing the battle
		  hitPointsStat -= hitPointsLost;

	      //Update the game message
		  dialogBox.textContent = "You were in a battle with a Pirate Ship and have LOST. Stats updated";
		  statsUpdate();
  	}
    else
    {
	      //You win the pirates' gold
	      var pirateGold = Math.round(pirateStrength / 2);
	      goldStat += pirateGold;

	      //Add some experience
	      experienceStat += 50;

	      //Update the game message
	      dialogBox.textContent = "You were in a battle with a Pirate Ship and have WON. Stats updated";
		  statsUpdate();
    }
}

// Function to clear the contents of the command input box.
function clearInput() {
	inputBox.value = "";
}

// Primary function to submit your commands to the game
function submitCommand() {
	var goodCommand = false;
	command = inputBox.value;
	command = command.toLowerCase();
	console.log("Submit Command Function: " + command);

// Figure out if a known command was entered
	for(i = 0; i < commandsPossible.length; i++)
	{
	  if (command.indexOf(commandsPossible[i]) !== -1) {
			command = commandsPossible[i];
			console.log("Command entered in Input Box: " + command);
		}
	}
// Figure out what function to call from the command given.
	switch (command) {
		case "north":
			movePlayer(command);
			break;
		case "south":
			movePlayer(command);
			break;
		case "west":
			movePlayer(command);
			break;
		case "east":
			movePlayer(command);
			break;
		case "help":
			help();
			break;
		default:
			dialogBox.textContent = "I do not know that command. Pleae reenter command or click on the Help button";
	}
}

function keydownHandler(event)
{
  switch(event.keyCode)
  {
	case UP:
		command = "north";
		movePlayer(command);
		break;

	case DOWN:
		command = "south";
		movePlayer(command);
		break;

	case LEFT:
		command = "west";
		movePlayer(command);
		break;

	case RIGHT:
		command = "east";
		movePlayer(command);
		break;
  }
}
//Function to ADD game controls
function addControls() {
	//Add a keyboard listener
	window.addEventListener("keydown", keydownHandler, false);

	// Event handlers for the buttons
	buttonN.addEventListener("click", buttnNF = function (event) {
		command = "north";
		movePlayer(command);}, false);
	buttonS.addEventListener("click", buttonSF = function (event) {
		command = "south";
		movePlayer(command);}, false);
	buttonE.addEventListener("click", buttonEF = function(event) {
		command = "east";
		movePlayer(command);}, false);
	buttonW.addEventListener("click", buttonWF = function(event) {
		command = "west";
		movePlayer(command);}, false);
	buttonSubmit.addEventListener("click", submitCommand, false);
	buttonClear.addEventListener("click", clearInput,false);
	// Allows for 'Enter' Key to be used in Input Box
	inputBox.addEventListener("keypress", inputBoxF = function (event) {
			if (event.keyCode == 13) {
				buttonSubmit.click();
			}
		}, false);
}
//Function to Remove Game Controls
function removeControls() {
	// Remove the keyboard listener to end the game
    window.removeEventListener("keydown", keydownHandler, false);
	// Remove Event handlers for the buttons
	buttonN.removeEventListener("click", buttnNF, false);
	buttonS.removeEventListener("click", buttonSF, false);
	buttonE.removeEventListener("click", buttonEF , false);
	buttonW.removeEventListener("click", buttonWF, false);
	buttonSubmit.removeEventListener("click", submitCommand, false);
	buttonClear.removeEventListener("click", clearInput,false);
	inputBox.removeEventListener("keypress", inputBoxF, false);
}
function startGame() {
	// splashStart.style.display = 'none';
	// theGame.style.display = 'flex';
	// modalContainer.style.display = 'none';
	modalContainer.style.opacity = '0';
	theGame.style.pointerEvents = 'auto';

	addControls();

	//START of Game
	 initializeGame(rowSize,colSize);
}

// Function to start New Game and Reinitialize all parameters
function newGame() {
	// splashEnd.style.display = 'none';
	// theGame.style.display = 'flex';
	modalContainer.style.opacity = '0';
	theGame.style.pointerEvents = 'auto';
	addControls();
	//START of Game
	 initializeGame(rowSize,colSize);

	console.log("newGame fuction completed");
}

// Function to exit game screen
function exitGame() {
	currentLocation.className = "map_cell";
	monsterLocation.className = "map_cell";
	finalScore.textContent = score;
	splashStart.style.display = 'none';
	splashEnd.style.display = 'block';
	modalContainer.style.opacity = '1';
	theGame.style.pointerEvents = 'none';
}

// Function to play audio file
function playAudio() {
	var audio = document.getElementById("audio");
    audio.loop = true;
	audio.play();
}

// Function to stop audio file
function stopAudio() {
	var audio = document.getElementById("audio");
	audio.pause();
}

// HELP function
function help() {
	historyBox.innerHTML = "Purpose of this game is to get to the home port with the maximum number of  experience points and gold without getting eaten by the Sea Monster or runnig out of food. You get experience points for every time you move but every move cost you 1 food. You find food and gold by searching the islands. Every gold piece is equal to 10 experience points in the end total. <br><br>You have the option to fight the Pirate Ships. You will get 10 experience points for attempting the fight. If you win, you get 50 experience points and a random amount of gold found. If you loose, you will loose Hit Points and Gold.<br><br>Valid Commands are as follows: 'north', 'south', 'east', 'west', and 'help'. <br><br>You can optionally use the direction arrow buttons to move around or arrow KEYS on your keyboard. <br><br>Once commands are entered, you can either click the 'Submit' button or hit the 'Enter' key. Game ends once you make it to the Home Port, get eaten by the Sea Monster, run out of food, or loose all your Hit Points.";
}


// Event Handlers for the buttons below Input Box
buttonHelp.addEventListener("click", help, false);
buttonExit.addEventListener("click", exitGame, false);
buttonAudio.addEventListener("click", playAudio, false);
buttonStop.addEventListener("click", stopAudio, false);
buttonStart.addEventListener('click', startGame, false);
buttonReStart.addEventListener('click', newGame, false);
