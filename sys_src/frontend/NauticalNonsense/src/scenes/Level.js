
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		
		// image_1
		const image_1 = this.add.image(647, 361, "0001");
		image_1.scaleX = 1.2;
		image_1.scaleY = 0.7;

		// dino
		const dino = this.add.image(640, 367, "submarine");
		dino.angle = 90;

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(dino);

		// pushActionScript
		new PushActionScript(onPointerDownScript);

		// text_1
		const text_1 = this.add.text(647, 121, "", {});
		text_1.scaleX = 1.5;
		text_1.scaleY = 1.5;
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Nautical Nonsense";
		text_1.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "50px" });
		
		// add clicksound
		this.clickSound = this.sound.add('clicksound');

		// startbutton
		const startbutton = this.add.image(900, 550, "startbutton");
		startbutton.setInteractive();
		startbutton.on("pointerdown", () => {
			this.clickSound.play();
			this.scene.start('Gameboard');
		})



		// Create a button sprite
		var button = this.add.sprite(50, 650, 'button');

		// Set interactive to true to enable input events
		button.setInteractive();
	 
		// Add a pointerdown event listener to the button
		button.on('pointerdown', ButtonClicked.bind(this));

		this.textField = this.add.text(50, 500, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' });
		this.textField.text = 'Hello, Phaser!';

		this.events.emit("scene-awake");
	}
	
	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
		this.client = new Client(this.textField);
    	this.client.openConnection();
	}
	/* END-USER-CODE */
}


function ButtonClicked() {
	this.client.ws.send(JSON.stringify("Das ist eine Nachricht von Frontend"))
    console.log("ButtonClicked aufgerufen!")
}

function Client(textField) {
	this.textField = textField;
}
Client.prototype.openConnection = function() {
    this.ws = new WebSocket("ws://localhost:8000/ws/12");
    this.connected = false;
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.displayError.bind(this);
    this.ws.onopen = this.connectionOpen.bind(this);
};

Client.prototype.connectionOpen = function() {
    this.connected = true;
};

Client.prototype.onMessage = function(message) {
	// Assuming the received message is a string
	const receivedMessage = JSON.parse(message.data);

	// Update the text field with the received message
	this.textField.text =  receivedMessage["message received in the backend"];
};

Client.prototype.displayError = function(err) {
    console.log('Websocketerror: ' + err);
};

/* END OF COMPILED CODE */

// You can write more code here
