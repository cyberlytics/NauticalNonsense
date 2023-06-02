
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
		titleStart.text = "Start";
		titleStart.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titleStart.setVisible(false);
		
		// titlePlace
		const titlePlace = this.add.text(1280/2, 195, "", {});
		titlePlace.scaleX = 1;
		titlePlace.scaleY = 1;
		titlePlace.setOrigin(0.5, 0.5);
		titlePlace.text = "Place Ships";
		titlePlace.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titlePlace.setVisible(false);
		
		// titleGame
		const titleGame = this.add.text(1280/2, 195, "", {});
		titleGame.scaleX = 1;
		titleGame.scaleY = 1;
		titleGame.setOrigin(0.5, 0.5);
		titleGame.text = "Gameboard";
		titleGame.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "30px" });
		titleGame.setVisible(false);
		
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
			self.switchRules(titleRules, titleStart, titlePlace, titleGame, rulesLeft, rulesRight, ruleCount);
        });
		
		rulesRight.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			ruleCount = ruleCount + 1;
			self.switchRules(titleRules, titleStart, titlePlace, titleGame, rulesLeft, rulesRight, ruleCount);
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
	
	switchRules(rules, start, place, game, buttonL, buttonR, count)
	{
		if (count === 0)
		{
			buttonL.setVisible(false);
			buttonR.setVisible(true);
			
			rules.setVisible(true);
			start.setVisible(false);
			place.setVisible(false);
			game.setVisible(false);
		}
		
		else if (count === 1)
		{
			buttonL.setVisible(true);
			buttonR.setVisible(true);
			
			rules.setVisible(false);
			start.setVisible(true);
			place.setVisible(false);
			game.setVisible(false);
		}
		
		else if (count === 2)
		{
			
			buttonL.setVisible(true);
			buttonR.setVisible(true);
			
			rules.setVisible(false);
			start.setVisible(false);
			place.setVisible(true);
			game.setVisible(false);
		}
		
		else if (count === 3)
		{
			buttonL.setVisible(true);
			buttonR.setVisible(false);
			
			rules.setVisible(false);
			start.setVisible(false);
			place.setVisible(false);
			game.setVisible(true);
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
