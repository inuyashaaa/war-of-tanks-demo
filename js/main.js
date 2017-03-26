var Tank = {};

Tank.configs = {
    GAME_SPEED: 4,
    GAME_WIDTH: 800,
    GAME_HIGHT: 600,
    PLAYER1_POS: {
        x: 0,
        y: 0
    },
};
window.onload = function() {
    Tank.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });
};

function preload() {
    Tank.game.load.tilemap('map', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
    Tank.game.load.image('gach', 'assets/images/wall_brick.png');
    Tank.game.load.image('da', 'assets/images/wall_steel.png');
    Tank.game.load.image('nhachinh', 'assets/images/base.png');

    Tank.game.load.image('tank1', 'assets/images/tank_player1_up_c0_t1.png');
    Tank.game.load.image('bullet_left', 'assets/images/bullet_left.png');
}

var map;
var layer;

function create() {
    Tank.game.physics.startSystem(Phaser.Physics.ARCADE);
    Tank.keyboard = Tank.game.input.keyboard;
    Tank.map = Tank.game.add.tilemap('map');
    Tank.map.addTilesetImage('gach');
    Tank.map.addTilesetImage('da');
    Tank.map.addTilesetImage('nhachinh');
    Tank.map.setCollisionBetween(1, 12);
    Tank.layer = Tank.map.createLayer('Tile Layer 1');
    Tank.layer.resizeWorld();

    Tank.playerGroup = Tank.game.add.physicsGroup();
    Tank.bulletGroup = Tank.game.add.physicsGroup();

    Tank.players = [];
    Tank.bullets = [];
    Tank.players.push(
        new TankController(
            Tank.configs.PLAYER1_POS.x,
            Tank.configs.PLAYER1_POS.y,
             {
                up: Phaser.Keyboard.UP,
                down: Phaser.Keyboard.DOWN,
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,
                fire: Phaser.Keyboard.SPACEBAR,
                cooldown: 0.3
            }
        )
    );

}

function update() {
    Tank.game.physics.arcade.collide(Tank.playerGroup, Tank.layer);
    Tank.players.forEach(
        function(ship) {
            ship.update();
        }
    );
    Tank.bullets.forEach(function(bullet) {
            if (bullet.update && typeof bullet.update == "function") {
                bullet.update();
            }
        }
    );
}
function render() {

    Tank.game.debug.body(Tank.players);

}
