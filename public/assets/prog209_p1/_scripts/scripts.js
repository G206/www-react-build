// Javascript File
// Variable for new map cell object. Used to store content of each location site
var mapCell = {
	xID: 0,
	yID: 0,
	cellID: function() {
		return this.xID.toString() + this.yID.toString();
	},
	// cellID: this.xID.toString() + this.yID.toString(),
	location: function() {
		return document.getElementById(this.cellID());
	},
	// location:  document.getElementById(this.cellID()),
	description: "Description of Map Location",
	image: "Location of Image File",
	itemPresent: false,
	item: "Special Items",
	locked: false,
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
var currentLocation;
// Variable to hold new location to first determine if the room is locked before actual move and if items are present in the room.
var newLocation;	 // Temporarily holds new position object
var backpack;		// Variable to hold items you pick up in the game
var command;		// Variable to store what command is being processed
var diglogSt;		// Variable to store the results of the command issued.
var historyStr;		// Variable to hold your command history
var inDungeon;	// Variable to hold if you are physically in the dungeon
var gameSaved = false;		// Variable to determine if the Save command was issued.
var firstGame = true;		// Variable to hold if this is the first time running the game
var commandsPossible = ["north", "south", "east", "west", "enter", "use", "take", "drop", "inventory", "help"]; 		// Variable to store all possible commands.

// Various X Y Variables to hold position in the map
var xPos;
var xPosOld;
var xPosLocked;
var xPosKey;
var xPosGold;
var yPos;
var yPosOld;
var yPosLocked;
var yPosKey;
var yPosGold;
// Variable to store image of special items and locations
var keyImage = "_images/keys.jpg";
var wallImage = "_images/wall.jpg";
var entranceImage = "_images/entrance.jpg"; //"_images/entrance.jpg";
var goldImage = "_images/gold.jpg";

// HTML Element variables
var mapStage = document.getElementById('stage');
var inputBox = document.getElementById('commandInput');
var dialogBox = document.getElementById('commandOutput');
var historyBox = document.getElementById('historyOutput');
var display = document.getElementById('displayOutput');
var buttonSubmit = document.getElementById('btnSubmit');
var buttonClear = document.getElementById('btnClear');
var buttonHelp = document.getElementById('btnHelp');
var buttonSave = document.getElementById('btnSave');
var buttonNew =  document.getElementById('btnNew');
var buttonN = document.getElementById('north');
var buttonS = document.getElementById('south');
var buttonE = document.getElementById('east');
var buttonW = document.getElementById('west');

// Variables to create and to hold the full map in a 3x3 grid
var rowSize = 3;
var colSize = 3;
var grid = Matrix(rowSize,colSize);

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

// Function to initialize game environment
function initializeGame(rowSize, colSize) {
	var SIZE = 64;
	var classCell;
	var savedState = localStorage.getItem("savedState");
	var savedData;

// Initialize Map Grid given the row and col size. Will only create objects if not ran already
	for (i=0; i<rowSize; i++){
		for (j=0; j<colSize; j++) {
			if (firstGame === true) {
					grid[i][j] = Object.create(mapCell);
			}
			grid[i][j].xID = i;
			grid[i][j].yID = j;
			grid[i][j].locked = false;
			grid[i][j].itemPresent = false;
			grid[i][j].item = "nothing";
			grid[i][j].image = "_images/room" + i + j+".jpg";

			var cell = document.createElement("div");
			cell.setAttribute("id", i.toString() + j.toString());
			cell.setAttribute("class", "map_cell");
			cell.innerHTML = "ID: <b>" + grid[i][j].cellID() + "</b>";

			mapStage.appendChild(cell);
			cell.style.top = i * SIZE + "px";
    		cell.style.left = j * SIZE + "px";

			classCell = grid[i][j].location();
			classCell.className = "map_cell";
		}
	}
	firstGame = false; 	// Makes sure objects are not recreated when Reinitialized

// Check to see if there are any saved game data and then initialize game variables and HTML elements accordingly.
	if (savedState === "true") {
		// saveData stores in the following format = [xPos, yPos, xPosKey, yPosKey, xPosLocked, yPosLocked, xPosGold, yPosGold, historyStr, backpack];
		savedData = JSON.parse(localStorage.getItem("savedData"));	// Retrieves data from the JSON string and parses it back to an Array
		xPos = savedData[0];
		yPos = savedData[1];
		xPosOld = xPos;
		yPosOld = yPos;
		xPosKey = savedData[2];
		yPosKey = savedData[3];
		xPosLocked = savedData[4];
		yPosLocked = savedData[5];
		xPosGold = savedData[6];
		yPosGold = savedData[7];
		historyStr = savedData[8];
		backpack = savedData[9];
		inDungeon = true;
		currentLocation = grid[xPos][yPos].location();
		historyBox.innerHTML = historyStr;
		display.src = grid[xPos][yPos].image;
	} else {
		// Specify location of special items and locked rooms
			xPosKey = 2;
			yPosKey = 0;
			xPosLocked = 2;
			yPosLocked = 2;
			xPosGold = 2;
			yPosGold = 2;

		// Initialize / Reset game and HTML Variables
			newLocation = undefined;
			backpack = [];
			command = "";
			diglogStr = "";
			historyStr = "";
			inDungeon = false;
			xPos = undefined;
			xPosOld = undefined;
			yPos = undefined;
			yPosOld = undefined;
			historyBox.textContent = "";
			currentLocation = document.getElementById("ent");
	}
	// Reassigns location of items in the game
	if (xPosKey !== null) {
		grid[xPosKey][yPosKey].itemPresent = true;
		grid[xPosKey][yPosKey].item = "KEY";
		grid[xPosKey][yPosKey].image = keyImage;
	}
	if (xPosLocked !== null) {
		grid[xPosLocked][yPosLocked].locked = true;
	}
	if (xPosGold !== null) {
		grid[xPosGold][yPosGold].itemPresent = true;
		grid[xPosGold][yPosGold].item = "GOLD";
		grid[xPosGold][yPosGold].image = goldImage;
	}
	currentLocation.className = "map_cell_occupied";
	dialogBox.textContent = "";
	inputBox.value = "";
}

// Function to determine if you are in the Dungeon yet and what to do to start game.
function inGame() {
	if (inDungeon !== true) {
		// Makes sure you use Enter command or move south to start game
			if (command == "enter" || command == "south") {
				console.log(command);
				currentLocation.className = "map_cell";
				currentLocation = grid[0][0].location();
				display.src = grid[0][0].image;
				xPos = 0;
				yPos = 0;
				currentLocation.className = "map_cell_occupied";
				inDungeon = true;
				historyStr += command + "<br>";
				historyBox.innerHTML = historyStr;
				dialogBox.textContent = "You have entered the dungeon. Go explore Warrior.";
			} else {
				dialogBox.textContent = "You must enter the dungeon to begin the game. Please use the 'enter' command or move 'south'. Otherwise close the game.";
			}
	} else {
		// Makes sure Enter command is not used in the dungeon
		dialogBox.textContent = "You are already in the dungeon. You have already entered. Please use one of the directional move commands to explorer.";
	}
}

// Function to move the player around in the dungeon.
function movePlayer(commandStr) {
	console.log("commandStr: " + commandStr);
// Function to do the actual move in the game
	function moveComplete () {
		newLocation = grid[xPos][yPos];
		console.log("X: " + xPos + " Y: " + yPos);
		//First check to see if room is locked before allowing actual move
		if (newLocation.locked === false) {
			currentLocation.className = "map_cell";
			currentLocation = grid[xPos][yPos].location();
			currentLocation.className = "map_cell_occupied";
			historyStr += command + "<br>";
			historyBox.innerHTML = historyStr;
			dialogBox.textContent = "Command Successful. You have moved into a new area.";
			//Update X and Y position holder to be the same with successful move
			xPosOld = xPos;
			yPosOld = yPos;
			if (newLocation.itemPresent === true) {
				dialogBox.textContent += " There is something in the room. " + newLocation.item + " is present.";
			}
			display.src = newLocation.image;
		} else {
			//Room is locked, repositioning back to old location
			xPos = xPosOld;
			yPos = yPosOld;
			console.log("Going back to OLD X: " + xPos + " Y: " + yPos);
			dialogBox.textContent = "Room is locked. You cannot enter. You must have a key and unlock the room first.";
		}
	}

// Function to display output for being next to a wall
	function nextToWall() {
		display.src = wallImage;
		dialogBox.textContent = "You are next to a wall. You cannot go that direction.";
	}
// Check to see if player has entered the dungeon first before processing command. If not call inGame function to notify player what to do.
	if (inDungeon !== true) {
		inGame();
	} else {
		// 4 Directional movements only occur if not next to wall. If so, special handle function is called.
		switch (commandStr) {
			// North movement takes into account if you are next to the entrance to the dungeon so that you can exit.
			case "north":
				if (xPos !== 0) {
					xPosOld = xPos;
					xPos = xPos - 1;
					moveComplete ();
				} else if (xPos === 0 && yPos === 0) {
					xPos = null;
					yPos = null;
					inDungeon = false;
					currentLocation.className = "map_cell";
					currentLocation = document.getElementById("ent");
					currentLocation.className = "map_cell_occupied";
					historyStr += command + "<br>";
					historyBox.innerHTML = historyStr;
					display.src = entranceImage;
					if (backpack.indexOf("GOLD") !== -1) {
						dialogBox.textContent = "You have found the GOLD and made it out. You have WON the game.";
					} else {
						dialogBox.textContent = "You have left the Dungeon.";
					}
				} else {
					nextToWall() ;
				}
				break;
			case "south":
			if (xPos !== 2) {
				xPosOld = xPos;
				xPos = xPos + 1;
				moveComplete ();
			} else {
				nextToWall() ;
			}
				break;
			case "west":
			if (yPos !== 0) {
				yPosOld = yPos;
				yPos = yPos - 1;
				moveComplete ();
			} else {
				nextToWall() ;
			}
				break;
			case "east":
			if (yPos !== 2) {
				yPosOld = yPos;
				yPos = yPos + 1;
				moveComplete ();
			} else {
				nextToWall() ;
			}
				break;
			default:
		}
	}
}

// Function for use command
function useItem() {
	var key = backpack.indexOf("KEY");

	if (newLocation.locked === true) {
		// Figure out if you have something in your backpack
			if (backpack.length > 0) {
				for(i = 0; i < backpack.length; i++)
				{
				// If you have a key, action is taken and image is changed out
				  if (key !== -1) {
						grid[xPosLocked][yPosLocked].locked = false;
						xPosLocked = undefined;
						yPosLocked = undefined;
						dialogBox.textContent = "You have unlocked the room";
						historyStr += command + "<br>";
						historyBox.innerHTML = historyStr;
					} else {
						dialogBox.textContent = "You do not have a KEY to unlock the room.";
					}
				}
			// If no key present
			} else {
				dialogBox.textContent = "You do not have a KEY to unlock the room.";
			}
		// Attempting to use on an unlocked room.
	} else {
		dialogBox.textContent = "Room attempting to unlock is not locked. Use command is to use a key to unlock a locked room. First attempt to enter the lock room first befor the 'use' command. ";
	}
	console.log("useItem function completed");
}
// Fuction for take command
function takeItem() {
	var itemDescription;
// First detemines if the room has something. If so, takes it.
	if (grid[xPos][yPos].itemPresent === true) {
		itemDescription = grid[xPos][yPos].item;
		backpack.push(itemDescription);
		dialogBox.textContent = "You have taken the " + itemDescription;
		historyStr += command + "<br>";
		historyBox.innerHTML = historyStr;
		grid[xPos][yPos].item = "";
		grid[xPos][yPos].itemPresent = false;
	// If item is taken, image of the room is changed out.
		switch (itemDescription) {
			case "KEY":
					grid[xPosKey][yPosKey].image = "_images/room" + xPosKey + yPosKey + ".jpg";
					display.src = grid[xPosKey][yPosKey].image;
					xPosKey = undefined;
					yPosKey = undefined;
				break;
			case "GOLD":
					grid[xPosGold][yPosGold].image = "_images/room" + xPosGold + yPosGold + ".jpg";
					display.src = grid[xPosGold][yPosGold].image;
					xPosGold = undefined;
					yPosGold = undefined;
				break;
			default:
		}
	// If nothing is in the room.
	} else {
		dialogBox.textContent = "There is nothing in the room to take.";
	}
	console.log("takeItem function completed");
}

// Function for drop command
function dropItem() {
	var itemDescription;
// First determines if something is already in the room. Cannot drop is something is already there.
	if (grid[xPos][yPos].itemPresent === false) {
		if (backpack.length > 0) {
			itemDescription = backpack.pop();
			grid[xPos][yPos].item = itemDescription;
			grid[xPos][yPos].itemPresent = true;
			dialogBox.textContent = "You have dopped the " + itemDescription + " in your backpack.";
			historyStr += command + "<br>";
			historyBox.innerHTML = historyStr;
		// Image of the room is changed to reflect dropped item
			switch (itemDescription) {
				case "KEY":
						xPosKey = xPos;
						yPosKey = yPos;
						grid[xPosKey][yPosKey].image = keyImage;
						display.src = keyImage;
					break;
				case "GOLD":
						xPosGold = xPos;
						yPosGold = yPos;
						grid[xPosGold][yPosGold].image = goldImage;
						display.src = goldImage;
					break;
				default:
			}
		// If backpack is emty
		} else {
			dialogBox.textContent = "Your backpack is empty. Nothing to drop.";
		}
	// If there is already something in the room.
	} else  {
		dialogBox.textContent = "Something is already in the room. You cannot drop anything else.";
	}
	console.log("dropItem function completed");
}

// Function for inventory command
function inventoryItem() {
	if (backpack.length  >  0 ) {
		dialogBox.textContent = "Inventory of your backpack is as follows: " + backpack;
	} else {
		dialogBox.textContent = "Your backpack is empty";
	}
}

// Function to clear the contents of the command input box.
function clearInput() {
	inputBox.value = "";
}

// Function to start New Game and Reinitialize all parameters
function newGame() {
// This also deletes any saved game data from previous
	localStorage.removeItem ("savedState");
	localStorage.removeItem("savedData");
	initializeGame(rowSize,colSize);
	display.src = entranceImage;
	console.log("newGame fuction completed");
}

// SAVE function
function save() {
	var savedStr = [xPos, yPos, xPosKey, yPosKey, xPosLocked, yPosLocked, xPosGold, yPosGold, historyStr, backpack];
// Game Data is saved via a JSON string
	var jsonStr = JSON.stringify(savedStr);
// Game will only allow save if you are in the dungeon
	if (currentLocation.id !== "ent") {
		gameSaved = true;
		localStorage.setItem("savedState", gameSaved);
		localStorage.setItem("savedData", jsonStr);
		dialogBox.textContent = "You have saved your game. Please use the same PC and browser to restart from last saved spot.";
	} else {
		dialogBox.textContent = "You can only save the game if you are inside the dungeon. Please enter before trying to save the game";
	}
	console.log("Save Function Completed");
	console.log(gameSaved);
	console.log(jsonStr);
}

// HELP function
function help() {
	historyBox.innerHTML = "Purpose of this game is to exploer the dungeon, find the gold and make it back out. Certain rooms might be locked which will require a key. Gold is hidden in one of the rooms. Anything you take will be stored in your backpack.<br><br>Valid Commands are as follows: 'north', 'south', 'east', 'west', 'enter', 'use', 'take', 'drop', and 'inventory'. The 'drop' command will drop the LAST item in your backpack into the room. If something is already present in the room, you cannot drop your item in that room. The 'use' command allows you to use a KEY to unlock a room. But you must always first attempt to enter a locked room before attempting to use a key.<br><br>You can optionally use the direction arrow buttons to move around. <br><br>Once commands are entered, you can either click the 'Submit' button or hit the 'Enter' key. <br><br>You can click the 'Save' button at anytime to save your progress. 'New' starts everything over and deletes any saved data.";
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
		case "enter":
			inGame();
			break;
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
		case "take":
			takeItem();
			break;
		case "use":
			useItem();
			break;
		case "drop":
			dropItem();
			break;
		case "inventory":
			inventoryItem();
			break;
		case "save":
			save();
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

// Start of the game
initializeGame(rowSize,colSize);

//Add a keyboard listener
window.addEventListener("keydown", keydownHandler, false);

// Event handlers for the buttons
buttonN.addEventListener("click", function(event) {
	command = "north";
	movePlayer(command);}, false);
buttonS.addEventListener("click", function(event) {
	command = "south";
	movePlayer(command);}, false);
buttonE.addEventListener("click", function(event) {
	command = "east";
	movePlayer(command);}, false);
buttonW.addEventListener("click", function(event) {
	command = "west";
	movePlayer(command);}, false);
// Event Handlers for the buttons below Input Box
buttonHelp.addEventListener("click", help, false);
buttonSave.addEventListener("click", save, false);
buttonSubmit.addEventListener("click", submitCommand, false);
buttonClear.addEventListener("click", clearInput,false);
buttonNew.addEventListener("click", newGame, false);
// Allows for 'Enter' Key to be used in Input Box
inputBox.addEventListener("keypress", function (event) {
		if (event.keyCode == 13) {
			buttonSubmit.click();
		}
	}, false);
