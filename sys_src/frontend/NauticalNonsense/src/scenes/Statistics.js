
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

		//define important variables
		const darkgrey = 0x3c3845;
		const white = 0xffffff;
		const boardsize = 100;
		//1280 x 720

		//text styles
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
		const stats = dummy;


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
		const boardStyleShips = {
			x: 60,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			boardsize: boardsize,
			cellsize: 25,
			cellColor: 0x387c00,
			cellBackground: white,
			textStyle: textStyle
		}
		this.boardShips = this.makeBoard(boardStyleShips, "Ship Positions", stats.shipPositions);

		//board for positions most shot
		const boardStyleShots = {
			x: 370,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			boardsize: boardsize,
			cellsize: 25,
			cellColor: 0xff003c,
			cellBackground: white,
			textStyle: textStyle
		}
		this.boardShots = this.makeBoard(boardStyleShots, "Most Shot Fields", stats.moves);


		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	preload() {

	}

	makeBoard(boardStyle, title, data) {
		let board = []

		const txtTitle = this.add.text(boardStyle.x + boardStyle.padding, boardStyle.y + boardStyle.padding, title, boardStyle.textStyle).setDepth(1);

		const boardBG = this.add.graphics();
		boardBG.fillStyle(boardStyle.backgroundColor, 1);
		boardBG.fillRoundedRect(boardStyle.x, boardStyle.y, 10 * boardStyle.cellsize + 2 * boardStyle.padding, 10 * boardStyle.cellsize + 2 * boardStyle.padding + 1.5 * txtTitle.height, boardStyle.radius);

		let cellX = boardStyle.x + boardStyle.padding;
		let cellY = boardStyle.y + boardStyle.padding + 1.5 * txtTitle.height;

		let dataMax = Math.max(...data);

		for (let i = 1; i <= boardStyle.boardsize; i++) {
			this.add.rectangle(cellX, cellY, boardStyle.cellsize - 1, boardStyle.cellsize - 1, boardStyle.cellBackground).setOrigin(0, 0);
			board[i - 1] = this.add.rectangle(cellX, cellY, boardStyle.cellsize - 1, boardStyle.cellsize - 1, boardStyle.cellColor).setOrigin(0, 0).setAlpha(data[i - 1] / dataMax);
			cellX = cellX + boardStyle.cellsize;
			if (i % 10 == 0) {
				cellX = boardStyle.x + boardStyle.padding;
				cellY = cellY + boardStyle.cellsize;
			}
		}
		return board;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
