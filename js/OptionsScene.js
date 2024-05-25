class OptionsScene extends Phaser.Scene {

    constructor() {
        super( { key: 'OptionsScene' } );
    }
    init(share){
        this.share = share;
        this.sound = share.sound;
        this.music = share.music;
        this.timer = share.timer;
        this.lifes = share.lifes;
        this.velocity = share.velocity;
        this.trashNumber = share.trashNumber; 
        this.restart = share.restart;
     
    }

    preload() {
    }

    create() {
  
        //console.log(this.share);
        //background + menu
        this.add.image(game.scale.width/ 2, game.scale.height / 2, 'background');
        this.menu =  this.add.image(game.scale.width/ 2, game.scale.height / 2, 'menu');

        //label Principal
        this.add.image(game.scale.width / 2, 180, 'labelOptions');

        //botão voltar ao menu principal
        this.buttonBack = this.add.image(game.scale.width /2, 540, 'buttonBack').setInteractive({ useHandCursor: true });

        //labels
        this.add.image(game.scale.width /2 - 100, 250, 'labelSound');
        this.add.image(game.scale.width /2 - 100, 300, 'labelMusic');
        this.add.image(game.scale.width /2 - 100, 350, 'labelTime');
        this.add.image(game.scale.width /2 - 110, 400, 'labelLifes');
        this.add.image(game.scale.width /2 - 110, 450, 'labelVelocity');

        //Secção de tempo
        this.buttonLessTime = this.add.image(game.scale.width /2 + 41, 350, 'buttonLess').setInteractive({ useHandCursor: true });
        this.add.image(game.scale.width /2 + 100, 350, 'labelBox').setInteractive({ useHandCursor: true });
        this.timeText = this.add.text(game.scale.width /2 + 85, 335, this.timer, { font: "30px NerkoOff", fill: '#FF6533' }).setScrollFactor(0);
        this.buttonMoreTime = this.add.image(game.scale.width /2 + 158, 350, 'buttonMore').setInteractive({ useHandCursor: true });
        
        //Secção de vidas
        this.buttonLessLifes = this.add.image(game.scale.width /2 + 41, 400, 'buttonLess').setInteractive({ useHandCursor: true });
        this.add.image(game.scale.width /2 + 100, 400, 'labelBox').setInteractive({ useHandCursor: true });
        this.lifesText = this.add.text(game.scale.width /2 + 85, 385, this.lifes, { font: "30px NerkoOff", fill: '#FF6533'}).setScrollFactor(0);
        this.buttonMoreLifes = this.add.image(game.scale.width /2 + 158, 400, 'buttonMore').setInteractive({ useHandCursor: true });

        //Secção de Velocidade
        this.buttonLessVelocity = this.add.image(game.scale.width /2 + 41, 450, 'buttonLess').setInteractive({ useHandCursor: true });
        this.add.image(game.scale.width /2 + 100, 450, 'labelBox').setInteractive({ useHandCursor: true });
        this.velocityText = this.add.text(game.scale.width /2 + 85, 435, this.velocity, { font: "30px NerkoOff", fill: '#FF6533' }).setScrollFactor(0);
        this.buttonMoreVelocity = this.add.image(game.scale.width /2 + 158, 450, 'buttonMore').setInteractive({ useHandCursor: true });

        //-----------------------------------------------------------------------
        //Less Time
        this.buttonLessTime.on('pointerdown', function (pointer) {

            this.timer = this.timer - 10;
            this.timeText.setText(this.timer);

        }, this);
        
        //More Time
        this.buttonMoreTime.on('pointerdown', function (pointer) {

            this.timer = this.timer + 10;
            this.timeText.setText(this.timer);

        }, this);
//----------------------------------------------------------------------
        //Less Lifes
         this.buttonLessLifes.on('pointerdown', function (pointer) {

            this.lifes--;
            this.lifesText.setText(this.lifes);

        }, this);
        
        //More Lifes
        this.buttonMoreLifes.on('pointerdown', function (pointer) {

            this.lifes++;
            this.lifesText.setText(this.lifes);

        }, this);
//-----------------------------------------------------------------------------
        //Less Velovity
        this.buttonLessVelocity.on('pointerdown', function (pointer) {

            this.velocity = this.velocity - 10;
            this.velocityText.setText(this.velocity);

        }, this);
        
        //More Velocity
        this.buttonMoreVelocity.on('pointerdown', function (pointer) {

            this.velocity = this.velocity +10;
            this.velocityText.setText(this.velocity);

        }, this);



//------------------------------------------------------------------------------------
        //Botão Andar para trás no menu
        this.buttonBack.once('pointerdown', function (pointer) {

            this.game.sound.stopAll();
            let sound = this.sound;
            let music = this.music;
            let timer = this.timer;
            let lifes = this.lifes;
            let velocity = this.velocity;
            let trashNumber = this.trashNumber;
  

                this.scene.start('MenuScene', {sound, music, timer, lifes, velocity, trashNumber});

        }, this);
    }

    update(){

        //comparador para as caixas de seleção
        if(this.sound == true){
            this.buttonSound = this.add.image(game.scale.width / 2 + 100, 250, 'buttonFull').setInteractive({ useHandCursor: true });
        }else{
            this.buttonSound = this.add.image(game.scale.width / 2 + 100, 250, 'buttonEmpty').setInteractive({ useHandCursor: true });
        }

        if(this.music == true){

            this.buttonMusic = this.add.image(game.scale.width / 2 + 100, 300, 'buttonFull').setInteractive({ useHandCursor: true });
        }else{
            
            this.buttonMusic = this.add.image(game.scale.width / 2 + 100, 300, 'buttonEmpty').setInteractive({ useHandCursor: true });
        }

//---------------------------------------------------------------------
        //botões ligar desligar som e musica
        this.buttonSound.on('pointerdown', function (button, index) {

            this.sound = !this.sound;
       
        }, this);

        this.buttonMusic.on('pointerdown', function (pointer) {

            this.music = !this.music;

        }, this);

    }
   
}

