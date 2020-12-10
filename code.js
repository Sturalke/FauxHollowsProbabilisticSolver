var deadColor = 'grey';
var missColor = 'rgb(106, 2, 19)';
var smallColor = 'rgb(148, 0, 230)';
var medColor = 'green';
var medTitle = 'Coffer';
var largeColor = 'lightseagreen';

window.addEventListener("DOMContentLoaded", function() {
	$('.block').each(function(i, obj) {
		$(this).hover(function() {
			$(this).stop(false, false);
			$(this).fadeTo('fast', 1);
		}, function() {
			$(this).stop(false, false);
			$(this).fadeTo('fast', 0.9);
		});
		$(this).click(function() {
			$(this).stop(false, true);
			var radioValue = $("input[name='menu']:checked").val();
			switch (radioValue) {
				case 'deadcell':
					if ($(this).css('background-color') == "rgb(255, 255, 255)") {
						$(this).stop().css('background-color', deadColor);
						$(this).attr('name', deadColor);
					} else if ($(this).attr('name') == deadColor) {
						$(this).stop().css('background-color', 'white');
						$(this).removeAttr('name');
					} else {
						$(this).stop().css('background-color', deadColor);
						$(this).attr('name', deadColor);
					}
					break;
				case 'miss':
					if ($(this).css('background-color') == "rgb(255, 255, 255)") {
						$(this).stop().css('background-color', missColor);
						$(this).attr('name', missColor);
					} else if ($(this).attr('name') == missColor) {
						$(this).stop().css('background-color', 'white');
						$(this).removeAttr('name');
					} else {
						$(this).stop().css('background-color', missColor);
						$(this).attr('name', missColor);
					}
					break;
				case 'small':
					if ($(this).css('background-color') == "rgb(255, 255, 255)") {
						$(this).stop().css('background-color', smallColor);
						$(this).attr('name', smallColor);
					} else if ($(this).attr('name') == smallColor) {
						$(this).stop().css('background-color', 'white');
						$(this).removeAttr('name');
					} else {
						$(this).stop().css('background-color', smallColor);
						$(this).attr('name', smallColor);
					}
					break;
				case 'medium':
					if ($(this).css('background-color') == "rgb(255, 255, 255)") {
						$(this).stop().css('background-color', medColor);
						$(this).attr('name', medColor);
					} else if ($(this).attr('name') == medColor) {
						$(this).stop().css('background-color', 'white');
						$(this).removeAttr('name');
					} else {
						$(this).stop().css('background-color', medColor);
						$(this).attr('name', medColor);
					}
					break;
				case 'large':
					if ($(this).css('background-color') == "rgb(255, 255, 255)") {
						$(this).stop().css('background-color', largeColor);
						$(this).attr('name', largeColor);
					} else if ($(this).attr('name') == largeColor) {
						$(this).stop().css('background-color', 'white');
						$(this).removeAttr('name');
					} else {
						$(this).stop().css('background-color', largeColor);
						$(this).attr('name', largeColor);
					}
					break;
				case 'clear':
					$(this).stop().css('background-color', 'white');
					$(this).removeAttr('name');
					break;
				default:
					break;
			}
		});
	});
});


function reset() {
	$('.block').each(function(i, obj) {
		$(this).stop();
		$(this).css('background-color', 'white');
		$(this).removeAttr('name');
		$(this).attr('title', 'Empty');
	});
	window.currentScores = Prefilled2DArray(6, 6, 0);
	ShowScoresInBlocks();
}

function ChangeBoxLabel() {
	if ($("input[name='boxtype']:checked").val() == "coffer") {
		$("#boxlabel").html("Coffer");
		$("#menuitemhitmedbox").html("Coffer");
		$('#medstratlabel').html("Coffer");
		$('#medstratlabel2').html("Coffer");
		medTitle = 'Coffer';
		if ($("#medWeight").val() == 25) {
			$("#medWeight").val(35)
		}
	} else {
		$("#boxlabel").html("Gift Box");
		$("#menuitemhitmedbox").html("Gift Box");
		$('#medstratlabel').html("Gift Box");
		$('#medstratlabel2').html("Gift Box");
		medTitle = 'Gift Box';
		if ($("#medWeight").val() == 35) {
			$("#medWeight").val(25)
		}
	}
	UpdateTitles();
}

function UpdateTitles() {
	$('.block').each(function(i, obj) {
		var blockName = $(this).attr('name');
		switch(blockName) {
			case deadColor:
				$(this).attr('title', 'Blocked');
				break;
			case missColor:
				$(this).attr('title', 'Miss');
				break;
			case smallColor:
				$(this).attr('title', 'Fox');
				break;
			case medColor:
				$(this).attr('title', medTitle);
				break;
			case largeColor:
				$(this).attr('title', 'Swords');
				break;
			case undefined:
				$(this).attr('title', 'Empty');
				break;
			case "prediction":
				$(this).attr('title', 'Current Prediction');
				break;
			default:
				console.error("Invalid block name: " + $(this).attr('id') + ' - "' + $(this).attr('name') + '"');
				break;
		}
	});
}

function largeDirectionCheck(sourceCheckbox) {
	var horizontal = $('#largeDirectionH').is(':checked');
	var vertical = $('#largeDirectionV').is(':checked');
	if(horizontal && vertical) {
		if(sourceCheckbox == 1) {
			$('#largeDirectionV').prop("checked", false);
		} else {
			$('#largeDirectionH').prop("checked", false);
		}
	}
}

var currentScores = Prefilled2DArray(6, 6, 0);

var currentGrid = [];

function ParseGrid() {
	window.currentGrid = Prefilled2DArray(6, 6, 0);
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var blockName = $('#container' + (1 + j + 6 * i)).attr('name');
			if (blockName == "") {
				window.currentGrid[i][j] = 0;
			}
			if (blockName == deadColor) {
				window.currentGrid[i][j] = 1;
			}
			if (blockName == missColor) {
				window.currentGrid[i][j] = 2;
			}
			if (blockName == smallColor) {
				window.currentGrid[i][j] = 3;
			}
			if (blockName == medColor) {
				window.currentGrid[i][j] = 4;
			}
			if (blockName == largeColor) {
				window.currentGrid[i][j] = 5;
			}
		}
	}
}

function MakePrediction() {
	var maxScore = 0;
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var box = $('#container' + (i * 6 + 1 + j));
			if (box.attr('name') == 'prediction') {
				box.css('background-color', 'white');
				box.removeAttr('name');
			}
			if (box.attr('name') == undefined) {
				maxScore = Math.max(currentScores[i][j], maxScore);
			}
		}
	}
	if (maxScore != 0) {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				var box = $('#container' + (i * 6 + 1 + j))
				if (currentScores[i][j] == maxScore && box.attr('name') == undefined) {
					box.css('background-color', 'gold');
					box.attr('name', 'prediction');
				}
			}
		}
	}
}

function ShowScoresInBlocks() {
	if ($('#showvalue').is(':checked')) {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				var box = $('#container' + (i * 6 + j + 1));
				if (box.attr('name') == undefined || box.attr('name') == 'prediction') {
					var htmlstring = "<span>";
					htmlstring += (window.currentScores[i][j] * 100).toFixed(2);
					htmlstring += "</span>";
					box.html(htmlstring);
				} else {
					box.html("");
				}
			}
		}
	} else {
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				$('#container' + (i * 6 + j + 1)).html("");
			}
		}
	}
}

function MarkGuaranteedBlocks() {

	//var fullprob = CalculateFullProb();

	// Square
	var medMap = NaiiveMedProb();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (medMap[i][j] == 1 && window.currentGrid[i][j] != 4) {
				window.currentGrid[i][j] = 4;
				var number = i * 6 + j + 1;
				$('#container' + number).css('background-color', medColor).attr('name', medColor);
			}
		}
	}

	// Large
	var largeMap = NaiiveLargeProb();
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (largeMap[i][j] == 1 && window.currentGrid[i][j] != 5) {
				window.currentGrid[i][j] = 5;
				var number = i * 6 + j + 1;
				$('#container' + number).css('background-color', largeColor).attr('name', largeColor);
			}
		}
	}
	
}

function runGuaranteed() {
	ParseGrid();
	
	for(var i = 0; i < 2; i++) {
		MarkGuaranteedBlocks();
	}
	
	var strategy = $("input[name='strategy']:checked").val();
	switch (strategy) {
		case 'strat1':
			window.currentScores = fullProbScores(CalculateFullProb());
			break;
		case 'strat2':
			window.currentScores = weightedScores(CalculateFullProb());
			break;
		case 'strat3':
			window.currentScores = swordsScores(CalculateFullProb());
			break;
		case 'strat4':
			window.currentScores = boxScores(CalculateFullProb());
			break;
		case 'strat5':
			window.currentScores = foxScores(CalculateFullProb());
			break;
		case 'strat6':
			window.currentScores = wfProbScores(CalculateProbWithoutFox());
			break;
		case 'strat7':
			window.currentScores = weightedWFScores(CalculateProbWithoutFox());
			break;
		case 'strat8':
			window.currentScores = swordsWFScores(CalculateProbWithoutFox());
			break;
		case 'strat9':
			window.currentScores = boxWFScores(CalculateProbWithoutFox());
			break;
		default:
			break;
	}
	ShowScoresInBlocks();
	MakePrediction();
}

function LiveUpdate() {
	if ($('#liveupdate').is(':checked')) {
		setTimeout(runGuaranteed, 100);
	}
	setTimeout(UpdateTitles, 100);
}

function fullProbScores(probs) {
	var newScores = Prefilled2DArray(6, 6, 0);
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
	var newScores = Prefilled2DArray(6, 6, 0);
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var foxWeighted = probs[0][i][j] * $('#smallWeight').val();
			var boxWeighted = probs[1][i][j] * $('#medWeight').val();
			var swordsWeighted = probs[2][i][j] * $('#largeWeight').val();
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
	var newScores = Prefilled2DArray(6, 6, 0);
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
	var newScores = Prefilled2DArray(6, 6, 0);
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			var boxWeighted = probs[0][i][j] * $('#medWeight').val();
			var swordsWeighted = probs[1][i][j] * $('#largeWeight').val();
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
	var hitMap = Prefilled2DArray(6, 6, 0);
	var probCount = 0;
	var hitLoc = [];
	//debugger;
	var horizontal = $('#largeDirectionH').prop("checked");
	var vertical = $('#largeDirectionV').prop("checked");
	

	//Check for previous hit
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (window.currentGrid[i][j] == 5) {
				if (hitCount == 0) {
					hitLoc = [i, j];
				}
				hitCount++;
			}
		}
	}

	if (hitCount > 0) {
		if(horizontal || (!horizontal && !vertical)) {
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
					blocks.push(window.currentGrid[coords[0][0]][coords[0][1]]);
					blocks.push(window.currentGrid[coords[1][0]][coords[1][1]]);
					blocks.push(window.currentGrid[coords[2][0]][coords[2][1]]);
					blocks.push(window.currentGrid[coords[3][0]][coords[3][1]]);
					blocks.push(window.currentGrid[coords[4][0]][coords[4][1]]);
					blocks.push(window.currentGrid[coords[5][0]][coords[5][1]]);
					var count = 0;
					var hasObstacle = false;
					for (var k = 0; k < 6; k++) {
						if (blocks[k] == 5) {
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
		}

		if(vertical || (!horizontal && !vertical)) {
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
					blocks.push(window.currentGrid[coords[0][0]][coords[0][1]]);
					blocks.push(window.currentGrid[coords[1][0]][coords[1][1]]);
					blocks.push(window.currentGrid[coords[2][0]][coords[2][1]]);
					blocks.push(window.currentGrid[coords[3][0]][coords[3][1]]);
					blocks.push(window.currentGrid[coords[4][0]][coords[4][1]]);
					blocks.push(window.currentGrid[coords[5][0]][coords[5][1]]);
					var count = 0;
					var hasObstacle = false;
					for (var k = 0; k < 6; k++) {
						if (blocks[k] == 5) {
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
		}

		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 6; j++) {
				hitMap[i][j] /= probCount;
			}
		}

		return hitMap;
	}
	
	if(horizontal || (!horizontal && !vertical)) {
		//Horizontal
		for (var i = 0; i < 5; i++) {
			for (var j = 0; j < 4; j++) {
				var block1 = window.currentGrid[i][j];
				var block2 = window.currentGrid[i][j + 1];
				var block3 = window.currentGrid[i][j + 2];
				var block4 = window.currentGrid[i + 1][j];
				var block5 = window.currentGrid[i + 1][j + 1];
				var block6 = window.currentGrid[i + 1][j + 2];
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
	}

	if(vertical || (!horizontal && !vertical)) {
		//Vertical
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 5; j++) {
				var block1 = window.currentGrid[i][j];
				var block2 = window.currentGrid[i][j + 1];
				var block3 = window.currentGrid[i + 1][j];
				var block4 = window.currentGrid[i + 1][j + 1];
				var block5 = window.currentGrid[i + 2][j];
				var block6 = window.currentGrid[i + 2][j + 1];
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
	var map = Prefilled2DArray(6, 6, 0);
	var count = 0;
	var hitCount = 0;
	var hitLoc = [];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (window.currentGrid[i][j] == 4) {
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
					if (window.currentGrid[coords[k][0]][coords[k][1]] == 4) {
						tempCount++;
					} else if (window.currentGrid[coords[k][0]][coords[k][1]] != 0) {
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
				if (window.currentGrid[i][j] != 0 || window.currentGrid[i][j + 1] != 0 ||
					window.currentGrid[i + 1][j] != 0 || window.currentGrid[i + 1][j + 1] != 0) {
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
	var hitMap = Prefilled3DArray(6, 6, 3, 0);
	var hitCount = 0;
	var currentHits = [0, 0, 0];
	var horizontal = $('#largeDirectionH').prop("checked");
	var vertical = $('#largeDirectionV').prop("checked");

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (currentGrid[i][j] == 3) {
				currentHits[0]++;
			}
			if (currentGrid[i][j] == 4) {
				currentHits[1]++;
			}
			if (currentGrid[i][j] == 5) {
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
			if ((currentGrid[iSm][jSm] == 0 && currentHits[0] == 0) ||
				(currentGrid[iSm][jSm] == 3 && currentHits[0] != 0)) {

				var gridSmallAdded = JSON.parse(JSON.stringify(window.currentGrid));
				gridSmallAdded[iSm][jSm] = 3;


				for (var iMed = 0; iMed < 5; iMed++) {
					for (var jMed = 0; jMed < 5; jMed++) {

						var smallBlocks = [
							gridSmallAdded[iMed][jMed],
							gridSmallAdded[iMed][jMed + 1],
							gridSmallAdded[iMed + 1][jMed],
							gridSmallAdded[iMed + 1][jMed + 1]
						];

						var smallTotalInPlacement = 0;
						for (var i = 0; i < 4; i++) {
							if (smallBlocks[i] == 4) {
								smallTotalInPlacement++;
							}
						}

						if (smallTotalInPlacement == currentHits[1] &&
							(smallBlocks[0] == 0 || smallBlocks[0] == 4) &&
							(smallBlocks[1] == 0 || smallBlocks[1] == 4) &&
							(smallBlocks[2] == 0 || smallBlocks[2] == 4) &&
							(smallBlocks[3] == 0 || smallBlocks[3] == 4)) {

							var gridMedAdded = JSON.parse(JSON.stringify(gridSmallAdded));
							gridMedAdded[iMed][jMed] = 4;
							gridMedAdded[iMed][jMed + 1] = 4;
							gridMedAdded[iMed + 1][jMed] = 4;
							gridMedAdded[iMed + 1][jMed + 1] = 4;
							
							if(horizontal || (!horizontal && !vertical)) {
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
											if (largeBlocks[j] == 5) {
												largeTotalInPlacement++;
											}
										}

										if (largeTotalInPlacement == currentHits[2] &&
											(largeBlocks[0] == 0 || largeBlocks[0] == 5) &&
											(largeBlocks[1] == 0 || largeBlocks[1] == 5) &&
											(largeBlocks[2] == 0 || largeBlocks[2] == 5) &&
											(largeBlocks[3] == 0 || largeBlocks[3] == 5) &&
											(largeBlocks[4] == 0 || largeBlocks[4] == 5) &&
											(largeBlocks[5] == 0 || largeBlocks[5] == 5)) {

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
							}// End Horizontal Larges

							if(vertical || (!horizontal && !vertical)) {
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
											if (largeBlocks[j] == 5) {
												largeTotalInPlacement++;
											}
										}

										if (largeTotalInPlacement == currentHits[2] &&
											(largeBlocks[0] == 0 || largeBlocks[0] == 5) &&
											(largeBlocks[1] == 0 || largeBlocks[1] == 5) &&
											(largeBlocks[2] == 0 || largeBlocks[2] == 5) &&
											(largeBlocks[3] == 0 || largeBlocks[3] == 5) &&
											(largeBlocks[4] == 0 || largeBlocks[4] == 5) &&
											(largeBlocks[5] == 0 || largeBlocks[5] == 5)) {
	
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
							}// End Vertical Larges
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
		Prefilled2DArray(6, 6, 0),
		Prefilled2DArray(6, 6, 0),
		Prefilled2DArray(6, 6, 0)
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
	var hitMap = Prefilled3DArray(6, 6, 2, 0);
	var hitCount = 0;
	var currentHits = [0, 0];
	var horizontal = $('#largeDirectionH').prop("checked");
	var vertical = $('#largeDirectionV').prop("checked");

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			if (currentGrid[i][j] == 4) {
				currentHits[0]++;
			}
			if (currentGrid[i][j] == 5) {
				currentHits[1]++;
			}
		}
	}
	
	for (var iMed = 0; iMed < 5; iMed++) {
		for (var jMed = 0; jMed < 5; jMed++) {

			var smallBlocks = [
				window.currentGrid[iMed][jMed],
				window.currentGrid[iMed][jMed + 1],
				window.currentGrid[iMed + 1][jMed],
				window.currentGrid[iMed + 1][jMed + 1]
			];

			var smallTotalInPlacement = 0;
			for (var i = 0; i < 4; i++) {
				if (smallBlocks[i] == 4) {
					smallTotalInPlacement++;
				}
			}

			if (smallTotalInPlacement == currentHits[0] &&
			   (smallBlocks[0] == 0 || smallBlocks[0] == 4) &&
			   (smallBlocks[1] == 0 || smallBlocks[1] == 4) &&
			   (smallBlocks[2] == 0 || smallBlocks[2] == 4) &&
			   (smallBlocks[3] == 0 || smallBlocks[3] == 4)) {

				var gridMedAdded = JSON.parse(JSON.stringify(window.currentGrid));
				gridMedAdded[iMed][jMed] = 4;
				gridMedAdded[iMed][jMed + 1] = 4;
				gridMedAdded[iMed + 1][jMed] = 4;
				gridMedAdded[iMed + 1][jMed + 1] = 4;
							
				if(horizontal || (!horizontal && !vertical)) {
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
								if (largeBlocks[j] == 5) {
									largeTotalInPlacement++;
								}
							}

							if (largeTotalInPlacement == currentHits[1] &&
							   (largeBlocks[0] == 0 || largeBlocks[0] == 5) &&
							   (largeBlocks[1] == 0 || largeBlocks[1] == 5) &&
							   (largeBlocks[2] == 0 || largeBlocks[2] == 5) &&
							   (largeBlocks[3] == 0 || largeBlocks[3] == 5) &&
							   (largeBlocks[4] == 0 || largeBlocks[4] == 5) &&
							   (largeBlocks[5] == 0 || largeBlocks[5] == 5)) {

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
					}
				}// End Horizontal Larges

				if(vertical || (!horizontal && !vertical)) {
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
								if (largeBlocks[j] == 5) {
									largeTotalInPlacement++;
								}
							}

							if (largeTotalInPlacement == currentHits[1] &&
							   (largeBlocks[0] == 0 || largeBlocks[0] == 5) &&
							   (largeBlocks[1] == 0 || largeBlocks[1] == 5) &&
							   (largeBlocks[2] == 0 || largeBlocks[2] == 5) &&
							   (largeBlocks[3] == 0 || largeBlocks[3] == 5) &&
							   (largeBlocks[4] == 0 || largeBlocks[4] == 5) &&
							   (largeBlocks[5] == 0 || largeBlocks[5] == 5)) {
	
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
					}
				}// End Vertical Larges
			}
		}
	} // End Mediums

	// Probabilities Time

	//LARGE HIT COUNT IS THE SAME AS TOTAL BOARD CONFIGS
	//Formula: number of hits/total board configs
	var probabilityMaps = [
		Prefilled2DArray(6, 6, 0),
		Prefilled2DArray(6, 6, 0)
	];

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			probabilityMaps[0][i][j] = hitMap[i][j][0] / hitCount;
			probabilityMaps[1][i][j] = hitMap[i][j][1] / hitCount;
		}
	}

	return probabilityMaps;
}

// Stolen from Stackoverflow @Tyler
function Prefilled2DArray(height, width, value) {
	return Array.from(Array(height), _ => Array(width).fill(value));
}

// But not this one
function Prefilled3DArray(height, width, depth, value) {
	return Array.from(Array(height), _ => Array.from(Array(width), _ => Array(depth).fill(value)));
}