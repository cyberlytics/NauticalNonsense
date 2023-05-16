
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

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
