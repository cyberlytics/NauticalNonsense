describe('Test for Options Scene', () => {
    let game;
    beforeEach(() => {
        cy.viewport(1280, 720)
        // cy.visit('http://localhost:5500/sys_src/frontend/NauticalNonsense/public/index.html');
        // cy.visit('localhost:3000/'); // when using live server
        cy.visit('localhost:8080/'); // when using docker 
        cy.wait(10000);
        cy.window().then((win) => {
            game = win.game;
        });
    });

    it('Checks if index.html is reachable and the canvas gets displayed', () => {
        cy.get('canvas').should('be.visible');
    });
    it('Check if transition to Optionsscene is possible', () => {
        // check for the start scene
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click the options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80);
        cy.log('clicked options button');
        cy.wait(1000).then(() => {
            cy.window().then((win) => {
                game = win.game;
                game.scene.dump();
                cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
                cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.true;
            });
        });
    });


    // Mutebutton already testet in main_menu.cy.js

    // Transition to Leaderboard already testet in leaderboard.cy.js

    it('Check if back button is working', () => {
        // check for the start scene
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click the options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80);
        cy.log('clicked options button');
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                // click back button
                cy.get('canvas').click(1280 / 2 - 245, 615);
                cy.log('clicked back button');
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        game.scene.dump();
                        cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
                    });
                });
            });
        });
    });

    it('Check if transition to statistics scene is working', () => {
        // check for the start scene
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click the options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80);
        cy.log('clicked options button');
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                // click statistics button
                cy.get('canvas').click(1280 / 2, 350);
                cy.log('clicked statistics button');
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        game.scene.dump();
                        cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Statistics'].sys.settings['active']).to.be.true;
                    });
                });
            });
        });
    });

    it('Check if transition to how to play scene is working', () => {
        // check for the start scene
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click the options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80);
        cy.log('clicked options button');
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                // click statistics button
                cy.get('canvas').click(1280 / 2, 450);
                cy.log('clicked how to play button');
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        game.scene.dump();
                        cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Rules'].sys.settings['active']).to.be.true;
                    });
                });
            });
        });
    });

    it('Check if transition to credits scene is working', () => {
        // check for the start scene
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click the options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80);
        cy.log('clicked options button');
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                // click statistics button
                cy.get('canvas').click(1280 / 2, 550);
                cy.log('clicked credits button');
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        game.scene.dump();
                        cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Credits'].sys.settings['active']).to.be.true;
                    });
                });
            });
        });
    });

});