var config = {
    type        : Phaser.CANVAS,
    parent      : 'content',
    width       : 1000,
    height      : 700,
    //zoom        : 3,
    pixelArt    : true,
    physics     : {
        default : 'arcade',
        arcade  : {
            gravity : { y : 0},
            debug : false,
        }
    },
    scene : [
        BootScene,
        ClickMe,
        WorldScene,
        MenuScene,
        OptionsScene,
        HelpScene,
        WelcomeScene,
        MenuGame,
        GameOver
    ]
};

var game = new Phaser.Game(config);