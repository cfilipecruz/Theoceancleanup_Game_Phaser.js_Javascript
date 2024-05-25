class MenuScene extends Phaser.Scene {

    constructor() {
        super( { key: 'MenuScene' } );
    }
    init(share){
        this.share = share;
        this.musicCompare = share.music;
    }
    preload() {
        
    }

    create() {

       //Musica menu
       this.music = this.sound.add('menuMusic').setVolume(0.2);

       this.playMusic();

        this.add.image(game.scale.width/ 2, game.scale.height / 2, 'background');
        this.menu =  this.add.image(game.scale.width/ 2, game.scale.height / 2, 'menu');

         this.add.image(game.scale.width / 2, 180, 'labelMenu');
         this.buttonWelcome = this.add.image(game.scale.width/ 2, 270, 'buttonWelcome').setInteractive({ useHandCursor: true });
         this.buttonOptions = this.add.image(game.scale.width/ 2, 350, 'buttonOptions').setInteractive({ useHandCursor: true });
         this.buttonHelp = this.add.image(game.scale.width/ 2, 430, 'buttonHelp').setInteractive({ useHandCursor: true });
         this.buttonPlay = this.add.image(game.scale.width/ 2, 510, 'buttonPlay').setInteractive({ useHandCursor: true });
        

        // // -- click no button
         this.buttonWelcome.once('pointerdown', function (pointer) {
            
             this.scene.start('WelcomeScene', this.share);

        }, this);

           // // -- click no button
           this.buttonOptions.once('pointerdown', function (pointer) {
        
            this.scene.start('OptionsScene', this.share);

       }, this);

          // // -- click no button
          this.buttonHelp.once('pointerdown', function (pointer) {
            
            this.scene.start('HelpScene');

       }, this);

          // // -- click no button
          this.buttonPlay.once('pointerdown', function (pointer) {

            this.game.sound.stopAll();
            this.scene.start('WorldScene', this.share);

       }, this);

    }
    playMusic() {
        if ( this.musicCompare ) {
            this.music.play();
        }else {
            this.music.stop();
        }
    }
}