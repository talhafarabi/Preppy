function update() {

    const player = gameState.player;

    if (!player) return;

    const keyboard = gameState.cursors;

    // =========================
    // MOVEMENT SETTINGS
    // =========================

    const GROUND_SPEED = 300;

    // Extra horizontal movement while jumping
    const AIR_SPEED = 380;

    // Higher jump
    const JUMP_POWER = -700;


    // =========================
    // INPUT
    // Keyboard + Mobile
    // =========================

    const left =
        keyboard.left.isDown ||
        gameState.leftPressed;

    const right =
        keyboard.right.isDown ||
        gameState.rightPressed;

    const jump =
        keyboard.up.isDown ||
        gameState.jumpPressed;


    const onGround =
        player.body.blocked.down ||
        player.body.touching.down;


    let moving = false;

    const currentSpeed =
        onGround
            ? GROUND_SPEED
            : AIR_SPEED;


    // =========================
    // MOVEMENT
    // =========================

    if (left) {

        player.setVelocityX(
            -currentSpeed
        );

        player.setFlipX(true);

        moving = true;

    }

    else if (right) {

        player.setVelocityX(
            currentSpeed
        );

        player.setFlipX(false);

        moving = true;

    }

    else {

        player.setVelocityX(0);

    }


    // =========================
    // JUMP
    // =========================

    if (
        jump &&
        onGround
    ) {

        player.setVelocityY(
            JUMP_POWER
        );

    }


    // =========================
    // ANIMATION
    // =========================

    if (!onGround) {

        player.setTexture(
            "playerJump"
        );

    }

    else if (moving) {

        if (
            Math.floor(
                this.time.now / 180
            ) % 2 === 0
        ) {

            player.setTexture(
                "playerWalk1"
            );

        }

        else {

            player.setTexture(
                "playerWalk2"
            );

        }

    }

    else {

        player.setTexture(
            "playerIdle"
        );

    }

}