
// You can write more code here

/* START OF COMPILED CODE */

class Shipplacement extends Phaser.Scene 
{

	constructor() 
	{
		super("Shipplacement");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() 
	{
		
		const self = this;
		var isEnemyReady = false;
		var isPlayerReady = false;
		
		//sounds
		this.click = this.sound.add("click");
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		// opponentStatus
		const opponentStatus = this.add.image(1280/2 - 485, 150, "spOpponentStatus");
		opponentStatus.scaleX = 0.7;
		opponentStatus.scaleY = 0.7;
		
		// opponentStatusText
		const opponentStatusText = this.add.text(1280/2 - 485, 85, "", {});
		opponentStatusText.scaleX = 1;
		opponentStatusText.scaleY = 1;
		opponentStatusText.setOrigin(0.5, 0.5);
		opponentStatusText.text = "Opponent Status";
		opponentStatusText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// opponentStatusGreen
		const opponentStatusGreen = this.add.image(1280/2 - 426.5, 169.5, "spOpponentStatusGreen");
		opponentStatusGreen.scaleX = 0.7;
		opponentStatusGreen.scaleY = 0.7;
		
		// opponentStatusRed
		const opponentStatusRed = this.add.image(1280/2 - 544.5, 169.5, "spOpponentStatusRed");
		opponentStatusRed.scaleX = 0.7;
		opponentStatusRed.scaleY = 0.7;
		self.switchReady(opponentStatusRed, opponentStatusGreen, isEnemyReady);
		
		// buttonBox
		const buttonBox = this.add.image(1280/2 - 485, 720/2 + 30, "spButtonBox");
		buttonBox.scaleX = 0.7;
		buttonBox.scaleY = 0.7;
		
		// confirmButton
		const confirmButton = this.add.image(1280/2 - 485, 720/2 - 30, "spConfirmButton").setInteractive({ useHandCursor: true  });
		confirmButton.scaleX = 0.7;
		confirmButton.scaleY = 0.7;
		
		confirmButton.on('pointerover', function (event)
        {
            this.setTint(0x1ed013);
        });

        confirmButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		confirmButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			isPlayerReady = true;
			self.scene.start("Waiting2");
        });
		
		// confirmButtonText
		const confirmButtonText = this.add.text(1280/2 - 485, 720/2 - 30, "", {});
		confirmButtonText.scaleX = 1;
		confirmButtonText.scaleY = 1;
		confirmButtonText.setOrigin(0.5, 0.5);
		confirmButtonText.text = "Confirm";
		confirmButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// randomButton
		const randomButton = this.add.image(1280/2 - 485, 720/2 + 54, "spRandomButton").setInteractive({ useHandCursor: true  });
		randomButton.scaleX = 0.7;
		randomButton.scaleY = 0.7;
		
		randomButton.on('pointerover', function (event)
        {
            this.setTint(0xffd700);
        });

        randomButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		randomButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			isEnemyReady = true;
			self.switchReady(opponentStatusRed, opponentStatusGreen, isEnemyReady);
        });
		
		// randomButtonText
		const randomButtonText = this.add.text(1280/2 - 485, 720/2 + 54, "", {});
		randomButtonText.scaleX = 1;
		randomButtonText.scaleY = 1;
		randomButtonText.setOrigin(0.5, 0.5);
		randomButtonText.text = "Random";
		randomButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// resetButton
		const resetButton = this.add.image(1280/2 - 485, 720/2 + 115, "spResetButton").setInteractive({ useHandCursor: true  });
		resetButton.scaleX = 0.7;
		resetButton.scaleY = 0.7;
		
		resetButton.on('pointerover', function (event)
        {
            this.setTint(0xe50000);
        });

        resetButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		resetButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
        });
		
		// resetButtonText
		const resetButtonText = this.add.text(1280/2 - 485, 720/2 + 115, "", {});
		resetButtonText.scaleX = 1;
		resetButtonText.scaleY = 1;
		resetButtonText.setOrigin(0.5, 0.5);
		resetButtonText.text = "Reset";
		resetButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// battlefieldBackground
		const battlefieldBackground = this.add.image(1280/2, 720/2, "spBattlefieldBackground");
		battlefieldBackground.scaleX = 1;
		battlefieldBackground.scaleY = 1;
		
		// battlefieldBackgroundText
		const battlefieldBackgroundText = this.add.text(1280/2, 43, "", {});
		battlefieldBackgroundText.scaleX = 1;
		battlefieldBackgroundText.scaleY = 1;
		battlefieldBackgroundText.setOrigin(0.5, 0.5);
		battlefieldBackgroundText.text = "Battlefield";
		battlefieldBackgroundText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// fleetBox
		const fleetBox = this.add.image(1280/2 + 485, 720/2, "spFleetBox");
		fleetBox.scaleX = 0.9;
		fleetBox.scaleY = 0.9;
		
		// fleetBoxText
		const fleetBoxText = this.add.text(1280/2 + 485, 90, "", {});
		fleetBoxText.scaleX = 1;
		fleetBoxText.scaleY = 1;
		fleetBoxText.setOrigin(0.5, 0.5);
		fleetBoxText.text = "Fleet";
		fleetBoxText.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// carrierText
		const carrierText = this.add.text(1280/2 + 485, 130, "", {});
		carrierText.scaleX = 1;
		carrierText.scaleY = 1;
		carrierText.setOrigin(0.5, 0.5);
		carrierText.text = "Carrier";
		carrierText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// battleshipText
		const battleshipText = this.add.text(1280/2 + 485, 236, "", {});
		battleshipText.scaleX = 1;
		battleshipText.scaleY = 1;
		battleshipText.setOrigin(0.5, 0.5);
		battleshipText.text = "Battleship";
		battleshipText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// cruiserText
		const cruiserText = this.add.text(1280/2 + 485, 343, "", {});
		cruiserText.scaleX = 1;
		cruiserText.scaleY = 1;
		cruiserText.setOrigin(0.5, 0.5);
		cruiserText.text = "Cruiser";
		cruiserText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// destroyerText
		const destroyerText = this.add.text(1280/2 + 485, 450, "", {});
		destroyerText.scaleX = 1;
		destroyerText.scaleY = 1;
		destroyerText.setOrigin(0.5, 0.5);
		destroyerText.text = "Destroyer";
		destroyerText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// submarineText
		const submarineText = this.add.text(1280/2 + 485, 558, "", {});
		submarineText.scaleX = 1;
		submarineText.scaleY = 1;
		submarineText.setOrigin(0.5, 0.5);
		submarineText.text = "Submarine";
		submarineText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

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
	
	switchReady(red, green, s)
	{
		if (s)
		{
			red.clearTint();
			green.setTint(0x1ed013);
		}
		else
		{
			red.setTint(0xe50000);
			green.clearTint();
		}
	}

	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
