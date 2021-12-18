const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 200 } },
    },
    scene: [scene],
}

let gametest = new Phaser.Game(config)
