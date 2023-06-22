
// You can write more code here

/* START OF COMPILED CODE */

class Waiting2 extends Phaser.Scene {

	constructor() {
		super("Waiting2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		var sharedData = this.game.sharedData;
		const self = this;

		if (sharedData.ship_placement_ready) {
			self.switchScene();
		}

		sharedData.socket.onmessage = function (event) {
			console.log("Received message:", event.data);
			var message = JSON.parse(event.data)['message'];
			console.log("Parsed message:", message);
			if (message.message[1] === sharedData.client_id) {
				console.log("its your turn!")
				sharedData.its_your_turn = true;
			}
			if (message.message[0] === "ship_placement_ready") {
				console.log("ship_placement_ready!")
				sharedData.ship_placement_ready = true;
				self.switchScene()
			}
		};

		//sounds
		this.horn = this.sound.add("horn", { volume: 0.3 });

		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		//waitingBoard
		const waitingBoard = this.add.graphics();
		waitingBoard.lineStyle(5, 0xffffff);
		waitingBoard.fillStyle(0x3c3845, 1);
		waitingBoard.fillRoundedRect((1280 - 950) / 2 + 2, 100, 950, 550, 50);

		// logo
		const logo = this.add.image(1280 / 2, 720 / 2 - 50, "wLogo").setInteractive({ useHandCursor: true });
		logo.scaleX = 0.9;
		logo.scaleY = 0.9;

		logo.on('pointerdown', function (event) {
			self.playHorn();
		});
		
		// waterAnimation
		var water = this.add.sprite(295, 565, 'waterAnim', '0001.png');
    	water.setScale(1, 0.5);
		
		var water1 = this.add.sprite(395, 565, 'waterAnim', '0001.png');
    	water1.setScale(1, 0.5);
		
		var water2 = this.add.sprite(495, 565, 'waterAnim', '0001.png');
    	water2.setScale(1, 0.5);
		
		var water3 = this.add.sprite(595, 565, 'waterAnim', '0001.png');
    	water3.setScale(1, 0.5);
		
		var water4 = this.add.sprite(695, 565, 'waterAnim', '0001.png');
    	water4.setScale(1, 0.5);
		
		var water5 = this.add.sprite(795, 565, 'waterAnim', '0001.png');
    	water5.setScale(1, 0.5);
		
		var water6 = this.add.sprite(895, 565, 'waterAnim', '0001.png');
    	water6.setScale(1, 0.5);
		
		var water7 = this.add.sprite(995, 565, 'waterAnim', '0001.png');
    	water7.setScale(1, 0.5);
		
		var frameNames = this.anims.generateFrameNames('waterAnim', {
                     start: 1, end: 250, zeroPad: 4,
                     prefix: '', suffix: '.png'
                 });
		
		this.anims.create({ key: 'wave', frames: frameNames, frameRate: 25, repeat: -1 });
		
		// play animations
    	water.anims.play('wave');
		water1.anims.play('wave');
		water2.anims.play('wave');
		water3.anims.play('wave');
		water4.anims.play('wave');
		water5.anims.play('wave');
		water6.anims.play('wave');
		water7.anims.play('wave');

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() 
	{

		this.editorCreate();
	}

	playHorn() 
	{
		this.horn.play();
	}

	stopHorn() 
	{
		this.horn.stop();
	}

	switchScene() 
	{
		this.scene.start("Gameboard");
	}
	/* END-USER-CODE */

}

/* END OF COMPILED CODE */

// You can write more code here
