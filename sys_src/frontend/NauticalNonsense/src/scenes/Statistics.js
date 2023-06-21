
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
		const mainUrl = "http://localhost:8000"; //mainUrl noch anpassen
		const darkgrey = 0x3c3845;
		const white = 0xffffff;
		const boardsize = 100;
		//1280 x 720

		//text styles
		const normaltext = {
			fontSize: '24px',
			fill: '#ffffff',
			fontFamily: "GodOfWar"
		};
		const headingtext = {
			fontSize: '28px',
			fill: '#ffffff',
			fontFamily: "GodOfWar"
		};
		const shiptext = {
			fontSize: '20px',
			fill: '#000000',
			align: "center",
			fontFamily: "GodOfWar"
		};
		const tooltiptext = {
			fontSize: '20px',
			fill: '#ffffff',
			align: "center",
			fontFamily: "GodOfWar"
		};
		const tooltiptextSmall = {
			fontSize: '14px',
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

		//loading
		const loadingStyle = {
			width: 900,
			height: 200,
			radius: 20,
			backgroundColor: darkgrey,
			padding: 25,
			textStyle: headingtext
		}
		const loading = this.add.graphics();
		loading.fillStyle(loadingStyle.backgroundColor, 1);
		loading.fillRoundedRect(1280 / 2 - loadingStyle.width / 2, 720 / 2 - loadingStyle.height / 2, loadingStyle.width, loadingStyle.height, loadingStyle.radius);

		const txtLoading = this.add.text(1280 / 2, 720 / 2 - loadingStyle.height / 2 + loadingStyle.padding, "Loading...", loadingStyle.textStyle);
		txtLoading.setOrigin(0.5, 0);

		const logoLoading = this.add.image(1280 / 2, 720/2+25, "logoWhite");
		logoLoading.setOrigin(0.5, 0.5);
		logoLoading.setScale(0.5);

		// get stats via backend API
		fetch(mainUrl + "/stats")
			.then((response) => {
				return response.json();
			})
			.then((stats) => {
				//remove loading elements
				loading.setVisible(false);
				txtLoading.setVisible(false);
				logoLoading.setVisible(false);

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

				const txtGamesPlayed = this.add.text(gamesStyle.x + gamesStyle.padding, gamesStyle.y + gamesStyle.padding, "GAMES PLAYED", normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding + 270, gamesStyle.y + gamesStyle.padding, "2-Player: " + stats.gamesCountHuman, normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding + 520, gamesStyle.y + gamesStyle.padding, "PC: " + stats.gamesCountComputer, normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding + 690, gamesStyle.y + gamesStyle.padding, "Total: " + stats.gamesCount, normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "AVERAGE SHOTS", normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding + 270, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "2-Player: " + stats.averageMovesHuman.toFixed(2), normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding + 520, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "PC: " + stats.averageMovesComputer.toFixed(2), normaltext);
				this.add.text(gamesStyle.x + gamesStyle.padding + 690, gamesStyle.y + gamesStyle.padding + txtGamesPlayed.height + gamesStyle.gapY, "Total: " + stats.averageMoves.toFixed(2), normaltext);


				//boards
				const tooltipBoardStyle = {
					width: 50,
					height: 20,
					radius: 5,
					backgroundColor: '0x3c3845',
					textStyle: tooltiptextSmall
				}

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
					textStyle: normaltext
				}
				this.boardShips = this.makeBoard(boardStyleShips, "Ship Positions", stats.shipPositions, tooltipBoardStyle);

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
					textStyle: normaltext
				}
				this.boardShots = this.makeBoard(boardStyleShots, "Most Shot Fields", stats.moves, tooltipBoardStyle);

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
					textStyle: normaltext
				}
				this.boardFirsts = this.makeBoard(boardStyleFirsts, "Most First Shots", stats.firstMoves, tooltipBoardStyle);


				//winner's ships hit
				const shiphitsStyle = {
					x: 965,
					y: 50,
					width: 290,
					height: 627,
					radius: 20,
					backgroundColor: darkgrey,
					padding: 20,
					textStyle: normaltext
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
					textStyle: shiptext
				}
				const tooltipStyle = {
					width: 105,
					height: 40,
					radius: 5,
					backgroundColor: darkgrey,
					textStyle: tooltiptext
				}

				const shipX = shiphitsStyle.x + 2;

				//carrier
				const carrierHits = stats.averageShiphits[0];
				const carrierY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding;
				this.makeShip(shipboxStyle, shipX, carrierY, 'Carrier', 'carrierStats', 'carrierStatsRed', carrierHits, tooltipStyle);

				//battleship
				const battleshipHits = stats.averageShiphits[1];
				const battleshipY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 1 * (shipboxStyle.height + shipboxStyle.margin);
				this.makeShip(shipboxStyle, shipX, battleshipY, 'Battleship', 'battleshipStats', 'battleshipStatsRed', battleshipHits, tooltipStyle);

				//cruiser
				const cruiserHits = stats.averageShiphits[2];
				const cruiserY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 2 * (shipboxStyle.height + shipboxStyle.margin);
				this.makeShip(shipboxStyle, shipX, cruiserY, 'Cruiser', 'cruiserStats', 'cruiserStatsRed', cruiserHits, tooltipStyle);

				//destroyer
				const destroyerHits = stats.averageShiphits[3];
				const destroyerY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 3 * (shipboxStyle.height + shipboxStyle.margin);
				this.makeShip(shipboxStyle, shipX, destroyerY, 'Destroyer', 'destroyerStats', 'destroyerStatsRed', destroyerHits, tooltipStyle);

				//submarine
				const submarineHits = stats.averageShiphits[4];
				const submarineY = shiphitsStyle.y + txtShiphits.height + 2 * shiphitsStyle.padding + 4 * (shipboxStyle.height + shipboxStyle.margin);
				this.makeShip(shipboxStyle, shipX, submarineY, 'Submarine', 'submarineStats', 'submarineStatsRed', submarineHits, tooltipStyle);


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
					textStyle: normaltext
				}
				const other = this.add.graphics();
				other.fillStyle(otherStyle.backgroundColor, 1);
				other.fillRoundedRect(otherStyle.x, otherStyle.y, otherStyle.width, otherStyle.height, otherStyle.radius);

				const txtCapitulations = this.add.text(otherStyle.x + otherStyle.padding, otherStyle.y + otherStyle.padding, "Total Capitulations: " + stats.capitulations, otherStyle.textStyle);
				const txtWinsPc = this.add.text(otherStyle.x + otherStyle.padding, otherStyle.y + otherStyle.padding + txtCapitulations.height + otherStyle.gapY, "Wins against PC: " + stats.winCountComputer + " or " + (100 * stats.winCountComputer / stats.gamesCountComputer).toFixed(1) + "%", otherStyle.textStyle);

			})
			.catch((err) => {
				console.error(err);

				background.setDepth(10);
				returnButton.setDepth(10);
				homeButton.setDepth(10);

				const errorStyle = {
					width: 900,
					height: 200,
					radius: 20,
					backgroundColor: darkgrey,
					padding: 25,
					textStyle: normaltext
				}
				const error = this.add.graphics();
				error.fillStyle(errorStyle.backgroundColor, 1);
				error.fillRoundedRect(1280 / 2 - errorStyle.width / 2, 720 / 2 - errorStyle.height / 2, errorStyle.width, errorStyle.height, errorStyle.radius);
				error.setDepth(10);

				const errormessage = "Unfortunately an error occurred while loading gamestatistics.\n\nPlease try again later."
				const txtError = this.add.text(1280 / 2, 720/2 - errorStyle.height/2 + errorStyle.padding, errormessage, errorStyle.textStyle);
				txtError.setOrigin(0.5, 0);
				txtError.setDepth(10);
			});


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
		this.load.image("carrierStats", "assets/ships/carrier/carrier_stats.png");
		this.load.image("battleshipStats", "assets/ships/battleship/battleship_stats.png");
		this.load.image("cruiserStats", "assets/ships/cruiser/cruiser_stats.png");
		this.load.image("destroyerStats", "assets/ships/destroyer/destroyer_stats.png");
		this.load.image("submarineStats", "assets/ships/submarine/submarine_stats.png");
		this.load.image("carrierStatsRed", "assets/ships/carrier/carrier_stats_red.png");
		this.load.image("battleshipStatsRed", "assets/ships/battleship/battleship_stats_red.png");
		this.load.image("cruiserStatsRed", "assets/ships/cruiser/cruiser_stats_red.png");
		this.load.image("destroyerStatsRed", "assets/ships/destroyer/destroyer_stats_red.png");
		this.load.image("submarineStatsRed", "assets/ships/submarine/submarine_stats_red.png");
		this.load.image("logoWhite", "assets/battleship_logo_white.png");
	}

	makeBoard(boardStyle, title, data, tooltipStyle) {
		let boardWhite = []
		let board = []

		const txtTitle = this.add.text(boardStyle.x + boardStyle.padding, boardStyle.y + boardStyle.padding, title, boardStyle.textStyle).setDepth(1);

		const boardBG = this.add.graphics();
		boardBG.fillStyle(boardStyle.backgroundColor, 1);
		boardBG.fillRoundedRect(boardStyle.x, boardStyle.y, 10 * boardStyle.cellsize + 2 * boardStyle.padding, 10 * boardStyle.cellsize + 2 * boardStyle.padding + 1.5 * txtTitle.height, boardStyle.radius);

		let cellX = boardStyle.x + boardStyle.padding;
		let cellY = boardStyle.y + boardStyle.padding + 1.5 * txtTitle.height;

		let dataMax = Math.max(...data);


		for (let i = 1; i <= boardStyle.boardsize; i++) {
			boardWhite[i - 1] = this.add.rectangle(cellX, cellY, boardStyle.cellsize - 1, boardStyle.cellsize - 1, boardStyle.cellBackground).setOrigin(0, 0);
			boardWhite[i - 1].setInteractive();
			board[i - 1] = this.add.rectangle(cellX, cellY, boardStyle.cellsize - 1, boardStyle.cellsize - 1, boardStyle.cellColor).setOrigin(0, 0).setAlpha(data[i - 1] / dataMax);

			const tooltip = this.add.graphics();
			tooltip.fillStyle(tooltipStyle.backgroundColor, 1);
			//const tooltipWidth = tooltipStyle.width;
			const digits = data[i - 1].toString().length;
			const tooltipWidth = digits * 9 + 15;
			tooltip.fillRoundedRect(cellX + 0.6 * boardStyle.cellsize, cellY + 0.6 * boardStyle.cellsize, tooltipWidth, tooltipStyle.height, 5);
			tooltip.setDepth(5);
			tooltip.setAlpha(0);

			const tooltipText = this.add.text(cellX + 0.6 * boardStyle.cellsize + 0.5 * tooltipWidth, cellY + 0.6 * boardStyle.cellsize + 0.5 * tooltipStyle.height, data[i - 1], tooltipStyle.textStyle);
			tooltipText.setOrigin(0.5, 0.5);
			tooltipText.setDepth(6);
			tooltipText.setAlpha(0);

			boardWhite[i - 1].on('pointerover', function (event) {
				tooltip.setAlpha(1);
				tooltipText.setAlpha(1);
			})

			boardWhite[i - 1].on('pointerout', function (event) {
				tooltip.setAlpha(0);
				tooltipText.setAlpha(0);
			})

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
		image.setInteractive();

		const rect = this.add.graphics();
		rect.fillStyle(shipboxStyle.backgroundColor, 0);
		rect.fillRect(image.x - 0.5 * image.displayWidth, image.y - 0.5 * image.displayHeight, hits * image.displayWidth, image.displayHeight);
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
