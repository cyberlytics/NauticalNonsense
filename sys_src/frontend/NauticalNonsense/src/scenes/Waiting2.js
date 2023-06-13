
// You can write more code here

/* START OF COMPILED CODE */

class Waiting2 extends Phaser.Scene 
{

	constructor() 
	{
		super("Waiting2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() 
	{
		var sharedData = this.game.sharedData;
		sharedData.ready = false;

		// Check WebSocket connection status
		if (sharedData.socket.readyState === WebSocket.OPEN) {
			console.log("WebSocket connection is open.");
		} else {
			console.log("WebSocket connection is not open.");
		}

		sharedData.socket.onMessage = function(event) {
			console.log("TESTING");
			var message = JSON.parse(event.data);
			if (message === "ready") {
				sharedData.ready = true;
			}
			console.log("Message received:", message)
		};

		const self = this;
		
		//sounds
		this.horn = this.sound.add("horn", {volume: 0.3});
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		
		//waitingBoard
		const waitingBoard = this.add.graphics();
		waitingBoard.lineStyle(5, 0xffffff);
		waitingBoard.fillStyle(0x3c3845, 1);
		waitingBoard.fillRoundedRect((1280-950)/2 + 2, 100, 950, 550, 50);
		
		// logo
		const logo = this.add.image(1280/2, 720/2 - 50, "wLogo").setInteractive({ useHandCursor: true  });
		logo.scaleX = 0.9;
		logo.scaleY = 0.9;
		
		logo.on('pointerdown', function (event)
        {
			self.playHorn();
        });
		console.log("ready? ", sharedData.ready)
		if (sharedData.ready) {
			console.log("test");
			self.switchScene();
		}
		

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
  		this.time.delayedCall(1000, function() 
		{
  			this.scene.start("Gameboard");
  		}, [], this);
	}
	/* END-USER-CODE */
	
}

/* END OF COMPILED CODE */

// You can write more code here
