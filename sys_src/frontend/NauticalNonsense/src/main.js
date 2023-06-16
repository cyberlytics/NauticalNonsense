var game;
window.addEventListener('load', function () {

	game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.sharedData = {
		backend_url:"http://localhost:8000",
		websocket_url:"ws://localhost:8000/ws/",
		playername:"",
		client_id:"",
		game_id:"",
		sprites:[],
		highlightedCells:[],
		socket: null, // Initially set to null
		ready: false,
		ship_placement_ready : false,
		its_your_turn : false
	};

	game.scene.add("Preload", Preload);
	game.scene.add("Start", Start);
	game.scene.add("Waiting", Waiting);
	game.scene.add("Shipplacement", Shipplacement);
	game.scene.add("Waiting2", Waiting2);
	game.scene.add("Options", Options);
	game.scene.add("Rules", Rules);
	game.scene.add("Credits", Credits);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
	game.scene.add("Gameboard", Gameboard);
	game.scene.add("Leaderboard", Leaderboard);
	game.scene.add("Statistics", Statistics);
	game.scene.add("Gameover", Gameover);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.image('button', 'assets/button.png');
		this.load.audio("theme", ["assets/sounds/NauticalNonsense_soundtrack.mp3"]);
		this.load.image("background", "assets/0001.png");
		this.load.image("logo", "assets/start/logo.png");
	}

	create() {

		this.scene.start("Preload");
	}
}