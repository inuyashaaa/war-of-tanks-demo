class TankController {
    constructor(x, y, configs) {
        this.sprite = Tank.playerGroup.create(x, y, 'tank1');
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(32, 32, 0, 0);
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.sprite.animations.add('up',[3], 1, true);
        this.sprite.animations.add('down',[0], 1, true);
        this.sprite.animations.add('left',[1], 1, true);
        this.sprite.animations.add('right',[2], 1, true);
    }

    update() {
        if (Tank.keyboard.isDown(this.configs.up)) {
            this.sprite.body.velocity.y = -TankController.TANK_SPEED;
            this.sprite.animations.play('up');
        } else if (Tank.keyboard.isDown(this.configs.down)) {
            this.sprite.body.velocity.y = TankController.TANK_SPEED;
            this.sprite.animations.play('down');
        } else {
            this.sprite.body.velocity.y = 0;
        }
        if (Tank.keyboard.isDown(this.configs.left)) {
            this.sprite.body.velocity.x = -TankController.TANK_SPEED;
            this.sprite.animations.play('left');
        } else if (Tank.keyboard.isDown(this.configs.right)) {
            this.sprite.body.velocity.x = TankController.TANK_SPEED;
            this.sprite.animations.play('right');
        } else {
            this.sprite.body.velocity.x = 0;
        }

        this.timeSinceLastFire += Tank.game.time.physicsElapsed;

        // Kiem tra xem nguoi choi co an phim ban dan hay khong va thuc hien ban dan
        if (Tank.keyboard.isDown(this.configs.fire)) {
            this.tryFire();
        }
    }

    tryFire() {
        if (this.timeSinceLastFire >= this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }
    fire() {
        this.createBullet(new Phaser.Point(0, -1));
        hit.play();
    }
    createBullet(direction) {
        new BulletController(
            this.sprite.position,
            direction
        );
    }
}

TankController.TANK_SPEED = 100;
