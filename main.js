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
        default: 'arcade',
    },
    scene: [scene],
}

let gametest = new Phaser.Game(config)
