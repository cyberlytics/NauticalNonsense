
// You can write more code here

/* START OF COMPILED CODE */

class Credits extends Phaser.Scene 
{

	constructor() 
	{
		super("Credits");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() 
	{
		const self = this;
		
		//sounds
		this.click = this.sound.add("click");
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		// optionsBackground
		const optionsBackground = this.add.image(1280/2, 720/2, "optionsBackground");

		// title
		const title = this.add.text(1280/2, 95, "", {});
		title.scaleX = 1;
		title.scaleY = 1;
		title.setOrigin(0.5, 0.5);
		title.text = "Nautical Nonsense";
		title.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "50px" });
		
		// optionsBack
		const optionsBack = this.add.image(1280/2 - 245, 615, "optionsBack").setInteractive({ useHandCursor: true  });
		optionsBack.scaleX = 0.7;
		optionsBack.scaleY = 0.7;
		
		optionsBack.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        optionsBack.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		optionsBack.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			self.scene.start("Options");
        });
		
		// textTitle
		const textTitle = this.add.text(1280/2, 220, "", {});
		textTitle.scaleX = 1;
		textTitle.scaleY = 1;
		textTitle.setOrigin(0.5, 0.5);
		textTitle.text = "BDCC - Project Work\nSoSe 2023";
		textTitle.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "35px" });
		
		// text
		const text = this.add.text(1280/2, 425, "", {});
		text.scaleX = 1;
		text.scaleY = 1;
		text.setOrigin(0.5, 0.5);
		text.text = "Developers:\n\nJakob Götz\nUwe Kölbel\nMaximilian Schlosser\nOliver Schmidts\nJan Schuster\nPhilipp Seufert\nFabian Wagner";
		text.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "25px" });

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

	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
