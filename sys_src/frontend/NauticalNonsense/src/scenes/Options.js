
// You can write more code here

/* START OF COMPILED CODE */

class Options extends Phaser.Scene {

	constructor() {
		super("Options");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		
		// background
		this.background = this.add.image(0, 0, '0001');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		// title
		const title = this.add.text(647, 121, "", {});
		title.scaleX = 1;
		title.scaleY = 1;
		title.setOrigin(0.5, 0.5);
		title.text = "Nautical Nonsense \n Options";
		title.setStyle({ "align": "center", "color": "#ffffffff", "fontFamily": "GodOfWar", "fontSize": "50px" });

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
