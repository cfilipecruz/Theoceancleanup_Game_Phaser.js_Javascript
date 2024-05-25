var WorldScene = new Phaser.Class({

    Extends : Phaser.Scene,
   
    initialize :

     function CenaMundo(){
         Phaser.Scene.call(this, {key :'WorldScene'});
     },

    init(share){

        this.soundCollide = share.sound;
        this.musicCompare = share.music;
        this.timer = share.timer;
        this.lifes = share.lifes;
        this.velocity = share.velocity;
        this.trashNumber = share.trashNumber;
        this.share = share;
        this.optionsTimer = share.optionsTimer;
        this.optionsVelocity = share.optionsVelocity;
        this.optionsLifes = share.optionsLifes;

       
    },

     preload: function(){
         //Vazio, pode -se dar preload, mas não é necessário colocar
     },

     create: function(){
        
        this.test = 3200;

        //criar mundo do jogo
        var map = this.make.tilemap({key: 'map'});
       
        //obter o nome de um tileset chamado spritesheet dentro do json
        var tiles = map.addTilesetImage('TiledMap', 'tiles', 16, 16);

        //var obter a layer "Oceano" e adicionar ao mapa
        var oceano = map.createLayer('Oceano', tiles, 0, 0).setScale(3);

        //var obter a layer "Areia" e adicionar ao mapa
        this.areia = map.createLayer('Areia', tiles, 0, 0).setScale(3);

        //Adicionar particulas
        particles = this.add.particles('water');

        //Defenições das particulas
        let emitter = particles.createEmitter({
            frame: {frames: [ 0, 1, 2, 3 ], random: true},
            alpha: { start: 10, end:  0},
            scale: { start: 2, end: 0},
            speed: 10,
            lifespan: 900,
            blendMode: 'MULTIPLY',
            frequency: 5,

            //   maxParticles: 1000,
            //   x: this.player.x - 100,
            //   y: this.player.y
            //   particleBringToTop: true,
            //   radial: { min: -30, max: 90},
            //   angle: { min: -85, max: -95 },
            //   rotate: { min: -180, max: 180 },
            //   accelerationX: -1000,
        });
    
        //obter a layer dos obstaculos
        this.obstaculos = map.createLayer('Obstaculos', tiles, 0, 0).setScale(3);

        //obstaculos estarão disponoveis para colisão
        this.areia.setCollisionByExclusion( [ -1 ] );
        this.obstaculos.setCollisionByExclusion( [ -1 ] );
        
   

        //adicionar frames do player
        this.player = this.physics.add.sprite(250, 250, 'boat2.0', 0);
       // this.player.setSize(200, 40, true);
        

        //limitar movimento do player á area de jogo
        this.physics.world.bounds.width = map.widthInPixels + this.test;
        this.physics.world.bounds.height = map.heightInPixels + this.test;
        this.player.setCollideWorldBounds(true);

       

        //acompanhar as particulas com o player
        emitter.startFollow(this.player);

        //som da colisão
        this.collide = this.sound.add('collide').setVolume(0.2);

        //som do background
        this.music = this.sound.add('music').setVolume(0.2);
        this.playMusic();

        // input do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        //camara a seguir o player
        this.cameras.main.setBounds(0, 0, map.widthInPixels + this.test, map.heightInPixels + this.test);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.player);
        this.player.body.setVelocity(0);

        //Adicção da colision com uma layer
        this.physics.add.collider(this.player, this.areia);

        //Adicção da colision com uma layer
        this.physics.add.collider(this.player, this.obstaculos);

        //Relogio para contar tempo em segundos
        this.watch = this.time.addEvent({ delay: 1000, callback: this.timerAdition, callbackScope: this, loop: true });  
        
     



        //animação do player
        //esquerda e direita
        this.anims.create({

            key: 'esquerdaDireita',
            frames: this.anims.generateFrameNumbers('boat2.0', {frames: [0, 1, 2, 3]}),
            frameRate: 10,
            repeat: -1,
        });
        
        //andar para cima
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('boat2.0', {frames: [4, 5, 6, 7]}),
            frameRate: 10,
            repeat: -1,
        });



        //criar 50 zonas de objetos
        this.objects = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite
          });

        for(var i = 0; i<200; i++){

            var x = Phaser.Math.RND.between(300, this.physics.world.bounds.width - 100);
            var y = Phaser.Math.RND.between(300, this.physics.world.bounds.height - 100);

            //if para evitar criar objetos na areia e nos obstaculos
            if(!this.obstaculos.getTileAtWorldXY(x, y) && !this.areia.getTileAtWorldXY(x, y)){

                this.objects.create(x, y, this.getObjectSprite());

            }else{
                
               //console.log('Colision with layers');
                i--;

            }
        }

        this.physics.add.overlap(this.player, this.objects, this.colisionObjects, false, this);


            //criar 10 zonas de lixo 
            this.trash = this.physics.add.group({
                classType: Phaser.GameObjects.Sprite
              });
    
            for(var i = 0; i<10; i++){
    
                var x = Phaser.Math.RND.between(100, this.physics.world.bounds.width - 100);
                var y = Phaser.Math.RND.between(100, this.physics.world.bounds.height - 100);
    
                //if para evitar criar objetos na areia e nos obstaculos
                if(!this.obstaculos.getTileAtWorldXY(x, y) && !this.areia.getTileAtWorldXY(x, y)){
    
                    this.trash.create(x, y, this.getTrashSprite());
    
                }else{
    
                    //console.log('nop-trash', x, y);
                    i--;
    
                }
            }

         this.physics.add.overlap(this.player, this.trash, this.colisionObjectTrash, false, this);



     
        //Dados da gameplay
        this.add.rectangle(game.scale.width /2, 0, game.scale.width, 60, 0x000000 , 0.8).setScrollFactor(0);
        this.trashText = this.add.text(game.scale.width - 400, 10, "Trash Collected = " + this.trashNumber, {fill: '#ffffff' }).setScrollFactor(0);
        this.timerText = this.add.text(200, 10, "Battery available time = " + this.timer, {fill: '#ffffff' }).setScrollFactor(0);

        //menu Bottom
        this.add.rectangle(game.scale.width /2, game.scale.height, game.scale.width, 120, 0x000000 , 0.8).setScrollFactor(0);
        this.buttonMenuGame = this.add.image(game.scale.width - 80, game.scale.height - 30, 'buttonMenuGame').setInteractive({ useHandCursor: true }).setScrollFactor(0);
        //this.buttonOptionsGame = this.add.image(game.scale.width - 170, game.scale.height - 30, 'buttonOptionsGame').setInteractive({ useHandCursor: true }).setScrollFactor(0);
        //this.buttonSoundGame = this.add.image(game.scale.width - 240, game.scale.height - 30, 'buttonSoundGame').setInteractive({ useHandCursor: true }).setScrollFactor(0);
        this.add.image(game.scale.width /2, game.scale.height - 30, 'logoOcean').setScale(0.15).setScrollFactor(0);

        this.buttonMenuGame.on('pointerdown', function (pointer) {
            let sound = this.soundCollide;
            let music = this.musicCompare;
            let timer = this.timer;
            let velocity = this.velocity;
            let lifes = this.lifes;
            let trashNumber = this.trashNumber;
            this.music.stop();
            this.scene.start('MenuGame', {timer, velocity, lifes, trashNumber, music, sound});
        }, this);

    
   

        // this.buttonOptionsGame.once('pointerdown', function (pointer) {
        //     let timer = this.timer;
        //     let velocity = this.velocity;
        //     let lifes = this.lifes;
        //     let trashNumber = this.trashNumber;
        // this.scene.start('OptionsScene', {timer, velocity, lifes, trashNumber});

        // }, this);
    },

     getObjectSprite:function(){

            var sprites = ['bag', 'battery', 'bigcan', 'bottle', 'can', 'cola', 'elttob', 'jar', 'large', 'milk', 'phone', 'spray', 'squezed'];
            return sprites[Math.floor(Math.random() * sprites.length)];
     },

     getTrashSprite:function(){

        var sprites = ['trash'];
        return sprites;
     },

    colisionObjects: function(player, zona){

        this.playSound();

       let randomx = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
       let randomy = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

       if(randomx <= player.x + 200 && randomy <= player.y + 200 && randomx >= player.x - 200 && randomy >= player.y - 200){
   
           // console.log('no-player', randomx, randomy);
            this.colisionObjects(player, zona);            
              
        }else{

            if(!this.obstaculos.getTileAtWorldXY(randomx, randomy) && !this.areia.getTileAtWorldXY(randomx, randomy)){

                zona.x = randomx;
                zona.y = randomy;

                this.trashNumber++;
               // console.log(this.trashNumber);
                //this.cameras.main.shake(5);
                this.cameras.main.flash(5);

            }else{
               
               // console.log('no', randomx, randomy);
                this.colisionObjects(player, zona);
            
            }
           
        }
      
    },

    colisionObjectTrash: function(player, zona){

            this.playSound();

            let randomx = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let randomy = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
     
            if(randomx <= player.x + 200 && randomy <= player.y + 200 && randomx >= player.x - 200 && randomy >= player.y - 200){
        
                 //console.log('no-player', randomx, randomy);
                 this.colisionObjectTrash(player, zona);            
                   
             }else{
     
                 if(!this.obstaculos.getTileAtWorldXY(randomx, randomy) && !this.areia.getTileAtWorldXY(randomx, randomy)){
     
                     zona.x = randomx;
                     zona.y = randomy;
     
                     this.trashNumber++;
                     //console.log(this.trashNumber);
                    // this.cameras.main.shake(5);
                     this.cameras.main.flash(5);
     
                 }else{
                    
                     //console.log('no', randomx, randomy);
                     this.colisionObjectTrash(player, zona);
                 
                 }
                
             }
           
    },

    timerAdition() {
        this.timer--;
		this.timerText.setText("Battery available time = " + this.timer);
        
	},

    playSound() {
        if ( this.soundCollide ) {
            this.collide.play();
        }else {
            this.collide.stop();
        }
    },

    playMusic() {
        if ( this.musicCompare ) {
            this.music.play();
            this.music.setLoop(true);
        }else {
            this.music.stop();
        }
    },
    
    update: function(){

        this.trashText.setText("Trash Collected = "  + this.trashNumber);
        
        this.player.body.setVelocity(0);
        particles.setVisible(false);
       // particles.setActive(false);

        //movimento horizontal
        if(this.cursors.left.isDown){

            //this.player.setSize(190, 80, true);
            particles.setVisible(true);
            this.player.body.setVelocityX(-this.velocity);
            
        }else if(this.cursors.right.isDown){

            //this.player.setSize(190, 80, true);
            particles.setVisible(true);
            this.player.body.setVelocityX(this.velocity);

        }

        //movimento vertical
        if(this.cursors.up.isDown){

            //this.player.setSize(80, 190, true);
            particles.setVisible(true);
            this.player.body.setVelocityY(-this.velocity);

        }else if(this.cursors.down.isDown){

            //this.player.setSize(80, 190, true);
            particles.setVisible(true);
            this.player.body.setVelocityY(this.velocity);

        }
        
        
        //Animações
        if(this.cursors.left.isDown){

            this.player.anims.play('esquerdaDireita', true);
            this.player.flipX = true;
            this.player.flipY = false;

        }else if(this.cursors.right.isDown){

            this.player.anims.play('esquerdaDireita', true);
            this.player.flipX = false;
            this.player.flipY = false;

        }else if(this.cursors.up.isDown){
            
            this.player.anims.play('up', true);
            this.player.flipY = false;
            this.player.flipX = false;

        }else if(this.cursors.down.isDown){

            this.player.anims.play('up', true);
            this.player.flipY = true;
            this.player.flipX = false;
        }else{ 

            this.player.anims.stop();

        }    
        
        //Fim de jogo

        if(this.timer <= 0){
            this.endGame();
        }

        if(this.lifes <= 0){
            this.endGame();
        }
     },

     destroy(){
        particles.destroy();
     },
    

     endGame(){
        this.music.stop();
        let sound =this.soundCollide;
        let music = this.musicCompare;
        let timer = this.timer;
        let velocity = this.velocity;
        let lifes = this.lifes;
        let trashNumber = this.trashNumber;

        this.scene.start('GameOver', {timer, velocity, lifes, trashNumber, sound, music});
    }
 
});