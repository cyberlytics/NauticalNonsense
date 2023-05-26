window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Start", Start);
	game.scene.add("Options", Options);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
	game.scene.add("Gameboard", Gameboard);
	game.scene.add("Dashboard", Dashboard);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.image('button', 'assets/button.png');
		this.load.audio("theme", ["assets/sounds/NauticalNonsense_soundtrack.mp3"]);
	}

	create() {

		this.scene.start("Preload");
	}
}