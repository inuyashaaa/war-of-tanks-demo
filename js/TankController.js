class TankController {
    constructor(x, y, configs) {
        this.sprite = Tank.playerGroup.create(x, y, 'tank1');
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(32, 32, 0, 0);
        //  We'll set a lower max angular velocity here to keep it from going totally nuts
        this.sprite.body.maxAngular = 500;

        //  Apply a drag otherwise the sprite will just spin and never slow down
        this.sprite.body.angularDrag = 50;
        this.configs = configs;
        this.timeSinceLastFire = 0;
    }

    update() {
        //Thiet lap viec di chuyen cua tank
        if (Tank.keyboard.isDown(this.configs.up)) {
            this.sprite.body.velocity.y = -TankController.TANK_SPEED;
        } else if (Tank.keyboard.isDown(this.configs.down)) {
            this.sprite.body.velocity.y = TankController.TANK_SPEED;
        } else {
            this.sprite.body.velocity.y = 0;
        }
        if (Tank.keyboard.isDown(this.configs.left)) {
            this.sprite.body.velocity.x = -TankController.TANK_SPEED;
        } else if (Tank.keyboard.isDown(this.configs.right)) {
            this.sprite.body.velocity.x = TankController.TANK_SPEED;
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
    }
    createBullet(direction) {
        new BulletController(
            this.sprite.position,
            direction
        );
    }
}

TankController.TANK_SPEED = 50;
