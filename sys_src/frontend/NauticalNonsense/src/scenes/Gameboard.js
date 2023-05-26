
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
	rotateShip(shipSprite, shipRotation) {
		shipRotation += 90; // Increment the rotation angle by 90 degrees
		shipSprite.setRotation(Phaser.Math.DegToRad(shipRotation)); // Apply the rotation to the ship sprite
		if (shipRotation === 360) {
		  shipRotation = 0;
		}
		console.log(shipRotation);
	  
		return shipRotation; // Return the updated rotation angle
	  }

	  GetColumnsAndRows(highlightedCells,playerGrid) {
		// Log the elements of the game board used by the ship
		const usedCells = highlightedCells.map(cell => {
    		const row = playerGrid.findIndex(row => row.includes(cell));
    		const col = playerGrid[row].indexOf(cell);
    		return { row, col };
  			});
  			console.log('Elements used by the ship:', usedCells);
	  }
	  
	  highlightShipCells(ship, gameObject, highlightedCells, gridRow, gridColumn, gridSize, playerBoardPos, playerCellSize, playerGrid, shipRotation) {
		ship.cells = []; // Reset the array of ship cells
	  
		// Reset the previously highlighted cells
		highlightedCells.forEach((cell) => {
		  cell.setAlpha(1); // Reset the cell's highlight appearance
		});
		highlightedCells.length = 0; // Clear the highlighted cells array
	  
		if (shipRotation === 0 || shipRotation === 180) {
		  gridRow = Math.floor((gameObject.y- playerBoardPos.y) / playerCellSize);
		  gridColumn = Math.floor((gameObject.x + playerCellSize/2- playerBoardPos.x - gameObject.width / 2) / playerCellSize);

		} else {
		  gridRow = Math.floor((gameObject.y - playerBoardPos.y + playerCellSize/2 - gameObject.height / 2) / playerCellSize);
		  gridColumn = Math.floor((gameObject.x - playerBoardPos.x) / playerCellSize);
		}
		// Iterate over the ship's size and mark the corresponding cells
		var cellRow = 0;
		var cellCol = 0;
		const isVertical = shipRotation === 90 || shipRotation === 270;
	  
		for (let i = 0; i < ship.size; i++) {
		  if (isVertical) {
			cellRow = gridRow + i;
			cellCol = gridColumn;
		  } else {
			cellRow = gridRow;
			cellCol = gridColumn + i;
		  }
	  
		  if (cellRow >= 0 && cellRow < gridSize && cellCol >= 0 && cellCol < gridSize) {
			const cell = playerGrid[cellRow][cellCol];
			cell.setAlpha(0.5);
			highlightedCells.push(cell);
		  }
		}
	  }

	/** @returns {void} */
	editorCreate() {
		//Ship Init

		const destroyer = {
			size: 5, // Change this value as per your ship's size
			cells: [] // To store the cells occupied by the ship
		  };

		var shipRotation = 0;
		var destroyerSprite = null;
		var gridRow = 0;
		var gridColumn = 0;

		// create clicksound
		this.clickSound = this.sound.add('clicksound');

		// Add an array to store the highlighted cells
		let highlightedCells = [];

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
			x : 60,
			y : 60,
			width : 350,
			height : 350,
			cornerRadius : smallCornerRadius
		}
		const enemyGrid = [];
		const enemyCellSize = enemyBoardPos.width/(gridSize);

		this.enemyBoard = this.add.graphics();
		this.enemyBoard.fillStyle(backgroundColor, 1);
		this.enemyBoard.fillRoundedRect(enemyBoardPos.x-enemyBoardPos.cornerRadius, enemyBoardPos.y - enemyBoardPos.cornerRadius, enemyBoardPos.width+2*enemyBoardPos.cornerRadius, enemyBoardPos.height+2*enemyBoardPos.cornerRadius, 20);
		
		for (let row = 0; row < gridSize; row++) {
			enemyGrid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(enemyBoardPos.x + col * enemyCellSize, enemyBoardPos.y + row * enemyCellSize, enemyCellSize-1, enemyCellSize-1, cellColor);
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
			x : 490,
			y : 70,
			width : 450,
			height : 450,
			cornerRadius : 30
		}
		const playerGrid = [];
		const playerCellSize = playerBoardPos.width/(gridSize);

		this.playerBoard = this.add.graphics();
		this.playerBoard.fillStyle(backgroundColor, 1);
		this.playerBoard.fillRoundedRect(playerBoardPos.x-playerBoardPos.cornerRadius, playerBoardPos.y - playerBoardPos.cornerRadius, playerBoardPos.width+2*playerBoardPos.cornerRadius, playerBoardPos.height+2*playerBoardPos.cornerRadius, 20);
		
		for (let row = 0; row < gridSize; row++) {
			playerGrid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(playerBoardPos.x + col * playerCellSize, playerBoardPos.y + row * playerCellSize, playerCellSize-1, playerCellSize-1, cellColor);
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
		
		// const gameBoardBounds = new Phaser.Geom.Rectangle(
		// 	playerBoardPos.x - playerBoardPos.cornerRadius,
		// 	playerBoardPos.y - playerBoardPos.cornerRadius,
		// 	playerBoardPos.width + 2 * playerBoardPos.cornerRadius,
		// 	playerBoardPos.height + 2 * playerBoardPos.cornerRadius
		//   );

		destroyerSprite = this.add.sprite(1120, 80, 'destroyer');
		destroyerSprite.setDepth(1); 
		destroyerSprite.setInteractive();
		let isShipInCenter = false;
		
 		destroyerSprite.on('pointerdown', () => {
    		this.clickSound.play();
			if (!isShipInCenter) {
				this.tweens.add({
				  	targets: destroyerSprite,
				  	x: playerBoardPos.x + playerBoardPos.width / 2 + playerCellSize / 2,
      				y: playerBoardPos.y + playerBoardPos.height / 2 - playerCellSize / 2,
				  	duration: 500,
				  	onComplete: () => {
						isShipInCenter = true;
						this.input.setDraggable(destroyerSprite);
						this.highlightShipCells(destroyer,destroyerSprite,highlightedCells,gridRow,gridColumn,gridSize,playerBoardPos, playerCellSize,playerGrid, shipRotation);
				  }
				});
				
			  }
			});		

		this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
			if (isShipInCenter) {
				gameObject.x = dragX;
				gameObject.y = dragY;
				// Highlight the cells covered by the ship
  				this.highlightShipCells(destroyer,gameObject,highlightedCells,gridRow,gridColumn,gridSize,playerBoardPos, playerCellSize,playerGrid, shipRotation);
			  }
			
		});

		this.input.on('dragend', (pointer, gameObject) => {
			if (isShipInCenter) {
				// Highlight the cells covered by the ship
				this.highlightShipCells(destroyer,gameObject,highlightedCells,gridRow,gridColumn,gridSize,playerBoardPos, playerCellSize,playerGrid, shipRotation);

				// Make the ship non-draggable
				//gameObject.disableInteractive();
				
				this.GetColumnsAndRows(highlightedCells,playerGrid)
			}
		});

		// draw fleet
		this.fleetBoard = this.add.graphics();
		this.fleetBoard.fillStyle(backgroundColor, 1);
		this.fleetBoard.fillRoundedRect(playerBoardPos.x+playerBoardPos.width+playerBoardPos.cornerRadius + boardMargin, enemyBoardPos.y-smallCornerRadius, 5*playerCellSize + smallCornerRadius, playerBoardPos.height+2*smallCornerRadius, smallCornerRadius);

		// draw shoot and capitulate Board
		this.shootBoard = this.add.graphics();
		this.shootBoard.fillStyle(backgroundColor, 1);
		this.shootBoard.fillRoundedRect(enemyBoardPos.x - smallCornerRadius, enemyBoardPos.y + enemyBoardPos.height + smallCornerRadius + boardMargin, enemyBoardPos.width+2*smallCornerRadius, 220, smallCornerRadius);

		// draw shoot button
		this.shootButton = this.add.graphics();
		this.shootButton.fillStyle(shootRedColor, 1);
		this.shootButton.fillRoundedRect(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 2*smallCornerRadius, 220, 110, tinyCornerRadius);
		this.shootButton.setInteractive(new Phaser.Geom.Rectangle(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 2*smallCornerRadius, 220, 110), Phaser.Geom.Rectangle.Contains);
		this.shootButton.on('pointerdown', () => {
			this.clickSound.play();
			shoot()
		});
		this.shootText = this.add.text(enemyBoardPos.x + tinyCornerRadius + 35, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3*smallCornerRadius + tinyCornerRadius + 10, 'SHOOT', { fill: '#000000', fontSize: 30, fontStyle : "bold", fontFamily: "Sans"});


		// draw capitulate button
		this.capitulateButton = this.add.graphics();
		this.capitulateButton.fillStyle(capitulateColor, 1);
		this.capitulateButton.fillRoundedRect(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3*smallCornerRadius + 110, 220, 50, tinyCornerRadius);
		this.capitulateButton.setInteractive(new Phaser.Geom.Rectangle(enemyBoardPos.x, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3*smallCornerRadius + 110, 220, 50), Phaser.Geom.Rectangle.Contains);
		this.capitulateButton.on('pointerdown', () => {
				this.scene.start('Start');
			});
		this.capitulateText = this.add.text(enemyBoardPos.x + tinyCornerRadius + 5, enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3*smallCornerRadius + 110 + tinyCornerRadius, 'Capitulate', { fill: '#000000', fontSize: 30, fontFamily: "Sans"});

		// draw rotate button
		this.rotateButton = this.add.graphics();
		this.rotateButton.fillStyle(0xffffff, 1);
		this.rotateButton.fillRoundedRect(
		enemyBoardPos.x + enemyBoardPos.width - tinyCornerRadius - 120,
		enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + 110,
		135,
		50,
		tinyCornerRadius
		);
		this.rotateButton.setInteractive(
		new Phaser.Geom.Rectangle(
			enemyBoardPos.x + enemyBoardPos.width - tinyCornerRadius - 120,
			enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + 110,
			135,
			50
		),
		Phaser.Geom.Rectangle.Contains
		);
		this.rotateButton.on('pointerdown', () => {
			if (isShipInCenter) {
				this.clickSound.play();
				shipRotation = this.rotateShip(destroyerSprite, shipRotation);
				// Update the highlighted cells
				this.highlightShipCells(destroyer, destroyerSprite, highlightedCells, gridRow, gridColumn, gridSize, playerBoardPos, playerCellSize, playerGrid, shipRotation);
				this.GetColumnsAndRows(highlightedCells,playerGrid)
			  }
			

		});
		this.rotateText = this.add.text(
		enemyBoardPos.x + enemyBoardPos.width - tinyCornerRadius - 90,
		enemyBoardPos.y + enemyBoardPos.height + boardMargin + 3 * smallCornerRadius + 110 + tinyCornerRadius-2,
		'Rotate',
		{ fill: '#000000', fontSize: 30, fontFamily: "Sans"}
		);

		  
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
	}

	preload(){
		this.load.image("destroyer", "assets/ships/destroyer/destroyer.png");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
