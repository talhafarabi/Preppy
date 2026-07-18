const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: "game",

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
