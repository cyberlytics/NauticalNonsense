
// You can write more code here

/* START OF COMPILED CODE */

class Gameboard extends Phaser.Scene {

	constructor() {
		super("Gameboard");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	Shoot(row,col,gridSize,sharedData) {
		console.log(row)
		console.log(col)
		console.log(gridSize)
		var shootPosition = row*gridSize+col;
		return this.sendFireMessage(sharedData,shootPosition);
	}

	sendFireMessage(sharedData, message) {
		var sent = 0;
		while (sent < 5) {
			if (sharedData.socket && sharedData.socket.readyState === WebSocket.OPEN) {
				var jsonMessage = JSON.stringify({"Fire" : message,"GameID": sharedData.game_id});
				sharedData.socket.send(jsonMessage);
				console.log(jsonMessage);
				sent = 5;
				return true;
			} else {
				console.error('WebSocket connection is not open');
				sharedData.socket = new WebSocket(sharedData.websocket_url);
				// Handle WebSocket events
				sharedData.socket.onopen = function () {
					console.log('WebSocket connection established');
					// Perform any necessary actions when the connection is successfully established
				};

				sharedData.socket.onerror = function (error) {
					console.error('WebSocket error:', error);
					// Handle any errors that occur during the WebSocket connection
				};

				sharedData.socket.onclose = function () {
					console.log('WebSocket connection closed');
					// Perform any necessary actions when the connection is closed
				};
				sent++;
			}
			return false;
		}
	}
	/** @returns {void} */
	editorCreate() {
		var sharedData = this.game.sharedData;


		sharedData.socket.onmessage = function (event) {
			console.log("Received message:", event.data);
			var message = JSON.parse(event.data)['message'];
			console.log("Parsed message:", message);
			sharedData.won = message.won;
			if(message.won) {
				self.scene.start("Gameover");
			}

			if (sharedData.its_your_turn) {
				self.UpdateGameboardColors(message.board,"enemy");
				if (!message.hit) {
					sharedData.its_your_turn = false;
					self.switchTurn(readyLamp,opponentLamp,false)
				}
			}else{
				self.UpdateGameboardColors(message.board,"player");
				if (!message.hit) {
					sharedData.its_your_turn = true;
					self.switchTurn(readyLamp, opponentLamp, true);

				}
			}
		};


		const self = this;
		this.selectedCell = -1;


		var isCellSelected = false;
		var selectedRow = -1;
		var selectedCol = -1;


		//boardParams
		this.gridSize = 10;
		const cellColor = 0xdae8fC;
		const enemyCellColor = 0xd5e8d4;
		const PositionFinished = 0x5bb450;
		const backgroundColor = 0x3c3845;
		const capitulateColor = 0xffe578;
		const smallCornerRadius = 20;
		const tinyCornerRadius = 10;
		const boardMargin = 30;

		//sounds
		this.click = this.sound.add("click");

		// Add the background sprite
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		// fireControl
		const fireControl = this.add.image(1280 / 2 - 340, 237, "gbFireControl");
		fireControl.scaleX = 1;
		fireControl.scaleY = 1;

		// fireControlText
		const fireControlText = this.add.text(1280 / 2 - 340, 43, "", {});
		fireControlText.scaleX = 1;
		fireControlText.scaleY = 1;
		fireControlText.setOrigin(0.5, 0.5);
		fireControlText.text = "Fire Control";
		fireControlText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// draw enemy board
		this.enemyBoardPos = {
			x: 125,
			y: 80,
			width: 350,
			height: 350,
			cornerRadius: smallCornerRadius
		}
		this.enemyGrid = [];
		this.enemyRedCrossList = [];
		this.enemyExplosionStarList = [];
		const enemyCellSize = this.enemyBoardPos.width / (this.gridSize);

		for (let row = 0; row < this.gridSize; row++) {
			this.enemyGrid[row] = [];
			for (let col = 0; col < this.gridSize; col++) {
				const cell = this.add.rectangle(this.enemyBoardPos.x + col * enemyCellSize, this.enemyBoardPos.y + row * enemyCellSize, enemyCellSize - 1, enemyCellSize - 1, enemyCellColor);
				cell.setOrigin(0, 0);
				cell.setInteractive();
				cell.on('pointerdown', () => {
					self.playClick();
					//self.DrawDemoBoard("enemy");
					if (sharedData.its_your_turn) {
						if (isCellSelected) {
							self.enemyGrid[selectedRow][selectedCol].setAlpha(1);
							if (selectedRow === row && selectedCol === col) {
								selectedRow = -1;
								selectedCol = -1;
								isCellSelected = false;
							}
							else{
								cell.setAlpha(0.5);
								selectedRow = row;
								selectedCol = col;
								isCellSelected = true;
							}
						}else{
							cell.setAlpha(0.5);
							selectedRow = row;
							selectedCol = col;
							isCellSelected = true;
						}	
					}
				});
				this.enemyGrid[row][col] = cell;
			}
		}

		// buttonBox
		const buttonBox = this.add.image(1280 / 2 - 340, 720 / 2 + 230, "gbButtonBox");
		buttonBox.scaleX = 0.9;
		buttonBox.scaleY = 0.9;

		// readyLamp
		const readyLamp = this.add.image(1280 / 2 - 220, 720 / 2 + 166, "gbReadyLamp");
		readyLamp.scaleX = 0.9;
		readyLamp.scaleY = 0.9;

		// opponentLamp
		const opponentLamp = this.add.image(1280 / 2 - 220.5, 720 / 2 + 250, "gbOpponentLamp");
		opponentLamp.scaleX = 0.9;
		opponentLamp.scaleY = 0.9;

		self.switchTurn(readyLamp, opponentLamp, sharedData.its_your_turn);

		// readyText
		const readyText = this.add.text(1280 / 2 - 220, 720 / 2 + 205, "", {});
		readyText.scaleX = 1;
		readyText.scaleY = 1;
		readyText.setOrigin(0.5, 0.5);
		readyText.text = "Your Turn";
		readyText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "13px" });

		// opponentText
		const opponentText = this.add.text(1280 / 2 - 220, 720 / 2 + 295, "", {});
		opponentText.scaleX = 1;
		opponentText.scaleY = 1;
		opponentText.setOrigin(0.5, 0.5);
		opponentText.text = "Opponent's\nTurn";
		opponentText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "13px" });

		// fireButton
		const fireButton = this.add.image(1280 / 2 - 390, 720 / 2 + 190, "gbFireButton").setInteractive({ useHandCursor: true });
		fireButton.scaleX = 0.9;
		fireButton.scaleY = 0.9;

		fireButton.on('pointerover', function (event) {
			if (sharedData.its_your_turn) {
				this.setTint(0x1ed013);
			} else {
				
				this.setTint(0xe50000);
			}
		});

		fireButton.on('pointerout', function (event) {
			this.clearTint();
		});

		fireButton.on('pointerdown', function (event) {
			self.playClick();
			if(sharedData.its_your_turn){
				if(self.Shoot(selectedRow,selectedCol,self.gridSize,sharedData)){
					self.enemyGrid[selectedRow][selectedCol].setAlpha(1);
					selectedCol = -1;
					selectedRow = -1;
					isCellSelected = false;
				}
			}
			this.clearTint();
		});

		// fireButtonText
		const fireButtonText = this.add.text(1280 / 2 - 390, 720 / 2 + 190, "", {});
		fireButtonText.scaleX = 1;
		fireButtonText.scaleY = 1;
		fireButtonText.setOrigin(0.5, 0.5);
		fireButtonText.text = "Fire";
		fireButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// capitulateButton
		const capitulateButton = this.add.image(1280 / 2 - 390, 720 / 2 + 290, "gbCapitulateButton").setInteractive({ useHandCursor: true });
		capitulateButton.scaleX = 0.9;
		capitulateButton.scaleY = 0.9;

		capitulateButton.on('pointerover', function (event) {
			this.setTint(0xffd700);
		});

		capitulateButton.on('pointerout', function (event) {
			this.clearTint();
		});

		capitulateButton.on('pointerdown', function (event) {
			self.playClick();
			this.clearTint();
			self.scene.start("Gameover");
        });
		
		// capitulateButtonText
		const capitulateButtonText = this.add.text(1280 / 2 - 390, 720 / 2 + 290, "", {});
		capitulateButtonText.scaleX = 1;
		capitulateButtonText.scaleY = 1;
		capitulateButtonText.setOrigin(0.5, 0.5);
		capitulateButtonText.text = "Capitulate";
		capitulateButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// battlefieldBackground
		const battlefieldBackground = this.add.image(1280 / 2 + 210, 720 / 2, "spBattlefieldBackground");
		battlefieldBackground.scaleX = 1;
		battlefieldBackground.scaleY = 1;

		// battlefieldBackgroundText
		const battlefieldBackgroundText = this.add.text(1280 / 2 + 210, 43, "", {});
		battlefieldBackgroundText.scaleX = 1;
		battlefieldBackgroundText.scaleY = 1;
		battlefieldBackgroundText.setOrigin(0.5, 0.5);
		battlefieldBackgroundText.text = "Battlefield";
		battlefieldBackgroundText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });

		//playerBoard
		this.playerBoardPos = {
			x: 340 + 210,
			y: 75,
			width: 600,
			height: 600,
			cornerRadius: 30
		};
		this.playerGrid = [];
		this.playerRedCrossList = [];
		this.playerExplosionStarList = [];

		const playerCellSize = this.playerBoardPos.width / (this.gridSize);

		for (let row = 0; row < this.gridSize; row++) {
			this.playerGrid[row] = [];
			for (let col = 0; col < this.gridSize; col++) {
				const cell = this.add.rectangle(this.playerBoardPos.x + col * playerCellSize, this.playerBoardPos.y + row * playerCellSize, playerCellSize - 1, playerCellSize - 1, cellColor);
				cell.setOrigin(0, 0);
				cell.setInteractive();
				cell.on('pointerdown', (pointer) => {
					self.playClick();
					self.DrawDemoBoard("player");
				});
				this.playerGrid[row][col] = cell;
			}
		}

		//ships
		for (let index = 0; index < sharedData.sprites.length; index++) {
			sharedData.sprites[index].setVisible(true);
			sharedData.sprites[index].x = sharedData.sprites[index].x + 210;
			this.add.existing(sharedData.sprites[index]);
			this.highlightCells(sharedData.occupiedCells, this.playerGrid)
			}
			
			
			// sharedData.socket.onmessage = function(event) {
			// var message = JSON.parse(event.data);
			// console.log("Message received:", message)
			//};

	}


	GetDummyGameboard() {
	// returns list with random integers
		var list = [];
		for (let i = 0; i<this.gridSize**2; i++) {
			list[i] = Math.round(Math.random()*4);
		}
		console.log(list);
		return list;
	}

	UpdateGameboardColors(Data, GridName) {
		var Grid = this.enemyGrid;
		var BoardPos = this.enemyBoardPos;
		var redCrossList = this.enemyRedCrossList;
		var explosionstarList = this.enemyExplosionStarList;
		var crossSize = 350/600;
		var explosionSize = 350/600;
		var colors = [
			0xd5e8d4,	// light blue; Water
			0xdae8fC, // light blue; ship is on Water 0x8b8b8b,	// light gray; Ship
			0xdae8fC, // used cross instead of red; keeps background light blue 0xed6666,	// light red; Missed Shot
			0xdae8fC,	// light green; Hit Shot
			0x8b8b8b	// light gray; Sunk Ship
		];
		if (GridName=="player") {
			colors[0] = 0xdae8fC // use light blue if playerboard is drawn
			Grid = this.playerGrid;
			BoardPos = this.playerBoardPos;
			redCrossList = this.playerRedCrossList;
			explosionstarList = this.playerExplosionStarList;
			crossSize = 1;
			explosionSize = 1;
		}
		// clear all previously drawn redCrosses and explosionStars
		while (redCrossList.length > 0) {
			redCrossList.pop().destroy();
		}

		while (explosionstarList.length > 0) {
			explosionstarList.pop().destroy();
		}

		const CellSize = BoardPos.width / (this.gridSize);

		// Iterate over the cells array and adjust the filled value
		for (let row = 0; row < Grid.length; row++) {
			for (let col = 0; col < Grid[row].length; col++) {
				const cell = Grid[row][col];
				// set each Cell to its specified state
				if (Data[row*this.gridSize+col] == 2){
					// draw red Cross for missed Ship
					var cross = this.add.image(BoardPos.x + col * CellSize, BoardPos.y + row * CellSize, "gbRedCross");
					cross.setOrigin(0, 0);
					cross.scaleX = crossSize;
					cross.scaleY = crossSize;
					cross.setDepth(100);
					redCrossList.push(cross);
				}
				else if (Data[row*this.gridSize+col] == 3){
					// draw explosion star for hit Ship
					var star = this.add.image(BoardPos.x + col * CellSize, BoardPos.y + row * CellSize, "gbExplosionStar");
					star.setOrigin(0, 0);
					// star.setDisplayOrigin(-CellSize/10*,0);
					star.scaleX = explosionSize;
					star.scaleY = explosionSize;
					star.setDepth(100);
					explosionstarList.push(star);
				}
				// draw colour of cell
				cell.setFillStyle(colors[Data[row*this.gridSize + col]]);	
			}
		}
	}

	DrawDemoBoard(GridName) {
		this.UpdateGameboardColors(this.GetDummyGameboard(), GridName);
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
	}

	playClick() {
		this.click.play();
	}

	switchTurn(player, opponent, s) {
		if (s) {
			player.setTint(0x00ff00);
			opponent.clearTint();
		}
		else {
			opponent.setTint(0xff0000);
			player.clearTint();
		}
	}

	highlightCells(occupiedCells, playerGrid) {
		// Iterate over the cells array and adjust the alpha value accordingly
		for (let row = 0; row < playerGrid.length; row++) {
			for (let col = 0; col < playerGrid[row].length; col++) {
				const cell = playerGrid[row][col];

				// Check if the cell is in the occupiedCells array
				if (occupiedCells.some(({ row: occupiedRow, col: occupiedCol }) => occupiedRow === row && occupiedCol === col)) {
					cell.setAlpha(0.5);  // Highlight occupied cell
				} else {
					cell.setAlpha(1);    // Set other cells to normal
				}
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
