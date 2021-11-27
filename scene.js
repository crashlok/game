

class scene extends Phaser.Scene { 
    constructor()   {
        super({key:"scene"});
    }

    preload () {
        this.load.image("test","phaser/assets/bregenzerwald.jpg")
        this.load.image("player","phaser/assets/kuchen.png");
        this.TileData = TileData
        console.log(this.TileData)
    }

    create () {
        this.image = this.add.image(0,0,"test");
        const cam = this.cameras.main
        //cam.setBounds(0, 0, 3392, 100);
        cam.setZoom(15);

        this.player = this.add.image(0,0,"player")

        cam.startFollow(this.player, true, 0.1, 0.1)

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

        console.log(this.map_options([
            [0,1],
            [3]
        ],2,2))

    }

    update () {
        if (this.key_A.isDown){
            this.player.x -= 3;
        }

        if (this.key_D.isDown){
            this.player.x += 3;
        }

        if (this.key_W.isDown){
            this.player.y -= 3;
        }

        if (this.key_S.isDown){
            this.player.y += 3;
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
        let rule
        let geht
        let Refrule

        for (const tileid in this.TileData){
            const tile = this.TileData[tileid]
            console.log(tile)
            let yes=0
            
            for (let RefTile in tile.rules){
                
                rule = tile.rules[RefTile]
                if (RefTile = "A"){
                    Refrule = this.TileData[reference[y-2][x-1]].self
                } else {
                    Refrule = this.TileData[reference[y-1][x-2]].self
                }



                geht = true

                for (let a in new Range(0,4)){
                    if (rule[a] != 0 && rule[a] != Refrule[a]){
                        geht = false
                    }
                }

                if (geht){yes +=1}

            }
        
            
             if (yes>=2){result.push(tileid)}

        }

        return(result)
    }



} 