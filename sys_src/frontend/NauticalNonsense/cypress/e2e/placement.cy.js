
describe('Testing switch to Gameboard', () => {
    let game;
    beforeEach(() => {
        // setup network stubbing

        // returns playerId on Get request
        cy.intercept('Get', 'http://localhost:8000/', {
            statusCode: 201,
            body: '"a8098c1a-f86e-11da-bd1a-00112444be1e"',
        });
        // returns running game on Post request
        cy.intercept('Post', 'http://localhost:8000/play', {
            // give it instantly a ready game-room
            statusCode: 201,
            body: {
                ready: {
                    player1: "a8098c1a-f86e-11da-bd1a-00112444be1e",
                    player2: "56c36eca-0842-487c-944f-8d88db785e88",
                    game_id: "27dcb94f-8080-4457-bcca-7ac38c500318"
                }
            }
        })

        cy.viewport(1280, 720)
        // cy.visit('http://localhost:5500/sys_src/frontend/NauticalNonsense/public/index.html');
        cy.visit('localhost:3000/');
        cy.wait(10000);
        cy.window().then((win) => {
            game = win.game;
        });
    });

    it('switches to placement scene', () => {

        cy.wait(1000);
        // click into name field
        cy.get('canvas').click(560, 550, { force: true });
        cy.log("clicked")
        cy.wait(100).then(() => {
            // click onto mute button
            cy.get('canvas').realType("player1");
            cy.wait(100).then(() => {
                cy.get('canvas').click(845, 575, { force: true });
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        game.scene.dump();
                        cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
                        cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
                    });
                });
            });
        });
    });
    it('switches to placement scene', () => {

        cy.wait(1000);
        // click into name field
        cy.get('canvas').click(560, 550, { force: true });
        cy.log("clicked")
        cy.wait(100).then(() => {
            // click onto mute button
            cy.get('canvas').realType("player1");
            cy.wait(100).then(() => {
                cy.get('canvas').click(845, 575, { force: true });
                cy.wait(1000).then(() => {
                    cy.window().then((win) => {
                        game = win.game;
                        game.scene.dump();
                        cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
                    });
                });
            });
        });
    });


});