class scene extends Phaser.Scene {
    constructor() {
        super({ key: "scene" })
    }

    preload() {
        this.load.image("tileSetImage", "assets/lalal2.png")
        this.load.image("player", "assets/kuchen.png")
        this.TileData = TileData
    }

    create() {
        this.map = this.make.tilemap({
            data: this.buildRandomMap(500, 500),
            tileWidth: 16,
            tileHeight: 16,
        })
        this.tiles = this.map.addTilesetImage("tileSetImage")
        this.layer = this.map.createLayer(0, this.tiles, 0, 0)
        const cam = this.cameras.main
        cam.setZoom(2)

        this.player = this.add.image(8000, 8000, "player")

        cam.startFollow(this.player, true, 0.1, 0.1)

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
    }

    update() {
        if (this.key_A.isDown) {
            this.player.x -= 4
        }
        if (this.key_D.isDown) {
            this.player.x += 4
        }

        if (this.key_W.isDown) {
            this.player.y -= 4
        }

        if (this.key_S.isDown) {
            this.player.y += 4
        }
    }

    buildRandomMap(MapSX, MapSY) {
        let map = [[]]
        while (map[0].length < MapSX) {
            map[0].push(-1)
        }
        for (let y = 1; y <= MapSY - 1; y++) {
            map.push([-1])

            for (let x = 1; x <= MapSX - 1; x++) {
                const result = this.map_options(map, y, x)
                // console.log(result)
                // console.log(map)
                if (result.indexOf("4") != -1 && Math.random() < 0.98) {
                    map[y][x] = "4"
                }else  if (result.indexOf("9") != -1 && Math.random() < 0.98) {
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
