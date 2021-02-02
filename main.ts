namespace SpriteKind {
    export const backgroundObject = SpriteKind.create()
    export const enemyAttack = SpriteKind.create()
    export const bigShot = SpriteKind.create()
}
function updateLights () {
    for (let index = 0; index <= 4; index++) {
        light.setPixelColor(index, 0x000000)
    }
    for (let index = 0; index <= numberOfLights - 0; index++) {
        light.setPixelColor(index, 0xff0000)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    light.setAll(0x000000)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 5 5 5 5 4 4 4 2 2 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spacePlane, 200, 0)
    music.setVolume(99)
    music.pewPew.play()
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    updateLights()
    if (numberOfLights == 5) {
        bigShot = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 5 5 5 5 4 4 4 2 2 2 . 
            . . . 5 5 5 5 5 5 5 5 4 4 4 2 2 
            5 5 5 5 5 5 5 5 5 5 5 4 4 4 2 2 
            . . . 5 5 5 5 5 5 5 5 4 4 4 2 2 
            . . . . . 5 5 5 5 4 4 4 2 2 2 . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.bigShot)
        bigShot.setFlag(SpriteFlag.AutoDestroy, true)
        bigShot.setPosition(spacePlane.x, spacePlane.y)
        bigShot.setVelocity(200, 0)
        music.setVolume(204)
        music.pewPew.play()
    }
    numberOfLights = 0
    light.setAll(0x000000)
})
sprites.onOverlap(SpriteKind.bigShot, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 10)
    info.changeScoreBy(100)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    updateLights()
    if (numberOfLights < 5) {
        numberOfLights += 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(500)
    music.playMelody("C D C5 B C5 - - - ", 700)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (sprite == UFO) {
        UFOCount += -1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemyAttack, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.playTone(131, music.beat(BeatFraction.Whole))
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 10)
    info.changeScoreBy(100)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    music.playTone(131, music.beat(BeatFraction.Whole))
})
let star: Sprite = null
let backgroundStar: Sprite = null
let enemyProjectile: Sprite = null
let bogey: Sprite = null
let UFOSpawner = 0
let UFO: Sprite = null
let bigShot: Sprite = null
let projectile: Sprite = null
let numberOfLights = 0
let spacePlane: Sprite = null
let splashBackground = sprites.create(img`
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...............44444............................................................................................................................................
    ..............444fffff.........1................................................................................................................................
    ..............44fffff.f......................................................................1..................................................................
    ..............44fffff.f............................1............................................................................................................
    ..............44fffff.f.........................................................................................................................................
    22222222......44fffff.f............................................................................................................................1............
    222222222......44fff..f.........................................................................................................................................
    2222222222.......fffff..........................................................................................................................................
    22222222222............................1.....................................................................1.................1................................
    222222222222....................................................................................................................................................
    222222222222..............................................................1.................................................................1...................
    222222222222....................................................................................................................................................
    222222222222................................................1...................................................................................................
    2222222222111111111.............................................................................................................................................
    111111111122....................................................................................................................................................
    222222222222....................................................................................................................................................
    222222222222....................................................................................................................................................
    222222222222.............1......................................................................................................................................
    22222222222.........................................................................................................1...........................................
    2222222222......................................................................................................................................................
    222222222.............1.........................................................................................................................................
    22222222........................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    .........................................................................................1......................................................................
    ................................................1...............................................................................................................
    ................................................................................................................................................................
    .....................................................................................................................1..........................................
    ........1.............................................................1..................................................................1......................
    ........................................................................................................................................................1.......
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ........................................................................................1.......................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    .............1...................................................................411.......................1....................................................
    .....................................1..........................................................................................................................
    ...................................................................................................................................1.............1..............
    .........................................................1......................................................................................................
    ................................................................................................................................................................
    .......................1........................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ..........................................................................................................................................................1.....
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ........1.......................................................................................................................................................
    ....................................................................................1...........................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ...............................1................................................................................................................................
    .......................................................................................................................1........................................
    ................................................................................................................................................................
    .................................................................1..............................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................1...............................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ................................................................................................................................................................
    ..................................................................................................................................6666666666666.................
    ...................1......................................................................................1.....................66666666666666666...............
    ..............................................................................................................................666666666666666666666.............
    ................................1...........................................................................................6666666666fffffffffff6666...........
    ...........................................................................................................................66666666fffffffffffffffff66..........
    ..........................................................................................................................66666666fffffffffffffffffff66.........
    .........................................................................................................................6666666fffffffffffffffffffffff6........
    ................................................1.......................................................................6666666fffffffffffffffffffffffff6.......
    .......................................................................................................................6666666fffffffffffffffffffffffffff6......
    .......................................................................................................................666666fffffffffffffffffffffffffffff......
    .............................................................1........................................................6666666fffffffffffffffffffffffffffff6.....
    ......................................................................................................................666666fffffffffffffffffffffffffffffff.....
    ...........................................................................................1111111...................666666fffffffffffffffffffffffffffffffff....
    ........1.................................................................................1.......11111..............666666fffffffffffffffffffffffffffffffff....
    ..........................................................................................111..........111111.......6666666fffffffffffffffffffffffffffffffff6...
    ......................1......................................................................1111............11111..666666fffffffffffffffffffffffffffffffffff...
    .................................................................................................1111.............11111666fffffffffffffffffffffffffffffffffff...
    .....................................................................................................1111...........666111111ffffffffffffffffffffffffffffffff...
    .........................................................................................................1111.......666666fff11111fffffffffffffffffffffffffff...
    .............................................................................................................1111...666666ffffffff11111ffffffffffffffffffffff...
    .................................................................................................................111666666fffffffffffff111111ffffffffffffffff...
    ....................................................................................................................666666fffffffffffffffffff11111fffffffffff...
    ....................................................................................................................666666ffffffffffffffffffffffff11111ffffff...
    ..........................................1.........................................................................666666fffffffffffffffffffffffffffff111111...
    ....................................................................................................................666666fffffffffffffffffffffffffffffffffff111
    ....................................................................................................................666666fffffffffffffffffffffffffffffffffff...
    ....................................................................................................................6666666fffffffffffffffffffffffffffffffff6...
    .....................................................................................................................666666fffffffffffffffffffffffffffffffff.111
    .........................................................................1..................................1........666666fffffffffffffffffffffffffffffffff....
    ..................................1...................................................................................666666fffffffffffffffffffffffffffffff.....
    ......................................................................................................................6666666fffffffffffffffffffffffffffff6.....
    .......................................................................................1...............................666666fffffffffffffffffffffffffffff......
    .....................1.................................................................................................6666666fffffffffffffffffffffffffff6......
    ........................................................................................................................6666666fffffffffffffffffffffffff6.......
    .........................................................1...............................................................6666666fffffffffffffffffffffff6........
    ..........1...............................................................................................................66666666fffffffffffffffffff66.........
    ...........................................................................................................................66666666fffffffffffffffff66..........
    ............................................................................................................................6666666666fffffffffff6666...........
    `, SpriteKind.Player)
game.splash("SPACE BATTLE", "by salieri labs")
splashBackground.destroy()
spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    1 . . . . . 2 2 . . . . . . . . 
    1 1 . . . . 2 2 9 9 9 . . . . . 
    1 1 1 1 1 1 1 9 9 9 9 9 1 . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 1 1 2 2 2 2 2 2 2 2 2 2 1 1 . 
    . 1 1 1 1 2 2 2 2 2 2 2 1 . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
animation.runImageAnimation(
spacePlane,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 2 9 9 9 . . . . . 
    . . 1 1 1 1 1 9 9 9 9 9 1 . . . 
    4 b 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    2 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    2 b 1 2 2 2 2 2 2 2 2 2 2 1 1 . 
    . . 1 1 1 2 2 2 2 2 2 2 1 . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 2 9 9 9 . . . . . 
    . . 1 1 1 1 1 9 9 9 9 9 1 . . . 
    5 b 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    2 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 b 1 2 2 2 2 2 2 2 2 2 2 1 1 . 
    . . 1 1 1 2 2 2 2 2 2 2 1 . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 2 9 9 9 . . . . . 
    . . 1 1 1 1 1 9 9 9 9 9 1 . . . 
    2 b 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    4 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    2 b 1 2 2 2 2 2 2 2 2 2 2 1 1 . 
    . . 1 1 1 2 2 2 2 2 2 2 1 . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 2 9 9 9 . . . . . 
    . . 1 1 1 1 1 9 9 9 9 9 1 . . . 
    2 b 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
    5 b 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    4 b 1 2 2 2 2 2 2 2 2 2 2 1 1 . 
    . . 1 1 1 2 2 2 2 2 2 2 1 . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 2 . . . . . . . . 
    . . . . . . 2 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `],
100,
true
)
spacePlane.setPosition(35, 60)
spacePlane.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
controller.moveSprite(spacePlane, 200, 200)
let enemySpeed = 0
let starSpawner = 0
let lightSpeed = 500
controller.configureRepeatEventDefaults(200, 200)
let UFOShotCounter = 0
let UFOCount = 0
game.onUpdateInterval(1000, function () {
    enemySpeed += 2
    info.changeScoreBy(1)
})
game.onUpdateInterval(1000, function () {
    if (UFOSpawner < 10) {
        UFOSpawner += 1
    } else {
        UFO = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            7 7 7 6 6 7 7 6 6 7 7 6 6 7 7 7 
            7 7 7 6 6 7 7 6 6 7 7 6 6 7 7 7 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        animation.runImageAnimation(
        UFO,
        [img`
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            7 7 7 2 2 7 7 6 6 7 7 6 6 7 7 7 
            7 7 7 2 2 7 7 6 6 7 7 6 6 7 7 7 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            7 7 7 6 6 7 7 2 2 7 7 6 6 7 7 7 
            7 7 7 6 6 7 7 2 2 7 7 6 6 7 7 7 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            7 7 7 6 6 7 7 6 6 7 7 2 2 7 7 7 
            7 7 7 6 6 7 7 6 6 7 7 2 2 7 7 7 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        false
        )
        UFO.setVelocity(randint(-10, -50), 0)
        UFO.setPosition(160, randint(1, 120))
        UFOSpawner = 0
        UFOCount += 1
        UFO.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
forever(function () {
    pause(500 - enemySpeed)
    bogey = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . 7 7 7 7 7 7 7 7 . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . . . . . . . . 7 7 7 . . . 
        . . . . . . . . . . . 7 7 7 . . 
        . . . 7 7 7 7 7 . . . . 7 7 7 . 
        . . 7 a a a a a 7 . . . . 7 7 . 
        . . 7 2 2 a a a 7 7 7 7 7 7 7 . 
        . . 7 2 2 a a a 7 7 7 7 7 7 7 . 
        . . 7 2 2 a a a 7 7 7 7 7 7 7 . 
        . . 7 a a a a a 7 . . . . 7 7 . 
        . . . 7 7 7 7 7 . . . . 7 7 7 . 
        . . . . . . . . . . . 7 7 7 . . 
        . . . . . . . . . . 7 7 7 . . . 
        . . . 7 7 7 7 7 7 7 7 7 . . . . 
        . . . 7 7 7 7 7 7 7 7 . . . . . 
        `, SpriteKind.Enemy)
    bogey.setPosition(160, randint(0, 120))
    bogey.setVelocity(randint(-50, -75) - enemySpeed, 0)
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    pause(randint(500, 800))
    if (UFOCount > 0) {
        enemyProjectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 7 . . . . . . . 
            . . . . . . . 7 2 7 . . . . . . 
            . . . . . . 7 2 2 2 7 . . . . . 
            . . . . . 7 2 2 2 2 2 7 . . . . 
            . . . . . . 7 2 2 2 7 . . . . . 
            . . . . . . . 7 2 7 . . . . . . 
            . . . . . . . . 7 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.enemyAttack)
        enemyProjectile.setFlag(SpriteFlag.AutoDestroy, true)
        enemyProjectile.setPosition(UFO.x, UFO.y)
        enemyProjectile.setVelocity((UFO.x - spacePlane.x) * -1, (UFO.y - spacePlane.y) * -1)
        music.playTone(784, music.beat(BeatFraction.Half))
    }
})
game.onUpdateInterval(500, function () {
    backgroundStar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.backgroundObject)
    backgroundStar.setVelocity(randint(-20, -45) - 0, 0)
    backgroundStar.setPosition(160, randint(0, 120))
    backgroundStar.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(randint(1000, 3000), function () {
    if (starSpawner < 10) {
        starSpawner += 1
    } else {
        star = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . 5 5 5 . . . . . . . 
            . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . . . 5 5 5 5 5 . . . . . . 
            . . . . 5 5 5 5 5 5 5 . . . . . 
            . . . . 5 5 . . . 5 5 . . . . . 
            . . . 5 . . . . . . . 5 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        star.setVelocity(randint(-10, -50), randint(20, 40))
        star.setPosition(randint(80, 160), 0)
        starSpawner = 0
        star.setFlag(SpriteFlag.AutoDestroy, true)
    }
})