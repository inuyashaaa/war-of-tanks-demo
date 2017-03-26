class BulletController {
    constructor(position, direction, bulletName) {

        this.sprite = Tank.bulletGroup.create(position.x, position.y, "bullet_left");
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.angleOffset = 90;
        this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);
        Tank.bullets.push(this);
    }

    update(){
      if (!this.sprite.alive) {
        var index = Tank.bullets.indexOf(this);
        if (index != -1) {
          Tank.bullets.splice(index,1);
        }
      }
    }
}

BulletController.BULLET_SPEED = 200;
