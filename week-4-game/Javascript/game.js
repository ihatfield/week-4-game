// Create variables to store game components in

var gameState = {
	match: getRandom(19,120),
	crystals: [0,0,0,0],
	wins: 0,
	losses: 0,
	score: 0
}

$(document).ready(gameInit());


// Create game initialize function
function gameInit() {
	for(var i = 0; i <gameState.crystals.length; i += 1) {
		gameState.crystals[i] = uniqueRandom(1,12);
	}
	$("#randomNum").html("Match: <br>"+gameState.match);
	$("#score").html("Points: <br>"+gameState.score);
	$("#red").attr("value",gameState.crystals[0]);
	$("#blue").attr("value",gameState.crystals[1]);
	$("#yellow").attr("value",gameState.crystals[2]);
	$("#green").attr("value",gameState.crystals[3]);
}



// Create random number generator
function getRandom(low,high) {
	var number = Math.floor(Math.random() * (high - low) + 1) + low;
	return number;
}


// Function to ensure crystals have unique values
function uniqueRandom(low, high) {
	var checkNum = getRandom(low, high);

	if(gameState.crystals.indexOf(checkNum) === -1) {
		return checkNum;
	} else {
		return uniqueRandom(low, high);
	}
}


// Create game reset function
function gameReset() {
	gameState.score = 0;
	$("#score").html("Points: <br>"+gameState.score);
	$("#wins").html("Wins: "+gameState.wins);
	$("#losses").html("Losses: "+gameState.losses);
	gameState.match = getRandom(19,120);
	$("#randomNum").html("Match: <br>"+gameState.match);
	gameInit()
}


// Create click events for crystal values and add to score
$(".crystal").click( function() {
	var value = $(this).attr("value");
	gameState.score = parseInt(gameState.score) + parseInt(value);
	$("#score").html("Points: <br>"+gameState.score);
	checkScore();
});


function checkScore() {
	if(gameState.score === gameState.match) {
		updateWin();
	} else if(gameState.score > gameState.match) {
		updateLoss();
	}	
}

// Create function to update record on the win

function updateWin() {
	audioElement.setAttribute("src", "assets/sounds/chime.mp3");
	audioElement.play();
	gameState.wins ++;
	gameReset();
	$("#wins").css("color","yellow")
	$("#losses").css("color","black")
}

// Create function to update record on th loss

function updateLoss() {
	gameState.losses ++;
	gameReset();
	$("#wins").css("color","black")
	$("#losses").css("color","orange")
}
