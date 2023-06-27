
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
		this.load.pack("leaderboard-asset-pack", "assets/leaderboard-asset-pack.json");
		this.load.audio("click", ["assets/sounds/click_1.mp3"]);
		this.load.audio("horn", ["assets/sounds/foghorn_3.mp3"]);
		this.load.image("nameInput", "assets/start/nameInput.png");
		this.load.image("nameInputBox", "assets/start/nameInputBox.png");
		this.load.image("matchInput", "assets/start/matchSelection.png");
		this.load.image("matchButton", "assets/start/matchSelectionbutton.png");
		this.load.image("background", "assets/0001.png");
		this.load.image("matchInputFriend", "assets/start/matchSelectionFriend.png");
		this.load.image("friendInputBox", "assets/start/friendInputBox.png");
		this.load.image("rulesBackground", "assets/rules/rulesBackground.png");
		this.load.image("rulesRight", "assets/rules/buttonRight.png");
		this.load.image("rulesLeft", "assets/rules/buttonLeft.png");
		this.load.image("spBattlefieldBackground", "assets/shipplacement/battlefieldBackground.png");
		this.load.image("spButtonBox", "assets/shipplacement/buttonBox.png");
		this.load.image("spConfirmButton", "assets/shipplacement/confirmButton.png");
		this.load.image("spFleetBox", "assets/shipplacement/fleetBox.png");
		this.load.image("spOpponentStatus", "assets/shipplacement/opponentStatus.png");
		this.load.image("spOpponentStatusGreen", "assets/shipplacement/opponentStatusGreen.png");
		this.load.image("spOpponentStatusRed", "assets/shipplacement/opponentStatusRed.png");
		this.load.image("spRandomButton", "assets/shipplacement/randomButton.png");
		this.load.image("spResetButton", "assets/shipplacement/resetButton.png");
		this.load.image("wLogo", "assets/waiting/waiting.png");
		this.load.image("battleship", "assets/ships/battleship/battleship_2.png");
		this.load.image("carrier", "assets/ships/carrier/carrier_2.png");
		this.load.image("cruiser", "assets/ships/cruiser/cruiser_2.png");
		this.load.image("destroyer", "assets/ships/destroyer/destroyer_2.png");
		this.load.image("submarine", "assets/ships/submarine/submarine_2.png");
		this.load.image("gbButtonBox", "assets/gameboard/buttonBox.png");
		this.load.image("gbCapitulateButton", "assets/gameboard/capitulateButton.png");
		this.load.image("gbCrosshair", "assets/gameboard/crosshair.png");
		this.load.image("gbFireButton", "assets/gameboard/fireButton.png");
		this.load.image("gbFireControl", "assets/gameboard/fireControl.png");
		this.load.image("gbOpponentLamp", "assets/gameboard/opponentLamp.png");
		this.load.image("gbReadyLamp", "assets/gameboard/readyLamp.png");
		this.load.image("gbRedCross", "assets/gameboard/redCross.png");
		this.load.image("gbExplosionStar", "assets/gameboard/explosionStar.png");
		this.load.image("goBackground", "assets/gameover/background.png");
		this.load.image("goExitWin", "assets/gameover/exitWin.png");
		this.load.image("goExitLose", "assets/gameover/exitLose.png");
		this.load.pack("asset-pack", "assets/asset-pack.json");
		this.load.pack("asset-pack", "assets/options-asset-pack.json");
		this.load.audio("clicksound", ["assets/select.mp3"]);
		this.load.image("0001", "assets/0001.png");
		this.load.image("optionsBackground", "assets/options/background.png");
		this.load.image("optionsBack", "assets/options/backButton.png");
		this.load.image("optionsButtons", "assets/options/button.png");
		this.load.image("optionsMute", "assets/options/muteButton.png");
		this.load.image("optionsUnmute", "assets/options/unmuteButton.png");
		this.load.multiatlas('waterAnim', 'assets/water/water.json', 'assets/water');

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
