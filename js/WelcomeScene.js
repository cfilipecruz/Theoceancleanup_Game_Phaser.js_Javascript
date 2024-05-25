class WelcomeScene extends Phaser.Scene {

    constructor() {
        super( { key: 'WelcomeScene' } );
    }

    preload() {
    }

    init(share){
        this.musicCompare = share.Compare;
    }

    create() {

        //Musica menu
        this.music = this.sound.add('menuMusic').setVolume(0.2);

        //background + menu
        this.add.image(game.scale.width/ 2, game.scale.height / 2, 'background');
        this.menu =  this.add.image(game.scale.width/ 2, game.scale.height / 2, 'menu');

        //label Principal
        this.add.image(game.scale.width / 2, 180, 'labelWelcome');

        //botão voltar ao menu principal
        this.buttonBack = this.add.image(game.scale.width /2, 540, 'buttonBack').setInteractive({ useHandCursor: true });

        //labels
        //Intro
        this.add.image(game.scale.width /2 - 110, 250, 'labelIntro');
        this.buttonPlayIntro = this.add.image(game.scale.width /2 + 60, 250, 'buttonPlayIntro').setInteractive({ useHandCursor: true });

        //About
        this.add.image(game.scale.width /2 - 110, 300, 'labelAbout');
        this.buttonOpenLink1 = this.add.text(game.scale.width /2 - 15, 287, 'Link 1', { font: "30px NerkoOff", fill: '#633F5C' }).setInteractive({ useHandCursor: true });
        this.buttonOpenLink2 = this.add.text(game.scale.width /2 + 55, 287, ' / ', { font: "30px NerkoOff", fill: '#633F5C' });
        this.buttonOpenLink2 = this.add.text(game.scale.width /2  + 80, 287, 'Link 2', { font: "30px NerkoOff", fill: '#633F5C' }).setInteractive({ useHandCursor: true });

        //name
        this.add.image(game.scale.width /2 - 110, 350, 'labelName');
        this.add.image(game.scale.width /2 + 70, 350, 'labelBigBox');
        this.timeText = this.add.text(game.scale.width /2 , 337, 'Carlos Cruz', { font: "30px NerkoOff", fill: '#FF6533' });

        //number
        this.add.image(game.scale.width /2 - 90, 400, 'labelNumber');
        this.add.image(game.scale.width /2 + 70, 400, 'labelBigBox');
        this.timeText = this.add.text(game.scale.width /2 + 40, 387, '20016', { font: "30px NerkoOff", fill: '#FF6533' });

        //class
        this.add.image(game.scale.width /2 - 105, 450, 'labelClass');
        this.add.image(game.scale.width /2 + 70, 450, 'labelBigBox');
        this.timeText = this.add.text(game.scale.width /2 + 10 , 437, 'SM / ECGM', { font: "30px NerkoOff", fill: '#FF6533' });


       

        //lototipo da escola/ instituto
        this.add.image(game.scale.width /2, 490, 'logotipo');


        this.buttonPlayIntro.once('pointerdown', function (pointer) {

            this.game.sound.stopAll();
            //Apresentação da introdução
            let video = this.add.video(game.scale.width /2, game.scale.height /2, 'introVideo').setScale(0.48);
            video.play(true);

            // Ajuda a deixar o video em foco para não crashar, 
            video.setPaused(false);
            this.buttonCloseIntro = this.add.image(game.scale.width -40, game.scale.height / 2 - 260, 'buttonCloseIntro').setInteractive({ useHandCursor: true });
            this.buttonPauseIntro = this.add.image(game.scale.width -90, game.scale.height - 50, 'buttonPauseIntro').setInteractive({ useHandCursor: true });
            this.buttonUnpauseIntro = this.add.image(game.scale.width -170, game.scale.height - 50, 'buttonUnpauseIntro').setInteractive({ useHandCursor: true }); 

            this.buttonCloseIntro.once('pointerdown', function (pointer) {
                this.music.play();
                this.scene.start('WelcomeScene');
            }, this);
            
            this.buttonPauseIntro.on('pointerdown', function (pointer) {
                video.setPaused(true);
            }, this);

            this.buttonUnpauseIntro.on('pointerdown', function (pointer) {
                video.setPaused(false);
            }, this);

        }, this);


        this.buttonOpenLink1.once('pointerdown', function (pointer) {

            window.open('https://theoceancleanup.com/', '_blank').focus();

        }, this);


        this.buttonOpenLink2.once('pointerdown', function (pointer) {

            window.open('https://teamseas.org/', '_blank').focus();

        }, this);
        //------------------------------------------------------------------------------------
        //Botão Andar para trás no menu
        this.buttonBack.once('pointerdown', function (pointer) {
            
            this.game.sound.stopAll();
            this.scene.start('MenuScene');

        }, this);
    }

    update(){
    }
}