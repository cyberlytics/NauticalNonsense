
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
		const normaltextStyle = {
			fontSize: '24px',
			fill: '#ffffff',
			fontFamily: "GodOfWar"
		};
		const headingStyle = {
			fontSize: '28px',
			fill: '#ffffff',
			fontFamily: "GodOfWar"
		};
		const shiptextStyle = {
			fontSize: '20px',
			fill: '#000000',
			align: "center",
			fontFamily: "GodOfWar"
		};
		const tooltiptextStyle = {
			fontSize: '20px',
			fill: '#ffffff',
			align: "center",
			fontFamily: "GodOfWar"
		};


		// background
		const background = this.add.image(0, 0, "0001");
		background.scaleX = 1.2;
		background.scaleY = 0.7;
		background.setOrigin(0, 0);

		//returnButton
		const returnButton = this.add.image(70, 650, "backButton").setInteractive({ useHandCursor: true })
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

		//homeButton
		const homeButton = this.add.image(70, 580, "homeButton").setInteractive({ useHandCursor: true })
		homeButton.scaleX = 0.7;
		homeButton.scaleY = 0.7;

		homeButton.on('pointerover', function (event) {
			this.setTint(0x808080);
		})

		homeButton.on('pointerout', function (event) {
			this.clearTint();
		})

		homeButton.on('pointerdown', function (event) {
			statistics.sound.add("click").play();
			this.clearTint();
			statistics.scene.start('Start');
		})


		// get stats via backend API
		//...
		const stats = dummy;


		//number of games and average shots
		const gamesStyle = {
			x: 35,
			y: 50,
			width: 910,
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

		const txtGamesPlayed = this.add.text(gamesStyle.x + gamesStyle.padding, gamesStyle.y + gamesStyle.padding, "GAMES PLAYED", normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 270, gamesStyle.y + gamesStyle.padding, "2-Player: " + stats.gamesCountHuman, normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 520, gamesStyle.y + gamesStyle.padding, "PC: " + stats.gamesCountComputer, normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 690, gamesStyle.y + gamesStyle.padding, "Total: "+stats.gamesCount, normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "AVERAGE SHOTS", normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 270, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "2-Player: " + stats.averageMovesHuman.toFixed(2), normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 520, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "PC: " + stats.averageMovesComputer.toFixed(2), normaltextStyle);
		this.add.text(gamesStyle.x + gamesStyle.padding + 690, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "Total: " + stats.averageMoves.toFixed(2), normaltextStyle);
		

		//board for most used ship positions
		const boardStyleShips = {
			x: 35,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			boardsize: boardsize,
			cellsize: 25,
			cellColor: 0x387c00,
			cellBackground: white,
			textStyle: normaltextStyle
		}
		this.boardShips = this.makeBoard(boardStyleShips, "Ship Positions", stats.shipPositions);

		//board for positions most shot
		const boardStyleShots = {
			x: 345,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			boardsize: boardsize,
			cellsize: 25,
			cellColor: 0xff003c,
			cellBackground: white,
			textStyle: normaltextStyle
		}
		this.boardShots = this.makeBoard(boardStyleShots, "Most Shot Fields", stats.moves);

		//board for first shots
		const boardStyleFirsts = {
			x: 655,
			y: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			boardsize: boardsize,
			cellsize: 25,
			cellColor: 0xff7700,
			cellBackground: white,
			textStyle: normaltextStyle
		}
		this.boardFirsts = this.makeBoard(boardStyleFirsts, "Most First Shots", stats.moves); //data noch ändern


		//winner's ships hit
		const shiphitsStyle = {
			x: 965,
			y: 50,
			width: 290,
			height: 627,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			textStyle: normaltextStyle
		}
		const shiphits = this.add.graphics();
		shiphits.fillStyle(shiphitsStyle.backgroundColor, 1);
		shiphits.fillRoundedRect(shiphitsStyle.x, shiphitsStyle.y, shiphitsStyle.width, shiphitsStyle.height, shiphitsStyle.radius);

		const txtShiphits = this.add.text(shiphitsStyle.x + shiphitsStyle.padding, shiphitsStyle.y + shiphitsStyle.padding, "Winner's Ships Hit", shiphitsStyle.textStyle);

		const shipboxStyle = {
			width: 286,
			height: 110,
			radius: 25,
			backgroundColor: white,
			paddingTop: 5,
			gapY: 10,
			margin: 2,
			textStyle: shiptextStyle
		}
		const tooltipStyle = {
			width: 105,
			height: 40,
			radius: 5,
			backgroundColor: darkgrey,
			textStyle: tooltiptextStyle
		}

		//carrier
		const carrierHits = stats.averageShiphits[0];
		const carrierY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding;
		this.makeShip(shipboxStyle, shiphitsStyle.x + 2, carrierY, 'Carrier', 'carrier', 'carrierRed', carrierHits, tooltipStyle);

		//battleship
		const battleshipHits = stats.averageShiphits[1];
		const battleshipY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 1 * (shipboxStyle.height + shipboxStyle.margin);
		this.makeShip(shipboxStyle, shiphitsStyle.x + 2, battleshipY, 'Battleship', 'battleship', 'battleshipRed', battleshipHits, tooltipStyle);

		//cruiser
		const cruiserHits = stats.averageShiphits[2];
		const cruiserY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 2 * (shipboxStyle.height + shipboxStyle.margin);
		this.makeShip(shipboxStyle, shiphitsStyle.x + 2, cruiserY, 'Cruiser', 'cruiser', 'cruiserRed', cruiserHits, tooltipStyle);

		//destroyer
		const destroyerHits = stats.averageShiphits[3];
		const destroyerY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 3 * (shipboxStyle.height + shipboxStyle.margin);
		this.makeShip(shipboxStyle, shiphitsStyle.x + 2, destroyerY, 'Destroyer', 'destroyer', 'destroyerRed', destroyerHits, tooltipStyle);

		//submarine
		const submarineHits = stats.averageShiphits[4];
		const submarineY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 4 * (shipboxStyle.height + shipboxStyle.margin);
		this.makeShip(shipboxStyle, shiphitsStyle.x + 2, submarineY, 'Submarine', 'submarine', 'submarineRed', submarineHits, tooltipStyle);


		//other (capitulations and wins against computer)
		const otherStyle = {
			x: 120,
			y: 545,
			width: 825, //515
			height: 132,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 20,
			gapY: 15,
			textStyle: normaltextStyle
		}
		const other = this.add.graphics();
		other.fillStyle(otherStyle.backgroundColor, 1);
		other.fillRoundedRect(otherStyle.x, otherStyle.y, otherStyle.width, otherStyle.height, otherStyle.radius);

		const txtCapitulations = this.add.text(otherStyle.x + otherStyle.padding, otherStyle.y + otherStyle.padding, "Total Capitulations: " + stats.capitulations, otherStyle.textStyle);
		const txtWinsPc = this.add.text(otherStyle.x + otherStyle.padding, otherStyle.y + otherStyle.padding + txtCapitulations.height + otherStyle.gapY, "Wins against PC: " + stats.winCountComputer + " or " + (100 * stats.winCountComputer / stats.gamesCountComputer).toFixed(1)+ "%", otherStyle.textStyle);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	preload() {
		this.load.image("backButton", "assets/options/backButton.png");
		this.load.image("homeButton", "assets/leaderboard/homeButton.png");
		this.load.image("carrier", "assets/ships/carrier/carrier_stats.png");
		this.load.image("battleship", "assets/ships/battleship/battleship_stats.png");
		this.load.image("cruiser", "assets/ships/cruiser/cruiser_stats.png");
		this.load.image("destroyer", "assets/ships/destroyer/destroyer_stats.png");
		this.load.image("submarine", "assets/ships/submarine/submarine_stats.png");
		this.load.image("carrierRed", "assets/ships/carrier/carrier_stats_red.png");
		this.load.image("battleshipRed", "assets/ships/battleship/battleship_stats_red.png");
		this.load.image("cruiserRed", "assets/ships/cruiser/cruiser_stats_red.png");
		this.load.image("destroyerRed", "assets/ships/destroyer/destroyer_stats_red.png");
		this.load.image("submarineRed", "assets/ships/submarine/submarine_stats_red.png");
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
	
	makeShip(shipboxStyle, shipboxX, shipboxY, name, img, imgRed, hits, tooltipStyle) {
		const shipbox = this.add.graphics();
		shipbox.fillStyle(shipboxStyle.backgroundColor, 1);
		shipbox.fillRoundedRect(shipboxX, shipboxY, shipboxStyle.width, shipboxStyle.height, shipboxStyle.radius);

		const text = this.add.text(shipboxX + shipboxStyle.width / 2, shipboxY + shipboxStyle.paddingTop, name, shipboxStyle.textStyle);
		text.setOrigin(0.5, 0);

		const image = this.add.image(shipboxX + shipboxStyle.width / 2, text.y + text.height + 0.5 * (shipboxY + shipboxStyle.height - text.y - text.height), img);
		image.setOrigin(0.5, 0.5);
		image.setScale(0.22);
		image.setInteractive({ useHandCursor: true });

		const rect = this.add.graphics();
		rect.fillStyle(shipboxStyle.backgroundColor, 0);
		rect.fillRect(image.x - 0.5 * image.displayWidth, image.y - 0.5*image.displayHeight, hits * image.displayWidth, image.displayHeight);
		const mask = rect.createGeometryMask();

		const imageRed = this.add.image(shipboxX + shipboxStyle.width / 2, text.y + text.height + 0.5 * (shipboxY + shipboxStyle.height - text.y - text.height), imgRed);
		imageRed.setOrigin(0.5, 0.5);
		imageRed.setScale(0.22);
		imageRed.setMask(mask);

		const tooltip = this.add.graphics();
		tooltip.fillStyle(tooltipStyle.backgroundColor, 1);
		tooltip.fillRoundedRect(image.x + 35, image.y, tooltipStyle.width, tooltipStyle.height, 5);
		tooltip.setAlpha(0);

		const tooltipText = this.add.text(image.x + 35 + 0.5 * tooltipStyle.width, image.y + 0.5 * tooltipStyle.height, Math.round(100 * hits) + '% HIT', tooltipStyle.textStyle);
		tooltipText.setOrigin(0.5, 0.5);
		tooltipText.setAlpha(0);

		image.on('pointerover', function (event) {
			tooltip.setAlpha(1);
			tooltipText.setAlpha(1);
		})

		image.on('pointerout', function (event) {
			tooltip.setAlpha(0);
			tooltipText.setAlpha(0);
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
