class HelpScene extends Phaser.Scene {

    constructor() {
        super( { key: 'HelpScene' } );
    }

    preload() {
    }

    create() {

        //background + menu
        this.add.image(game.scale.width/ 2, game.scale.height / 2, 'background');
        this.menu =  this.add.image(game.scale.width/ 2, game.scale.height / 2, 'menu');

        //label Principal
        this.add.image(game.scale.width / 2, 180, 'labelHelp');

        //botão voltar ao menu principal
        this.buttonBack = this.add.image(game.scale.width /2, 540, 'buttonBack').setInteractive({ useHandCursor: true });
        var content = [
            '    Move the boat to catch the',
            '   trash in the  available time',
            'Be aware of rocks & whirlpools',
            ' they will reduce your boat life',
        ];
        // this.add.text(game.scale.width /2 - 160, 220, 'Move the boat to catch the', { font: "25px NerkoOff", fill: '#FF6533' });
        // this.add.text(game.scale.width /2 - 160, 240, 'trash in the available time', { font: "25px NerkoOff", fill: '#FF6533' });
        // this.add.text(game.scale.width /2 - 160, 260, 'Be aware of rocks and whirlpools', { font: "25px NerkoOff", fill: '#FF6533' });
        // this.add.text(game.scale.width /2 - 160, 280, 'they will reduce your boat life', { font: "25px NerkoOff", fill: '#FF6533' });

        this.add.text(game.scale.width /2 - 160, 220, content, { font: "25px NerkoOff", fill: '#FF6533' }).setOrigin(0);

        this.add.image(game.scale.width /2, game.scale.height /2 + 65, 'arrows');

        this.add.text(game.scale.width /2 - 13, 325, 'Up', { font: "25px NerkoOff", fill: '#633F5C' });
        this.add.text(game.scale.width /2 - 25, 475, 'Down', { font: "25px NerkoOff", fill: '#633F5C' });
        this.add.text(game.scale.width /2 - 85, 390, 'Left', { font: "25px NerkoOff", fill: '#633F5C' });
        this.add.text(game.scale.width /2 + 40, 390, 'Right', { font: "25px NerkoOff", fill: '#633F5C' });

        //-----------------------------------------------------------------------------------
        //Botão Andar para trás no menu
        this.buttonBack.once('pointerdown', function (pointer) {
            this.game.sound.stopAll();
            this.scene.start('MenuScene');

        }, this);
    }

    update(){
    }
}