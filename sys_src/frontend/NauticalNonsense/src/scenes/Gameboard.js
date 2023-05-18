
// You can write more code here

/* START OF COMPILED CODE */

class Gameboard extends Phaser.Scene {

	constructor() {
		super("Gameboard");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	create_board(x, y, scale){
		board = this.add.graphics();
		return board
	}

	/** @returns {void} */
	editorCreate() {

		
		// Add the background sprite
		this.background = this.add.tileSprite(0, 0, 0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		this.enemy_board = create(board)
		// Set the fill color and alpha
		this.enemy_board.fillStyle(0x3c3845, 1);
		this.enemy_board.fillRoundedRect(100, 100, 500, 500, 20);
		
		const grid = [];
		const cellSize = 40;
		const gridSize = 10;

		/*for (let row = 0; row < gridSize; row++) {
			grid[row] = [];
			for (let col = 0; col < gridSize; col++) {
				const cell = this.add.rectangle(col * cellSize, row * cellSize, cellSize, cellSize, 0xCCCCCC);
				cell.setInteractive();
				cell.on('pointerdown', () => {
					this.clickSound.play();
				// Place ships or shoot at cells
				});
				grid[row][col] = cell;
			}
		}*/

		// Back to main menu button
		const button = this.add.text(200, 200, 'Back to Menu', { fill: '#ffffff', fontSize: 30});
		button.setInteractive();
	  
		// Set up the button event
		button.on('pointerdown', () => {
		  this.scene.start('Level');
		});


	}

	/* START-USER-CODE */

	// Write more your code here

	update() {
		this.background.tilePositionY -= this.background.prevXVel + (Math.random()-0.5)/10
		this.background.tilePositionX -= this.background.prevYVel + (Math.random()-0.5)/10
	}

	create() {

		this.editorCreate();
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
