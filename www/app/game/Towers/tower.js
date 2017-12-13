var Tower = function (tileX, tileY, type) {
    this.tower = game.add.sprite(tileX * 32, tileY * 32, gameData.level.towers[0].type)
    this.tower.tileX = tileX
    this.tower.tileY = tileY
    this.tower.type = type
    this.tower.fireRate = gameData.level.towers[0].fireRate
    this.tower.prevShot = game.time.now + gameData.level.towers[0].fireRate
    this.tower.towerInstance = numOfTowers
    this.tower.target = null
    this.tower.bullets = game.add.group()
    this.tower.bullets.enableBody = true;
    this.tower.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.tower.bullets.setAll('anchor.x', 0.5)
    this.tower.bullets.setAll('anchor.y', 0.5)
    game.physics.enable(this.tower.bullets, Phaser.Physics.ARCADE)
    this.tower.aquireTarget = function (tower) { //Phaser.Math.Distance

        if (tower.target) {//Check if tower has target
            //if yes, check distance
            // debugger
            // console.log(tower.towerInstance + ' shot ' + tower.target.name)
            tower.fire(tower, tower.target)
            if (Phaser.Math.distance(tower.x, tower.y, tower.target.x, tower.target.y) > 200) {
                tower.target = null
            }
            //if within distance, fire
            // tower.fire()
        } else {//if outside of distance, aquire new target
            for (let i = 0; i < gameState.activeEnemies.length; i++) { //while loop?
                const enemy = gameState.activeEnemies[i].gameObject;
                enemy.name = 'enemy ' + i
                var range = Phaser.Math.distance(tower.x, tower.y, enemy.x, enemy.y)

                if (range < 200) {
                    tower.target = enemy
                    console.log(tower.towerInstance + ' aquired target ' + enemy.name)
                    break;
                    // this.tower.fire()
                } else {
                    tower.target = null
                }
            }
        }
    }
    this.tower.fire = function (tower, enemy) {
        // bullets.createMultiple(5, gameData.level.towers[0].bullet, 0, false)
        if (game.time.now > tower.prevShot) {
            tower.bullets.createMultiple(1, 'star')
            
            var bullet = tower.bullets.getFirstExists(false);
            console.log('Tower ' + tower.towerInstance + " shot " + enemy.name + "! KABOOOOOOOM!!!")
            tower.prevShot = game.time.now + tower.fireRate
            bullet.reset(tower.x, tower.y);
            // bullet.body.collideWorldBounds = true;


            game.physics.arcade.moveToObject(bullet, enemy, 500)
        }

    }
    towers.add(this.tower)
    console.log(this.tower)
}

// Tower.prototype.fire = function () {


// }

