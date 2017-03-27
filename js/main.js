var Tank = {};

Tank.configs = {
    GAME_SPEED: 4,
    GAME_WIDTH: 800,
    GAME_HIGHT: 600,
    PLAYER1_POS: {
        x: 64,
        y: 64
    },
};
window.onload = function() {
    Tank.game = new Phaser.Game(960, 640, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });
};

function preload() {
    Tank.game.load.tilemap('map', 'assets/map2.json', null, Phaser.Tilemap.TILED_JSON);
    Tank.game.load.image('wall_brick', 'assets/images/wall_brick.png');
    Tank.game.load.image('wall_steel', 'assets/images/wall_steel.png');
    Tank.game.load.image('trees', 'assets/images/trees.png');
    Tank.game.load.image('water_1', 'assets/images/water_1.png');
    Tank.game.load.image('tank1', 'assets/images/tank_player1_up_c0_t1.png');
    Tank.game.load.image('bullet_left', 'assets/images/bullet_left.png');
}

var map;
var layer;

function create() {
    Tank.game.physics.startSystem(Phaser.Physics.ARCADE);
    Tank.keyboard = Tank.game.input.keyboard;
    Tank.map = Tank.game.add.tilemap('map');
    Tank.map.addTilesetImage('wall_brick');
    Tank.map.addTilesetImage('wall_steel');
    Tank.map.addTilesetImage('trees');
    Tank.map.addTilesetImage('water_1');
    Tank.map.setCollisionBetween(1, 12);
    Tank.layer = Tank.map.createLayer('Tile Layer 1');
    Tank.layer.resizeWorld();

    Tank.playerGroup = Tank.game.add.physicsGroup();
    Tank.bulletGroup = Tank.game.add.physicsGroup();
    Tank.bullets = [];
    Tank.players = [];

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
