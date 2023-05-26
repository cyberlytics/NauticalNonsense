
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
		this.load.image("nameInputBox", "assets/start/nameInputBox.png");
		this.load.image("matchInput", "assets/start/matchSelection.png");
		this.load.image("matchButton", "assets/start/matchSelectionbutton.png");
		this.load.image("background", "assets/0001.png");
		this.load.image("matchInputFriend", "assets/start/matchSelectionFriend.png");
		this.load.image("idInput", "assets/start/IdInput.png");
		this.load.image("idInputBox", "assets/start/IdInputBox.png");

	}

	/** @returns {void} */
	editorCreate() {
		
		const backgroundColor = 0x3c3845
		
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
		
		// background
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		//preloadBoard
		const preloadBoard = this.add.graphics();
		preloadBoard.lineStyle(5, 0xffffff);
		preloadBoard.fillStyle(backgroundColor, 1);
		preloadBoard.fillRoundedRect((1280-950)/2 + 2, 100, 950, 450, 50);
		
		//logo
		const logo = this.add.image(1280/2, 720/2 - 50, "logo");
		logo.scaleX = 0.9;
		logo.scaleY = 0.9;

		// progressBar
		const progressBar = this.add.rectangle(750, 520, 256, 20);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(750, 520, 256, 20);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(550, 520, "", {});
		loadingText.setOrigin(0.5, 0.5);
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "GodofWar", "fontSize": "20px" });

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
