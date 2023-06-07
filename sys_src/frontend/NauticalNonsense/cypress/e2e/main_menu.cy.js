describe('My First Menu Test', () => {
  let game;
  beforeEach(() => {
    cy.viewport(1280, 720)
    // cy.visit('http://localhost:5500/sys_src/frontend/NauticalNonsense/public/index.html');
    cy.visit('localhost:3000/');
    cy.wait(10000);
    cy.window().then((win) => {
      game = win.game;
    });
  });
  it('Checks if index.html is reachable and the canvas gets displayed', () => {
    cy.get('canvas').should('be.visible');
  });
  
  it('Menu should have music playing', () => {
    let hasThemePlaying;
    cy.wrap(game.sound).invoke('getAllPlaying').then((musicArray) => {
        console.log(musicArray);
        expect(musicArray).to.exist; // Check if active music exists
        hasThemePlaying = musicArray.some((music) => {
          return music['key'] == "theme" && music.isPlaying;
        });
        expect(hasThemePlaying).to.be.true;
    });
  });
  it('should change to options scene', () => {
    // check if the Start scene is
    expect(game.scene.keys['Start'].sys.settings['active']).to.be.true;
    // click on Options button
    cy.wait(1000);
    cy.get('canvas').click(1215, 80, { force: true });
    cy.log("clicked")
    cy.wait(1000).then(() => {
      cy.window().then((win) => {
        game = win.game;
        game.scene.dump();
        cy.expect(game.scene.keys['Start'].sys.settings['active']).to.be.false;
        cy.expect(game.scene.keys['Options'].sys.settings['active']).to.be.true;
      });
    });
  });

  it('checks if music can be muted and unmuted', () => {
    cy.wait(1000);
    // click to options page
    cy.get('canvas').click(1215, 80, { force: true });
    cy.log("clicked")
    cy.wait(100).then(() => {
      // click onto mute button
      cy.get('canvas').click(1280/2 + 255, 210, { force: true});
      cy.window().then((win) => {
        game = win.game;
        cy.wrap(game.sound).invoke('getAllPlaying').then((musicArray) => {
          console.log(musicArray);
          expect(musicArray).to.exist; // Check if active music exists
          var allMuted = musicArray.every((music) => {
            return music.volume == 0;
          });
          expect(allMuted).to.be.true;
        });
      });
    });
    // click onto unmute button
    cy.wait(100).then(() => {
      cy.get('canvas').click(1280/2 + 255, 210, { force: true});
      cy.window().then((win) => {
        game = win.game;
        cy.wrap(game.sound).invoke('getAllPlaying').then((musicArray) => {
          console.log(musicArray);
          expect(musicArray).to.exist; // Check if active music exists
          var notAllMuted = musicArray.some((music) => {
            return music.volume != 0;
          });
          expect(notAllMuted).to.be.true;
        });
      });
    });
  });
});