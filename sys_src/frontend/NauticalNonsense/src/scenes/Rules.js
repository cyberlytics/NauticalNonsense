
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
		
		//sounds
		this.click = this.sound.add("click");
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		// rulesBackground
		const rulesBackground = this.add.image(1280/2, 720/2, "optionsBackground");

		// title
		const title = this.add.text(1280/2, 95, "", {});
		title.scaleX = 1;
		title.scaleY = 1;
		title.setOrigin(0.5, 0.5);
		title.text = "How To Play";
		title.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "50px" });
		
		// rulesBack
		const rulesBack = this.add.image(1280/2 - 245, 615, "optionsBack").setInteractive({ useHandCursor: true  });
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

	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
