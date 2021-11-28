

class scene extends Phaser.Scene { 
    constructor()   {
        super({key:"scene"});
    }

    preload () {
        this.load.image("TileSetImage","/phaser/assets/lalal.png")
        this.load.image("player","/phaser/assets/kuchen.png");
        this.TileData = TileData
        console.log(this.TileData)
    }

    create () {

        const map = this.make.tilemap({width:400,heigth:400,tilewidth:16,tileheigth:16});

        const tiles = map.addTilesetImage('TileSetImage', null, 16, 16);
        const layer = map.createBlankLayer("layer1", tiles);
        layer.randomize(0, 0, map.width,map.heigth, [0,1,2,4,5,6,7,8,9,10]);


        const cam = this.cameras.main
        cam.setZoom(2);

        this.player = this.add.image(0,0,"player")

        cam.startFollow(this.player, true, 0.5, 0.5)

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        console.log(this.map_options([
            [0,5],
            [5]
        ],2,2))

    }

    update () {
        if (this.key_A.isDown){
            this.player.x -= 1;
        }
        if (this.key_D.isDown){
            this.player.x += 5;
        }

        if (this.key_W.isDown){
            this.player.y -= 1;
        }

        if (this.key_S.isDown){
            this.player.y += 1;
        }
    }

    build_random_map(MapSX,MapSY) {

        let result =  []

        for (y in Range(1,MapSY)){

            result.add([])

            for (x in Range(1,MapSX)){
                map_options(result,y,x)
                result[y-1][x-1]
            }
        }

    }

    map_options(reference,y,x){
        console.log(reference)
        let result= []
        let geht
        let Refrule

        for (const tileid in this.TileData){
            const tile = this.TileData[tileid]
            console.log(tile)
            let yes=0
            
            for (let RefTile in tile.rules){
                
                const rule = tile.rules[RefTile]
                console.log(rule)
                
                if (RefTile = "A"){
                    Refrule = this.TileData[reference[y-2][x-1]].self
                } else {
                    Refrule = this.TileData[reference[y-1][x-2]].self
                }

                console.log(Refrule)
                


                geht = true

                for (let a in new Range(0,4)){
                    if (rule[a] != 0 && rule[a] != Refrule[a]){
                        geht = false
                        console.log("oh no")
                    }
                }

                if (geht){yes +=1}

            }
        
            
             if (yes>=2){result.push(tileid)}

        }

        return(result)
    }



} 