class BirthdayScene extends Phaser.Scene {

    constructor() {
        super("BirthdayScene");
    }

    create() {

        this.input.addPointer(2);

        // ==========================================
        // HELPER — RESIZE WITHOUT STRETCHING
        // ==========================================

        const fitWidth = (image, width) => {
            const scale = width / image.width;
            image.setScale(scale);
            return image;
        };


        // ==========================================
        // ROOM
        // ==========================================

        this.cameras.main.setBackgroundColor("#f5c6dc");

        // Wall
        this.add.rectangle(
            400, 165,
            800, 330,
            0xf5c6dc
        );

        // Baseboard
        this.add.rectangle(
            400, 331,
            800, 7,
            0xc77b9d
        );


        // ==========================================
        // FLOOR
        // ==========================================

        this.add.rectangle(
            400, 390,
            800, 120,
            0xb9785d
        );

        // Floorboards
        for (let y = 345; y < 450; y += 24) {

            this.add.rectangle(
                400, y,
                800, 2,
                0x925d4b
            );
        }


        // Invisible physics floor
        this.floor = this.add.rectangle(
            400, 430,
            800, 40,
            0x000000,
            0
        );

        this.physics.add.existing(
            this.floor,
            true
        );


        // ==========================================
        // BANNER
        // ==========================================

        this.banner = this.add.image(
            400,
            68,
            "birthdayBanner"
        );

        fitWidth(
            this.banner,
            460
        );

        this.banner.setDepth(5);

        this.tweens.add({

            targets: this.banner,

            y: "-=3",

            duration: 1800,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // ==========================================
        // GLITTERS
        // ==========================================

        this.glitter = this.add.image(
            400,
            180,
            "birthdayGlitters"
        );

        fitWidth(
            this.glitter,
            500
        );

        this.glitter.setDepth(3);

        this.glitter.setAlpha(0.85);

        const glitterScale =
            this.glitter.scaleX;

        this.tweens.add({

            targets: this.glitter,

            alpha: {
                from: 0.55,
                to: 1
            },

            scaleX:
                glitterScale * 1.025,

            scaleY:
                glitterScale * 1.025,

            duration: 1000,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // ==========================================
        // BALLOONS
        // ==========================================

        this.balloonLeft = this.add.image(
            105,
            205,
            "birthdayBalloons1"
        );

        fitWidth(
            this.balloonLeft,
            145
        );

        this.balloonLeft.setDepth(4);


        this.balloonRight = this.add.image(
            695,
            205,
            "birthdayBalloons2"
        );

        fitWidth(
            this.balloonRight,
            145
        );

        this.balloonRight.setDepth(4);


        // Gentle floating

        this.tweens.add({

            targets: this.balloonLeft,

            y: "-=7",

            duration: 1500,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        this.tweens.add({

            targets: this.balloonRight,

            y: "+=7",

            duration: 1650,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // ==========================================
        // CAKE
        // ==========================================

        this.cake = this.add.image(
            400,
            395,
            "birthdayCake"
        );

        this.cake.setOrigin(
            0.5,
            1
        );

        fitWidth(
            this.cake,
            300
        );

        this.cake.setDepth(6);

        const cakeScale =
            this.cake.scaleX;

        this.tweens.add({

            targets: this.cake,

            scaleX:
                cakeScale * 1.01,

            scaleY:
                cakeScale * 1.01,

            duration: 1200,

            yoyo: true,

            repeat: -1,

            ease: "Sine.easeInOut"

        });


        // ==========================================
        // GIFTS
        // ==========================================

        this.giftPink = this.add.image(
            235,
            397,
            "birthdayGiftPink"
        );

        this.giftPink.setOrigin(
            0.5,
            1
        );

        fitWidth(
            this.giftPink,
            82
        );

        this.giftPink.setDepth(7);

        this.giftPink.setAngle(-4);


        this.giftPurple = this.add.image(
            565,
            397,
            "birthdayGiftPurple"
        );

        this.giftPurple.setOrigin(
            0.5,
            1
        );

        fitWidth(
            this.giftPurple,
            82
        );

        this.giftPurple.setDepth(7);

        this.giftPurple.setAngle(4);


        // ==========================================
        // SECRET LETTER
        // ==========================================

        this.letter = this.add.image(
            660,
            393,
            "birthdayLetter"
        );

        this.letter.setOrigin(
            0.5,
            1
        );

        fitWidth(
            this.letter,
            75
        );

        this.letterNormalScale =
            this.letter.scaleX;

        this.letter.setDepth(7);

        this.letter.setVisible(false);


        // ==========================================
        // PLAYER
        // ==========================================

        this.player =
            this.physics.add.sprite(
                90,
                290,
                "playerIdle"
            );

        this.player.setScale(0.65);

        // IMPORTANT:
        // Player is now ABOVE cake,
        // gifts and decorations.

        this.player.setDepth(50);

        this.player.setCollideWorldBounds(
            true
        );

        this.player.setBounce(0);

        this.player.setGravityY(700);

        this.player.setMaxVelocity(
            300,
            900
        );

        this.player.body.setSize(
            52,
            68
        );

        this.player.body.setOffset(
            102,
            172
        );

        this.physics.add.collider(
            this.player,
            this.floor
        );


        // ==========================================
        // WISH PROMPT
        // ==========================================

        this.wishPrompt = this.add.text(

            400,
            205,

            "▲ Make a wish",

            {

                fontFamily: "Arial",

                fontSize: "20px",

                color: "#ffffff",

                backgroundColor:
                    "#000000aa",

                padding: {

                    left: 12,
                    right: 12,
                    top: 7,
                    bottom: 7

                }

            }

        );

        this.wishPrompt.setOrigin(0.5);

        this.wishPrompt.setDepth(100);

        this.wishPrompt.setVisible(false);


// ==========================================
// LETTER LABEL / PROMPT
// ==========================================

this.letterPrompt = this.add.text(

    660,
    300,

    "♡ A letter for you ♡",

    {
        fontFamily: "Arial",

        fontSize: "18px",

        color: "#ffffff",

        stroke: "#c75b87",

        strokeThickness: 4,

        align: "center"
    }

);

this.letterPrompt.setOrigin(0.5);

this.letterPrompt.setDepth(100);

// Hidden until the birthday celebration
// reveals the actual letter.

this.letterPrompt.setVisible(false);


        // ==========================================
        // GAME STATE
        // ==========================================

        this.cursors =
            this.input.keyboard
                .createCursorKeys();

        this.leftPressed = false;

        this.rightPressed = false;

        this.jumpPressed = false;

        this.canJump = true;

        this.nearCake = false;

        this.nearLetter = false;

        this.wishStarted = false;

        this.celebrationStarted = false;

        this.letterRevealed = false;

        this.letterOpened = false;

        this.readingLetter = false;


        // ==========================================
        // MOBILE CONTROLS
        // ==========================================

        const style = {

            fontSize: "42px",

            color: "#ffffff",

            backgroundColor:
                "#333333",

            padding: {

                left: 20,
                right: 20,

                top: 10,
                bottom: 10

            }

        };


        const left =
            this.add.text(
                30,
                380,
                "◀",
                style
            )
            .setInteractive()
            .setDepth(1000);


        const right =
            this.add.text(
                120,
                380,
                "▶",
                style
            )
            .setInteractive()
            .setDepth(1000);


        const jump =
            this.add.text(
                700,
                380,
                "▲",
                style
            )
            .setInteractive()
            .setDepth(1000);


        const bind = (
            button,
            property
        ) => {

            button.on(
                "pointerdown",
                () => {

                    this[property] = true;

                }
            );


            button.on(
                "pointerup",
                () => {

                    this[property] = false;

                }
            );


            button.on(
                "pointerupoutside",
                () => {

                    this[property] = false;

                }
            );


            button.on(
                "pointerout",
                () => {

                    this[property] = false;

                }
            );

        };


        bind(
            left,
            "leftPressed"
        );

        bind(
            right,
            "rightPressed"
        );

        bind(
            jump,
            "jumpPressed"
        );

    }



    // ==========================================
    // UPDATE
    // ==========================================

    update() {

        if (!this.player) return;


        const left =

            this.cursors.left.isDown ||

            this.leftPressed;


        const right =

            this.cursors.right.isDown ||

            this.rightPressed;


        const jump =

            this.cursors.up.isDown ||

            this.jumpPressed;


        const onGround =

            this.player.body.blocked.down ||

            this.player.body.touching.down;


        // ==========================================
        // IF READING LETTER
        // ==========================================

        if (this.readingLetter) {

            this.player.setVelocityX(0);

            return;

        }


        // ==========================================
        // CAKE DISTANCE
        // ==========================================

        const cakeDistance =

            Phaser.Math.Distance.Between(

                this.player.x,
                this.player.y,

                this.cake.x,
                350

            );


        this.nearCake =
            cakeDistance < 165;


        this.wishPrompt.setVisible(

            this.nearCake &&

            !this.wishStarted

        );


// ==========================================
// LETTER DISTANCE
// ==========================================

if (
    this.letterRevealed &&
    !this.letterOpened
) {

    const letterDistance =
        Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.letter.x,
            370
        );

    this.nearLetter =
        letterDistance < 130;


    // From far away she sees:
    // "A letter for you"
    //
    // When close:
    // "▲ Open letter"

    if (this.nearLetter) {

        this.letterPrompt.setText(
            "▲ Open letter"
        );

        this.letterPrompt.setStyle({

            fontFamily: "Arial",

            fontSize: "18px",

            color: "#ffffff",

            backgroundColor: "#000000aa",

            stroke: "#c75b87",

            strokeThickness: 3,

            padding: {
                left: 12,
                right: 12,
                top: 7,
                bottom: 7
            }

        });

    }

    else {

        this.letterPrompt.setText(
            "♡ A letter for you ♡"
        );

        this.letterPrompt.setStyle({

            fontFamily: "Arial",

            fontSize: "18px",

            color: "#ffffff",

            backgroundColor: null,

            stroke: "#c75b87",

            strokeThickness: 4,

            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }

        });

    }

    this.letterPrompt.setVisible(true);

}

else {

    this.nearLetter = false;

    this.letterPrompt.setVisible(false);

}

        // ==========================================
        // MOVEMENT
        // ==========================================

        if (left) {

            this.player.setVelocityX(
                -220
            );

            this.player.setFlipX(
                true
            );

        }

        else if (right) {

            this.player.setVelocityX(
                220
            );

            this.player.setFlipX(
                false
            );

        }

        else {

            this.player.setVelocityX(
                0
            );

        }


        // ==========================================
        // ▲ INTERACTION / JUMP
        // ==========================================

        if (
            jump &&
            this.canJump
        ) {

            // LETTER HAS PRIORITY

            if (
                this.nearLetter &&
                this.letterRevealed &&
                !this.letterOpened
            ) {

                this.openLetter();

                this.canJump = false;

            }


            // CAKE WISH

            else if (
                this.nearCake &&
                !this.wishStarted
            ) {

                this.startWish();

                this.canJump = false;

            }


            // NORMAL JUMP

            else if (onGround) {

                this.player.setVelocityY(
                    -520
                );

                this.canJump = false;

            }

        }


        if (!jump) {

            this.canJump = true;

        }


        // ==========================================
        // CHARACTER ANIMATION
        // ==========================================

        if (!onGround) {

            this.player.setTexture(
                "playerJump"
            );

        }

        else if (
            left ||
            right
        ) {

            if (

                Math.floor(

                    this.time.now /
                    180

                ) % 2 === 0

            ) {

                this.player.setTexture(
                    "playerWalk1"
                );

            }

            else {

                this.player.setTexture(
                    "playerWalk2"
                );

            }

        }

        else {

            this.player.setTexture(
                "playerIdle"
            );

        }

    }



    // ==========================================
    // MAKE A WISH
    // ==========================================

    startWish() {

        if (this.wishStarted) return;


        this.wishStarted = true;

        this.wishPrompt.setVisible(
            false
        );


        const message =
            this.add.text(

                400,
                175,

                "Close your eyes...\nand make a wish ♡",

                {

                    fontFamily:
                        "Arial",

                    fontSize:
                        "30px",

                    color:
                        "#ffffff",

                    stroke:
                        "#b75d87",

                    strokeThickness:
                        6,

                    align:
                        "center"

                }

            );


        message.setOrigin(0.5);

        message.setDepth(600);

        message.setAlpha(0);

        message.setScale(0.85);


        this.tweens.add({

            targets: message,

            alpha: 1,

            scaleX: 1,

            scaleY: 1,

            duration: 600,

            ease:
                "Back.easeOut"

        });


        // Wait for wish

        this.time.delayedCall(

            2200,

            () => {

                this.tweens.add({

                    targets:
                        message,

                    alpha: 0,

                    duration: 450,

                    onComplete: () => {

                        message.destroy();

                    }

                });


                // Candle-ish fade effect

                this.tweens.add({

                    targets:
                        this.cake,

                    alpha: 0.55,

                    duration: 250,

                    yoyo: true,

                    repeat: 1

                });


                this.time.delayedCall(

                    700,

                    () => {

                        this.celebrateBirthday();

                    }

                );

            }

        );

    }



    // ==========================================
    // BIRTHDAY CELEBRATION
    // ==========================================

    celebrateBirthday() {

        if (this.celebrationStarted) {

            return;

        }


        this.celebrationStarted = true;


        // Flash

        this.cameras.main.flash(

            500,

            255,
            220,
            235

        );


        // Big message

        const celebration =
            this.add.text(

                400,
                165,

                "HAPPY BIRTHDAY!! ❤️",

                {

                    fontFamily:
                        "Arial",

                    fontSize:
                        "40px",

                    color:
                        "#ffffff",

                    stroke:
                        "#d94f91",

                    strokeThickness:
                        7,

                    align:
                        "center"

                }

            );


        celebration.setOrigin(0.5);

        celebration.setDepth(700);

        celebration.setScale(0);


        this.tweens.add({

            targets:
                celebration,

            scaleX: 1,

            scaleY: 1,

            duration: 700,

            ease:
                "Back.easeOut"

        });


        // Balloons shake

        this.tweens.add({

            targets: [

                this.balloonLeft,

                this.balloonRight

            ],

            angle: {

                from: -5,

                to: 5

            },

            duration: 180,

            yoyo: true,

            repeat: 6

        });


        // Gifts bounce

        this.tweens.add({

            targets: [

                this.giftPink,

                this.giftPurple

            ],

            y: "-=15",

            duration: 250,

            yoyo: true,

            repeat: 3,

            ease:
                "Bounce.easeOut"

        });


        // Remove birthday text

        this.time.delayedCall(

            2200,
() => {

                this.tweens.add({

                    targets:
                        celebration,

                    alpha: 0,

                    duration: 500,

                    onComplete: () => {

                        celebration.destroy();

                    }

                });

            }

        );


        // Reveal letter

        this.time.delayedCall(

            1800,

            () => {

                this.revealLetter();

            }

        );

    }



    // ==========================================
    // REVEAL LETTER
    // ==========================================

    revealLetter() {

        this.letterRevealed = true;


        this.letter.setVisible(
            true
        );

        this.letter.setAlpha(
            0
        );


        // Start tiny

        this.letter.setScale(

            this.letterNormalScale *
            0.1

        );


        // Pop into original size

        this.tweens.add({

            targets:
                this.letter,

            alpha: 1,

            scaleX:
                this.letterNormalScale,

            scaleY:
                this.letterNormalScale,

            duration: 700,

            ease:
                "Back.easeOut"

        });


        // Gentle floating after reveal

        this.time.delayedCall(

            750,

            () => {

                if (!this.letter) return;


                this.tweens.add({

                    targets:
                        this.letter,

                    y: "-=4",

                    duration: 700,

                    yoyo: true,

                    repeat: -1,

                    ease:
                        "Sine.easeInOut"

                });

            }

        );

    }



    // ==========================================
    // OPEN LETTER
    // ==========================================

    openLetter() {

        if (
            this.letterOpened ||
            this.readingLetter
        ) {

            return;

        }


        this.letterOpened = true;

        this.readingLetter = true;


        this.player.setVelocity(
            0,
            0
        );


        this.letterPrompt.setVisible(
            false
        );


        // ==========================================
        // DARK BACKGROUND
        // ==========================================

        const overlay =
            this.add.rectangle(

                400,
                225,

                800,
                450,

                0x000000,
                0.72

            );


        overlay.setDepth(
            2000
        );

        overlay.setAlpha(
            0
        );


        // ==========================================
        // LETTER PAPER
        // ==========================================

        const paper =
            this.add.rectangle(

                400,
                225,

                680,
                390,

                0xfff4e6

            );


        paper.setDepth(
            2001
        );


        paper.setStrokeStyle(

            5,

            0xe7a9bd

        );


        paper.setScale(
            0
        );


        // ==========================================
        // TITLE
        // ==========================================

        const title =
            this.add.text(

                400,
                55,

                "For you ♡",

                {

                    fontFamily:
                        "Arial",

                    fontSize:
                        "27px",

                    color:
                        "#c75b87",

                    fontStyle:
                        "bold"

                }

            );


        title.setOrigin(
            0.5
        );

        title.setDepth(
            2002
        );

        title.setAlpha(
            0
        );


// ==========================================
// PERSONAL MESSAGE
// ==========================================

const message = this.add.text(

    400,
    215,

    `So ig it's one of the most special day cz it's the very special person's bday who got me outta ma norm.

So this was the first bday after being in the rltn I wish we could celebrate it tgt maybe we gonna soon in sha Allah and I hope this smol gift made u smile for a moment honestly that'd be the best gift for me, the smile of the very special person who brought ma smile bck.

And very very happy bday to the gurl who made ma not soo special life rlly rlly special.

I wish we can celebrate ts tgt soon and yeah das it I love you and happy birthday 🎂`,

    {
        fontFamily: "Arial",

        fontSize: "17px",

        color: "#6b4050",

        align: "center",

        wordWrap: {
            width: 590,
            useAdvancedWrap: true
        },

        lineSpacing: 3
    }

);

message.setOrigin(0.5);

message.setDepth(2002);

message.setAlpha(0);


        // ==========================================
        // CLOSE BUTTON
        // ==========================================

        const close =
            this.add.text(

                400,
                400,

                "♡ Close ♡",

                {

                    fontFamily:
                        "Arial",

                    fontSize:
                        "19px",

                    color:
                        "#ffffff",

                    backgroundColor:
                        "#c75b87",

                    padding: {

                        left: 18,

                        right: 18,

                        top: 7,

                        bottom: 7

                    }

                }

            );


        close.setOrigin(
            0.5
        );

        close.setDepth(
            2003
        );

        close.setInteractive();

        close.setAlpha(
            0
        );


        // ==========================================
        // OPEN ANIMATION
        // ==========================================

        this.tweens.add({

            targets:
                overlay,

            alpha: 0.72,

            duration: 350

        });


        this.tweens.add({

            targets:
                paper,

            scaleX: 1,

            scaleY: 1,

            duration: 550,

            ease:
                "Back.easeOut",

            onComplete: () => {


                this.tweens.add({

                    targets: [

                        title,

                        message,

                        close

                    ],

                    alpha: 1,

                    duration: 450

                });

            }

        });


        // ==========================================
        // CLOSE LETTER
        // ==========================================

        close.on(

            "pointerdown",

            () => {


                this.tweens.add({

                    targets: [

                        paper,

                        title,

                        message,

                        close

                    ],

                    alpha: 0,

                    duration: 300

                });


                this.tweens.add({

                    targets:
                        overlay,

                    alpha: 0,

                    duration: 350,

                    onComplete: () => {


                        overlay.destroy();

                        paper.destroy();

                        title.destroy();

                        message.destroy();

                        close.destroy();


                        // Player can move again

                        this.readingLetter =
                            false;

                    }

                });

            }

        );

    }

}
          
