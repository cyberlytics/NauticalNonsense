
// You can write more code here

/* START OF COMPILED CODE */

class Gameover extends Phaser.Scene 
{

	constructor() 
	{
		super("Gameover");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() 
	{
		var sharedData = this.game.sharedData;
		var gameover = sharedData.gameover;

		const self = this;
		
		//sounds
		this.click = this.sound.add("click");
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		// gamoverBackground
		if ((gameover.won) && (gameover.capitulation != true)) {
			const gamoverBackground = this.add.image(1280 / 2, 720 / 2, "goBackground");
			gamoverBackground.scaleX = 1;
			gamoverBackground.scaleY = 1;
		}
		else {
			const gamoverBackground = this.add.image(1280 / 2, 720 / 2, "goBackgroundShort");
			gamoverBackground.scaleX = 1;
			gamoverBackground.scaleY = 1;
		}

		// statsText
		const statsText = this.add.text(1280 / 2, 237, "", {});
		statsText.scaleX = 1;
		statsText.scaleY = 1;
		statsText.setOrigin(0.5, 0.5);
		statsText.text = "Statistics";
		statsText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });

		// items: shots, hits, misses, total moves
		const shotsText = self.makeItemText(1280 / 2 - 300, 285, "Number Of Shots:");
		const shotsValue = self.makeItemText(1280 / 2 + 200, 285, gameover.shots.toString());
		const hitsText = self.makeItemText(1280 / 2 - 300, 325, "Number Of Hits:");
		const hitsValue = self.makeItemText(1280 / 2 + 200, 325, gameover.hits.toString());
		const missesText = self.makeItemText(1280 / 2 - 300, 365, "Number Of Misses:");
		const missesValue = self.makeItemText(1280 / 2 + 200, 365, gameover.misses.toString());
		const movesText = self.makeItemText(1280 / 2 - 300, 405, "Total Number Of Moves:");	
		const movesValue = self.makeItemText(1280 / 2 + 200, 405, gameover.totalMoves.toString());

		if (gameover.won) {
			// winText
			const winText = this.add.text(1280 / 2, 95, "", {});
			winText.scaleX = 1;
			winText.scaleY = 1;
			winText.setOrigin(0.5, 0.5);
			winText.text = "You Win";
			winText.setStyle({ "align": "center", "color": "#b9e0a5", "fontFamily": "GodOfWar", "fontSize": "50px" });

			// exitWin
			const exitWin = this.add.image(1280 / 2, 720 / 2 + 210, "goExitWin").setInteractive({ useHandCursor: true });
			exitWin.scaleX = 0.9;
			exitWin.scaleY = 0.9;

			exitWin.on('pointerover', function (event) {
				this.setTint(0x1ed013);
			});

			exitWin.on('pointerout', function (event) {
				this.clearTint();
			});

			exitWin.on('pointerdown', function (event) {
				self.playClick();
				this.clearTint();
				self.deleteGameover(gameover);
				self.scene.start("Start");
			});

			// exitWinText
			const exitWinText = this.add.text(1280 / 2, 720 / 2 + 210, "", {});
			exitWinText.scaleX = 1;
			exitWinText.scaleY = 1;
			exitWinText.setOrigin(0.5, 0.5);
			exitWinText.text = "Exit";
			exitWinText.setStyle({ "align": "center", "color": "#009900", "fontFamily": "GodOfWar", "fontSize": "30px" });

			if (gameover.capitulation != true) {
				//position on leaderboard
				const posText = self.makeItemText(1280 / 2 - 300, 445, "Position On Leaderboard:");
				const posValue = self.makeItemText(1280 / 2 + 200, 445, gameover.rank.toString());
			}
		}
		else {
			// loseText
			const loseText = this.add.text(1280 / 2, 95, "", {});
			loseText.scaleX = 1;
			loseText.scaleY = 1;
			loseText.setOrigin(0.5, 0.5);
			loseText.text = "You Lose";
			loseText.setStyle({ "align": "center", "color": "#ea6b66", "fontFamily": "GodOfWar", "fontSize": "50px" });

			// exitLose
			const exitLose = this.add.image(1280 / 2, 720 / 2 + 210, "goExitLose").setInteractive({ useHandCursor: true });
			exitLose.scaleX = 0.9;
			exitLose.scaleY = 0.9;

			exitLose.on('pointerover', function (event) {
				this.setTint(0xe50000);
			});

			exitLose.on('pointerout', function (event) {
				this.clearTint();
			});

			exitLose.on('pointerdown', function (event) {
				self.playClick();
				this.clearTint();
				self.deleteGameover(gameover);
				self.scene.start("Start");
			});

			// exitLoseText
			const exitLoseText = this.add.text(1280 / 2, 720 / 2 + 210, "", {});
			exitLoseText.scaleX = 1;
			exitLoseText.scaleY = 1;
			exitLoseText.setOrigin(0.5, 0.5);
			exitLoseText.text = "Exit";
			exitLoseText.setStyle({ "align": "center", "color": "#990000", "fontFamily": "GodOfWar", "fontSize": "30px" });
		}

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() 
	{
		this.editorCreate();
	}
	
	playClick() 
	{
		this.click.play();
	}

	makeItemText(x, y, text) {
		const itemText = this.add.text(x, y, text, {});
		itemText.scaleX = 1;
		itemText.scaleY = 1;
		itemText.setOrigin(0, 0.5);
		itemText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		return itemText;
	}

	deleteGameover(gameover) {
		gameover.capitulation = false;
		gameover.won = false;
		gameover.shots = 0;
		gameover.hits = 0;
		gameover.misses = 0;
		gameover.totalMoves = 0;
		gameover.rank = 0;
	}

	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
