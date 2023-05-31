
// You can write more code here

/* START OF COMPILED CODE */

class Leaderboard extends Phaser.Scene {

	constructor() {
		super("Leaderboard");

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.background = this.add.image(0, 0, "0001");
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		this.background.setOrigin(0, 0);

		// homeButton
		this.homeButton = this.add.image(1100, 220, "homeButton").setInteractive({ useHandCursor: true  });

		this.homeButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        this.homeButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		this.homeButton.on('pointerdown', () => {
			this.scene.start('Start');
        });


		// Leaderboard
		
		/*
		Hier HTTP Request schicken um die Anfrage an die REST Schittstelle zu machen

		--> function.onload()

		Nicht vergessen request auch senden ;)
		*/


		// Folgender Teil nicht wirklich funktionell, überprüfen wie das mit der DB Anbindung funktioniert
		/*
		const MongoClient = require('mongodb').MongoClient;
		const url = 'mongodb+srv://nn_user:nn_bsyjntss@nauticalnonsens.lflmzfg.mongodb.net/?retryWrites=true&w=majority';
		const dbName = 'NauticalNonsens'; // Replace with your database name
		const options = { useNewUrlParser: true, useUnifiedTopology: true };

		MongoClient.connect(url, options, function(err, client) {
			if (err) {
			  console.error('Error occurred while connecting to MongoDB:', err);
			  return;
			}
		  
			console.log('Connected successfully to MongoDB');
		  
			const db = client.db(dbName);
			const collection = db.collection('leaderboard'); // Replace with your collection name
		  
			collection.find({}).toArray(function(err, documents) {
				if (err) {
				  console.error('Error occurred while reading documents:', err);
				  return;
				}
			  
				console.log('Found', documents.length, 'documents');
				
				// Iterate over the retrieved documents
				documents.forEach(function(document) {
				  console.log(document);
				});
			  });
		  
			client.close(); // Close the connection when finished
		  });
		*/ 
		const leaderboardData = [
			{ rank: 1, name: 'Player 1', shots: 10 },
			{ rank: 2, name: 'Player 2', shots: 20 },
			{ rank: 3, name: 'Player 3', shots: 30 },
			{ rank: 4, name: 'Player 4', shots: 40 },
			{ rank: 5, name: 'Player 5', shots: 50 },
			{ rank: 6, name: 'Player 6', shots: 60 },
			{ rank: 7, name: 'Player 7', shots: 70 },
			{ rank: 8, name: 'Player 8', shots: 80 },
			{ rank: 9, name: 'Player 9', shots: 90 },
			{ rank: 10, name: 'Player 10', shots: 100 },
		];
	  
		// Create a text style for the table
		const headingStyle = {
			fontSize: '20px',
			fill: '#ffffff'
		};

		const textStyle = {
			fontSize: '32px',
			fill: '#ffffff'
		};

		const columnSpacing = 50;
		const rowSpacing = 50;
		const backgroundColor = 0x3c3845
		const smallCornerRadius = 20
		const tinyCornerRadius = 10
		const tableBoardMargin = 30

		const tableBoardPos = {
			x : 200,
			y : 100,
			width : 700,
			height : 550,
			cornerRadius : smallCornerRadius
		}

		this.tableBoard = this.add.graphics();
		this.tableBoard.fillStyle(backgroundColor, 1);
		this.tableBoard.fillRoundedRect(tableBoardPos.x-tableBoardPos.cornerRadius, tableBoardPos.y - tableBoardPos.cornerRadius, 
										tableBoardPos.width+2*tableBoardPos.cornerRadius, tableBoardPos.height+2*tableBoardPos.cornerRadius, 20);
	
		// Add table headers
		this.add.text(tableBoardPos.x + tableBoardMargin, tableBoardPos.y, 'RANK', headingStyle);
		this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 2, tableBoardPos.y, 'NAME', headingStyle);
		this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 10, tableBoardPos.y, 'SHOTS', headingStyle);
	
		// Add leaderboard entries
		leaderboardData.forEach((entry, index) => {
			const rowY = tableBoardPos.y + (index + 1) * rowSpacing;
			this.add.text(tableBoardPos.x + tableBoardMargin, rowY, entry.rank, textStyle);
			this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 2, rowY, entry.name, textStyle);
			this.add.text(tableBoardPos.x + tableBoardMargin + columnSpacing * 10, rowY, entry.shots, textStyle);
		});




		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
	}

	preload() {
		this.load.pack("asset-pack", "assets/leaderboard-asset-pack.json");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
