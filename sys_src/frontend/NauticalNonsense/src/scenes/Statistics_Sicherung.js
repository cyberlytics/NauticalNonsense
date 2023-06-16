
// You can write more code here

/* START OF COMPILED CODE */

class Statistics extends Phaser.Scene {

	constructor() {
		super("Statistics");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		//reference to this statistics scene
		const statistics = this;

		const darkgrey = 0x3c3845;
		const white = 0xffffff;
		this.boardsize = 100;
		const boardsize = 100;
		//1280 x 720

		//text style
		const textStyle = {
			fontSize: '24px',
			fill: '#ffffff'
		};

		const headingStyle = {
			fontSize: '28px',
			fill: '#ffffff'
		};


		// background
		const background = this.add.image(0, 0, "0001");
		background.scaleX = 1.2;
		background.scaleY = 0.7;
		background.setOrigin(0, 0);

		//returnButton
		const returnButton = this.add.image(70, 650, "optionsBack").setInteractive({ useHandCursor: true })
		returnButton.scaleX = 0.7;
		returnButton.scaleY = 0.7;

		returnButton.on('pointerover', function (event) {
			this.setTint(0x808080);
		})

		returnButton.on('pointerout', function (event) {
			this.clearTint();
		})

		returnButton.on('pointerdown', function (event) {
			statistics.sound.add("click").play();
			this.clearTint();
			statistics.scene.start('Options');
						//boardShips[0].setFillStyle(boardShips[0].fillColor, 0.2);
		})


		// get stats via backend API
		//...
		var stats = dummy;


		//number of games and average shots
		const gamesStyle = {
			x: 50,
			y: 50,
			width: 900,
			height: 100,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			//gapX: 11,
			gapY: 15
		}

		const games = this.add.graphics();
		games.fillStyle(gamesStyle.backgroundColor, 1);
		games.fillRoundedRect(gamesStyle.x, gamesStyle.y, gamesStyle.width, gamesStyle.height, gamesStyle.radius);

		const txtGamesPlayed = this.add.text(gamesStyle.x + gamesStyle.padding, gamesStyle.y + gamesStyle.padding, "GAMES PLAYED", textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 250, gamesStyle.y + gamesStyle.padding, "2-Player: " + stats.gamesCountHuman, textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 530, gamesStyle.y + gamesStyle.padding, "PC: " + stats.gamesCountComputer, textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 700, gamesStyle.y + gamesStyle.padding, "Total: "+stats.gamesCount, textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "AVERAGE SHOTS", textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 250, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "2-Player: " + stats.averageMovesHuman.toFixed(2), textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 530, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "PC: " + stats.averageMovesComputer.toFixed(2), textStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 700, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "Total: " + stats.averageMoves.toFixed(2), textStyle);
		

		//board for most used ship positions
		/*const boardShips = [];

		const cellColorShips = 0x387c00;

		const boardStyleShips = {
			x: 60,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			cellsize: 25
		}

		const txtShips = this.add.text(boardStyleShips.x + boardStyleShips.padding, boardStyleShips.y + boardStyleShips.padding, "Ship positions", textStyle).setDepth(1);		

		this.boardShipsBG = this.add.graphics();
		this.boardShipsBG.fillStyle(boardStyleShips.backgroundColor, 1);
		this.boardShipsBG.fillRoundedRect(boardStyleShips.x, boardStyleShips.y, 10 * boardStyleShips.cellsize + 2 * boardStyleShips.padding, 10 * boardStyleShips.cellsize + 2 * boardStyleShips.padding + 1.5*txtShips.height, boardStyleShips.radius);

		var cellX = boardStyleShips.x + boardStyleShips.padding;
		var cellY = boardStyleShips.y + boardStyleShips.padding + 1.5*txtShips.height;

		var ships = stats.shipPositions;
		var maxShips = Math.max(...ships);

		for (let i = 1; i <= boardsize; i++) {
			this.add.rectangle(cellX, cellY, boardStyleShips.cellsize - 1, boardStyleShips.cellsize - 1, white).setOrigin(0, 0);
			boardShips[i - 1] = this.add.rectangle(cellX, cellY, boardStyleShips.cellsize - 1, boardStyleShips.cellsize - 1, cellColorShips).setOrigin(0, 0).setAlpha(ships[i-1]/maxShips);
			cellX = cellX + boardStyleShips.cellsize;
			if (i % 10 == 0) {
				cellX = boardStyleShips.x + boardStyleShips.padding;
				cellY = cellY + boardStyleShips.cellsize;
			}
		}*/
		const boardStyleShips = {
			x: 60,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			cellsize: 25,
			cellColor: 0x387c00,
			cellBackground: white
		}
		this.make_board(boardStyleShips, "Ships", stats.shipPositions);


		//board for positions most shot
		const boardShots = [];

		const cellColorShots = 0xff003c;

		const boardStyleShots = {
			x: 370,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			cellsize: 25
		}

		const txtShots = this.add.text(boardStyleShots.x + boardStyleShots.padding, boardStyleShots.y + boardStyleShots.padding, "Most shot fields", textStyle).setDepth(1);

		this.boardShotsBG = this.add.graphics();
		this.boardShotsBG.fillStyle(boardStyleShots.backgroundColor, 1);
		this.boardShotsBG.fillRoundedRect(boardStyleShots.x, boardStyleShots.y, 10 * boardStyleShots.cellsize + 2 * boardStyleShots.padding, 10 * boardStyleShots.cellsize + 2 * boardStyleShots.padding + 1.5 * txtShots.height, boardStyleShots.radius);

		var cellX = boardStyleShots.x + boardStyleShots.padding;
		var cellY = boardStyleShots.y + boardStyleShots.padding + 1.5 * txtShots.height;

		var shots = stats.moves;
		var maxShots = Math.max(...shots);

		for (let i = 1; i <= boardsize; i++) {
			this.add.rectangle(cellX, cellY, boardStyleShots.cellsize - 1, boardStyleShots.cellsize - 1, white).setOrigin(0, 0);
			boardShots[i - 1] = this.add.rectangle(cellX, cellY, boardStyleShots.cellsize - 1, boardStyleShots.cellsize - 1, cellColorShots).setOrigin(0, 0).setAlpha(shots[i - 1] / maxShots);
			cellX = cellX + boardStyleShots.cellsize;
			if (i % 10 == 0) {
				cellX = boardStyleShots.x + boardStyleShots.padding;
				cellY = cellY + boardStyleShots.cellsize;
			}
		}

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	preload() {

	}

	make_board(boardStyle, title, data) {
		var board = []
		const txtTitle = this.add.text(boardStyle.x + boardStyle.padding, boardStyle.y + boardStyle.padding, title, this.textStyle).setDepth(1);

		this.boardBG = this.add.graphics();
		this.boardBG.fillStyle(boardStyle.backgroundColor, 1);
		this.boardBG.fillRoundedRect(boardStyle.x, boardStyle.y, 10 * boardStyle.cellsize + 2 * boardStyle.padding, 10 * boardStyle.cellsize + 2 * boardStyle.padding + 1.5 * txtTitle.height, boardStyle.radius);

		var cellX = boardStyle.x + boardStyle.padding;
		var cellY = boardStyle.y + boardStyle.padding + 1.5 * txtTitle.height;

		//var data = stats.shipPositions;
		var dataMax = Math.max(...data);

		for (let i = 1; i <= this.boardsize; i++) {
			this.add.rectangle(cellX, cellY, boardStyle.cellsize - 1, boardStyle.cellsize - 1, boardStyle.cellBackground).setOrigin(0, 0);
			board[i - 1] = this.add.rectangle(cellX, cellY, boardStyle.cellsize - 1, boardStyle.cellsize - 1, boardStyle.cellColor).setOrigin(0, 0).setAlpha(data[i - 1] / dataMax);
			cellX = cellX + boardStyle.cellsize;
			if (i % 10 == 0) {
				cellX = boardStyle.x + boardStyle.padding;
				cellY = cellY + boardStyle.cellsize;
			}
		}
		//return board;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
