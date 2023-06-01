
// You can write more code here

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const backgroundColor = 0x3c3845
const columnSpacing = 50;
const rowSpacing = 50;
const smallCornerRadius = 20
const tinyCornerRadius = 10
const tableBoardMargin = 30

const headingStyle = {
	fontSize: '20px',
	fill: '#ffffff'
};

const textStyle = {
	fontSize: '32px',
	fill: '#ffffff'
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

		// sound
		this.click = this.sound.add("click");

		// background
		this.background = this.add.image(0, 0, "0001");
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		this.background.setOrigin(0, 0);
		

		// homeButton
		this.homeButton = this.add.image(1280 - 50 - 20, 70, "homeButton").setInteractive({ useHandCursor: true  });
		this.homeButton.scaleX = 0.7;
		this.homeButton.scaleY = 0.7;

		this.homeButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        this.homeButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		this.homeButton.on('pointerdown', () => {
			this.playClick();
			this.scene.start('Start');
        });

		// backButton
		this.backButton = this.add.image(1280 - 50 - 20, 70 + 70, "backButton").setInteractive({ useHandCursor: true  });
		this.backButton.scaleX=0.7;
		this.backButton.scaleY=0.7;

		this.backButton.on('pointerover', function (event)
		{
			this.setTint(0x808080);
		});

		this.backButton.on('pointerout', function (event)
		{
			this.clearTint();
		});
		
		this.backButton.on('pointerdown', () => {
			this.playClick();
			this.scene.start('Options');
		});



		// Leaderboard
		
		/*
		Hier HTTP Request schicken um die Anfrage an die REST Schittstelle zu machen

		--> function.onload()

		Nicht vergessen request auch senden ;)
		*/

		
		const leaderboardData = [
			{ rank: 1, name: 'Player 1', shots: 10 },
			{ rank: 2, name: 'Player 2', shots: 20 },
			{ rank: 3, name: 'Player 3', shots: 30 },
			{ rank: 4, name: 'Player 4', shots: 40 },
			{ rank: 5, name: 'Player 5', shots: 50 },
			{ rank: 6, name: 'Player 6', shots: 60 },
			{ rank: 7, name: 'Player 7', shots: 70 },
			{ rank: 8, name: 'Player 8', shots: 80 },
			{ rank: 9, name: 'Player 9', shots: 90 },
			{ rank: 10, name: 'Player 10', shots: 100 },
		];
		
		/*
		// old method to create the table
		const tableBoardPos = {
			x : 1270/2 - 700/2,
			y : 720/2 - 550/2,
			width : 700,
			height : 550,
			cornerRadius : smallCornerRadius
		}

		this.tableBoard = this.add.graphics();
		this.tableBoard.fillStyle(backgroundColor, 1);
		this.tableBoard.fillRoundedRect(tableBoardPos.x-tableBoardPos.cornerRadius, tableBoardPos.y - tableBoardPos.cornerRadius, 
										tableBoardPos.width+2*tableBoardPos.cornerRadius, tableBoardPos.height+2*tableBoardPos.cornerRadius, 20);
	
		// Add table headers
		this.add.text(tableBoardPos.x + tableBoardMargin, tableBoardPos.y, 'RANK', headingStyle);
		this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 2, tableBoardPos.y, 'NAME', headingStyle);
		this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 10, tableBoardPos.y, 'SHOTS', headingStyle);
	
		// Add leaderboard entries
		leaderboardData.forEach((entry, index) => {
			const rowY = tableBoardPos.y + (index + 1) * rowSpacing;
			this.add.text(tableBoardPos.x + tableBoardMargin, rowY, entry.rank, textStyle);
			this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 2, rowY, entry.name, textStyle);
			this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 10, rowY, entry.shots, textStyle);
		});
		*/

		// Scrollbar
		var textArea = this.rexUI.add.textArea({
            x : 1270/2,
			y : 720/2,
			width : 700,
			height : 550,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, smallCornerRadius, backgroundColor),

            // text: this.add.text(),
            text: this.rexUI.add.BBCodeText(),
            // textMask: true,

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 0, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, tinyCornerRadius, COLOR_LIGHT),
            },

            space: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,

                text: tableBoardMargin,
                header: 0,
                footer: tableBoardMargin,
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 30,
                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Rank \t Name \t Shots',  headingStyle),
            }),

            content: CreateContent(leaderboardData),
        })
            .layout();


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

	playClick() 
	{
		this.click.play();
	}

	update(){}

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


/* END OF COMPILED CODE */

// You can write more code here
