
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
	Shoot() {
		// insert here REST Call to backend or send game object via websocket
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
				this.clickSound.play();
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




	/** @returns {void} */
	editorCreate() {
		//Ship Init
		const battleship = {
			size: 5, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "battleship",
			rotation: 0,
			placed: 0
		};

		const carrier = {
			size: 4, // Change this value as per your ship's size
			cells: [], // To store the cells occupied by the ship
			name: "carrier",
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

		var battleshipSprite = this.add.sprite(1120, 120, 'battleship');
		battleshipSprite.setScale(0.35);
		battleshipSprite.setDepth(1);

		var carrierSprite = this.add.sprite(1100, 180, 'carrier');
		carrierSprite.setScale(0.2);
		carrierSprite.setDepth(1);

		var cruiserSprite = this.add.sprite(1080, 240, 'cruiser');
		cruiserSprite.setScale(0.25);
		cruiserSprite.setDepth(1);

		var destroyerSprite = this.add.sprite(1070, 300, 'destroyer');
		destroyerSprite.setScale(0.25);
		destroyerSprite.setDepth(1);

		var destroyerSprite1 = this.add.sprite(1170, 300, 'destroyer');
		destroyerSprite1.setScale(0.25);
		destroyerSprite1.setDepth(1);

		var submarineSprite = this.add.sprite((1060), 360, 'submarine');
		submarineSprite.setScale(0.23);
		submarineSprite.setDepth(1);

		var submarineSprite1 = this.add.sprite(1120, 360, 'submarine');
		submarineSprite1.setScale(0.23);
		submarineSprite1.setDepth(1);

		const ships = [battleship, carrier, cruiser, destroyer, destroyer1, submarine, submarine1];
		const shipSprites = [battleshipSprite, carrierSprite, cruiserSprite, destroyerSprite, destroyerSprite1, submarineSprite, submarineSprite1];		let selectedShipIndex = -1; // Initialize with an invalid index

		// create clicksound
		this.clickSound = this.sound.add('clicksound');

		let occupiedCells = [];

		// Add the background sprite
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		// draw enemy board
		const gridSize = 10;
		const cellColor = 0x8cc88c;
		const shootRedColor = 0xff7896
		const backgroundColor = 0x3c3845
		const capitulateColor = 0xffe578
		const smallCornerRadius = 20
		const tinyCornerRadius = 10
		const boardMargin = 30

		const enemyBoardPos = {
			x: 60,
			y: 60,
			width: 350,
			height: 350,
			cornerRadius: smallCornerRadius
		}
		const enemyGrid = [];
		const enemyCellSize = enemyBoardPos.width / (gridSize);

		this.enemyBoard = this.add.graphics();
		this.enemyBoard.fillStyle(backgroundColor, 1);
		this.enemyBoard.fillRoundedRect(enemyBoardPos.x - enemyBoardPos.cornerRadius, enemyBoardPos.y - enemyBoardPos.cornerRadius, enemyBoardPos.width + 2 * enemyBoardPos.cornerRadius, enemyBoardPos.height + 2 * enemyBoardPos.cornerRadius, 20);

		for (let row = 0; row < gridSize; row++) {
			enemyGrid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(enemyBoardPos.x + col * enemyCellSize, enemyBoardPos.y + row * enemyCellSize, enemyCellSize - 1, enemyCellSize - 1, cellColor);
				cell.setOrigin(0, 0);
				cell.setInteractive();
				cell.on('pointerdown', () => {
					this.clickSound.play();
					// select cell
				});
				enemyGrid[row][col] = cell;
			}
		}
		
		const playerBoardPos = {
			x: 490,
			y: 70,
			width: 450,
			height: 450,
			cornerRadius: 30
		}
		const playerGrid = [];
		const playerCellSize = playerBoardPos.width / (gridSize);

		this.playerBoard = this.add.graphics();
		this.playerBoard.fillStyle(backgroundColor, 1);
		this.playerBoard.fillRoundedRect(playerBoardPos.x - playerBoardPos.cornerRadius, playerBoardPos.y - playerBoardPos.cornerRadius, playerBoardPos.width + 2 * playerBoardPos.cornerRadius, playerBoardPos.height + 2 * playerBoardPos.cornerRadius, 20);

		for (let row = 0; row < gridSize; row++) {
			playerGrid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(playerBoardPos.x + col * playerCellSize, playerBoardPos.y + row * playerCellSize, playerCellSize - 1, playerCellSize - 1, cellColor);
				cell.setOrigin(0, 0);
				cell.setInteractive();
				cell.on('pointerdown', () => {
					cell.on('pointerdown', (pointer) => {
						this.clickSound.play();
					});
				});
				playerGrid[row][col] = cell;
			}
		}

		// Call the placeShipSprite function for each ship
		for (let i = 0; i < ships.length; i++) {
			const ship = ships[i];
			const sprite = shipSprites[i];
			this.placeShipSprite(sprite, ship, gridSize, playerGrid, playerCellSize, occupiedCells);
		}

		// draw fleet
		this.fleetBoard = this.add.graphics();
		this.fleetBoard.fillStyle(backgroundColor, 1);
		this.fleetBoard.fillRoundedRect(playerBoardPos.x + playerBoardPos.width + playerBoardPos.cornerRadius + boardMargin, enemyBoardPos.y - smallCornerRadius, 5 * playerCellSize + smallCornerRadius, playerBoardPos.height + 2 * smallCornerRadius, smallCornerRadius);

		// draw shoot and capitulate Board
		this.shootBoard = this.add.graphics();
		this.shootBoard.fillStyle(backgroundColor, 1);
		this.shootBoard.fillRoundedRect(enemyBoardPos.x - smallCornerRadius, enemyBoardPos.y + enemyBoardPos.height + smallCornerRadius + boardMargin, enemyBoardPos.width + 2 * smallCornerRadius, 220, smallCornerRadius);

		// draw shoot button
		this.shootButton = this.add.graphics();
		this.shootButton.fillStyle(shootRedColor, 1);
		this.shootButton.fillRoundedRect(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 2 * smallCornerRadius, 220, 110, tinyCornerRadius);
		this.shootButton.setInteractive(new Phaser.Geom.Rectangle(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 2 * smallCornerRadius, 220, 110), Phaser.Geom.Rectangle.Contains);
		this.shootButton.on('pointerdown', () => {
			this.clickSound.play();
			shoot()
		});
		this.shootText = this.add.text(enemyBoardPos.x + tinyCornerRadius + 35, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + tinyCornerRadius + 10, 'SHOOT', { fill: '#000000', fontSize: 30, fontStyle: "bold", fontFamily: "Sans" });


		// draw capitulate button
		this.capitulateButton = this.add.graphics();
		this.capitulateButton.fillStyle(capitulateColor, 1);
		this.capitulateButton.fillRoundedRect(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + 110, 220, 50, tinyCornerRadius);
		this.capitulateButton.setInteractive(new Phaser.Geom.Rectangle(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + 110, 220, 50), Phaser.Geom.Rectangle.Contains);
		this.capitulateButton.on('pointerdown', () => {
			this.scene.start('Start');
		});
		this.capitulateText = this.add.text(enemyBoardPos.x + tinyCornerRadius + 5, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + 110 + tinyCornerRadius, 'Capitulate', { fill: '#000000', fontSize: 30, fontFamily: "Sans" });


	}

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
	}

	preload() {

		this.load.image("battleship", "assets/ships/battleship/battleship_2.png");
		this.load.image("carrier", "assets/ships/carrier/carrier_2.png");
		this.load.image("cruiser", "assets/ships/cruiser/cruiser_2.png");
		this.load.image("destroyer", "assets/ships/destroyer/destroyer_2.png");
		this.load.image("submarine", "assets/ships/submarine/submarine_2.png");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
