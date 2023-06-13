
// You can write more code here

/* START OF COMPILED CODE */

class Start extends Phaser.Scene {
	constructor() {
		super("Start");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	http_GET(url) {
		return fetch(url)
			.then(function (response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Network response was not ok.');
			})
			.then(function (data) {
				//.log("Data:", data);
				// Process the response data here
				return data;
			})
			.catch(function (error) {
				console.error('Fetch error:', error);
			});
	}
	//Commit Test 

	http_POST(url, uuid, friend, mode, playername) {
		var http_post_data = {
			client_id: uuid,
			mode: mode,
			friend: friend,
			playername: playername
		};
		console.log(http_post_data);
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(http_post_data),
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Network response was not ok.');
			})
			.then(responseData => {
				// Process the response data
				console.log(responseData);
			})
			.catch(error => {
				console.error('Fetch error:', error);
			});
	}




	/** @returns {void} */
	async editorCreate() {
		const self = this;

		// Usage example
		var sharedData = this.game.sharedData;
		const apiUrl = sharedData.backend_url;
		sharedData.client_id = await this.http_GET(apiUrl);
		sharedData.websocket_url += sharedData.client_id;

		const backgroundColor = 0x3c3845
		var isTypingName = false;
		var isTypingId = false;
		var showId = false;

		//sounds
		this.click = this.sound.add("click");
		this.horn = this.sound.add("horn", { volume: 0.3 });

		// background
		this.background = this.add.image(0, 0, 'background');
		this.background.setOrigin(0, 0);
		this.background.scaleX = 1.2;
		this.background.scaleY = 0.7;

		//startBoard
		const startBoard = this.add.graphics();
		startBoard.lineStyle(5, 0xffffff);
		startBoard.fillStyle(backgroundColor, 1);
		startBoard.fillRoundedRect((1280 - 950) / 2 + 2, 100, 950, 550, 50);

		// logo
		const logo = this.add.image(1280 / 2, 720 / 2 - 50, "logo").setInteractive({ useHandCursor: true });
		logo.scaleX = 0.9;
		logo.scaleY = 0.9;

		logo.on('pointerdown', function (event) {
			self.playHorn();
		});

		// optionsButton
		const optionsButton = this.add.image(1280 - 50 - 20, 70, "optionsButton").setInteractive({ useHandCursor: true });
		optionsButton.scaleX = 0.7;
		optionsButton.scaleY = 0.7;

		optionsButton.on('pointerover', function (event) {
			this.setTint(0x808080);
		});

		optionsButton.on('pointerout', function (event) {
			this.clearTint();
		});

		optionsButton.on('pointerdown', function (event) {
			this.clearTint();
			self.playClick();
			self.stopHorn();
			self.scene.start("Options");
		});

		//nameInput
		const nameInput = this.add.image(555, 545, "nameInput");
		nameInput.scaleX = 0.5;
		nameInput.scaleY = 0.5;

		//nameInputText
		const nameInputText = this.add.text(410, 545, "", {});
		nameInputText.setOrigin(0.5, 0.5);
		nameInputText.text = "Name";
		nameInputText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });

		//nameInputBox
		const nameInputBox = this.add.image(587, 545, "nameInputBox").setInteractive();
		nameInputBox.scaleX = 0.5;
		nameInputBox.scaleY = 0.5;

		nameInputBox.on('pointerover', function (event) {
			isTypingName = true;
			this.setTint(0x808080);
		});

		nameInputBox.on('pointerout', function (event) {
			isTypingName = false;
			this.clearTint();
		});

		//nameInputBoxText
		const nameInputBoxText = this.add.text(460, 535, '', {});
		nameInputBoxText.setOrigin(0, 0);
		nameInputBoxText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" })

		//matchInput
		const matchInput = this.add.image(555, 595, "matchInput");
		matchInput.scaleX = 0.5;
		matchInput.scaleY = 0.5;
		matchInput.setVisible(true);

		//matchInputFriend
		const matchInputFriend = this.add.image(473.5, 595, "matchInputFriend");
		matchInputFriend.scaleX = 0.5;
		matchInputFriend.scaleY = 0.5;
		matchInputFriend.setVisible(false);

		//matchInputText
		const matchInputText = this.add.text(410, 595, "", {});
		matchInputText.scaleX = 1;
		matchInputText.scaleY = 1;
		matchInputText.setOrigin(0.5, 0.5);
		matchInputText.text = "Match";
		matchInputText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });

		//matchSelectionText
		const matchSelectionText = this.add.text(460, 585, "", {});
		matchSelectionText.scaleX = 1;
		matchSelectionText.scaleY = 1;
		matchSelectionText.setOrigin(0, 0);
		matchSelectionText.text = "Random";
		matchSelectionText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });

		//idInput
		const idInput = this.add.image(656, 595, "idInput");
		idInput.scaleX = 0.5;
		idInput.scaleY = 0.5;
		idInput.setVisible(false);

		//idInputText
		const idInputText = this.add.text(613, 595, "", {});
		idInputText.scaleX = 1;
		idInputText.scaleY = 1;
		idInputText.setOrigin(0.5, 0.5);
		idInputText.text = "ID";
		idInputText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });
		idInputText.setVisible(false);

		//idInputBox
		const idInputBox = this.add.image(689, 595, "idInputBox").setInteractive();
		idInputBox.scaleX = 0.5;
		idInputBox.scaleY = 0.5;
		idInputBox.setVisible(false);

		idInputBox.on('pointerover', function (event) {
			isTypingId = true;
			this.setTint(0x808080);
		});

		idInputBox.on('pointerout', function (event) {
			isTypingId = false;
			this.clearTint();
		});

		// Handle keyboard events
		this.input.keyboard.on('keydown', function (event) {
			if (isTypingName) {
				if (event.key === 'Enter') {
					isTypingName = false;
					nameInputBox.clearTint();
				}
				else if (event.key === 'Backspace') {
					nameInputBoxText.text = nameInputBoxText.text.slice(0, -1);
				}
				else if (event.key.length === 1) {
					if (nameInputBoxText.text.length < 19) {
						nameInputBoxText.text += event.key;
					}
				}
			}

			else if (isTypingId) {
				if (event.key === 'Enter') {
					isTypingId = false;
					idInputBox.clearTint();
				}
				else if (event.key === 'Backspace') {
					idInputBoxText.text = idInputBoxText.text.slice(0, -1);
				}
				else if (event.key.length === 1) {
					if (idInputBoxText.text.length < 6) {
						idInputBoxText.text += event.key;
					}
				}
			}
		});

		//idInputBoxText
		const idInputBoxText = this.add.text(660, 585, '', {});
		idInputBoxText.setOrigin(0, 0);
		idInputBoxText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });
		idInputBoxText.setVisible(false);

		//matchCompareText
		const matchCompareText = this.add.text(460, 585, "", {});
		matchCompareText.scaleX = 1;
		matchCompareText.scaleY = 1;
		matchCompareText.setOrigin(0, 0);
		matchCompareText.setVisible(false);
		matchCompareText.text = "Friend";
		matchCompareText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "15px" });

		//matchButton
		const matchButton = this.add.image(719, 595, "matchButton").setInteractive({ useHandCursor: true });
		matchButton.scaleX = 0.5;
		matchButton.scaleY = 0.5;

		//matchDropdown
		const matchDropdown = new DropdownMenu(this, 450, 596, ['Random', 'Friend', 'A.I.'], matchButton, selectedOption => {
			matchSelectionText.text = selectedOption;

			if (matchSelectionText.text === matchCompareText.text) {
				showId = true;
				this.matchFriend(matchInput, matchInputFriend, showId, matchButton, idInput, idInputText, idInputBox, idInputBoxText);
			}

			else {
				showId = false;
				this.matchFriend(matchInput, matchInputFriend, showId, matchButton, idInput, idInputText, idInputBox, idInputBoxText);
			}


		});

		// startButton
		const startButton = this.add.image(840, 570, "startButton").setInteractive({ useHandCursor: true });
		startButton.scaleX = 0.5;
		startButton.scaleY = 0.5;

		startButton.on('pointerover', function (event) {
			if ((nameInputBoxText.text.length !== 0) && (showId === false)) {
				this.setTint(0x1ed013);
			}

			else if ((nameInputBoxText.text.length !== 0) && (showId === true) && (idInputBoxText.text.length !== 0)) {
				this.setTint(0x1ed013);
			}

			else {
				this.setTint(0xe50000);
			}

		});

		startButton.on('pointerout', function (event) {
			this.clearTint();
		});

		startButton.on('pointerdown', function (event) {
			sharedData.playername = nameInputBoxText.text;
			if ((nameInputBoxText.text.length !== 0) && (showId === false)) {
				this.clearTint();
				self.stopHorn();
				self.playClick();
				var ready = self.http_POST(apiUrl + "/play", sharedData.client_id, null, "random", sharedData.playername);
				sharedData.socket = new WebSocket(sharedData.websocket_url);
				// Listen for WebSocket events
				sharedData.socket.onopen = function () {
					console.log('WebSocket connection established');
					// Perform any necessary actions when the connection is successfully established
				};

				sharedData.socket.onerror = function (error) {
					console.error('WebSocket error:', error);
					// Handle any errors that occur during the WebSocket connection
				};
				self.scene.start("Waiting");
			}

			else if ((nameInputBoxText.text.length !== 0) && (showId === true) && (idInputBoxText.text.length !== 0)) {
				this.clearTint();
				self.stopHorn();
				self.playClick();
				console.log(self.http_POST(apiUrl + "/play", sharedData.client_id, idInputBoxText.text, "against_friend", sharedData.playername));
				self.scene.start("Waiting");
			}
		});


		//startButtonText
		const startButtonText = this.add.text(840, 570, "", {});
		startButtonText.scaleX = 1;
		startButtonText.scaleY = 1;
		startButtonText.setOrigin(0.5, 0.5);
		startButtonText.text = "Start";
		startButtonText.setStyle({ "align": "center", "color": "#000000", "fontFamily": "GodOfWar", "fontSize": "25px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
	}

	preload() {
		this.load.pack("asset-pack", "assets/asset-pack.json");
		this.load.pack("asset-pack", "assets/options-asset-pack.json");
		this.load.audio("clicksound", ["assets/select.mp3"]);
		this.load.image("0001", "assets/0001.png");
		this.load.image("optionsBackground", "assets/options/background.png");
		this.load.image("optionsBack", "assets/options/backButton.png");
		this.load.image("optionsButtons", "assets/options/button.png");
		this.load.image("optionsMute", "assets/options/muteButton.png");
		this.load.image("optionsUnmute", "assets/options/unmuteButton.png");
	}

	playClick() {
		this.click.play();
	}

	playHorn() {
		this.horn.play();
	}

	stopHorn() {
		this.horn.stop();
	}

	stopTheme() {
		this.theme.stop();
	}

	matchFriend(i, f, s, button, idin, idint, idinb, idinbt) {
		i.setVisible(!s);
		f.setVisible(s);

		idin.setVisible(s);
		idint.setVisible(s);
		idinb.setVisible(s);
		idinbt.setVisible(s);

		if (s) {
			button.x = 555;
			button.y = 595;
		}

		else {
			button.x = 719;
			button.y = 595;
		}

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

//dropdown menu class
class DropdownMenu {
	constructor(scene, x, y, options, button, onSelect) {
		this.scene = scene;
		this.x = x;
		this.y = y;
		this.options = options;
		this.button = button;
		this.onSelect = onSelect;

		this.isOpen = false;
		this.currentOptionIndex = 0;

		this.createMenu();
	}

	createMenu(button) {
		const style = {
			fontFamily: 'GodOfWar',
			fontSize: '15px',
			fill: '#000000',
			backgroundColor: '#ffffff',
			padding: {
				left: 10,
				right: 10,
				top: 0,
				bottom: 0
			}
		};

		this.button.on('pointerdown', () => {
			this.toggleMenu();
		});

		this.button.on('pointerover', function (event) {
			this.setTint(0x808080);
		});

		this.button.on('pointerout', function (event) {
			this.clearTint();
		});

		//menu options
		this.optionTexts = [];
		this.options.forEach((option, index) => {
			const optionText = this.scene.add.text(this.x, this.y + 20 * (index + 1), option, style).setInteractive();
			optionText.on('pointerdown', () => {
				this.selectOption(index);
			});

			//option background color
			optionText.setOrigin(0);
			optionText.background = this.scene.add.graphics()
				.setVisible(false)
				.fillStyle(0xffffff)
				.fillRect(optionText.x - style.padding.left, optionText.y - style.padding.top, optionText.width + style.padding.left + style.padding.right, optionText.height + style.padding.top + style.padding.bottom);

			optionText.on('pointerover', () => {
				optionText.setTint(0x808080);
			});

			optionText.on('pointerout', () => {
				optionText.clearTint();
			});

			this.optionTexts.push(optionText);
		});

		//hide menu initially
		this.hideMenu();
	}

	toggleMenu() {
		if (this.isOpen) {
			this.hideMenu();
		}
		else {
			this.showMenu();
		}
	}

	showMenu() {
		this.optionTexts.forEach(optionText => optionText.setVisible(true));
		this.isOpen = true;
	}

	hideMenu() {
		this.optionTexts.forEach(optionText => optionText.setVisible(false));
		this.isOpen = false;
	}

	selectOption(index) {
		this.currentOptionIndex = index;
		this.onSelect(this.options[index]);
		this.hideMenu();
	}

}
