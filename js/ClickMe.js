class ClickMe extends Phaser.Scene {
    
    constructor() {
        super( { key: 'ClickMe' } );
    }

    init(share){
        this.share = share;
    }

    preload() {
        this.load.on('progress', function (value) {
            console.log(value);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            console.log('complete');
        });
    }


    create(){

        this.add.image(game.scale.width /2, game.scale.height /2, 'backgroundClickMe')
        this.clickMe =  this.add.image(game.scale.width /2, game.scale.height /2, 'buttonClickMe').setInteractive({ useHandCursor: true });

        this.clickMe.once('pointerdown', function (pointer) {
                
            this.scene.start('MenuScene', this.share);

        }, this);

    }

}