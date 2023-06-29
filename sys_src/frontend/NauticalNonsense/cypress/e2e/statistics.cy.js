describe('Test for statistics scene', () => {
    let game;
    beforeEach(() => {
        cy.viewport(1280, 720);
        //cy.visit('http://localhost:5500/sys_src/frontend/NauticalNonsense/public/index.html');
        cy.visit('localhost:3000/'); // when using live server
        cy.wait(10000);
        cy.window().then((win) => {
            game = win.game;
        });
    });

    it('Checks if index.html is reachable and the canvas gets displayed', () => {
        cy.get('canvas').should('be.visible');
    });

    it('Check change to statistics scene', () => {
        // check if the start scene is displayed
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click on options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80, { force: true });
        cy.log("clicked on options button")
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                //click on statistics button
                cy.get('canvas').click(1280 / 2, 350, { force: true });
                cy.log("clicked on statistics button");
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Statistics'].sys.settings['active']).to.be.true;
                    });
                });
            });
        });
    });

    it('Check change back to options scene', () => {
        // check if the start scene is displayed
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click on options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80, { force: true });
        cy.log("clicked on options button")
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                //click on statistics button
                cy.get('canvas').click(1280 / 2, 350, { force: true });
                cy.log("clicked on statistics button");
                cy.wait(1000).then(() => {
                    cy.window().then(() => {
                        //click on return button
                        cy.get('canvas').click(70, 650, { force: true });
                        cy.log('clicked on return button');
                        cy.wait(1000).then(() => {
                            cy.window().then((win) => {
                                game = win.game;
                                cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
                                cy.expect(game.scene.keys['Statistics'].sys.settings['active']).to.be.false;
                                cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.true;
                            });
                        });
                    });
                });
            });
        });
    });

    it('Check change back to start scene', () => {
        // check if the start scene is displayed
        expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
        // click on options button
        cy.wait(1000);
        cy.get('canvas').click(1215, 80, { force: true });
        cy.log("clicked on options button")
        cy.wait(1000).then(() => {
            cy.window().then(() => {
                //click on statistics button
                cy.get('canvas').click(1280 / 2, 350, { force: true });
                cy.log("clicked on statistics button");
                cy.wait(1000).then(() => {
                    cy.window().then(() => {
                        //click on home button
                        cy.get('canvas').click(70, 580, { force: true });
                        cy.log('clicked on home button');
                        cy.wait(1000).then(() => {
                            cy.window().then((win) => {
                                game = win.game;
                                cy.expect(game.scene.keys['Statistics'].sys.settings['active']).to.be.false;
                                cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
                                cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
                            });
                        });
                    });
                });
            });
        });
    });
});