function create() {

    this.input.addPointer(2);

    const TILE = 64;
    const TILE_SCALE = 0.5;

    // ==========================================
    // RESET LEVEL
    // ==========================================

    gameState.score = 0;
    gameState.doorUnlocked = false;
    gameState.levelComplete = false;


    // ==========================================
    // BIOME SYSTEM
    // Grass -> Desert -> Snow
    // ==========================================

    const GRASS_END = 3300;
    const DESERT_END = 6600;

    function getBiome(x) {

        if (x < GRASS_END) {
            return "grass";
        }

        if (x < DESERT_END) {
            return "sand";
        }

        return "snow";
    }


    function getTerrain(x) {

        const biome = getBiome(x);

        if (biome === "sand") {

            return {
                topLeft: "sandTopLeft",
                top: "sandTop",
                topRight: "sandTopRight",
                center: "sandCenter",
                bottom: "sandBottom"
            };

        }

        if (biome === "snow") {

            return {
                topLeft: "snowTopLeft",
                top: "snowTop",
                topRight: "snowTopRight",
                center: "snowCenter",
                bottom: "snowBottom"
            };

        }

        return {
            topLeft: "grassTopLeft",
            top: "grassTop",
            topRight: "grassTopRight",
            center: "grassCenter",
            bottom: "grassBottom"
        };

    }


    // ==========================================
    // WORLD
    // ==========================================

    this.physics.world.setBounds(
        0,
        0,
        gameState.worldWidth,
        gameState.worldHeight
    );


    // ==========================================
    // BACKGROUND
    // ==========================================
    //
    // For now grass background stays fixed.
    // Next step we'll make backgrounds switch
    // Grass -> Desert -> Snow safely.
    // ==========================================

    const bg = this.add.image(
        0,
        0,
        "bgGrass"
    );

    bg.setOrigin(0, 0);

    bg.setScrollFactor(0);

    bg.setDisplaySize(
        this.scale.width,
        this.scale.height
    );

    bg.setDepth(-100);

    gameState.background = bg;


    // ==========================================
    // PLATFORM DATA
    // SAME POSITIONS AS BEFORE
    // ==========================================

    const platforms = [

        // SECTION 1
        { col: 6,  y: 300, w: 3 },
        { col: 13, y: 240, w: 4 },
        { col: 21, y: 290, w: 3 },

        // SECTION 2
        { col: 29, y: 280, w: 4 },
        { col: 36, y: 220, w: 3 },
        { col: 42, y: 160, w: 4 },
        { col: 50, y: 230, w: 3 },

        // SECTION 3
        { col: 58, y: 300, w: 3 },
        { col: 65, y: 230, w: 3 },
        { col: 72, y: 170, w: 4 },
        { col: 81, y: 260, w: 3 },

        // SECTION 4
        { col: 89,  y: 280, w: 4 },
        { col: 96,  y: 210, w: 3 },
        { col: 102, y: 140, w: 4 },
        { col: 110, y: 200, w: 3 },
        { col: 117, y: 270, w: 4 },

        // SECTION 5
        { col: 125, y: 300, w: 3 },
        { col: 132, y: 230, w: 3 },
        { col: 138, y: 160, w: 4 },
        { col: 146, y: 220, w: 3 }

    ];


    // ==========================================
    // TERRAIN WALLS
    // SAME AS BEFORE
    // ==========================================

    const walls = [

        { col: 25, h: 2 },

        { col: 54, h: 3 },

        { col: 85, h: 3 },

        { col: 122, h: 3 },

        { col: 143, h: 3 }

    ];


    // ==========================================
    // COLUMNS UNDER PLATFORMS
    // ==========================================

    const coveredColumns = new Set();

    platforms.forEach(platform => {

        for (
            let i = 0;
            i < platform.w;
            i++
        ) {

            coveredColumns.add(
                platform.col + i
            );

        }

    });


    // ==========================================
    // GROUND
    // SAME CONSTRUCTION AS ORIGINAL GRASS
    // ==========================================

    gameState.ground =
        this.physics.add.staticGroup();


    const totalColumns =
        Math.ceil(
            gameState.worldWidth / TILE
        );


    for (
        let col = 0;
        col < totalColumns;
        col++
    ) {

        const x =
            (col * TILE) +
            (TILE / 2);


        const terrain =
            getTerrain(x);


        const underPlatform =
            coveredColumns.has(col);


        // Same old behavior:
        // under platforms = bottom texture
        // normal ground = top texture

        const topTexture =
            underPlatform
                ? terrain.bottom
                : terrain.top;


        // TOP GROUND ROW

        const topTile =
            gameState.ground.create(
                x,
                386,
                topTexture
            );

        topTile.setScale(
            TILE_SCALE
        );

        topTile.setDepth(0);

        topTile.refreshBody();


        // SECOND / FILL ROW

        const centerTile =
            gameState.ground.create(
                x,
                442,
                terrain.center
            );

        centerTile.setScale(
            TILE_SCALE
        );

        centerTile.setDepth(1);

        centerTile.refreshBody();

    }


    // ==========================================
    // PLATFORMS
    // SAME LEFT / MIDDLE / RIGHT SYSTEM
    // ==========================================

    gameState.platforms =
        this.physics.add.staticGroup();


    platforms.forEach(platform => {

        for (
            let i = 0;
            i < platform.w;
            i++
        ) {

            const column =
                platform.col + i;


            const x =
                (column * TILE) +
                (TILE / 2);


            const terrain =
                getTerrain(x);


            let texture;


            // LEFT EDGE

            if (i === 0) {

                texture =
                    terrain.topLeft;

            }


            // RIGHT EDGE

            else if (
                i ===
                platform.w - 1
            ) {

                texture =
                    terrain.topRight;

            }


            // MIDDLE

            else {

                texture =
                    terrain.top;

            }


            const tile =
                gameState.platforms.create(
                    x,
                    platform.y,
                    texture
                );


            tile.setScale(
                TILE_SCALE
            );

            tile.refreshBody();

        }

    });


    // ==========================================
    // BUILD TERRAIN WALLS
    // SAME STRUCTURE, BIOME TEXTURES
    // ==========================================

    gameState.walls =
        this.physics.add.staticGroup();


    walls.forEach(wall => {

        const x =
            (wall.col * TILE) +
            (TILE / 2);


        const terrain =
            getTerrain(x);


        for (
            let row = 0;
            row < wall.h;
            row++
        ) {

            const y =
                322 -
                (row * TILE);


            const isTop =
                row ===
                wall.h - 1;


            const texture =
                isTop
                    ? terrain.top
                    : terrain.center;


            const tile =
                gameState.walls.create(
                    x,
                    y,
                    texture
                );


            tile.setScale(
                TILE_SCALE
            );

            tile.refreshBody();

        }

    });


    // ==========================================
    // PLAYER
    // UNCHANGED
    // ==========================================

    gameState.player =
        this.physics.add.sprite(
            120,
            200,
            "playerIdle"
        );


    gameState.player.setScale(1);


    gameState.player
        .setCollideWorldBounds(
            true
        );


    gameState.player.setBounce(0);


    gameState.player.setGravityY(
        700
    );


    gameState.player.setDragX(
        1200
    );


    gameState.player.setMaxVelocity(
        400,
        1100
    );


    // PLAYER HITBOX

    gameState.player.body.setSize(
        52,
        68
    );


    gameState.player.body.setOffset(
        102,
        172
    );


    // ==========================================
    // HEARTS
    // ==========================================

    gameState.hearts =
        this.physics.add.staticGroup();


    const heartPositions = [

        // Grass
        { x: 520,  y: 230 },
        { x: 2400, y: 150 },

        // Desert
        { x: 4200, y: 160 },

        // Near biome transition
        { x: 6650, y: 70 },

        // Snow
        { x: 7200, y: 140 },
        { x: 8050, y: 230 },
        { x: 8900, y: 100 },

        // Final
        { x: 9700, y: 220 }

    ];


    heartPositions.forEach(pos => {

        const heart =
            gameState.hearts.create(
                pos.x,
                pos.y,
                "heart"
            );


        heart.setDepth(10);

    });


    // ==========================================
    // FINAL DOOR
    // ==========================================

    const DOOR_X = 9850;

    const GROUND_TOP = 354;


    // BOTTOM

    gameState.doorBottom =
        this.add.sprite(
            DOOR_X,
            GROUND_TOP,
            "doorBottom"
        );


    gameState.doorBottom.setOrigin(
        0.5,
        1
    );


    gameState.doorBottom.setScale(
        0.5
    );


    gameState.doorBottom.setDepth(
        5
    );


    // TOP

    gameState.doorTop =
        this.add.sprite(

            DOOR_X,

            GROUND_TOP -
            gameState.doorBottom
                .displayHeight,

            "doorTop"

        );


    gameState.doorTop.setOrigin(
        0.5,
        1
    );


    gameState.doorTop.setScale(
        0.5
    );


    gameState.doorTop.setDepth(
        5
    );


    // ==========================================
    // DOOR TRIGGER
    // ==========================================

    gameState.doorTrigger =
        this.add.zone(

            DOOR_X,

            GROUND_TOP - 55,

            90,

            120

        );


    this.physics.add.existing(
        gameState.doorTrigger,
        true
    );


    // ==========================================
    // DOOR MESSAGE
    // ==========================================

    gameState.doorMessage =
        this.add.text(

            DOOR_X,

            190,

            "",

            {

                fontFamily:
                    "Arial",

                fontSize:
                    "20px",

                color:
                    "#ffffff",

                backgroundColor:
                    "#000000aa",

                padding: {

                    left: 12,
                    right: 12,

                    top: 8,
                    bottom: 8

                },

                align:
                    "center"

            }

        );


    gameState.doorMessage
        .setOrigin(0.5);


    gameState.doorMessage
        .setDepth(100);


    gameState.doorMessage
        .setVisible(false);


    // ==========================================
    // COLLISIONS
    // ==========================================

    this.physics.add.collider(

        gameState.player,

        gameState.ground

    );


    this.physics.add.collider(

        gameState.player,

        gameState.platforms

    );


    this.physics.add.collider(

        gameState.player,

        gameState.walls

    );


    // HEART COLLECTION

    this.physics.add.overlap(

        gameState.player,

        gameState.hearts,

        collectHeart,

        null,

        this

    );


    // DOOR

    this.physics.add.overlap(

        gameState.player,

        gameState.doorTrigger,

        reachDoor,

        null,

        this

    );


    // ==========================================
    // INPUT
    // ==========================================

    gameState.cursors =
        this.input.keyboard
            .createCursorKeys();


    // ==========================================
    // CAMERA
    // ==========================================

    this.cameras.main.setBounds(

        0,
        0,

        gameState.worldWidth,
        gameState.worldHeight

    );


    this.cameras.main.startFollow(

        gameState.player,

        true,

        0.1,
        0.1

    );


    this.cameras.main.setZoom(1);


    // ==========================================
    // UI
    // ==========================================

    if (
        typeof createUI ===
        "function"
    ) {

        createUI(this);

    }


    // ==========================================
    // STARTING OBJECTIVE
    // ==========================================

    const objective =
        this.add.text(

            400,
            120,

            "♡ Collect all 8 hearts ♡\nto unlock the door!",

            {

                fontFamily:
                    "Arial",

                fontSize:
                    "28px",

                color:
                    "#ffffff",

                stroke:
                    "#000000",

                strokeThickness:
                    5,

                align:
                    "center"

            }

        );


    objective.setOrigin(
        0.5
    );


    // Keep fixed on screen

    objective.setScrollFactor(
        0
    );


    objective.setDepth(
        2000
    );


    objective.setAlpha(
        0
    );


    // Fade in

    this.tweens.add({

        targets:
            objective,

        alpha: 1,

        duration: 400,

        onComplete: () => {

            // Stay visible briefly

            this.time.delayedCall(

                2300,

                () => {

                    // Fade out

                    this.tweens.add({

                        targets:
                            objective,

                        alpha: 0,

                        duration: 600,

                        onComplete: () => {

                            objective.destroy();

                        }

                    });

                }

            );

        }

    });

}



// ==========================================
// COLLECT HEART
// ==========================================

function collectHeart(
    player,
    heart
) {

    heart.destroy();


    gameState.score++;


    // ==========================================
    // UPDATE HEART COUNTER
    // ==========================================

    if (
        gameState.scoreText
    ) {

        gameState.scoreText.setText(

            "❤️ " +
            gameState.score +
            "/" +
            gameState.totalHearts

        );

    }


    // ==========================================
    // ALL 8 HEARTS COLLECTED
    // ==========================================

    if (

        gameState.score >=
        gameState.totalHearts

    ) {

        gameState.doorUnlocked =
            true;


        // ======================================
        // OPEN DOOR VISUALLY
        // ======================================

        if (

            gameState.doorBottom &&

            gameState.doorTop

        ) {

            gameState.doorBottom
                .setTexture(
                    "doorOpenBottom"
                );


            gameState.doorTop
                .setTexture(
                    "doorOpenTop"
                );


            gameState.doorBottom
                .setScale(0.5);


            gameState.doorTop
                .setScale(0.5);


            const GROUND_TOP =
                354;


            gameState.doorBottom
                .setY(
                    GROUND_TOP
                );


            gameState.doorTop
                .setY(

                    GROUND_TOP -

                    gameState
                        .doorBottom
                        .displayHeight

                );


            // Unlock animation

            gameState.doorBottom
                .setAlpha(0);


            gameState.doorTop
                .setAlpha(0);


            const scene =
                gameState
                    .doorBottom
                    .scene;


            scene.tweens.add({

                targets: [

                    gameState.doorBottom,

                    gameState.doorTop

                ],

                alpha: 1,

                duration: 400,

                ease:
                    "Power2"

            });

        }

    }

}



// ==========================================
// REACH DOOR
// ==========================================

function reachDoor(
    player,
    trigger
) {

    // Prevent repeat

    if (
        gameState.levelComplete
    ) {

        return;

    }


    // ==========================================
    // DOOR LOCKED
    // ==========================================

    if (
        !gameState.doorUnlocked
    ) {

        const remaining =

            gameState.totalHearts -

            gameState.score;


        gameState.doorMessage
            .setText(

                "❤️ Find " +

                remaining +

                " more heart" +

                (
                    remaining === 1
                        ? ""
                        : "s"
                ) +

                "!"

            );


        gameState.doorMessage
            .setVisible(true);


        clearTimeout(

            gameState
                .doorMessageTimer

        );


        gameState.doorMessageTimer =
            setTimeout(

                () => {

                    if (
                        gameState
                            .doorMessage
                    ) {

                        gameState
                            .doorMessage
                            .setVisible(
                                false
                            );

                    }

                },

                1500

            );


        return;

    }


    // ==========================================
    // DOOR UNLOCKED
    // ==========================================

    gameState.levelComplete =
        true;


    player.setVelocity(
        0,
        0
    );


    gameState.doorMessage
        .setText(

            "❤️ You found them all!"

        );


    gameState.doorMessage
        .setVisible(true);


    // ==========================================
    // ENTER DOOR
    // ==========================================

    this.tweens.add({

        targets:
            gameState.player,

        alpha: 0,

        scaleX: 0.5,

        scaleY: 0.5,

        duration: 700,

        ease:
            "Power2",

        onComplete: () => {


            this.cameras.main.fadeOut(

                500,

                255,
                192,
                203

            );


            this.cameras.main.once(

                Phaser
                    .Cameras
                    .Scene2D
                    .Events
                    .FADE_OUT_COMPLETE,

                () => {

                    this.scene.start(
                        "BirthdayScene"
                    );

                }

            );

        }

    });

}
