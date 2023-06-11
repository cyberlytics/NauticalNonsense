
// You can write more code here

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const backgroundColor = 0x3c3845
const columnSpacing = 50;
const rowSpacing = 50;
const smallCornerRadius = 20
const tinyCornerRadius = 10
const tableBoardMargin = 30

const headingStyle = {
	fontSize: '20px',
	fill: '#ffffff'
};

const textStyle = {
	fontSize: '32px',
	fill: '#ffffff'
};

/* START OF COMPILED CODE */

class Leaderboard extends Phaser.Scene {

	constructor() {
		super("Leaderboard");

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// sound
		this.click = this.sound.add("click");

		// background
		this.background = this.add.image(0, 0, "0001");
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;
		this.background.setOrigin(0, 0);
		

		// homeButton
		this.homeButton = this.add.image(1280 - 50 - 20, 70, "homeButton").setInteractive({ useHandCursor: true  });
		this.homeButton.scaleX = 0.7;
		this.homeButton.scaleY = 0.7;

		this.homeButton.on('pointerover', function (event)
        {
            this.setTint(0x808080);
        });

        this.homeButton.on('pointerout', function (event)
        {
            this.clearTint();
        });
		
		this.homeButton.on('pointerdown', () => {
			this.playClick();
			this.scene.start('Start');
        });

		// backButton
		this.backButton = this.add.image(1280 - 50 - 20, 70 + 70, "backButton").setInteractive({ useHandCursor: true  });
		this.backButton.scaleX=0.7;
		this.backButton.scaleY=0.7;

		this.backButton.on('pointerover', function (event)
		{
			this.setTint(0x808080);
		});

		this.backButton.on('pointerout', function (event)
		{
			this.clearTint();
		});
		
		this.backButton.on('pointerdown', () => {
			this.playClick();
			this.scene.start('Options');
		});

		// dummy data
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
		
	
		var scrollablePanel = this.rexUI.add.scrollablePanel({
			x : 1270/2,
			y : 720/2,
			width : 700,
			height : 550,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY),

            panel: {
                child: createGrid(this),
                mask: {
                    mask: true,
                    padding: 1,
                }
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Header'),
            }),

            footer: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                text: this.add.text(0, 0, 'Footer'),
            }),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                header: 10,
                footer: 10,
            }
        })
            .layout()

        var print = this.add.text(0, 0, '');

		// Wake scene
		this.events.emit("scene-awake");
	}



	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
	}

	preload() {
		this.load.pack("asset-pack", "assets/leaderboard-asset-pack.json");
		this.load.audio("click", ["assets/sounds/click_1.mp3"]);
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	playClick() 
	{
		this.click.play();
	}

	update(){}

	/* END-USER-CODE */
}

// Generates data for scrollable list
var CreateContent = function (data) {
	let leaderboardString = '';
	data.forEach((player) => {
	leaderboardString += `${player.rank} \t ${player.name} \t ${player.shots}\n`;
	});
	return leaderboardString
}

async function fetchData(){
	try {
		const response = await fetch('http://localhost:8000/leaderboard');
		const data = await response.json();

		const result = [];
		const leaders = data.leadersHuman;
		leaders.forEach((leader, index) => {
			const { name, moves, rank } = leader;
			result.push(`${rank}`, `${name}`, `${moves}`);
		});

		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
(async () => {
	try {
	  const leadersResult = await fetchData();
	} catch (error) {
	  // Handle any error that occurred during the fetch operation
	  console.error(error);
	}
})();

var createGrid = function (scene) {
    // Create table body
	const humanResults = [];
	const promise = fetchData();
	console.log("Hello world 1");
    var sizer = scene.rexUI.add.fixWidthSizer({
        space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 0,
            line: 8,
        },
    })
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK))
		promise.then(result => {
			result.forEach((leader, index) => {
				humanResults.push(leader);
			});
		}).catch(error => {
			console.log(error);
		});


	console.log("humanResults outside : ");
	console.log(humanResults);
	for (let i = 0; i < 9; i++) {
		console.log("In for loop");
		console.log("humanResults inside : ");
		console.log(humanResults[i]);
		sizer.add(scene.rexUI.add.label({
		width: 210,
		height: 60,
		background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_LIGHT),
		text: scene.add.text(0, 0, `${humanResults[i]}`, { fontSize: 18 }),
		align: 'center',
		space: {
			left: 10,
			right: 10,
			top: 10,
			bottom: 10,
		}
		}));
	}

    return sizer;
}



/* END OF COMPILED CODE */

// You can write more code here
