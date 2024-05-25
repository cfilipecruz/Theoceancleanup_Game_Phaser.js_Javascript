class MenuGame extends Phaser.Scene {

    constructor() {
        super( { key: 'MenuGame' } );
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
         this.buttonRestart = this.add.image(game.scale.width/ 2, 270, 'buttonRestart').setInteractive({ useHandCursor: true });
         this.buttonOptions = this.add.image(game.scale.width/ 2, 350, 'buttonOptions').setInteractive({ useHandCursor: true });
         this.buttonHelp = this.add.image(game.scale.width/ 2, 430, 'buttonHelp').setInteractive({ useHandCursor: true });
         this.buttonPlay = this.add.image(game.scale.width/ 2, 510, 'buttonPlay').setInteractive({ useHandCursor: true });
        

        // // -- click no button
         this.buttonRestart.once('pointerdown', function (pointer) {
            
            let restart = true;
            //console.log(restart);
            this.music.stop();
             this.scene.start('BootScene', restart);

        }, this);

           // // -- click no button
           this.buttonOptions.on('pointerdown', function (pointer) {
            //console.log(this.share);
            this.scene.start('OptionsScene', this.share);

       }, this);

          // // -- click no button
          this.buttonHelp.on('pointerdown', function (pointer) {
            
            this.scene.start('HelpScene');

       }, this);

          // // -- click no button
          this.buttonPlay.once('pointerdown', function (pointer) {
            this.music.stop();
            this.scene.start('WorldScene', this.share);

       }, this);

    }S

    playMusic() {
        if ( this.musicCompare ) {
            this.music.play();
        }else {
            this.music.stop();
        }
    }
}