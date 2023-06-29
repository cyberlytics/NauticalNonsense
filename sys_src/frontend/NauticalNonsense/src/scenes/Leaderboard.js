// You can write more code here

const backgroundColor = 0x3c3845
const cellColor = 0xffffff;
const columnSpacing = 50;
const rowSpacing = 50;
const smallCornerRadius = 20
const tinyCornerRadius = 10
const tableBoardMargin = 30

const headingStyle = {
	fontSize: '20px',
	fill: '#000000',
	fontFamily: "GodOfWar"
};

const textStyle = {
	fontSize: '32px',
	fill: '#000000',
	fontFamily: "GodOfWar"
};

/* START OF COMPILED CODE */

class Leaderboard extends Phaser.Scene {

	constructor() {
		super("Leaderboard");

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		//mainUrl
		const mainUrl = this.game.sharedData.backend_url;

		// sound
		this.click = this.sound.add("click");

		// background
		this.background = this.add.image(0, 0, "0001");
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		this.background.setOrigin(0, 0);


		// homeButton
		this.homeButton = this.add.image(70, 580, "homeButton").setInteractive({ useHandCursor: true });
		this.homeButton.scaleX = 0.7;
		this.homeButton.scaleY = 0.7;

		this.homeButton.on('pointerover', function (event) {
			this.setTint(0x808080);
		});

		this.homeButton.on('pointerout', function (event) {
			this.clearTint();
		});

		this.homeButton.on('pointerdown', () => {
			this.playClick();
			this.scene.start('Start');
		});

		// backButton
		this.backButton = this.add.image(70, 650, "backButton").setInteractive({ useHandCursor: true });
		this.backButton.scaleX = 0.7;
		this.backButton.scaleY = 0.7;

		this.backButton.on('pointerover', function (event) {
			this.setTint(0x808080);
		});

		this.backButton.on('pointerout', function (event) {
			this.clearTint();
		});

		this.backButton.on('pointerdown', () => {
			this.playClick();
			this.scene.start('Options');
		});

		//loading
		const loadingStyle = {
			width: 900,
			height: 200,
			radius: 20,
			backgroundColor: 0x3c3845,
			padding: 25,
			textStyle: {
				fontSize: '28px',
				fill: '#ffffff',
				fontFamily: "GodOfWar"
			}
		}
		const loading = this.add.graphics();
		loading.fillStyle(loadingStyle.backgroundColor, 1);
		loading.fillRoundedRect(1280 / 2 - loadingStyle.width / 2, 720 / 2 - loadingStyle.height / 2, loadingStyle.width, loadingStyle.height, loadingStyle.radius);

		const txtLoading = this.add.text(1280 / 2, 720 / 2 - loadingStyle.height / 2 + loadingStyle.padding, "Loading...", loadingStyle.textStyle);
		txtLoading.setOrigin(0.5, 0);

		const logoLoading = this.add.image(1280 / 2, 720 / 2 + 25, "logoWhite");
		logoLoading.setOrigin(0.5, 0.5);
		logoLoading.setScale(0.5);
		
		fetch(mainUrl + '/leaderboard').then((response) => {
			return response.json();
		}).then((data) => {
			//remove loading elements
			loading.setVisible(false);
			txtLoading.setVisible(false);
			logoLoading.setVisible(false);

			const resultHuman = [];
			const leadersHuman = data.leadersHuman;
			const resultComputer = [];
			const leadersComputer = data.leadersComputer;
			leadersHuman.forEach((leader, index) => {
				const { name, moves, rank } = leader;
				resultHuman.push(`${rank}`, `${name}`, `${moves}`);
			});
			
			leadersComputer.forEach((leader, index) => {
				const { name, moves, rank } = leader;
				resultComputer.push(`${rank}`, `${name}`, `${moves}`);
			});

			var leaderboardHumans = this.rexUI.add.scrollablePanel({
				x: 1270 / 4 + 80,
				y: 720 / 2,
				width: 500,
				height: 550,

				scrollMode: 0,

				background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, backgroundColor),

				panel: {
					child: createGrid(this, resultHuman),
					mask: {
						mask: true,
						padding: 1,
					}
				},

				slider: {
					track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, backgroundColor),
					thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, cellColor),
				},

				mouseWheelScroller: {
					focus: false,
					speed: 0.1
				},

				header: this.rexUI.add.label({
					height: 30,

					orientation: 0,
					background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, backgroundColor),
				}),

				footer: this.rexUI.add.label({
					height: 30,

					orientation: 0,
					background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, backgroundColor),
					text: this.add.text(0, 0, 'Human vs. Human', {fontFamily: 'GodOfWar'}),
					align: 'center',
				}),

				space: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 10,

					panel: 10,
					header: 10,
					footer: 10,
				}, 
			})
				.layout()

			const rankText = this.add.text(155+ 80, 115, "", {});
			rankText.scaleX = 1;
			rankText.scaleY = 1;
			rankText.setOrigin(0.5, 0.5);
			rankText.text = "Rank";
			rankText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

			const nameText = this.add.text(155+147+ 80, 115, "", {});
			nameText.scaleX = 1;
			nameText.scaleY = 1;
			nameText.setOrigin(0.5, 0.5);
			nameText.text = "Name";
			nameText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

			const shotsText = this.add.text(155+2*147+ 80, 115, "", {});
			shotsText.scaleX = 1;
			shotsText.scaleY = 1;
			shotsText.setOrigin(0.5, 0.5);
			shotsText.text = "Shots";
			shotsText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

			// Leaderboard vs Computers
			var leaderboardComputer = this.rexUI.add.scrollablePanel({
				x: (1270*3 / 4) - 75+ 80,
				y: 720 / 2,
				width: 500,
				height: 550,

				scrollMode: 0,

				background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, backgroundColor),

				panel: {
					child: createGrid(this, resultComputer),
					mask: {
						mask: true,
						padding: 1,
					}
				},

				slider: {
					track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, backgroundColor),
					thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, cellColor),
				},

				mouseWheelScroller: {
					focus: false,
					speed: 0.1
				},

				header: this.rexUI.add.label({
					height: 30,

					orientation: 0,
					background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, backgroundColor),
				}),

				footer: this.rexUI.add.label({
					height: 30,

					orientation: 0,
					background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, backgroundColor),
					text: this.add.text(0, 0, 'Human vs. Computer', {fontFamily: 'GodOfWar'}),
					align: 'center',
				}),

				space: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 10,

					panel: 10,
					header: 10,
					footer: 10,
				}, 
			})
				.layout()

			const rankText1 = this.add.text(715+ 80, 115, "", {});
			rankText1.scaleX = 1;
			rankText1.scaleY = 1;
			rankText1.setOrigin(0.5, 0.5);
			rankText1.text = "Rank";
			rankText1.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

			const nameText1 = this.add.text(715+147+ 80, 115, "", {});
			nameText1.scaleX = 1;
			nameText1.scaleY = 1;
			nameText1.setOrigin(0.5, 0.5);
			nameText1.text = "Name";
			nameText1.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

			const shotsText1 = this.add.text(715+2*147+ 80, 115, "", {});
			shotsText1.scaleX = 1;
			shotsText1.scaleY = 1;
			shotsText1.setOrigin(0.5, 0.5);
			shotsText1.text = "Shots";
			shotsText1.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

		}).catch((error) => {
			console.error(error);
			
			const errorBackground = this.add.image(1280/2, 720/2, "buttonBox");
			errorBackground.scaleX = 1;
			errorBackground.scaleY = 1;
			
			const errorMessage = this.add.text(1270/2, 720/2, "Failed to connect to Leaderboard.");
			errorMessage.scaleX = 1;
			errorMessage.scaleY = 1;
			errorMessage.setOrigin(0.5, 0.5);
			errorMessage.text = "Failed to connect \nto Leaderboard.\n \n \nYou were probably \nthe best";
			errorMessage.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "27px" });


		});

		// Wake scene
		this.events.emit("scene-awake");
	}



	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
	}

	preload() {
		this.load.pack("asset-pack", "assets/leaderboard-asset-pack.json");
		this.load.audio("click", ["assets/sounds/click_1.mp3"]);
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	playClick() {
		this.click.play();
	}

	update() { }

	/* END-USER-CODE */
}

// Generates data for scrollable list
var CreateContent = function (data) {
	let leaderboardString = '';
	data.forEach((player) => {
		leaderboardString += `${player.rank} \t ${player.name} \t ${player.shots}\n`;
	});
	return leaderboardString
}


var createGrid = function (scene, data) {
	var sizer = scene.rexUI.add.fixWidthSizer({
		space: {
			left: 3,
			right: 3,
			top: 3,
			bottom: 3,
			item: 0,
			line: 8,
		},
	})
		.addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, backgroundColor))

	for (let i = 0; i < data.length; i++) {
		sizer.add(scene.rexUI.add.label({
			width: 210 * 0.7,
			height: 60,
			background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, cellColor),
			text: scene.add.text(0, 0, `${data[i]}`, { fontSize: 18, color: backgroundColor,
				fontFamily: 'GodOfWar'}),
			align: 'center',
			space: {
				left: 10,
				right: 10,
				top: 10,
				bottom: 10,
			}
		}));
	}


	return sizer;
}

/* END OF COMPILED CODE */

// You can write more code here
