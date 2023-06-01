
// You can write more code here

/* START OF COMPILED CODE */

class Options extends Phaser.Scene 
{

	constructor() 
	{
		super("Options");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() 
	{
		
		const self = this;
		var isMute = false;
		
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
		title.text = "Options";
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
			self.scene.start("Start");
        });
		
		// optionsMute
		const optionsMute = this.add.image(1280/2 + 245, 200, "optionsMute").setInteractive({ useHandCursor: true  });
		optionsMute.scaleX = 0.7;
		optionsMute.scaleY = 0.7;
		optionsMute.setVisible(true);
		
		optionsMute.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        optionsMute.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		// optionsUnmute
		const optionsUnmute = this.add.image(1280/2 + 244, 199, "optionsUnmute").setInteractive({ useHandCursor: true  });
		optionsUnmute.scaleX = 0.7;
		optionsUnmute.scaleY = 0.7;
		optionsUnmute.setVisible(false);
		
		optionsUnmute.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        optionsUnmute.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		optionsMute.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			isMute = false;
			self.switchAudio(optionsMute, optionsUnmute, isMute);
			self.muteAudio();
        });
		
		optionsUnmute.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			isMute = true;
			self.switchAudio(optionsMute, optionsUnmute, isMute);
			self.unmuteAudio();
        });
		
		// leaderboardButton
		const leaderboardButton = this.add.image(1280/2, 250, "optionsButtons").setInteractive({ useHandCursor: true  });
		leaderboardButton.scaleX = 0.7;
		leaderboardButton.scaleY = 0.7;
		
		leaderboardButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        leaderboardButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		leaderboardButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			self.scene.start("Leaderboard");
        });
		
		// leaderboardText
		const leaderboardText = this.add.text(1280/2, 250, "", {});
		leaderboardText.scaleX = 1;
		leaderboardText.scaleY = 1;
		leaderboardText.setOrigin(0.5, 0.5);
		leaderboardText.text = "Leaderboard";
		leaderboardText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// statisticsButton
		const statisticsButton = this.add.image(1280/2, 350, "optionsButtons").setInteractive({ useHandCursor: true  });
		statisticsButton.scaleX = 0.7;
		statisticsButton.scaleY = 0.7;
		
		statisticsButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        statisticsButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		statisticsButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			//self.scene.start("");
        });
		
		// statisticsText
		const statisticsText = this.add.text(1280/2, 350, "", {});
		statisticsText.scaleX = 1;
		statisticsText.scaleY = 1;
		statisticsText.setOrigin(0.5, 0.5);
		statisticsText.text = "Statistics";
		statisticsText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// rulesButton
		const rulesButton = this.add.image(1280/2, 450, "optionsButtons").setInteractive({ useHandCursor: true  });
		rulesButton.scaleX = 0.7;
		rulesButton.scaleY = 0.7;
		
		rulesButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        rulesButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		rulesButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			//self.scene.start("");
        });
		
		// rulesText
		const rulesText = this.add.text(1280/2, 450, "", {});
		rulesText.scaleX = 1;
		rulesText.scaleY = 1;
		rulesText.setOrigin(0.5, 0.5);
		rulesText.text = "How To Play";
		rulesText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });
		
		// creditsButton
		const creditsButton = this.add.image(1280/2, 550, "optionsButtons").setInteractive({ useHandCursor: true  });
		creditsButton.scaleX = 0.7;
		creditsButton.scaleY = 0.7;
		
		creditsButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        creditsButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		creditsButton.on('pointerdown', function (event)
        {
			self.playClick();
			this.clearTint();
			self.scene.start("Credits");
        });
		
		// creditsText
		const creditsText = this.add.text(1280/2, 550, "", {});
		creditsText.scaleX = 1;
		creditsText.scaleY = 1;
		creditsText.setOrigin(0.5, 0.5);
		creditsText.text = "Credits";
		creditsText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "20px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() 
	{

		this.editorCreate();
	}
	
	muteAudio() 
	{
		this.sound.sounds.forEach(function(sound)
		{
			sound.setVolume(0);
		});
	}

	unmuteAudio()
	{
		this.sound.sounds.forEach(function(sound)
		{
			sound.setVolume(1);
		});
	}
	
	switchAudio(m, u, s)
	{
		m.setVisible(s);
		u.setVisible(!s);
	}
	
	playClick() 
	{
		this.click.play();
	}

	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
