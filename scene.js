

class scene extends Phaser.Scene {
    constructor() {
        super({ key: "scene" });
    }

    preload() {
        this.load.image("TileSetImage", "assets/lalal.png")
        this.load.image("player", "assets/kuchen.png");
        this.TileData = TileData
        console.log(this.TileData)
    }

    create() {

        this.map = this.make.tilemap({ width: 400, heigth: 400, tilewidth: 16, tileheigth: 16 });

        this.tiles = this.map.addTilesetImage('TileSetImage', null, 16, 16);
        this.layer1 = this.map.createBlankLayer("layer1", this.tiles);
        this.layer1.randomize(0, 0, this.map.width, this.map.heigth, [0, 1, 2, 4, 5, 6, 7, 8, 9, 10]);


        const cam = this.cameras.main
        cam.setZoom(2);

        this.player = this.add.image(0, 0, "player")

        cam.startFollow(this.player, true, 0.5, 0.5)

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        console.log(this.map_options([
            ["0", "2"],
            ["4"]
        ], 2, 2))

    }

    update() {
        if (this.key_A.isDown) {
            this.player.x -= 1;
        }
        if (this.key_D.isDown) {
            this.player.x += 5;
        }

        if (this.key_W.isDown) {
            this.player.y -= 1;
        }

        if (this.key_S.isDown) {
            this.player.y += 1;
        }
    }

    build_random_map(MapSX, MapSY) {

        let result = []

        for (y in Range(1, MapSY)) {

            result.add([])

            for (x in Range(1, MapSX)) {
                map_options(result, y, x)
                result[y - 1][x - 1]
            }
        }

    }

    map_options(reference, y, x) {
        console.log(reference)
        let result = []
        let geht

        for (let tileid in this.TileData) {
            const tile = this.TileData[tileid]
            console.log(tile)
            let yes = 0

            for (let RefTile in tile.rules) {
                const rule = tile.rules[RefTile]
                console.log(rule)

                const neighbourTile =
                    (RefTile === "A") ? reference[y - 2][x - 1] : reference[y - 1][x - 2]
                const Refrule = this.TileData[neighbourTile].self

                console.log(Refrule)

                geht = true
                for (let a = 0; a < rule.length; a++) {
                    if (rule[a] != 0 && rule[a] != Refrule[a]) {
                        console.log("oh no")
                        geht = false
                        console.log("oh no")

                    }
                    console.log("l")
                }

                if (geht) { yes++ }

            }


            if (yes >= 2) { result.push(tileid) }

        }

        return (result)
    }



}