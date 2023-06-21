
// You can write more code here

/* START OF COMPILED CODE */

class Rules extends Phaser.Scene
{

	constructor() 
	{
		super("Rules");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() 
	{
		const self = this;
		var ruleCount = 0;
		
		//sounds
		this.click = this.sound.add("click");
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		// rulesBackground
		const rulesBackground = this.add.image(1280/2, 720/2, "rulesBackground");

		// title
		const title = this.add.text(1280/2, 95, "", {});
		title.scaleX = 1;
		title.scaleY = 1;
		title.setOrigin(0.5, 0.5);
		title.text = "How To Play";
		title.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "50px" });
		
		// titleRules
		const titleRules = this.add.text(1280/2, 195, "", {});
		titleRules.scaleX = 1;
		titleRules.scaleY = 1;
		titleRules.setOrigin(0.5, 0.5);
		titleRules.text = "Rules";
		titleRules.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titleRules.setVisible(true);
		
		// titleStart
		const titleStart = this.add.text(1280/2, 195, "", {});
		titleStart.scaleX = 1;
		titleStart.scaleY = 1;
		titleStart.setOrigin(0.5, 0.5);
		titleStart.text = "Getting Started";
		titleStart.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titleStart.setVisible(false);
		
		// titlePlace
		const titlePlace = this.add.text(1280/2, 195, "", {});
		titlePlace.scaleX = 1;
		titlePlace.scaleY = 1;
		titlePlace.setOrigin(0.5, 0.5);
		titlePlace.text = "Placing Ships";
		titlePlace.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titlePlace.setVisible(false);
		
		// titleGame
		const titleGame = this.add.text(1280/2, 195, "", {});
		titleGame.scaleX = 1;
		titleGame.scaleY = 1;
		titleGame.setOrigin(0.5, 0.5);
		titleGame.text = "Gameplay";
		titleGame.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titleGame.setVisible(false);

		// rulesText
		const rulesText = this.add.text(1280/2 - 315, 195 + 65, "", {});
		rulesText.scaleX = 1;
		rulesText.scaleY = 1;
		rulesText.setOrigin(0, 0);
		rulesText.setWordWrapWidth(635,false);
		rulesText.text = "In Nautical Nonsense, your objective is to sink all of your opponent's ships before all of your own are sunk.\n\nEach player takes turns firing shots at the opponent's grid to locate and destroy their ships.\n\nThe game ends when one player has successfully sunk all of their opponent's ships, or when one player capitulates.";
		rulesText.setStyle({ "align": "left", "color": "#000000ff", "fontFamily": "serif", "fontSize": "20px" });
		rulesText.setVisible(true);

		// startText
		const startText = this.add.text(1280/2 - 315, 195 + 65, "", {});
		startText.scaleX = 1;
		startText.scaleY = 1;
		startText.setOrigin(0, 0);
		startText.setWordWrapWidth(635,false);
		startText.text = "Before starting a new match, you must enter a name. This name will be used for the leaderboard. There are three different game modes to choose from:\n\n1. Against Random: You will be paired with a random human player as your opponent. Please note that you may have to wait if there are no other players currently available.\n\n2. Against Friend: You can play against a friend. To do this, create a new game by leaving the Friend field empty. Your friend will need to enter your name in the Friend field.\n\n3. Against Artificial Intelligence (A.I.): You can also play against a computer-controlled opponent.";
		startText.setStyle({ "align": "left", "color": "#000000ff", "fontFamily": "serif", "fontSize": "20px" });
		startText.setVisible(false);


		// placeText
		const placeText = this.add.text(1280/2 - 315, 195 + 65, "", {});
		placeText.scaleX = 1;
		placeText.scaleY = 1;
		placeText.setOrigin(0, 0);
		placeText.setWordWrapWidth(635,false);
		placeText.text = "Once you have found an opponent, you will need to place your ships. You can click the 'Random' button to automatically place all your ships in random locations. Otherwise, you can click on each ship individually to place it in a random location.\n\nOnce a ship is on the board, you can click on it to select it and use the arrow keys to move it. Press the 'r' key to rotate it. To deselect a ship, press 'Enter' or 'Esc'.\n\nWhen you are happy with the positions of your ships, click the 'Confirm' button to finalise the placement.";
		placeText.setStyle({ "align": "left", "color": "#000000ff", "fontFamily": "serif", "fontSize": "20px" });
		placeText.setVisible(false);


		// gameText
		const gameText = this.add.text(1280/2 - 315, 195 + 65, "", {});
		gameText.scaleX = 1;
		gameText.scaleY = 1;
		gameText.setOrigin(0, 0);
		gameText.setWordWrapWidth(635,false);
		gameText.text = "During the game, your ships and your opponent's shots are displayed on the right side of the screen. The bottom left corner shows whose turn it is (yours or your opponent's).\n\nThe fire control in the top left corner shows your shots, and you can select the next cell to fire on by clicking on it. To confirm your selection, press the 'Fire' button.\n\nIf you hit an enemy ship, you will get another turn to fire.\nContinue to take turns firing shots, trying to locate and destroy all of your opponent's ships before they sink yours.\n\nGood luck in the game!";
		gameText.setStyle({ "align": "left", "color": "#000000ff", "fontFamily": "serif", "fontSize": "20px" });
		gameText.setVisible(false);

		// rulesRight
		const rulesRight = this.add.image(1280/2 + 180, 195, "rulesRight").setInteractive({ useHandCursor: true  });
		rulesRight.scaleX = 0.7;
		rulesRight.scaleY = 0.7;
		
		rulesRight.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        rulesRight.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		// rulesLeft
		const rulesLeft = this.add.image(1280/2 - 180, 195, "rulesLeft").setInteractive({ useHandCursor: true  });
		rulesLeft.scaleX = 0.7;
		rulesLeft.scaleY = 0.7;
		rulesLeft.setVisible(false);
		
		rulesLeft.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        rulesLeft.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		rulesLeft.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			ruleCount = ruleCount - 1;
			self.switchRules(titleRules, titleStart, titlePlace, titleGame, rulesLeft, rulesRight, ruleCount, rulesText, startText, placeText, gameText);
        });
		
		rulesRight.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			ruleCount = ruleCount + 1;
			self.switchRules(titleRules, titleStart, titlePlace, titleGame, rulesLeft, rulesRight, ruleCount, rulesText, startText, placeText, gameText);
        });
		
		// rulesBack
		const rulesBack = this.add.image(1280/2 - 415, 615, "optionsBack").setInteractive({ useHandCursor: true  });
		rulesBack.scaleX = 0.7;
		rulesBack.scaleY = 0.7;
		
		rulesBack.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        rulesBack.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		rulesBack.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			self.scene.start("Options");
        });

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
	
	switchRules(rules, start, place, game, buttonL, buttonR, count, rulesText, startText, placeText, gameText)
	{
		if (count === 0)
		{
			buttonL.setVisible(false);
			buttonR.setVisible(true);
			
			rules.setVisible(true);
			rulesText.setVisible(true);
			start.setVisible(false);
			startText.setVisible(false);
			place.setVisible(false);
			placeText.setVisible(false);
			game.setVisible(false);
			gameText.setVisible(false);
		}
		
		else if (count === 1)
		{
			buttonL.setVisible(true);
			buttonR.setVisible(true);
			
			rules.setVisible(false);
			rulesText.setVisible(false);
			start.setVisible(true);
			startText.setVisible(true);
			place.setVisible(false);
			placeText.setVisible(false);
			game.setVisible(false);
			gameText.setVisible(false);
		}
		
		else if (count === 2)
		{
			
			buttonL.setVisible(true);
			buttonR.setVisible(true);
			
			rules.setVisible(false);
			rulesText.setVisible(false);
			start.setVisible(false);
			startText.setVisible(false);
			place.setVisible(true);
			placeText.setVisible(true);
			game.setVisible(false);
			gameText.setVisible(false);
		}
		
		else if (count === 3)
		{
			buttonL.setVisible(true);
			buttonR.setVisible(false);
			
			rules.setVisible(false);
			rulesText.setVisible(false);
			start.setVisible(false);
			startText.setVisible(false);
			place.setVisible(false);
			placeText.setVisible(false);
			game.setVisible(true);
			gameText.setVisible(true);
		}
		
		else if (count > 3)
		{
			count = 3;
		}
		
		else if (count < 0)
		{
			count = 0;
		}
	}

	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
