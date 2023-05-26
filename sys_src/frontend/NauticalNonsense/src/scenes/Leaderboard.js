
// You can write more code here

/* START OF COMPILED CODE */

class Leaderboard extends Phaser.Scene {

	constructor() {
		super("Leaderboard");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.background = this.add.image(0, 0, "0001");
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		this.background.setOrigin(0, 0);

		// startButton
		const backToStartButton = this.add.image(1100, 220, "backToStartButton").setInteractive({ useHandCursor: true  });

		backToStartButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        backToStartButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		backToStartButton.on('pointerdown', function (event)
        {
			this.clearTint();
			self.playClick();
			self.stopHorn();
			self.scene.start('Start');
        });

		// Leaderboard
		
		// dummy data --> replace with database input
		const leaderboardData = [
			{ rank: 1, name: 'Player 1', shots: 100 },
			{ rank: 2, name: 'Player 2', shots: 90 },
			{ rank: 3, name: 'Player 3', shots: 80 },
			{ rank: 4, name: 'Player 4', shots: 70 },
			{ rank: 5, name: 'Player 5', shots: 60 }
		];
	  
		// Create a text style for the table
		const textStyle = {
			fontSize: '32px',
			fill: '#ffffff'
		};

		const columnSpacing = 50;
		const rowSpacing = 50;
		const backgroundColor = 0x3c3845
		const smallCornerRadius = 20
		const tinyCornerRadius = 10
		const tableBoardMargin = 30

		const tableBoardPos = {
			x : 200,
			y : 100,
			width : 700,
			height : 500,
			cornerRadius : smallCornerRadius
		}

		this.tableBoard = this.add.graphics();
		this.tableBoard.fillStyle(backgroundColor, 1);
		this.tableBoard.fillRoundedRect(tableBoardPos.x-tableBoardPos.cornerRadius, tableBoardPos.y - tableBoardPos.cornerRadius, 
										tableBoardPos.width+2*tableBoardPos.cornerRadius, tableBoardPos.height+2*tableBoardPos.cornerRadius, 20);
	
		// Add table headers
		this.add.text(tableBoardPos.x + tableBoardMargin, tableBoardPos.y, 'Rank', textStyle);
		this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 2, tableBoardPos.y, 'Name', textStyle);
		this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 10, tableBoardPos.y, 'Shots', textStyle);
	
		// Add leaderboard entries
		leaderboardData.forEach((entry, index) => {
			const rowY = tableBoardPos.y + (index + 1) * rowSpacing;
			this.add.text(tableBoardPos.x + tableBoardMargin, rowY, entry.rank, textStyle);
			this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 2, rowY, entry.name, textStyle);
			this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 10, rowY, entry.shots, textStyle);
		});




		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
