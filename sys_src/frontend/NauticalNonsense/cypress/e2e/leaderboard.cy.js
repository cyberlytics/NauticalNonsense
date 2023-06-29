describe('Test for Dashboard', () => {
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
  it('Check if transition to Leaderboard is possible', () => {
    // check for the start scene
    expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
    // click the options button
    cy.wait(1000);
    cy.get('canvas').click(1215, 80);
    cy.log('clicked options button');
    cy.wait(1000).then(() => {
      cy.window().then(() => {
        // click the leaderboard button
        cy.get('canvas').click(1280 / 2, 250);
        cy.log('clicked leaderboard button');
        cy.wait(1000).then(() => {
          cy.window().then((win) => {
            game = win.game;
            game.scene.dump();
            cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.false;
            cy.expect(game.scene.keys['Leaderboard'].sys.settings['active']).to.be.true;
          });
        });
      });
    });
  });
  it('Check if Leaderboard to Options transition is possible', () => {
    // check for the start scene
    expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
    // click the options button
    cy.wait(1000);
    cy.get('canvas').click(1215, 80);
    cy.log('clicked options button');
    cy.wait(1000).then(() => {
      cy.window().then(() => {
        // click leaderboard button
        cy.get('canvas').click(1280 / 2, 250);
        cy.log('clicked leaderboard button');
        cy.wait(1000).then(() => {
          cy.window().then(() => {
            // click the back button
            cy.get('canvas').click(70, 650);
            cy.log('clicked return button');
            cy.wait(1000).then(() => {
              cy.expect(game.scene.keys['Leaderboard'].sys.settings['active']).to.be.false;
              cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.true;
            });
          });
        });
      });
    });
  });
  it('Check if Leaderboard to Home transition is possible', () => {
    // check for the start scene
    expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
    // click the options button
    cy.wait(1000);
    cy.get('canvas').click(1215, 80);
    cy.log('clicked options button');
    cy.wait(1000).then(() => {
      cy.window().then(() => {
        // click leaderboard button
        cy.get('canvas').click(1280 / 2, 250);
        cy.log('clicked leaderboard button');
        cy.wait(1000).then(() => {
          cy.window().then(() => {
            // click the home button
            cy.get('canvas').click(70, 580);
            cy.log('clicked home button');
            cy.wait(1000).then(() => {
              cy.expect(game.scene.keys['Leaderboard'].sys.settings['active']).to.be.false;
              cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
            });
          });
        });
      });
    });
  });

});