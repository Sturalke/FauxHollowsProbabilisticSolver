// TODO: Live Update on box type change

const fhs_blocked_icon_url = "images/blocked.png";
const fhs_missed_icon_url = "images/missed.png";
const fhs_chest_icon_url = "images/chest.png";
const fhs_present_icon_url = "images/present.png";
const fhs_swords_icon_url = "images/swords.png";
const fhs_fox_icon_url = "images/fox.png";
const fhs_erase_icon_url = "images/erase.png";
const fhs_prediction_icon_url = "images/prediction.png";
const fhs_verified_icon_url = "images/verified.png";
const fhs_sighting_icon_url = "images/sighting.png";
const fhs_blank_icon_uri = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

const fhs_blocked_color = "rgb(140, 140, 140)";
const fhs_missed_color = "rgb(255, 80, 80)";
const fhs_chest_color = "rgb(102, 255, 51)";
const fhs_swords_color = "rgb(51, 204, 255)";
const fhs_fox_color = "rgb(153, 51, 204)";
const fhs_empty_color = "rgb(255, 255, 255)";
const fhs_prediction_color = "rgb(255,215,0)";
const fhs_verified_color = "rgb(255,51,255)";
const fhs_sighting_color = "rgb(255,153,51)";

const fhs_blocked_name = "Blocked";
const fhs_missed_name = "Missed";
const fhs_chest_name = "Coffer";
const fhs_present_name = "Gift Box";
const fhs_swords_name = "Swords";
const fhs_fox_name = "Fox";
const fhs_empty_name = "Empty";
const fhs_prediction_name = "Prediction";
const fhs_verified_name = "Verified Sighting";
const fhs_sighting_name = "Sighting";

const fhs_blocked_state = "1";
const fhs_missed_state = "2";
const fhs_chest_state = "3";
const fhs_swords_state = "4";
const fhs_fox_state = "5";
const fhs_empty_state = "0";
const fhs_prediction_state = "6";
const fhs_verified_state = "7";
const fhs_sighting_state = "8";
const fhs_prediction_verified_state = "9";
const fhs_prediction_sighting_state = "10";

const fhs_sheet_patterns = [
	[ 8,10,13,26,35],
	[ 9,13,16,28,30],
	[ 0, 9,22,25,27],
	[ 5, 7,19,22,26],
	[ 3,13,16,21,32],
	[ 9,12,20,23,27],
	[ 3,14,19,22,32],
	[ 8,12,15,23,26],
	[ 4, 7,15,25,33],
	[ 2,10,20,28,31],
	[ 7,10,18,21,29],
	[ 6,14,17,25,28],
	[ 7,16,18,27,32],
	[ 2,10,12,19,27],
	[ 3, 8,17,19,28],
	[ 8,16,23,25,33]
];

document.addEventListener("keydown", function(event) {
	var isEditingWeights = false;
	var weights = document.querySelectorAll("input[type=number]");
	var selection = document.activeElement;
	Array.prototype.forEach.call(weights, function(weight) {
		if(weight == selection) {
			isEditingWeights = true;
		}
	});
	if(!isEditingWeights) {
		var index = -1;
		switch (event.key) {
			case '1':
				index = 0;
				break;
			case '2':
				index = 1;
				break;
			case '3':
				index = 2;
				break;
			case '4':
				index = 3;
				break;
			case '5':
				index = 4;
				break;
			case '6':
				index = 5;
				break;
			default:
				break;
		}
		if (index >= 0) {
			document.getElementsByName("pickeritem")[index].checked = true;
		}
	}
});



/*

	Begin Collapse and Reset Listeners

*/

document.getElementById("menucollapse").addEventListener("click", function() {
	var arrow = document.getElementById("arrow");
	arrow.classList.toggle("arrow-rotated");
	var collapse = document.getElementById("collapsebox");
	if (collapse.style.maxHeight) {
		collapse.style.maxHeight = null;
	} else {
		collapse.style.maxHeight = collapse.scrollHeight + "px";
	}
});
var collapselabel = document.getElementById("collapselabel");
collapselabel.addEventListener("mousedown", function() {
	var cbutton = document.getElementById("collapselabel");
	if(!cbutton.classList.contains("advanced-collapse-pressed")) {
		cbutton.classList.add("advanced-collapse-pressed");
	}
});
function removeCollapsePressed() {
	var cbutton = document.getElementById("collapselabel");
	if(cbutton.classList.contains("advanced-collapse-pressed")) {
		cbutton.classList.remove("advanced-collapse-pressed");
	}
}
collapselabel.addEventListener("mouseup", removeCollapsePressed);
collapselabel.addEventListener("mouseleave", removeCollapsePressed);

document.getElementById("resetbutton").addEventListener("click", function() {
	ResetBoard();
});
var resetlabel = document.getElementById("resetbuttonlabel");
resetlabel.addEventListener("mousedown", function() {
	var rbutton = document.getElementById("resetbuttonlabel");
	if(!rbutton.classList.contains("reset-button-pressed")) {
		rbutton.classList.add("reset-button-pressed");
	}
});
function removeResetPressed() {
	var rbutton = document.getElementById("resetbuttonlabel");
	if(rbutton.classList.contains("reset-button-pressed")) {
		rbutton.classList.remove("reset-button-pressed");
	}
}
resetlabel.addEventListener("mouseup", removeResetPressed);
resetlabel.addEventListener("mouseleave", removeResetPressed);

/*

	End Collapse and Reset Listeners

*/


/*

	Other Listeners

*/

var cells = document.getElementsByClassName('board-cell');
Array.prototype.forEach.call(cells, function(cell) {
	cell.addEventListener("click", CellClick);
	cell.addEventListener("mouseenter", cellOpacity);
	cell.addEventListener("mouseleave", cellOpacity);
	cell.setAttribute('title', "Empty");
	cell.setAttribute('data-state', "0");
});

var buttons = document.getElementsByClassName('radiobuttonlabel');
Array.prototype.forEach.call(buttons, function(rbutton) {
	rbutton.addEventListener("mouseenter", radioOpacity);
	rbutton.addEventListener("mouseleave", radioOpacity);
});

var stratRadios = document.querySelectorAll("input[type=radio][name=strat]");
Array.prototype.forEach.call(stratRadios, function(strat) {
	strat.addEventListener("change", LiveUpdate);
});

var lookForFoxCheck = document.getElementById("lookforfox");
lookForFoxCheck.addEventListener("click", LiveUpdate);

var spreadsheet = document.getElementById("spreadsheet");
spreadsheet.addEventListener("click", function() {
	ClearSightings();
	UpdateSightings();
});

var weightFeilds = document.querySelectorAll("input[type=number]");
Array.prototype.forEach.call(weightFeilds, function(weight) {
	weight.addEventListener("change", function() {
		if(document.getElementById("strat5").checked) {
			LiveUpdate();
		}
	});
});

/*

	End Listeners

*/


function CellClick() {
	switch(getPickerMenuItem()) {
		case "blocked":
			this.setAttribute('data-state', fhs_blocked_state);
			break;
		case "missed":
			this.setAttribute('data-state', fhs_missed_state);
			break;
		case "chest":
			this.setAttribute('data-state', fhs_chest_state);
			break;
		case "swords":
			this.setAttribute('data-state', fhs_swords_state);
			break;
		case "fox":
			this.setAttribute('data-state', fhs_fox_state);
			break;
		case "clear":
			this.setAttribute('data-state', fhs_empty_state);
			break;
		default:
			console.error("Radio button value invalid.");
			break;
	}
	UpdateCell(this);
	LiveUpdate();
}

// Called on MouseEnter and MouseLeave events for each board cell.
function cellOpacity() {
	if(this.style.opacity < 1) {
		this.style.opacity = 1;
	} else {
		this.style.opacity = 0.9;
	}
}

// Called on MouseEnter and MouseLeave events for the picker radio buttons.
function radioOpacity() {
	if(this.style.opacity < 1) {
		this.style.opacity = 1;
	} else {
		this.style.opacity = 0.8;
	}
}

function getPickerMenuItem() {
	return document.querySelector("input[name='pickeritem']:checked").value;
}

function updateTitles() {
	var cells = document.getElementsByClassName('board-cell');
	Array.prototype.forEach.call(cells, function(cell) {
		switch(cell.getAttribute('data-state')) {
			case fhs_empty_state:
				cell.setAttribute('title', fhs_empty_name);
				break;
			case fhs_blocked_state:
				cell.setAttribute('title', fhs_blocked_name);
				break;
			case fhs_missed_state:
				cell.setAttribute('title', fhs_missed_name);
				break;
			case fhs_chest_state:
				cell.setAttribute('title', chestOrPresentName());
				break;
			case fhs_swords_state:
				cell.setAttribute('title', fhs_swords_name);
				break;
			case fhs_fox_state:
				cell.setAttribute('title', fhs_fox_name);
				break;
			case fhs_prediction_state:
				cell.setAttribute('title', fhs_prediction_name);
				break;
			case fhs_verified_state:
				cell.setAttribute('title', fhs_verified_name);
				break;
			case fhs_sighting_state:
				cell.setAttribute('title', fhs_sighting_name);
				break;
			case fhs_prediction_verified_state:
				cell.setAttribute('title', fhs_prediction_name + " and " + fhs_verified_name);
				break;
			case fhs_prediction_sighting_state:
				cell.setAttribute('title', fhs_prediction_name + " and " + fhs_sighting_name);
				break;
			default:
				break;
		}
	});
}

function UpdateCoffer() {
	var pickerlabel = document.querySelector("label[for=button3]");
	var pickerimg = document.getElementById("button3").children[1];
	var stratlabel = document.querySelector("label[for=strat3]");
	var weightlabel = document.getElementById("boxweightlabel");
	var weight = document.getElementById("boxweight");
	var name = chestOrPresentName();
	var url = chestOrPresentURL();
	
	pickerlabel.innerHTML = name;
	pickerimg.src = url;
	stratlabel.innerHTML = name;
	weightlabel.innerHTML = name;
	
	if(isCofferSet()) {
		weight.value = 35;
	} else {
		weight.value = 25;
	}
	
	var cells = document.getElementsByClassName('board-cell');
	Array.prototype.forEach.call(cells, function(cell) {
		var childImage = cell.querySelector("img");
		var state_value = cell.getAttribute("data-state");
		if (state_value == fhs_chest_state) {
			childImage.setAttribute('src', url);
			cell.setAttribute('title', name);
		}
	});
}

function isCofferSet() {
	return document.getElementById("box1").checked;
}

function chestOrPresentName() {
	if(isCofferSet()) {
		return fhs_chest_name;
	} else {
		return fhs_present_name;
	}
}

function chestOrPresentURL() {
	if(isCofferSet()) {
		return fhs_chest_icon_url;
	} else {
		return fhs_present_icon_url;
	}
}

function doFoxSightings() {
	return document.getElementById("spreadsheet").checked;
}

function doLiveUpdate() {
	return document.getElementById("liveupdate").checked;
}

function LiveUpdate() {
	if(doLiveUpdate()) {
		runGuaranteed();
	}
}

function UpdateCell(cell) {
	var cell_index = parseInt(cell.getAttribute("data-index"));
	var state_value = cell.getAttribute("data-state");
	var childImage = cell.querySelector("img");
	switch(state_value) {
		case fhs_empty_state:
			cell.style.backgroundColor = fhs_empty_color;
			childImage.setAttribute('src', fhs_blank_icon_uri);
			cell.setAttribute('title', fhs_empty_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_blocked_state:
			cell.style.backgroundColor = fhs_blocked_color;
			childImage.setAttribute('src', fhs_blocked_icon_url);
			cell.setAttribute('title', fhs_blocked_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_missed_state:
			cell.style.backgroundColor = fhs_missed_color;
			childImage.setAttribute('src', fhs_missed_icon_url);
			cell.setAttribute('title', fhs_missed_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_chest_state:
			cell.style.backgroundColor = fhs_chest_color;
			childImage.setAttribute('src', chestOrPresentURL());
			cell.setAttribute('title', chestOrPresentName());
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_swords_state:
			cell.style.backgroundColor = fhs_swords_color;
			childImage.setAttribute('src', fhs_swords_icon_url);
			cell.setAttribute('title', fhs_swords_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_fox_state:
			cell.style.backgroundColor = fhs_fox_color;
			childImage.setAttribute('src', fhs_fox_icon_url);
			cell.setAttribute('title', fhs_fox_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_prediction_state:
			cell.style.backgroundColor = fhs_prediction_color;
			childImage.setAttribute('src', fhs_prediction_icon_url);
			cell.setAttribute('title', fhs_prediction_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_verified_state:
			cell.style.backgroundColor = fhs_verified_color;
			childImage.setAttribute('src', fhs_verified_icon_url);
			cell.setAttribute('title', fhs_verified_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_sighting_state:
			cell.style.backgroundColor = fhs_sighting_color;
			childImage.setAttribute('src', fhs_sighting_icon_url);
			cell.setAttribute('title', fhs_sighting_name);
			cell.classList.remove('diagonal-mix');
			break;
		case fhs_prediction_verified_state:
			cell.style.backgroundColor = fhs_verified_color;
			childImage.setAttribute('src', fhs_prediction_icon_url);
			cell.setAttribute('title', fhs_prediction_name + " and " + fhs_verified_name);
			cell.classList.add('diagonal-mix');
			break;
		case fhs_prediction_sighting_state:
			cell.style.backgroundColor = fhs_sighting_color;
			childImage.setAttribute('src', fhs_prediction_icon_url);
			cell.setAttribute('title', fhs_prediction_name + " and " + fhs_sighting_name);
			cell.classList.remove('diagonal-mix');
			break;
		default:
			console.error("Invalid cell state.");
			break;
	}
}

function UpdateGrid() {
	var cells = document.getElementsByClassName('board-cell');
	Array.prototype.forEach.call(cells, function(cell) {
		UpdateCell(cell);
	});
}

function ScoresCheckUpdate() {
	if(QueryShowScores()) {
		UpdateScoresInCells();
	} else {
		ClearAllCellText();
	}
}

function UpdateScoresInCells() {
	if (QueryShowScores()) {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				var numStr = IndexFormat(j + 6 * i);
				var cell = document.getElementById("cell" + numStr);
				var state = cell.getAttribute("data-state");
				var span = cell.querySelector("span");
				if (state == fhs_empty_state || state == fhs_prediction_state ||
					state == fhs_verified_state || state == fhs_sighting_state ||
					state == fhs_prediction_verified_state ||
					state == fhs_prediction_sighting_state) {
					span.innerHTML = (window.fhs_grid_scores[i][j] * 100).toFixed(2);
				} else {
					span.innerHTML = "";
				}
			}
		}
	}
}

function ClearAllCellText() {
	var cells = document.getElementsByClassName('board-cell');
	Array.prototype.forEach.call(cells, function(cell) {
		var span = cell.querySelector("span");
		span.innerHTML = "";
	});
}

function ClearPredictionsAndSightings() {
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var numStr = IndexFormat(j + 6 * i);
			var cell = document.getElementById("cell" + numStr);
			var state = cell.getAttribute("data-state");
			if (state == fhs_prediction_state ||
				state == fhs_verified_state ||
				state == fhs_sighting_state ||
				state == fhs_prediction_sighting_state ||
				state == fhs_prediction_verified_state) {
				cell.setAttribute("data-state", fhs_empty_state);
				UpdateCell(cell);
			}
		}			
	}
}

function ClearSightings() {
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var numStr = IndexFormat(j + 6 * i);
			var cell = document.getElementById("cell" + numStr);
			var state = cell.getAttribute("data-state");
			if (state == fhs_verified_state ||
				state == fhs_sighting_state) {
				cell.setAttribute("data-state", fhs_empty_state);
				UpdateCell(cell);
			} else if (state == fhs_prediction_sighting_state) {
				cell.setAttribute("data-state", fhs_prediction_state);
				UpdateCell(cell);
			} else if (state == fhs_prediction_verified_state) {
				cell.setAttribute("data-state", fhs_prediction_state);
				UpdateCell(cell);
			}
		}			
	}
}

function QueryShowScores() {
	return document.getElementById("showstats").checked;
}

function ResetBoard() {
	var cells = document.getElementsByClassName('board-cell');
	Array.prototype.forEach.call(cells, function(cell) {
		cell.setAttribute("data-state", fhs_empty_state);
		UpdateCell(cell);
	});
	window.fhs_grid_scores = PrefillArray();
	UpdateScoresInCells();
}



/*

	Calculation functions and globals

*/


/*
	GLOBALS
*/
window.fhs_grid = PrefillArray();
window.fhs_grid_scores = PrefillArray();

/*
	FUNCTIONS
*/
function PrefillArray() {
	return new Array(6).fill(0).map(() => new Array(6).fill(0));
}

function IndexFormat(index) {
	var str = "0" + (index);
	str = str.substr(str.length - 2);
	return str;
}

function ParseGrid() {
	window.fhs_grid = PrefillArray();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			
			var numStr = IndexFormat(j + 6 * i);
			var cell = document.getElementById("cell" + numStr);
			var state = cell.getAttribute("data-state");
			
			if (state == fhs_blocked_state) {
				window.fhs_grid[i][j] = 1;
			}
			else if (state == fhs_missed_state) {
				window.fhs_grid[i][j] = 2;
			}
			else if (state == fhs_chest_state) {
				window.fhs_grid[i][j] = 3;
			}
			else if (state == fhs_swords_state) {
				window.fhs_grid[i][j] = 4;
			}
			else if (state == fhs_fox_state) {
				window.fhs_grid[i][j] = 5;
			}
			else {
				// Empty, Verified, Sighting, and Prediction states
				window.fhs_grid[i][j] = 0;
			}
		}
	}
}

function UpdatePrediction() {
	var maxScore = 0;
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var numStr = IndexFormat(j + 6 * i);
			var cell = document.getElementById("cell" + numStr);
			
			var state = cell.getAttribute("data-state");
			
			if (state == fhs_prediction_state) {
				cell.setAttribute("data-state", fhs_empty_state);
				UpdateCell(cell);
				maxScore = Math.max(fhs_grid_scores[i][j], maxScore);
			} else if (state == fhs_prediction_verified_state) {
				cell.setAttribute("data-state", fhs_verified_state);
				UpdateCell(cell);
				maxScore = Math.max(fhs_grid_scores[i][j], maxScore);
			} else if (state == fhs_prediction_sighting_state) {
				cell.setAttribute("data-state", fhs_sighting_state);
				UpdateCell(cell);
				maxScore = Math.max(fhs_grid_scores[i][j], maxScore);
			} else if (state == fhs_empty_state ||
					   state == fhs_verified_state ||
					   state == fhs_sighting_color) {
				maxScore = Math.max(fhs_grid_scores[i][j], maxScore);
			}
		}
	}
	if (maxScore != 0) {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				var numStr = IndexFormat(j + 6 * i);
				var cell = document.getElementById("cell" + numStr);
				var state = cell.getAttribute("data-state");
				var isMax = fhs_grid_scores[i][j] == maxScore;
				if (isMax && state == fhs_empty_state) {
					cell.setAttribute("data-state", fhs_prediction_state);
					UpdateCell(cell);
				} else if (isMax && state == fhs_verified_state) {
					cell.setAttribute("data-state", fhs_prediction_verified_state);
					UpdateCell(cell);
				} else if (isMax && state == fhs_sighting_state) {
					cell.setAttribute("data-state", fhs_prediction_sighting_state);
					UpdateCell(cell);
				}
			}
		}
	}
}

function UpdateSightings() {
	if (!doFoxSightings()) {
		return;
	}
	
	var type = IdentifyPattern();
	
	if (type != -1) {
		var verifiedGrid = PrefillArray();
		var sightingGrid = PrefillArray();
		fhs_sheet_fox[type].forEach((board) => {
			var match = true;
outerloop:
			for (var i = 0; i < 6; i++) {
				for (var j = 0; j < 6; j++) {
					if (window.fhs_grid[i][j] == 2) {
						if (board[i][j] != 0 && board[i][j] != 4 && board[i][j] != 5) {
							match = false;
							break outerloop;
						}
					} else if (window.fhs_grid[i][j] == 3) {
						if (board[i][j] != 2) {
							match = false;
							break outerloop;
						}
					} else if (window.fhs_grid[i][j] == 4) {
						if (board[i][j] != 3) {
							match = false;
							break outerloop;
						}
					} else if (window.fhs_grid[i][j] == 5) {
						// Fox already in grid, no need for any further processing
						return;
					}
					
				}
			}
			if (match) {
				for (var i = 0; i < 6; i++) {
					for (var j = 0; j < 6; j++) {
						if (board[i][j] == 4) {
							verifiedGrid[i][j]++;
						} else if (board[i][j] == 5) {
							sightingGrid[i][j]++;
						}
					}
				}
			}
		});
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				var updated = false;
				var numStr = IndexFormat(j + 6 * i);
				var cell = document.getElementById("cell" + numStr);
				var state = cell.getAttribute("data-state");
				if (state == fhs_verified_state) {
					cell.setAttribute("data-state", fhs_empty_state);
					state = fhs_empty_state;
					updated = true;
				}
				if (state == fhs_sighting_state) {
					cell.setAttribute("data-state", fhs_empty_state);
					state = fhs_empty_state;
					updated = true;
				}
				if (sightingGrid[i][j] > 0 && state != fhs_missed_state) {
					if (state == fhs_prediction_state || state == fhs_prediction_sighting_state) {
						cell.setAttribute("data-state", fhs_prediction_sighting_state);
					} else {
						cell.setAttribute("data-state", fhs_sighting_state);
					}
					updated = true;
				}
				if (verifiedGrid[i][j] > 0 && state != fhs_missed_state) {
					if (state == fhs_prediction_state || state == fhs_prediction_verified_state) {
						cell.setAttribute("data-state", fhs_prediction_verified_state);
					} else {
						cell.setAttribute("data-state", fhs_verified_state);
					}
					updated = true;
				}
				if (updated) {
					UpdateCell(cell);
				}
			}
		}
	}
}

function IdentifyPattern() {
	var positions = [0,0,0,0,0];
	var ind = 0;
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (fhs_grid[i][j] == 1 && ind < 5) {
				positions[ind++] = i*6 + j;
			} else if (ind > 5) {
				return -1;
			}
		}
	}
	var exists = fhs_sheet_patterns.some(row => JSON.stringify(row) === JSON.stringify(positions));
	if (exists) {
		var match = true;
		for (var i = 0; i < fhs_sheet_patterns.length; i++) {
innerloop:
			for (var j = 0; j < 5; j++) {
				if (positions[j] == fhs_sheet_patterns[i][j]) {
					match = true;
				} else {
					match = false;
					break innerloop;
				}
			}
			if (match) {
				return i;
			}
		}
	}
	return -1;
}

function MarkGuaranteedBlocks() {
	
	var medMap = NaiiveMedProb();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (medMap[i][j] == 1 && window.fhs_grid[i][j] != 3) {
				window.fhs_grid[i][j] = 3;
				var numStr = IndexFormat(j + 6 * i);
				var cell = document.getElementById("cell" + numStr);
				cell.setAttribute("data-state", fhs_chest_state);
				UpdateCell(cell);
			}
		}
	}

	// Large
	var largeMap = NaiiveLargeProb();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (largeMap[i][j] == 1 && window.fhs_grid[i][j] != 4) {
				window.fhs_grid[i][j] = 4;
				var numStr = IndexFormat(j + 6 * i);
				var cell = document.getElementById("cell" + numStr);
				cell.setAttribute("data-state", fhs_swords_state);
				UpdateCell(cell);
			}
		}
	}
	
}

function GetStratNum() {
	var menuitem = document.querySelector("input[name='strat']:checked").value;
	var nwf = document.getElementById("lookforfox").checked;
	
	if(!nwf) {
		switch(menuitem) {
			case "strat1":
				return 6;
				break;
			case "strat2":
				return 8;
				break;
			case "strat3":
				return 9;
				break;
			case "strat4":
				return 5;
				break;
			case "strat5":
				return 7;
				break;
			default:
				break;
		}
	} else {
		switch(menuitem) {
			case "strat1":
				return 1;
				break;
			case "strat2":
				return 3;
				break;
			case "strat3":
				return 4;
				break;
			case "strat4":
				return 5;
				break;
			case "strat5":
				return 2;
				break;
			default:
				break;
		}
	}
	return 1;
}

function runGuaranteed() {
	ParseGrid();
	
	for(var i = 0; i < 2; i++) {
		MarkGuaranteedBlocks();
	}
	
	var strategy = GetStratNum();
	switch (strategy) {
		case 1:
			window.fhs_grid_scores = FullProbScores(CalculateFullProb());
			break;
		case 2:
			window.fhs_grid_scores = weightedScores(CalculateFullProb());
			break;
		case 3:
			window.fhs_grid_scores = swordsScores(CalculateFullProb());
			break;
		case 4:
			window.fhs_grid_scores = boxScores(CalculateFullProb());
			break;
		case 5:
			window.fhs_grid_scores = foxScores(CalculateFullProb());
			break;
		case 6:
			window.fhs_grid_scores = wfProbScores(CalculateProbWithoutFox());
			break;
		case 7:
			window.fhs_grid_scores = weightedWFScores(CalculateProbWithoutFox());
			break;
		case 8:
			window.fhs_grid_scores = swordsWFScores(CalculateProbWithoutFox());
			break;
		case 9:
			window.fhs_grid_scores = boxWFScores(CalculateProbWithoutFox());
			break;
		default:
			break;
	}
	UpdateScoresInCells();
	ClearPredictionsAndSightings();
	UpdatePrediction();
	UpdateSightings();
}


// STUB
function GetChestWeight() {
	return document.getElementById("boxweight").value;
}

// STUB
function GetSwordsWeight() {
	return document.getElementById("swordweight").value;
}

// STUB
function GetFoxWeight() {
	return document.getElementById("foxweight").value;
}

function FullProbScores(probs) {
	var newScores = PrefillArray();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var newProb = (1 - probs[0][i][j]) * (1 - probs[1][i][j]) * (1 - probs[2][i][j]);
			newProb = 1 - newProb;
			newScores[i][j] = newProb;
		}
	}
	return newScores;
}

function weightedScores(probs) {
	var newScores = PrefillArray();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var foxWeighted = probs[0][i][j] * GetFoxWeight();
			var boxWeighted = probs[1][i][j] * GetChestWeight();
			var swordsWeighted = probs[2][i][j] * GetSwordsWeight();
			newScores[i][j] = foxWeighted + boxWeighted + swordsWeighted;
		}
	}
	return newScores;
}

function swordsScores(probs) {
	return probs[2];
}

function boxScores(probs) {
	return probs[1];
}

function foxScores(probs) {
	return probs[0];
}

function wfProbScores(probs) {
	var newScores = PrefillArray();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var newProb = (1 - probs[0][i][j]) * (1 - probs[1][i][j]);
			newProb = 1 - newProb;
			newScores[i][j] = newProb;
		}
	}
	return newScores;
}

function weightedWFScores(probs) {
	var newScores = PrefillArray();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var boxWeighted = probs[0][i][j] * GetChestWeight();
			var swordsWeighted = probs[1][i][j] * GetSwordsWeight();
			newScores[i][j] = boxWeighted + swordsWeighted;
		}
	}
	return newScores;
}

function swordsWFScores(probs) {
	return probs[1];
}

function boxWFScores(probs) {
	return probs[0];
}

function NaiiveLargeProb() {
	var hitCount = 0;
	var hitMap = PrefillArray();
	var probCount = 0;
	var hitLoc = [];

	//Check for previous hit
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (window.fhs_grid[i][j] == 4) {
				if (hitCount == 0) {
					hitLoc = [i, j];
				}
				hitCount++;
			}
		}
	}

	if (hitCount > 0) {
		//Horizontals
		for (var i = 0; i < 2; i++) {
			for (var j = 0; j < 3; j++) {
				if (hitLoc[0] - (1 - i) < 0 || hitLoc[0] + i > 5 ||
					hitLoc[1] - (2 - j) < 0 || hitLoc[1] + j > 5) {
					continue;
				}
				var coords = [
					[hitLoc[0] - (1 - i), hitLoc[1] - (2 - j)],
					[hitLoc[0] - (1 - i), hitLoc[1] - (1 - j)],
					[hitLoc[0] - (1 - i), hitLoc[1] + j],
					[hitLoc[0] + i, hitLoc[1] - (2 - j)],
					[hitLoc[0] + i, hitLoc[1] - (1 - j)],
					[hitLoc[0] + i, hitLoc[1] + j]
				];
				var blocks = [];
				blocks.push(window.fhs_grid[coords[0][0]][coords[0][1]]);
				blocks.push(window.fhs_grid[coords[1][0]][coords[1][1]]);
				blocks.push(window.fhs_grid[coords[2][0]][coords[2][1]]);
				blocks.push(window.fhs_grid[coords[3][0]][coords[3][1]]);
				blocks.push(window.fhs_grid[coords[4][0]][coords[4][1]]);
				blocks.push(window.fhs_grid[coords[5][0]][coords[5][1]]);
				var count = 0;
				var hasObstacle = false;
				for (var k = 0; k < 6; k++) {
					if (blocks[k] == 4) {
						count++;
					} else if (blocks[k] != 0) {
						hasObstacle = true;
						break;
					}
				}
				if (!hasObstacle && count == hitCount) {
					hitMap[coords[0][0]][coords[0][1]]++;
					hitMap[coords[1][0]][coords[1][1]]++;
					hitMap[coords[2][0]][coords[2][1]]++;
					hitMap[coords[3][0]][coords[3][1]]++;
					hitMap[coords[4][0]][coords[4][1]]++;
					hitMap[coords[5][0]][coords[5][1]]++;
					probCount++;
				}
			}
		}

		//Verticals
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 2; j++) {
				if (hitLoc[0] - (2 - i) < 0 || hitLoc[0] + i > 5 ||
					hitLoc[1] - (1 - j) < 0 || hitLoc[1] + j > 5) {
					continue;
				}
				var coords = [
					[hitLoc[0] - (2 - i), hitLoc[1] - (1 - j)],
					[hitLoc[0] - (1 - i), hitLoc[1] + j],
					[hitLoc[0] + i, hitLoc[1] - (1 - j)],
					[hitLoc[0] - (2 - i), hitLoc[1] + j],
					[hitLoc[0] - (1 - i), hitLoc[1] - (1 - j)],
					[hitLoc[0] + i, hitLoc[1] + j]
				];
				var blocks = [];
				blocks.push(window.fhs_grid[coords[0][0]][coords[0][1]]);
				blocks.push(window.fhs_grid[coords[1][0]][coords[1][1]]);
				blocks.push(window.fhs_grid[coords[2][0]][coords[2][1]]);
				blocks.push(window.fhs_grid[coords[3][0]][coords[3][1]]);
				blocks.push(window.fhs_grid[coords[4][0]][coords[4][1]]);
				blocks.push(window.fhs_grid[coords[5][0]][coords[5][1]]);
				var count = 0;
				var hasObstacle = false;
				for (var k = 0; k < 6; k++) {
					if (blocks[k] == 4) {
						count++;
					} else if (blocks[k] != 0) {
						hasObstacle = true;
						break;
					}
				}
				if (!hasObstacle && count == hitCount) {
					hitMap[coords[0][0]][coords[0][1]]++;
					hitMap[coords[1][0]][coords[1][1]]++;
					hitMap[coords[2][0]][coords[2][1]]++;
					hitMap[coords[3][0]][coords[3][1]]++;
					hitMap[coords[4][0]][coords[4][1]]++;
					hitMap[coords[5][0]][coords[5][1]]++;
					probCount++;
				}
			}
		}

		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				hitMap[i][j] /= probCount;
			}
		}

		return hitMap;
	}
	
	//Horizontal
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 4; j++) {
			var block1 = window.fhs_grid[i][j];
			var block2 = window.fhs_grid[i][j + 1];
			var block3 = window.fhs_grid[i][j + 2];
			var block4 = window.fhs_grid[i + 1][j];
			var block5 = window.fhs_grid[i + 1][j + 1];
			var block6 = window.fhs_grid[i + 1][j + 2];
			if (block1 != 0 ||
				block2 != 0 ||
				block3 != 0 ||
				block4 != 0 ||
				block5 != 0 ||
				block6 != 0) {
				continue;
			} else {
				hitMap[i][j]++;
				hitMap[i][j + 1]++;
				hitMap[i][j + 2]++;
				hitMap[i + 1][j]++;
				hitMap[i + 1][j + 1]++;
				hitMap[i + 1][j + 2]++;
				probCount++;
			}

		}
	}

	//Vertical
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 5; j++) {
			var block1 = window.fhs_grid[i][j];
			var block2 = window.fhs_grid[i][j + 1];
			var block3 = window.fhs_grid[i + 1][j];
			var block4 = window.fhs_grid[i + 1][j + 1];
			var block5 = window.fhs_grid[i + 2][j];
			var block6 = window.fhs_grid[i + 2][j + 1];
			if (block1 != 0 ||
				block2 != 0 ||
				block3 != 0 ||
				block4 != 0 ||
				block5 != 0 ||
				block6 != 0) {
				continue;
			} else {
				hitMap[i][j]++;
				hitMap[i][j + 1]++;
				hitMap[i + 1][j]++;
				hitMap[i + 1][j + 1]++;
				hitMap[i + 2][j]++;
				hitMap[i + 2][j + 1]++;
				probCount++;
			}
		}
	}
	
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			hitMap[i][j] /= probCount;
		}
	}

	return hitMap;
}

//	Probability of a medium in a spot without factoring in other logos
function NaiiveMedProb() {
	var map = PrefillArray();
	var count = 0;
	var hitCount = 0;
	var hitLoc = [];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (window.fhs_grid[i][j] == 3) {
				hitCount++;
				hitLoc = [i, j];
			}
		}
	}

	if (hitCount > 0) {
		for (var i = -1; i < 1; i++) {
			for (var j = -1; j < 1; j++) {
				if (hitLoc[0] + i < 0 || hitLoc[0] + 1 + i > 5 ||
					hitLoc[1] + j < 0 || hitLoc[1] + 1 + j > 5) {
					continue;
				}
				var coords = [
					[hitLoc[0] + i, hitLoc[1] + j],
					[hitLoc[0] + i, hitLoc[1] + j + 1],
					[hitLoc[0] + i + 1, hitLoc[1] + j],
					[hitLoc[0] + i + 1, hitLoc[1] + j + 1]
				];
				var tempCount = 0;
				var noObstacles = true;
				for (var k = 0; k < 4; k++) {
					if (window.fhs_grid[coords[k][0]][coords[k][1]] == 3) {
						tempCount++;
					} else if (window.fhs_grid[coords[k][0]][coords[k][1]] != 0) {
						noObstacles = false;
						break;
					}
				}
				if (noObstacles && tempCount == hitCount) {
					for (var k = 0; k < 4; k++) {
						map[coords[k][0]][coords[k][1]]++;
					}
					count++;
				}
			}
		}
	} else {
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 5; j++) {
				if (window.fhs_grid[i][j] != 0 || window.fhs_grid[i][j + 1] != 0 ||
					window.fhs_grid[i + 1][j] != 0 || window.fhs_grid[i + 1][j + 1] != 0) {
					continue;
				} else {
					count++;
					map[i][j]++;
					map[i][j + 1]++;
					map[i + 1][j]++;
					map[i + 1][j + 1]++;
				}
			}
		}
	}
	//Turn into probabilities
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			map[i][j] /= count;
		}
	}
	return map;
}

function CalculateFullProb() {
	// 6x6x3 array zero filled
	var hitMap = new Array(6).fill(0).map(
		() => new Array(6).fill(0).map(
			() => new Array(3).fill(0)
		)
	);
	var hitCount = 0;
	var currentHits = [0, 0, 0];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (window.fhs_grid[i][j] == 5) {
				currentHits[0]++;
			}
			if (window.fhs_grid[i][j] == 3) {
				currentHits[1]++;
			}
			if (window.fhs_grid[i][j] == 4) {
				currentHits[2]++;
			}
		}
	}

	//LOTS OF FOR LOOPS INCOMING
	/*
	Method:
	
	For every placement of the small
		if placement contains currently placed small
			For every placement of the medium given each placement of small
				if placement contains all currently placed mediums
					Again for each orientation of the large
						if placement contains all currently placed larges
							Count placements for all shapes
	
	This should give all possible placements of all three given the current board
	*/
	for (var iSm = 0; iSm < 6; iSm++) {
		for (var jSm = 0; jSm < 6; jSm++) {
			if ((window.fhs_grid[iSm][jSm] == 0 && currentHits[0] == 0) ||
				(window.fhs_grid[iSm][jSm] == 5 && currentHits[0] != 0)) {

				// Deep copy
				var gridSmallAdded = JSON.parse(JSON.stringify(window.fhs_grid));
				gridSmallAdded[iSm][jSm] = 5;


				for (var iMed = 0; iMed < 5; iMed++) {
					for (var jMed = 0; jMed < 5; jMed++) {

						var medBlocks = [
							gridSmallAdded[iMed][jMed],
							gridSmallAdded[iMed][jMed + 1],
							gridSmallAdded[iMed + 1][jMed],
							gridSmallAdded[iMed + 1][jMed + 1]
						];

						var medTotalInPlacement = 0;
						for (var i = 0; i < 4; i++) {
							if (medBlocks[i] == 3) {
								medTotalInPlacement++;
							}
						}

						if (medTotalInPlacement == currentHits[1] &&
							(medBlocks[0] == 0 || medBlocks[0] == 3) &&
							(medBlocks[1] == 0 || medBlocks[1] == 3) &&
							(medBlocks[2] == 0 || medBlocks[2] == 3) &&
							(medBlocks[3] == 0 || medBlocks[3] == 3)) {

							var gridMedAdded = JSON.parse(JSON.stringify(gridSmallAdded));
							gridMedAdded[iMed][jMed] = 3;
							gridMedAdded[iMed][jMed + 1] = 3;
							gridMedAdded[iMed + 1][jMed] = 3;
							gridMedAdded[iMed + 1][jMed + 1] = 3;
							
							//Horizontal Larges
							for (var iLg = 0; iLg < 5; iLg++) {
								for (var jLg = 0; jLg < 4; jLg++) {

									var largeBlocks = [
										gridMedAdded[iLg][jLg],
										gridMedAdded[iLg][jLg + 1],
										gridMedAdded[iLg][jLg + 2],
										gridMedAdded[iLg + 1][jLg],
										gridMedAdded[iLg + 1][jLg + 1],
										gridMedAdded[iLg + 1][jLg + 2]
									];

									var largeTotalInPlacement = 0;
									for (var j = 0; j < 6; j++) {
										if (largeBlocks[j] == 4) {
											largeTotalInPlacement++;
										}
									}

									if (largeTotalInPlacement == currentHits[2] &&
										(largeBlocks[0] == 0 || largeBlocks[0] == 4) &&
										(largeBlocks[1] == 0 || largeBlocks[1] == 4) &&
										(largeBlocks[2] == 0 || largeBlocks[2] == 4) &&
										(largeBlocks[3] == 0 || largeBlocks[3] == 4) &&
										(largeBlocks[4] == 0 || largeBlocks[4] == 4) &&
										(largeBlocks[5] == 0 || largeBlocks[5] == 4)) {

										hitMap[iSm][jSm][0]++;

										hitMap[iMed][jMed][1]++;
										hitMap[iMed][jMed + 1][1]++;
										hitMap[iMed + 1][jMed][1]++;
										hitMap[iMed + 1][jMed + 1][1]++;

										hitMap[iLg][jLg][2]++;
										hitMap[iLg][jLg + 1][2]++;
										hitMap[iLg][jLg + 2][2]++;
										hitMap[iLg + 1][jLg][2]++;
										hitMap[iLg + 1][jLg + 1][2]++;
										hitMap[iLg + 1][jLg + 2][2]++;
										hitCount++;
									}
								}
							}
							// End Horizontal Larges

							//Vertical Larges
							for (var iLg = 0; iLg < 4; iLg++) {
								for (var jLg = 0; jLg < 5; jLg++) {
									
									var largeBlocks = [
									gridMedAdded[iLg][jLg],
										gridMedAdded[iLg][jLg + 1],
										gridMedAdded[iLg + 1][jLg],
										gridMedAdded[iLg + 1][jLg + 1],
										gridMedAdded[iLg + 2][jLg],
										gridMedAdded[iLg + 2][jLg + 1]
									];

									var largeTotalInPlacement = 0;
									for (var j = 0; j < 6; j++) {
										if (largeBlocks[j] == 4) {
											largeTotalInPlacement++;
										}
									}

									if (largeTotalInPlacement == currentHits[2] &&
										(largeBlocks[0] == 0 || largeBlocks[0] == 4) &&
										(largeBlocks[1] == 0 || largeBlocks[1] == 4) &&
										(largeBlocks[2] == 0 || largeBlocks[2] == 4) &&
										(largeBlocks[3] == 0 || largeBlocks[3] == 4) &&
										(largeBlocks[4] == 0 || largeBlocks[4] == 4) &&
										(largeBlocks[5] == 0 || largeBlocks[5] == 4)) {
	
										hitMap[iSm][jSm][0]++;

										hitMap[iMed][jMed][1]++;
										hitMap[iMed][jMed + 1][1]++;
										hitMap[iMed + 1][jMed][1]++;
										hitMap[iMed + 1][jMed + 1][1]++;

										hitMap[iLg][jLg][2]++;
										hitMap[iLg][jLg + 1][2]++;
										hitMap[iLg + 1][jLg][2]++;
										hitMap[iLg + 1][jLg + 1][2]++;
										hitMap[iLg + 2][jLg][2]++;
										hitMap[iLg + 2][jLg + 1][2]++;
										hitCount++;
									}
								}
							}
							// End Vertical Larges
						}
					}
				} // End Mediums
			}
		}
	} // End Smalls

	// Probabilities Time

	//LARGE HIT COUNT IS THE SAME AS TOTAL BOARD CONFIGS
	//Formula: number of hits/total board configs
	var probabilityMaps = [
		PrefillArray(),
		PrefillArray(),
		PrefillArray()
	];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			probabilityMaps[0][i][j] = hitMap[i][j][0] / hitCount;
			probabilityMaps[1][i][j] = hitMap[i][j][1] / hitCount;
			probabilityMaps[2][i][j] = hitMap[i][j][2] / hitCount;
		}
	}

	return probabilityMaps;
}

// Functionally similar to CalculateFullProb()
// Doesn't add Fox to calculation.
function CalculateProbWithoutFox() {
	// 6x6x3 array zero filled
	var hitMap = new Array(6).fill(0).map(
		() => new Array(6).fill(0).map(
			() => new Array(2).fill(0)
		)
	);
	var hitCount = 0;
	var currentHits = [0, 0];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (window.fhs_grid[i][j] == 3) {
				currentHits[0]++;
			}
			if (window.fhs_grid[i][j] == 4) {
				currentHits[1]++;
			}
		}
	}
	
	for (var iMed = 0; iMed < 5; iMed++) {
		for (var jMed = 0; jMed < 5; jMed++) {

			var medBlocks = [
				window.fhs_grid[iMed][jMed],
				window.fhs_grid[iMed][jMed + 1],
				window.fhs_grid[iMed + 1][jMed],
				window.fhs_grid[iMed + 1][jMed + 1]
			];

			var medTotalInPlacement = 0;
			for (var i = 0; i < 4; i++) {
				if (medBlocks[i] == 3) {
					medTotalInPlacement++;
				}
			}

			if (medTotalInPlacement == currentHits[0] &&
			   (medBlocks[0] == 0 || medBlocks[0] == 3) &&
			   (medBlocks[1] == 0 || medBlocks[1] == 3) &&
			   (medBlocks[2] == 0 || medBlocks[2] == 3) &&
			   (medBlocks[3] == 0 || medBlocks[3] == 3)) {

				var gridMedAdded = JSON.parse(JSON.stringify(window.fhs_grid));
				gridMedAdded[iMed][jMed] = 3;
				gridMedAdded[iMed][jMed + 1] = 3;
				gridMedAdded[iMed + 1][jMed] = 3;
				gridMedAdded[iMed + 1][jMed + 1] = 3;
				
				//Horizontal Larges
				for (var iLg = 0; iLg < 5; iLg++) {
					for (var jLg = 0; jLg < 4; jLg++) {

						var largeBlocks = [
							gridMedAdded[iLg][jLg],
							gridMedAdded[iLg][jLg + 1],
							gridMedAdded[iLg][jLg + 2],
							gridMedAdded[iLg + 1][jLg],
							gridMedAdded[iLg + 1][jLg + 1],
							gridMedAdded[iLg + 1][jLg + 2]
						];

						var largeTotalInPlacement = 0;
						for (var j = 0; j < 6; j++) {
							if (largeBlocks[j] == 4) {
								largeTotalInPlacement++;
							}
						}

						if (largeTotalInPlacement == currentHits[1] &&
						   (largeBlocks[0] == 0 || largeBlocks[0] == 4) &&
						   (largeBlocks[1] == 0 || largeBlocks[1] == 4) &&
						   (largeBlocks[2] == 0 || largeBlocks[2] == 4) &&
						   (largeBlocks[3] == 0 || largeBlocks[3] == 4) &&
						   (largeBlocks[4] == 0 || largeBlocks[4] == 4) &&
						   (largeBlocks[5] == 0 || largeBlocks[5] == 4)) {

							hitMap[iMed][jMed][0]++;
							hitMap[iMed][jMed + 1][0]++;
							hitMap[iMed + 1][jMed][0]++;
							hitMap[iMed + 1][jMed + 1][0]++;

							hitMap[iLg][jLg][1]++;
							hitMap[iLg][jLg + 1][1]++;
							hitMap[iLg][jLg + 2][1]++;
							hitMap[iLg + 1][jLg][1]++;
							hitMap[iLg + 1][jLg + 1][1]++;
							hitMap[iLg + 1][jLg + 2][1]++;
							hitCount++;
						}
					}
				}// End Horizontal Larges

				//Vertical Larges
				for (var iLg = 0; iLg < 4; iLg++) {
					for (var jLg = 0; jLg < 5; jLg++) {

						var largeBlocks = [
							gridMedAdded[iLg][jLg],
							gridMedAdded[iLg][jLg + 1],
							gridMedAdded[iLg + 1][jLg],
							gridMedAdded[iLg + 1][jLg + 1],
							gridMedAdded[iLg + 2][jLg],
							gridMedAdded[iLg + 2][jLg + 1]
						];

						var largeTotalInPlacement = 0;
						for (var j = 0; j < 6; j++) {
							if (largeBlocks[j] == 4) {
								largeTotalInPlacement++;
							}
						}

						if (largeTotalInPlacement == currentHits[1] &&
						   (largeBlocks[0] == 0 || largeBlocks[0] == 4) &&
						   (largeBlocks[1] == 0 || largeBlocks[1] == 4) &&
						   (largeBlocks[2] == 0 || largeBlocks[2] == 4) &&
						   (largeBlocks[3] == 0 || largeBlocks[3] == 4) &&
						   (largeBlocks[4] == 0 || largeBlocks[4] == 4) &&
						   (largeBlocks[5] == 0 || largeBlocks[5] == 4)) {
	
							hitMap[iMed][jMed][0]++;
							hitMap[iMed][jMed + 1][0]++;
							hitMap[iMed + 1][jMed][0]++;
							hitMap[iMed + 1][jMed + 1][0]++;

							hitMap[iLg][jLg][1]++;
							hitMap[iLg][jLg + 1][1]++;
							hitMap[iLg + 1][jLg][1]++;
							hitMap[iLg + 1][jLg + 1][1]++;
							hitMap[iLg + 2][jLg][1]++;
							hitMap[iLg + 2][jLg + 1][1]++;
							hitCount++;
						}
					}
				}// End Vertical Larges
			}
		}
	} // End Mediums

	// Probabilities Time

	//LARGE HIT COUNT IS THE SAME AS TOTAL BOARD CONFIGS
	//Formula: number of hits/total board configs
	var probabilityMaps = [
		PrefillArray(),
		PrefillArray()
	];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			probabilityMaps[0][i][j] = hitMap[i][j][0] / hitCount;
			probabilityMaps[1][i][j] = hitMap[i][j][1] / hitCount;
		}
	}

	return probabilityMaps;
}



/*

	Run on startup.

*/
function StartUp() {
	ResetBoard();
	UpdateCoffer();
}
StartUp();