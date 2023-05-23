
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
		
		//theme
		this.theme = this.sound.add("theme");
		
		var themeConfig = {
		
			mute: false,
			volume: 1,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
			
		}
		
		this.theme.play(themeConfig);
		
		//sounds
		this.click = this.sound.add("click");
		this.horn = this.sound.add("horn", {volume: 0.3});

		// logo
		const logo = this.add.image(640, 360, "logo").setInteractive({ useHandCursor: true  });
		logo.scaleX = 0.7;
		logo.scaleY = 0.7;
		
		logo.on('pointerdown', function (event)
        {

			self.playHorn();
		
        });

		// optionsButton
		const optionsButton = this.add.image(1100, 220, "optionsButton").setInteractive({ useHandCursor: true  });
		
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
		const nameInput = this.add.image(540, 550, "nameInput").setInteractive();
		const nameText = this.add.text(450, 540, "", {});
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
		const matchInput = this.add.image(540, 600, "matchInput");
		
		//matchButton
		const matchButton = this.add.image(687, 600, "matchButton").setInteractive({ useHandCursor: true  });

		// startButton
		const startButton = this.add.image(840, 575, "startButton").setInteractive({ useHandCursor: true  });
		
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
			self.scene.start("Level");
		
        });

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
