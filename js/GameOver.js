class GameOver extends Phaser.Scene {

    constructor() {
        super( { key: 'GameOver' } );
    }

    init(share){
        this.share = share;
        this.music = share.music;
        this.soundCompare = share.sound;
        this.velocity = share.velocity;
        this.trashNumber = share.trashNumber;
        this.lifes = share.lifes;
        this.timer = share.timer;
        this.optionsTimer = share.optionsTimer;
        this.optionsLifes = share.optionsLifes;
        this.optionsVelocity = share.optionsVelocity;
    }
    preload() {
        
    }

    create() {

        //Musica menu
        this.soundClapping = this.sound.add('clapping').setVolume(0.2);
        this.playSound();

        //console.log(this.share);
        this.add.image(game.scale.width/ 2, game.scale.height / 2, 'background');
        this.menu =  this.add.image(game.scale.width/ 2, game.scale.height / 2, 'menu');

         this.add.image(game.scale.width / 2, 180, 'labelGameOver');
       

         this.add.image(game.scale.width / 2, game.scale.height / 2 -10, 'bigBox');

         this.buttonRestart = this.add.image(game.scale.width/ 2, 530, 'buttonRestart').setInteractive({ useHandCursor: true })
         this.buttonMenuGame = this.add.image(game.scale.width /2- 30, game.scale.height / 2 + 110, 'buttonMenuGame').setInteractive({ useHandCursor: true });
         this.buttonOptionsGame = this.add.image(game.scale.width / 2 + 30, game.scale.height / 2 + 110, 'buttonOptionsGame').setInteractive({ useHandCursor: true });
         
       
 
        //  this.add.text(game.scale.width /2 - 100, 240, 'You have collected: ' , { font: "25px NerkoOff", fill: '#FF6533'});
        //  this.add.text(game.scale.width /2 - 20, 280, this.trashNumber + 'kg', { font: "30px NerkoOff", fill: '#FF6533'});
        //  this.add.text(game.scale.width /2 - 120, 320, 'of trash from the ocean', { font: "25px NerkoOff", fill: '#FF6533'});
        //  this.add.text(game.scale.width /2 - 90, 360, '"Congratulations"', { font: "25px NerkoOff", fill: '#FF6533'});

         this.add.text(game.scale.width /2 - 120, 270, 'You have collected:  ' + this.trashNumber + 'kg', { font: "25px NerkoOff", fill: '#FF6533'});
         this.add.text(game.scale.width /2 - 120, 300, 'of trash from the ocean', { font: "25px NerkoOff", fill: '#FF6533'});
         this.add.text(game.scale.width /2 - 110, 340, '"Congratulations"', { font: "30px NerkoOff", fill: '#FF6533'});
        
 
         this.buttonMenuGame.once('pointerdown', function (pointer) {
             let music = this.music;
             let sound = this.sound;
             let timer = this.timer;
             let velocity = this.velocity;
             let lifes = this.lifes;
             let trashNumber = this.trashNumber;
             this.scene.start('MenuScene', {timer, velocity, lifes, trashNumber, sound, music});
 
         }, this);
 
         this.buttonOptionsGame.once('pointerdown', function (pointer) {
             let sound = this.sound;
             let music = this.music
             let timer = this.timer;
             let velocity = this.velocity;
             let lifes = this.lifes;
             let trashNumber = this.trashNumber;
         this.scene.start('OptionsScene', {timer, velocity, lifes, trashNumber, music, sound});
 
         }, this);
        
          // // -- click no button
          this.buttonRestart.once('pointerdown', function (pointer) {
            this.soundClapping.stop();
            let restart = true;
            //console.log(restart);
            this.scene.start('BootScene', restart);

       }, this);

    }

    playSound() {
        if ( this.soundCompare ) {
            this.soundClapping.play();
        }else {
            this.soundClapping.stop();
        }
    }
}