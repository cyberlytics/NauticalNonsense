
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/start-asset-pack.json");
		this.load.audio("click", ["assets/sounds/click_1.mp3"]);
		this.load.audio("horn", ["assets/sounds/foghorn_3.mp3"]);
		this.load.image("nameInput", "assets/start/nameInput.png");
		this.load.image("matchInput", "assets/start/matchSelection.png");
		this.load.image("matchButton", "assets/start/matchSelectionbutton.png");
		this.load.image("background", "assets/0001.png");

	}

	/** @returns {void} */
	editorCreate() {
		
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

		// battleship
		const battleship = this.add.image(640, 360, "battleship_logo");
		battleship.scaleX = 0.7;
		battleship.scaleY = 0.71;

		// water
		const water = this.add.image(640, 440, "water_logo");
		water.scaleX = 0.6;
		water.scaleY = 0.5;

		// progressBar
		const progressBar = this.add.rectangle(750, 490, 256, 20);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(750, 490, 256, 20);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(550, 490, "", {});
		loadingText.setOrigin(0.5, 0.5);
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Start"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
