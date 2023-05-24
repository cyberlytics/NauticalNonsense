
// You can write more code here

/* START OF COMPILED CODE */

class Start extends Phaser.Scene {

	constructor() {
		super("Start");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		
		const self = this;
		const backgroundColor = 0x3c3845
		
		//sounds
		this.click = this.sound.add("click");
		this.horn = this.sound.add("horn", {volume: 0.3});
		
		// background
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		//startBoard
		const startBoard = this.add.graphics();
		startBoard.lineStyle(5, 0xffffff);
		startBoard.fillStyle(backgroundColor, 1);
		startBoard.fillRoundedRect((1280-950)/2 + 2, 100, 950, 550, 50);

		// logo
		const logo = this.add.image(1280/2, 720/2 - 50, "logo").setInteractive({ useHandCursor: true  });
		logo.scaleX = 0.9;
		logo.scaleY = 0.9;
		
		logo.on('pointerdown', function (event)
        {

			self.playHorn();
		
        });

		// optionsButton
		const optionsButton = this.add.image(1280 - 50 - 20, 70, "optionsButton").setInteractive({ useHandCursor: true  });
		optionsButton.scaleX = 0.7;
		optionsButton.scaleY = 0.7;
		
		optionsButton.on('pointerover', function (event)
        {

            this.setTint(0x808080);

        });

        optionsButton.on('pointerout', function (event)
        {

            this.clearTint();

        });
		
		optionsButton.on('pointerdown', function (event)
        {

			this.clearTint();
			self.playClick();
			self.stopHorn();
			self.scene.start("Options");
		
        });
		
		//nameInput
		const nameInput = this.add.image(540, 545, "nameInput").setInteractive();
		nameInput.scaleX = 0.5;
		nameInput.scaleY = 0.5;
		
		//nameInputText
		const nameInputText = this.add.text(410, 545, "", {});
		nameInputText.scaleX = 1;
		nameInputText.scaleY = 1;
		nameInputText.setOrigin(0.5, 0.5);
		nameInputText.text = "Name";
		nameInputText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });
		
		const nameText = this.add.text(450, 535, "", {});
		nameText.setOrigin(0, 0);
		nameText.setStyle({"color": "#000000", "fontSize": "20px"});
		
		let name = "";
		
		nameInput.on('pointerover', function (event)
        {
			
			this.setTint(0x808080);

            self.input.keyboard.on('keydown', function (event)
			{
			
				const key = event.key;
				
				if (key.length === 1)
				{
					name += key;
					nameText.text = name;
				}
				
			});

        });
		
		nameInput.on('pointerout', function (event)
        {

            this.clearTint();

        });
		
		//matchInput
		const matchInput = this.add.image(540, 595, "matchInput");
		matchInput.scaleX = 0.5;
		matchInput.scaleY = 0.5;
		
		//matchInputText
		const matchInputText = this.add.text(410, 595, "", {});
		matchInputText.scaleX = 1;
		matchInputText.scaleY = 1;
		matchInputText.setOrigin(0.5, 0.5);
		matchInputText.text = "Match";
		matchInputText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });
		
		//matchButton
		const matchButton = this.add.image(687, 595, "matchButton").setInteractive({ useHandCursor: true  });
		matchButton.scaleX = 0.5;
		matchButton.scaleY = 0.5;
		
		matchButton.on('pointerover', function (event)
        {

            this.setTint(0x808080);

        });

        matchButton.on('pointerout', function (event)
        {

            this.clearTint();

        });

		// startButton
		const startButton = this.add.image(840, 570, "startButton").setInteractive({ useHandCursor: true  });
		startButton.scaleX = 0.5;
		startButton.scaleY = 0.5;
		
		startButton.on('pointerover', function (event)
        {

            this.setTint(0x1ed013);

        });

        startButton.on('pointerout', function (event)
        {

            this.clearTint();

        });
		
		startButton.on('pointerdown', function (event)
        {

			this.clearTint();
			self.stopHorn();
			self.playClick();
			self.scene.start("Gameboard");
		
        });
		
		//startButtonText
		const startButtonText = this.add.text(840, 570, "", {});
		startButtonText.scaleX = 1;
		startButtonText.scaleY = 1;
		startButtonText.setOrigin(0.5, 0.5);
		startButtonText.text = "Start";
		startButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "25px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
	}
	
	preload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
		this.load.pack("asset-pack", "assets/options-asset-pack.json");
		this.load.audio("clicksound", ["assets/select.mp3"]);
		this.load.image("0001", "assets/0001.png");
		
	}
	
	playClick() {
	
		this.click.play();
	
	}
	
	playHorn() {
	
		this.horn.play();
	
	}
	
	stopHorn() {
	
		this.horn.stop();
		
	}
	
	stopTheme() {
	
		this.theme.stop();
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
