
// You can write more code here

/* START OF COMPILED CODE */

class Shipplacement extends Phaser.Scene {

	constructor() {
		super("Shipplacement");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		var sharedData = this.game.sharedData;
		const self = this;
		var isEnemyReady = false;
		var isPlayerReady = false;

		sharedData.socket.onmessage = function(event) {
			var message = JSON.parse(event.data);
			console.log("Message received:", message)
		};

		//boardParams
		const gridSize = 10;
		const cellColor = 0xdae8fC;
		const PositionFinished = 0x5bb450;
		const backgroundColor = 0x3c3845;
		const capitulateColor = 0xffe578;
		const smallCornerRadius = 20;
		const tinyCornerRadius = 10;
		const boardMargin = 30;

		//initShips
		const carrier = {
			size: 5, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "carrier",
			rotation: 0,
			placed: 0
		};

		const battleship = {
			size: 4, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "battleship",
			rotation: 0,
			placed: 0
		};

		const cruiser = {
			size: 3, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "cruiser",
			rotation: 0,
			placed: 0
		};

		const destroyer = {
			size: 2, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "destroyer",
			rotation: 0,
			placed: 0
		};

		const destroyer1 = {
			size: 2, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "destroyer1",
			rotation: 0,
			placed: 0
		};

		const submarine = {
			size: 1, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "submarine",
			rotation: 0,
			placed: 0
		};

		const submarine1 = {
			size: 1, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "submarine1",
			rotation: 0,
			placed: 0
		};

		var carrierSprite = this.add.sprite(1125, 180, 'carrier');
		carrierSprite.setScale(0.2);
		carrierSprite.setDepth(1);

		var battleshipSprite = this.add.sprite(1125, 290, 'battleship');
		battleshipSprite.setScale(0.35);
		battleshipSprite.setDepth(1);

		var cruiserSprite = this.add.sprite(1125, 400, 'cruiser');
		cruiserSprite.setScale(0.25);
		cruiserSprite.setDepth(1);

		var destroyerSprite = this.add.sprite(1125 - 50, 510, 'destroyer');
		destroyerSprite.setScale(0.25);
		destroyerSprite.setDepth(1);

		var destroyerSprite1 = this.add.sprite(1125 + 50, 510, 'destroyer');
		destroyerSprite1.setScale(0.25);
		destroyerSprite1.setDepth(1);

		var submarineSprite = this.add.sprite(1125 - 50, 620, 'submarine');
		submarineSprite.setScale(0.23);
		submarineSprite.setDepth(1);

		var submarineSprite1 = this.add.sprite(1125 + 50, 620, 'submarine');
		submarineSprite1.setScale(0.23);
		submarineSprite1.setDepth(1);

		const ships = [battleship, carrier, cruiser, destroyer, destroyer1, submarine, submarine1];
		const shipSprites = [battleshipSprite, carrierSprite, cruiserSprite, destroyerSprite, destroyerSprite1, submarineSprite, submarineSprite1]; let selectedShipIndex = -1; // Initialize with an invalid index

		let occupiedCells = [];

		//sounds
		this.click = this.sound.add("click");

		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		// opponentStatus
		const opponentStatus = this.add.image(1280 / 2 - 485, 150, "spOpponentStatus");
		opponentStatus.scaleX = 0.7;
		opponentStatus.scaleY = 0.7;

		// opponentStatusText
		const opponentStatusText = this.add.text(1280 / 2 - 485, 85, "", {});
		opponentStatusText.scaleX = 1;
		opponentStatusText.scaleY = 1;
		opponentStatusText.setOrigin(0.5, 0.5);
		opponentStatusText.text = "Opponent Status";
		opponentStatusText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// opponentStatusGreen
		const opponentStatusGreen = this.add.image(1280 / 2 - 426.5, 169.5, "spOpponentStatusGreen");
		opponentStatusGreen.scaleX = 0.7;
		opponentStatusGreen.scaleY = 0.7;

		// opponentStatusRed
		const opponentStatusRed = this.add.image(1280 / 2 - 544.5, 169.5, "spOpponentStatusRed");
		opponentStatusRed.scaleX = 0.7;
		opponentStatusRed.scaleY = 0.7;
		self.switchReady(opponentStatusRed, opponentStatusGreen, isEnemyReady);

		// buttonBox
		const buttonBox = this.add.image(1280 / 2 - 485, 720 / 2 + 30, "spButtonBox");
		buttonBox.scaleX = 0.7;
		buttonBox.scaleY = 0.7;

		// confirmButton
		const confirmButton = this.add.image(1280 / 2 - 485, 720 / 2 - 30, "spConfirmButton").setInteractive({ useHandCursor: true });
		confirmButton.scaleX = 0.7;
		confirmButton.scaleY = 0.7;

		confirmButton.on('pointerover', function (event) {
			this.setTint(0x1ed013);
		});

		confirmButton.on('pointerout', function (event) {
			this.clearTint();
		});

		confirmButton.on('pointerdown', function (event) {
			self.playClick();
			this.clearTint();
			isPlayerReady = true;

			for (let i = 0; i < shipSprites.length; i++) {
				shipSprites[i].setInteractive(false).removeAllListeners();
				console.log(1);
				ships[i].placed = 3;
			}
			self.sendMessage(sharedData, self.GetListOfPositions(ships, gridSize));
			self.scene.start("Waiting2");
		});

		// confirmButtonText
		const confirmButtonText = this.add.text(1280 / 2 - 485, 720 / 2 - 30, "", {});
		confirmButtonText.scaleX = 1;
		confirmButtonText.scaleY = 1;
		confirmButtonText.setOrigin(0.5, 0.5);
		confirmButtonText.text = "Confirm";
		confirmButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// randomButton
		const randomButton = this.add.image(1280 / 2 - 485, 720 / 2 + 54, "spRandomButton").setInteractive({ useHandCursor: true });
		randomButton.scaleX = 0.7;
		randomButton.scaleY = 0.7;

		randomButton.on('pointerover', function (event) {
			this.setTint(0xffd700);
		});

		randomButton.on('pointerout', function (event) {
			this.clearTint();
		});

		randomButton.on('pointerdown', function (event) {
			self.playClick();
			this.clearTint();
			isEnemyReady = true;
			self.switchReady(opponentStatusRed, opponentStatusGreen, isEnemyReady);
		});

		// randomButtonText
		const randomButtonText = this.add.text(1280 / 2 - 485, 720 / 2 + 54, "", {});
		randomButtonText.scaleX = 1;
		randomButtonText.scaleY = 1;
		randomButtonText.setOrigin(0.5, 0.5);
		randomButtonText.text = "Random";
		randomButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// resetButton
		const resetButton = this.add.image(1280 / 2 - 485, 720 / 2 + 115, "spResetButton").setInteractive({ useHandCursor: true });
		resetButton.scaleX = 0.7;
		resetButton.scaleY = 0.7;

		resetButton.on('pointerover', function (event) {
			this.setTint(0xe50000);
		});

		resetButton.on('pointerout', function (event) {
			this.clearTint();
		});

		resetButton.on('pointerdown', function (event) {
			self.playClick();
			this.clearTint();
		});

		// resetButtonText
		const resetButtonText = this.add.text(1280 / 2 - 485, 720 / 2 + 115, "", {});
		resetButtonText.scaleX = 1;
		resetButtonText.scaleY = 1;
		resetButtonText.setOrigin(0.5, 0.5);
		resetButtonText.text = "Reset";
		resetButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// battlefieldBackground
		const battlefieldBackground = this.add.image(1280 / 2, 720 / 2, "spBattlefieldBackground");
		battlefieldBackground.scaleX = 1;
		battlefieldBackground.scaleY = 1;

		// battlefieldBackgroundText
		const battlefieldBackgroundText = this.add.text(1280 / 2, 43, "", {});
		battlefieldBackgroundText.scaleX = 1;
		battlefieldBackgroundText.scaleY = 1;
		battlefieldBackgroundText.setOrigin(0.5, 0.5);
		battlefieldBackgroundText.text = "Battlefield";
		battlefieldBackgroundText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });

		//playerBoard
		const playerBoardPos = {
			x: 340,
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

		// fleetBox
		const fleetBox = this.add.image(1280 / 2 + 485, 720 / 2, "spFleetBox");
		fleetBox.scaleX = 0.9;
		fleetBox.scaleY = 0.9;

		// fleetBoxText
		const fleetBoxText = this.add.text(1280 / 2 + 485, 90, "", {});
		fleetBoxText.scaleX = 1;
		fleetBoxText.scaleY = 1;
		fleetBoxText.setOrigin(0.5, 0.5);
		fleetBoxText.text = "Fleet";
		fleetBoxText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// carrierText
		const carrierText = this.add.text(1280 / 2 + 485, 130, "", {});
		carrierText.scaleX = 1;
		carrierText.scaleY = 1;
		carrierText.setOrigin(0.5, 0.5);
		carrierText.text = "Carrier";
		carrierText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// battleshipText
		const battleshipText = this.add.text(1280 / 2 + 485, 236, "", {});
		battleshipText.scaleX = 1;
		battleshipText.scaleY = 1;
		battleshipText.setOrigin(0.5, 0.5);
		battleshipText.text = "Battleship";
		battleshipText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// cruiserText
		const cruiserText = this.add.text(1280 / 2 + 485, 343, "", {});
		cruiserText.scaleX = 1;
		cruiserText.scaleY = 1;
		cruiserText.setOrigin(0.5, 0.5);
		cruiserText.text = "Cruiser";
		cruiserText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// destroyerText
		const destroyerText = this.add.text(1280 / 2 + 485, 450, "", {});
		destroyerText.scaleX = 1;
		destroyerText.scaleY = 1;
		destroyerText.setOrigin(0.5, 0.5);
		destroyerText.text = "Destroyer";
		destroyerText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// submarineText
		const submarineText = this.add.text(1280 / 2 + 485, 558, "", {});
		submarineText.scaleX = 1;
		submarineText.scaleY = 1;
		submarineText.setOrigin(0.5, 0.5);
		submarineText.text = "Submarine";
		submarineText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		// Call the placeShipSprite function for each ship
		for (let i = 0; i < ships.length; i++) {
			const ship = ships[i];
			const sprite = shipSprites[i];
			this.placeShipSprite(sprite, ship, gridSize, playerGrid, playerCellSize, occupiedCells);
		}

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
	}

	playClick() {
		this.click.play();
	}

	switchReady(red, green, s) {
		if (s) {
			red.clearTint();
			green.setTint(0x1ed013);
		}
		else {
			red.setTint(0xe50000);
			green.clearTint();
		}
	}

	Shoot() {
		// insert here REST Call to backend or send game object via websocket
	}

	GetListOfPositions(ships, gridSize) {
		let positions = []
		for (let i = 0; i < ships.length; i++) {
			positions[i] = []
			for (let j = 0; j < ships[i].cells.length; j++) {
				positions[i][j] = ships[i].cells[j].row * gridSize + ships[i].cells[j].col;
			}
		}
		return positions;
	}

	sendMessage(sharedData, message) {
		var sent = 0;
		while (sent < 5) {
			if (sharedData.socket && sharedData.socket.readyState === WebSocket.OPEN) {
				var jsonMessage = JSON.stringify(message);
				sharedData.socket.send(jsonMessage);
				console.log(jsonMessage);
				sent = 5;
			} else {
				console.error('WebSocket connection is not open');
				sharedData.socket = new WebSocket(sharedData.websocket_url);
				sent++;
			}
		}
		
	}

	rotateShip(shipSprite, ship, occupiedCells, gridSize, playerGrid, playerCellSize) {
		ship.rotation += 90; // Increment the rotation angle by 90 degrees
		if (ship.rotation === 360) {
			ship.rotation = 0;
		}

		if (ship.size !== 1) {
			let futurecells = [];
			for (let i = 0; i < ship.size; i++) {
				if (ship.rotation === 0 || ship.rotation === 180) {
					var row = ship.cells[Math.floor(ship.size / 2)].row;
					var col = ship.cells[0].col - Math.floor(ship.size / 2);
					futurecells.push({ row, col: col + i });

				} else if (ship.rotation === 90 || ship.rotation === 270) {
					var row = ship.cells[0].row - Math.floor(ship.size / 2);
					var col = ship.cells[Math.floor(ship.size / 2)].col;
					futurecells.push({ row: row + i, col });
				}
			}
			console.log(futurecells);

			if (this.CheckValidPositioning(occupiedCells.map(cell => ({ ...cell })), ship.cells, futurecells, gridSize)) {
				this.updateOccupiedCells(occupiedCells, futurecells, ship.cells);
				row = futurecells[0].row;
				col = futurecells[0].col
				var xcenter = 0;
				var ycenter = 0;

				if (ship.rotation === 0 || ship.rotation === 180) {
					xcenter = (playerGrid[row][col].x + playerGrid[row][col + ship.size - 1].x) / 2 + playerCellSize / 2;
					ycenter = playerGrid[row][col].y + playerCellSize / 2;
				} else if (ship.rotation === 90 || ship.rotation === 270) {
					xcenter = playerGrid[row][col].x + playerCellSize / 2;
					ycenter = (playerGrid[row][col].y + playerGrid[row + ship.size - 1][col].y) / 2 + playerCellSize / 2;
				}
				ship.cells = futurecells;
				shipSprite.x = xcenter;
				shipSprite.y = ycenter;
				shipSprite.setRotation(Phaser.Math.DegToRad(ship.rotation)); // Apply the rotation to the ship sprite
				this.highlightCells(occupiedCells, playerGrid);
			}
			else {
				ship.rotation -= 90; // Decrement the rotation angle by 90 degrees
			}
		} else {
			shipSprite.setRotation(Phaser.Math.DegToRad(ship.rotation)); // Apply the rotation to the ship sprite
		}
	}

	isCellOccupied(occupiedCells, row, col) {
		return occupiedCells.some((cell) => cell.row === row && cell.col === col);
	}

	updateOccupiedCells(occupiedCells, shipcells, oldcells) {
		// Remove old occupied cells
		if (oldcells !== null) {
			for (const cell of oldcells) {
				const index = occupiedCells.findIndex((occupiedCell) => occupiedCell.row === cell.row && occupiedCell.col === cell.col);
				if (index !== -1) {
					occupiedCells.splice(index, 1);
				}
			}
		}

		// Add new occupied cells
		for (const cell of shipcells) {
			occupiedCells.push(cell);
		}
	}


	getRandomPosition(rotation, ship, shipSprite, gridSize, playerGrid, playerCellSize, occupiedCells) {
		rotation = Phaser.Math.RND.pick([0, 90, 180, 270]); // Randomly choose rotation angle
		ship.rotation = rotation;
		var size = ship.size;
		const maxIndex = gridSize - 1 - size; // The maximum index for row and col based on size
		let xcenter, ycenter;
		let row, col;
		var cellsOccupied = true;

		const indices = [];
		while (cellsOccupied) {
			if (rotation === 0 || rotation === 180) {
				// Select horizontally
				row = Phaser.Math.Between(0, gridSize - 1); // Random row index
				col = Phaser.Math.Between(0, maxIndex); // Random col index within the valid range

				xcenter = (playerGrid[row][col].x + playerGrid[row][col + size].x) / 2;
				ycenter = playerGrid[row][col].y + playerCellSize / 2;
			} else if (rotation === 90 || rotation === 270) {
				// Select vertically
				row = Phaser.Math.Between(0, maxIndex); // Random row index within the valid range
				col = Phaser.Math.Between(0, gridSize - 1); // Random col index
				xcenter = playerGrid[row][col].x + playerCellSize / 2;
				ycenter = (playerGrid[row][col].y + playerGrid[row + size][col].y) / 2;
			}

			indices.length = 0; // Clear previous indices
			for (let i = 0; i < size; i++) {
				if (rotation === 0 || rotation === 180) {
					indices.push({ row, col: col + i });
				} else if (rotation === 90 || rotation === 270) {
					indices.push({ row: row + i, col });
				}
			}
			cellsOccupied = indices.some((cell) => {
				return this.isCellOccupied(occupiedCells, cell.row, cell.col);
			});
		}
		ship.cells = indices;
		this.updateOccupiedCells(occupiedCells, ship.cells, null);
		shipSprite.setRotation(Phaser.Math.DegToRad(rotation));
		return { x: xcenter, y: ycenter };
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


	CheckValidPositioning(occupiedCells, oldcells, futurecells, gridSize) {
		//Delete Old Cells for Validation of the Future Cells
		for (const cell of oldcells) {
			const index = occupiedCells.findIndex((occupiedCell) => occupiedCell.row === cell.row && occupiedCell.col === cell.col);
			if (index !== -1) {
				occupiedCells.splice(index, 1);
			}
		}


		for (let i = 0; i < futurecells.length; i++) {
			if (futurecells[i].row > gridSize - 1 || futurecells[i].row < 0 || futurecells[i].col > gridSize - 1 || futurecells[i].col < 0) {
				return false;
			}
		}
		return !futurecells.some((cell) => { return this.isCellOccupied(occupiedCells, cell.row, cell.col); });

	}

	placeShipSprite(sprite, ship, gridSize, playerGrid, playerCellSize, occupiedCells) {
		if (ship.placed === 0) {
			sprite.setInteractive();
			let isShipClicked = false;
			sprite.on('pointerdown', () => {
				this.playClick();
				if (!isShipClicked) {
					isShipClicked = true;
					const { x, y } = this.getRandomPosition(ship.rotation, ship, sprite, gridSize, playerGrid, playerCellSize, occupiedCells);
					console.log(x, y);
					console.log(ship.cells);
					console.log(occupiedCells);
					this.tweens.add({
						targets: sprite,
						x: x,
						y: y,
						duration: 300,
						onComplete: () => {
							ship.placed = 1;
							this.highlightCells(occupiedCells, playerGrid);
							sprite.on("pointerdown", () => {
								// Call placeShipSprite when the ship sprite is clicked
								this.placeShipSprite(sprite, ship, gridSize, playerGrid, playerCellSize, occupiedCells);
							});
						}
					});
				}
			});
		}
		else if (ship.placed === 1) {
			let isSelected = false;
			// Function to handle ship selection
			const selectShip = () => {
				if (isSelected) {
					sprite.setTint(); // Remove tint from previously selected ship
					isSelected = false;
				} else {
					sprite.setTint(0x00ff00); // Apply tint to the selected ship
					isSelected = true;
				}
			};
			selectShip();

			const moveShip = (event) => {
				if (isSelected) {
					var row_delta = 0;
					var col_delta = 0;

					if (event.key === 'ArrowUp') {
						row_delta = -1;
					} else if (event.key === 'ArrowDown') {
						row_delta = 1;
					} else if (event.key === 'ArrowLeft') {
						col_delta = -1;
					} else if (event.key === 'ArrowRight') {
						col_delta = 1;
					}

					var futurecells = ship.cells.map(cell => ({ ...cell }));
					// Update ship cells with new positions
					for (let i = 0; i < ship.cells.length; i++) {
						if (row_delta != 0) {
							futurecells[i].row += row_delta;
						} else if (col_delta != 0) {
							futurecells[i].col += col_delta;
						}
					}

					if (this.CheckValidPositioning(occupiedCells.map(cell => ({ ...cell })), ship.cells, futurecells, gridSize)) {
						// Update occupiedCells array
						this.updateOccupiedCells(occupiedCells, futurecells, ship.cells);
						ship.cells = futurecells
						// Update ship sprite position
						sprite.x = sprite.x + col_delta * playerCellSize;
						sprite.y = sprite.y + row_delta * playerCellSize;
						this.highlightCells(occupiedCells, playerGrid);
					}
				}
			};

			const handleKeyPress = (event) => {
				if (isSelected) {
					if (event.key === 'Enter' || event.key === 'Escape') {
						selectShip();
						document.removeEventListener('keydown', handleKeyPress);
					} else if (event.key === 'r' || event.key === 'R') {
						this.rotateShip(sprite, ship, occupiedCells, gridSize, playerGrid, playerCellSize);
					}
				} else if (event.key === 'Enter' && !isSelected) {
					selectShip();
					document.addEventListener('keydown', handleKeyPress);
				}
			};

			// Enable keyboard input for ship movement and selection
			document.addEventListener('keydown', handleKeyPress);
			document.addEventListener('keydown', moveShip);
		}
	}


	/* END-USER-CODE */

}

/* END OF COMPILED CODE */

// You can write more code here
