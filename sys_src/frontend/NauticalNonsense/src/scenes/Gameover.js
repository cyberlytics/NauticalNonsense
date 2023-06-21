
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
		const gamoverBackground = this.add.image(1280/2, 720/2, "goBackground");
		gamoverBackground.scaleX = 1;
		gamoverBackground.scaleY = 1;
		
		// winText
		const winText = this.add.text(1280/2, 95, "", {});
		winText.scaleX = 1;
		winText.scaleY = 1;
		winText.setOrigin(0.5, 0.5);
		winText.text = "You Win";
		winText.setStyle({ "align": "center", "color": "#b9e0a5", "fontFamily": "GodOfWar", "fontSize": "50px" });
		
		// loseText
		const loseText = this.add.text(1280/2, 95, "", {});
		loseText.scaleX = 1;
		loseText.scaleY = 1;
		loseText.setOrigin(0.5, 0.5);
		loseText.text = "You Lose";
		loseText.setStyle({ "align": "center", "color": "#ea6b66", "fontFamily": "GodOfWar", "fontSize": "50px" });
		
		// statsText
		const statsText = this.add.text(1280/2, 237, "", {});
		statsText.scaleX = 1;
		statsText.scaleY = 1;
		statsText.setOrigin(0.5, 0.5);
		statsText.text = "Statistics";
		statsText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		
		// shotsText
		const shotsText = this.add.text(1280/2 - 300, 285, "", {});
		shotsText.scaleX = 1;
		shotsText.scaleY = 1;
		shotsText.setOrigin(0, 0.5);
		shotsText.text = "Number Of Shots:";
		shotsText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// hitsText
		const hitsText = this.add.text(1280/2 - 300, 325, "", {});
		hitsText.scaleX = 1;
		hitsText.scaleY = 1;
		hitsText.setOrigin(0, 0.5);
		hitsText.text = "Hits:";
		hitsText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// missesText
		const missesText = this.add.text(1280/2 - 300, 365, "", {});
		missesText.scaleX = 1;
		missesText.scaleY = 1;
		missesText.setOrigin(0, 0.5);
		missesText.text = "Misses:";
		missesText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// movesText
		const movesText = this.add.text(1280/2 - 300, 405, "", {});
		movesText.scaleX = 1;
		movesText.scaleY = 1;
		movesText.setOrigin(0, 0.5);
		movesText.text = "Number Of Moves:";
		movesText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// posText
		const posText = this.add.text(1280/2 - 300, 445, "", {});
		posText.scaleX = 1;
		posText.scaleY = 1;
		posText.setOrigin(0, 0.5);
		posText.text = "Positioin On Leaderboard:";
		posText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// shotsValue
		const shotsValue = this.add.text(1280/2 + 200, 285, "", {});
		shotsValue.scaleX = 1;
		shotsValue.scaleY = 1;
		shotsValue.setOrigin(0, 0.5);
		shotsValue.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// hitsValue
		const hitsValue = this.add.text(1280/2 + 200, 325, "", {});
		hitsValue.scaleX = 1;
		hitsValue.scaleY = 1;
		hitsValue.setOrigin(0, 0.5);
		hitsValue.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// missesValue
		const missesValue = this.add.text(1280/2 + 200, 365, "", {});
		missesValue.scaleX = 1;
		missesValue.scaleY = 1;
		missesValue.setOrigin(0, 0.5);
		missesValue.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// movesValue
		const movesValue = this.add.text(1280/2 + 200, 405, "", {});
		movesValue.scaleX = 1;
		movesValue.scaleY = 1;
		movesValue.setOrigin(0, 0.5);
		movesValue.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// posValue
		const posValue = this.add.text(1280/2 + 200, 445, "", {});
		posValue.scaleX = 1;
		posValue.scaleY = 1;
		posValue.setOrigin(0, 0.5);
		posValue.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		this.setStats(gameover.shots, gameover.hits, gameover.misses, gameover.totalMoves, gameover.rank);
		
		// exitWin
		const exitWin = this.add.image(1280/2, 720/2 + 210, "goExitWin").setInteractive({ useHandCursor: true  });
		exitWin.scaleX = 0.9;
		exitWin.scaleY = 0.9;
		
		exitWin.on('pointerover', function (event)
        {
            this.setTint(0x1ed013);
        });

        exitWin.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		exitWin.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			deleteGameover(gameover);
			self.scene.start("Start");
        });
		
		// exitWinText
		const exitWinText = this.add.text(1280/2, 720/2 + 210, "", {});
		exitWinText.scaleX = 1;
		exitWinText.scaleY = 1;
		exitWinText.setOrigin(0.5, 0.5);
		exitWinText.text = "Exit";
		exitWinText.setStyle({ "align": "center", "color": "#009900", "fontFamily": "GodOfWar", "fontSize": "30px" });
		
		// exitLose
		const exitLose = this.add.image(1280/2, 720/2 + 210, "goExitLose").setInteractive({ useHandCursor: true  });
		exitLose.scaleX = 0.9;
		exitLose.scaleY = 0.9;
		
		exitLose.on('pointerover', function (event)
        {
            this.setTint(0xe50000);
        });

        exitLose.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		exitLose.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			deleteGameover(gameover);
			self.scene.start("Start");
        });
		
		// exitLoseText
		const exitLoseText = this.add.text(1280/2, 720/2 + 210, "", {});
		exitLoseText.scaleX = 1;
		exitLoseText.scaleY = 1;
		exitLoseText.setOrigin(0.5, 0.5);
		exitLoseText.text = "Exit";
		exitLoseText.setStyle({ "align": "center", "color": "#990000", "fontFamily": "GodOfWar", "fontSize": "30px" });
		
		this.setWin(winText, loseText, exitWin, exitLose, exitWinText, exitLoseText, gameover.won);

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
	
	setStats(shots, hits, misses, moves, pos)
	{
		shotsValue.text = shots.toString();
		hitsValue.text = hits.toString();
		missesValue.text = misses.toString();
		movesValue.text = moves.toString();
		posValue.text = pos.toString(); 
	}
	
	setWin(winTitle, loseTitle, win, lose, winTxt, loseTxt, s)
	{
		if (s)
		{
			winTitle.setVisible(true);
			loseTitle.setVisible(false);
			win.setVisible(true);
			lose.setVisible(false);
			winTxt.setVisible(true);
			loseTxt.setVisible(false);
		}
		
		else
		{
			winTitle.setVisible(false);
			loseTitle.setVisible(true);
			win.setVisible(false);
			lose.setVisible(true);
			winTxt.setVisible(false);
			loseTxt.setVisible(true);
		}
	}

	deleteGameover(gameover) {
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
