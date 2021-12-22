class scene extends Phaser.Scene {
    constructor() {
        super({ key: "scene" })
    }

    preload() {
        this.load.image("tileSetImage", "assets/lalal2.png")
        this.load.image("player", "assets/kuchen.png")
        this.load.image("smoke", "assets/smoke.png")
        this.TileData = TileData
    }

    create() {
        this.speed = 10
        this.map = this.make.tilemap({
            data: this.buildRandomMap(200, 200),
            tileWidth: 16,
            tileHeight: 16,
        })
        this.tiles = this.map.addTilesetImage("tileSetImage")
        this.layer = this.map.createLayer(0, this.tiles, -16, -16)
        this.cam = this.cameras.main
        this.cam.setBounds(-200, -200, 500 * 16, 500 * 16)
        this.physics.world.setBounds(-200, -200, 500 * 16, 500 * 16)
        this.cam.setZoom(0.4)

        this.smoke = this.add.image(50, 50, "smoke")
        this.player = this.physics.add
            .image(1600, 1600, "player")
            .setAngle(0)
            .setCollideWorldBounds(true)

        this.cam.startFollow(this.player, true, 0.1, 0.1)

        this.key_A = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.A
        )
        this.key_D = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.D
        )
        this.key_W = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.W
        )
        this.key_S = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        )
        console.log(this.naheAn(0,0,10,10))
    }

    update() {
        this.player.setVelocity(0)

        if (this.key_A.isDown) {
            this.player.x -= this.speed
        }
        if (this.key_D.isDown) {
            this.player.x += this.speed
        }

        if (this.key_W.isDown) {
            this.player.y -= this.speed
        }

        if (this.key_S.isDown) {
            this.player.y += this.speed
        }
    }
    buildVorMap(mapSX, mapSY) {}
    naheAn(vonX, vonY, zuX, zuY) {
        const abX = vonX > zuX ? vonX - zuX : zuX - vonX
        const abY = vonY > zuY ? vonY - zuY : zuY - vonY
        return Math.sqrt(abX*abX+abY*abY)
    }

    buildRandomMap(mapSX, mapSY) {
        // const vorMap = buildVorMap()
        let map = [[]]
        while (map[0].length < mapSX) {
            map[0].push(-1)
        }
        for (let y = 1; y <= mapSY - 1; y++) {
            map.push([-1])

            for (let x = 1; x <= mapSX - 1; x++) {
                const result = this.map_options(map, y, x)
                const nahe = (this.naheAn(x,y,100,100)*2)-50.0
                // console.log(result)
                // console.log(map)
                if (result.indexOf("4") != -1 && Math.random() < 0.0+nahe) {
                    map[y][x] = "4"
                } else if (result.indexOf("9") != -1 && Math.random() < 1.0-nahe) {
                    map[y][x] = "9"
                } else {
                    map[y][x] =
                        result[Math.floor(Math.random() * result.length)]
                }
            }
        }
        console.log(map)
        return map
    }

    mapArrayToNormalArray(array) {
        let result = []
        for (let line of array) {
            for (let obj of line) {
                result.push(obj)
            }
        }
        return result
    }

    creativ(abBe, tileId, refTileId) {
        if (refTileId == -1) {
            return true
        }
        // console.log(refTileId)
        const rule = this.TileData[tileId].rules[abBe]
        const Refrule = this.TileData[refTileId].self

        for (let a = 0; a < rule.length; a++) {
            if (rule[a] != 0 && rule[a] != Refrule[a]) {
                return false
            }
        }

        return true
    }

    map_options(reference, y, x) {
        let result = []
        const abId = reference[y - 1][x]
        const beId = reference[y][x - 1]
        for (let tileId in this.TileData) {
            if (
                this.creativ("A", tileId, abId) &&
                this.creativ("B", tileId, beId)
            ) {
                result.push(tileId)
            }
        }

        return result
    }
}
