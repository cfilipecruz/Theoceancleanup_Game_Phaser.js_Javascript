var BootScene = new Phaser.Class({
    
    //extender a classe
    Extends : Phaser.Scene,

    initialize: 

    function CenaLoad(){
        Phaser.Scene.call(this, {key: 'BootScene'});
    },

     init(restart){

        if(typeof restart == 'boolean'){
            //console.log(this.restart);
            this.restart = restart;
        }else{
            this.restart = false;
        }
     },

    preload : function(restart){

        //load de conteudos 

        //click me
        this.load.image('buttonClickMe', 'assets/images/buttonClickMe.png');
        this.load.image('backgroundClickMe', 'assets/images/backgroundClickMe.png');

        //load dos tiles que vão ser usados no mapa
        this.load.image('tiles', 'assets/map/MapSprites.png');

        //load das imagens para as particulas
        // this.load.image('water1', 'assets/images/water1.png');
        // this.load.image('water2', 'assets/images/water2.png');
        // this.load.image('water3', 'assets/images/water3.png');
        // this.load.image('water4', 'assets/images/water4.png');

        this.load.spritesheet('water', 'assets/images/water.png', { frameWidth: 20, frameHeight: 20 });

        //menu na gameplay
        this.load.image('buttonMenuGame', 'assets/images/buttonMenuGame.png');
        this.load.image('buttonOptionsGame', 'assets/images/buttonOptionsGame.png');
        this.load.image('buttonSoundGame', 'assets/images/buttonSoundGame.png');
        this.load.image('logoOcean','assets/images/logoOceanCleanUp.png');

        //menu
        this.load.image('background', 'assets/menu/background.png');
        this.load.image('menu', 'assets/menu/menu.png');
        this.load.image('buttonWelcome', 'assets/menu/buttonWelcome.png');
        this.load.image('buttonRestart', 'assets/menu/buttonRestart.png');
        this.load.image('buttonOptions', 'assets/menu/buttonOptions.png');
        this.load.image('buttonHelp', 'assets/menu/buttonHelp.png');
        this.load.image('buttonPlay', 'assets/menu/buttonPlay.png');
        this.load.image('buttonBack', 'assets/menu/buttonBack.png');
        this.load.image('labelHelp','assets/menu/labelHelp.png');
        this.load.image('labelMenu','assets/menu/labelMenu.png');
        this.load.image('labelOptions','assets/menu/labelOptions.png');
        this.load.image('labelWelcome','assets/menu/labelWelcome.png');
        this.load.audio('menuMusic', 'assets/sounds/menu.wav')

        //Welcome
        this.load.image('labelAbout','assets/welcome/labelAbout.png');
        this.load.image('labelName','assets/welcome/labelName.png');
        this.load.image('labelIntro','assets/welcome/labelIntro.png');
        this.load.image('labelClass','assets/welcome/labelClass.png');
        this.load.image('labelNumber','assets/welcome/labelNumber.png');
        this.load.image('labelBigBox','assets/welcome/labelBigBox.png');
        this.load.image('logotipo','assets/welcome/logotipo.png');
        this.load.image('buttonPlayIntro', 'assets/welcome/buttonPlayIntro.png');
        this.load.video('introVideo', 'assets/welcome/IntroVideo.mp4');
        this.load.image('buttonCloseIntro', 'assets/welcome/buttonCloseIntro.png');
        this.load.image('buttonPauseIntro', 'assets/welcome/buttonPauseIntro.png');
        this.load.image('buttonUnpauseIntro', 'assets/welcome/buttonUnpauseIntro.png');

        //help
        this.load.image('arrows','assets/help/arrows.png');

        //options
        this.load.image('buttonEmpty','assets/menu/buttonEmpty.png');
        this.load.image('buttonFull','assets/menu/buttonFull.png');
        this.load.image('labelSound','assets/menu/labelSound.png');
        this.load.image('labelMusic','assets/menu/labelMusic.png');
        this.load.image('buttonMore','assets/menu/buttonMore.png');
        this.load.image('buttonLess','assets/menu/buttonLess.png');
        this.load.image('labelBox','assets/menu/labelBox.png');
        this.load.image('labelLifes','assets/menu/labelLifes.png');
        this.load.image('labelTime','assets/menu/labelTime.png');
        this.load.image('labelVelocity','assets/menu/labelVelocity.png');

        //GameOver
        this.load.image('labelGameOver','assets/menu/labelGameOver.png');
        this.load.image('bigBox','assets/menu/bigBox.png');
        this.load.audio('clapping', 'assets/sounds/clapping.mp3')


        //gamePlay
        this.load.image('trash', 'assets/images/trash.png');
        this.load.image('battery', 'assets/images/battery.png');
        this.load.image('bigcan', 'assets/images/bigcan.png');
        this.load.image('bottle', 'assets/images/bottle.png');
        this.load.image('bag', 'assets/images/bag.png');
        this.load.image('can', 'assets/images/can.png');
        this.load.image('cola', 'assets/images/cola.png');
        this.load.image('elttob', 'assets/images/elttob.png');          
        this.load.image('jar', 'assets/images/jar.png');
        this.load.image('large', 'assets/images/large.png');
        this.load.image('milk', 'assets/images/milk.png');
        this.load.image('phone', 'assets/images/phone.png');
        this.load.image('spray', 'assets/images/spray.png');
        this.load.image('squezed', 'assets/images/squezed.png');
        this.load.audio('collide', 'assets/sounds/soundColision.mp3')
        this.load.audio('music', 'assets/sounds/backgroundSound.wav')

        //json com mapa
        this.load.tilemapTiledJSON('map', 'assets/map/TiledMap.json');

        //Personagem 801 401
        this.load.spritesheet('boat', 'assets/theInterceptor.png', {
                                    frameWidth: 200,
                                    frameHeight: 200,
                                });

        //Personagem 601 por 301
        this.load.spritesheet('boat2.0', 'assets/theInterceptor_2.0.png', {
            frameWidth: 150.25,
            frameHeight: 150.5,
        });               
                                
    },

    create : function(){
        let sound = true;
        let music = true;
        let trashNumber = 0;
        let timer = 200;
        let lifes = 10;
        let velocity = 300;

        if(this.restart == true){
             //Fazer restart
            let restart = this.restart;
            this.scene.start('WorldScene', {sound, music, timer, lifes, velocity, trashNumber});

        }else{
            //Abrir menu
            this.scene.start('ClickMe', {sound, music, timer, lifes, velocity, trashNumber});
        }
    },
});