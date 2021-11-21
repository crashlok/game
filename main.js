

const config = {
    type:Phaser.AUTO,
    scale:{
       mode: Phaser.Scale.FIT,
       autoCenter: Phaser.Scale.CENTER_BOTH,
       width: 1200,
       height: 600 
    },
    physics:{
        default:"arcade",
        arcade:{gravity: {y:200}}
        
    },
    scene:[ 
        scene
    ]


};


let gametest = new Phaser.Game(config);
