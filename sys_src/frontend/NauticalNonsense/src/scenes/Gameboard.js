
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
		var shootPosition = row*gridSize+col;
		return this.sendFireMessage(sharedData,shootPosition);
	}

	sendFireMessage(sharedData, message) {
		var sent = 0;
		while (sent < 5) {
			if (sharedData.socket && sharedData.socket.readyState === WebSocket.OPEN) {
				var jsonMessage = JSON.stringify({"Fire" : message});
				sharedData.socket.send(jsonMessage);
				console.log(jsonMessage);
				sent = 5;
				return true;
			} else {
				console.error('WebSocket connection is not open');
				sharedData.socket = new WebSocket(sharedData.websocket_url);
				sent++;
			}
			return false;
		}
	}
	/** @returns {void} */
	editorCreate() {
		var sharedData = this.game.sharedData;
		const self = this;
		var isPlayerTurn = true;

		var isCellSelected = false;
		var selectedRow = -1;
		var selectedCol = -1;

		//boardParams
		const gridSize = 10;
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
		const enemyBoardPos = {
			x: 125,
			y: 80,
			width: 350,
			height: 350,
			cornerRadius: smallCornerRadius
		}
		const enemyGrid = [];
		const enemyCellSize = enemyBoardPos.width / (gridSize);

		for (let row = 0; row < gridSize; row++) {
			enemyGrid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(enemyBoardPos.x + col * enemyCellSize, enemyBoardPos.y + row * enemyCellSize, enemyCellSize - 1, enemyCellSize - 1, enemyCellColor);
				cell.setOrigin(0, 0);
				cell.setInteractive();
				cell.on('pointerdown', () => {
					self.playClick();
					if (isCellSelected) {
						enemyGrid[selectedRow][selectedCol].setAlpha(1);
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
				});
				enemyGrid[row][col] = cell;
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

		self.switchTurn(readyLamp, opponentLamp, isPlayerTurn);

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
			this.setTint(0xe50000);
		});

		fireButton.on('pointerout', function (event) {
			this.clearTint();
		});

		fireButton.on('pointerdown', function (event) {
			self.playClick();
			if(self.Shoot(selectedRow,selectedCol,gridSize,sharedData)){
				enemyGrid[selectedRow][selectedCol].setAlpha(1);
				selectedCol = -1;
				selectedRow = -1;
				isCellSelected = false;
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
			self.scene.start("Start");
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
		const playerBoardPos = {
			x: 340 + 210,
			y: 75,
			width: 600,
			height: 600,
			cornerRadius: 30
		}
		const playerGrid = [];
		const playerCellSize = playerBoardPos.width / (gridSize);

		for (let row = 0; row < gridSize; row++) {
			playerGrid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(playerBoardPos.x + col * playerCellSize, playerBoardPos.y + row * playerCellSize, playerCellSize - 1, playerCellSize - 1, cellColor);
				cell.setOrigin(0, 0);
				cell.setInteractive();
				cell.on('pointerdown', (pointer) => {
					self.playClick();
				});
				playerGrid[row][col] = cell;
			}
		}

		sharedData.socket.onmessage = function(event) {
			var message = JSON.parse(event.data);
			console.log("Message received:", message)
		};
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
			player.setTint(0x1ed013);
			opponent.clearTint();
		}
		else {
			opponent.setTint(0xe50000);
			player.clearTint();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
