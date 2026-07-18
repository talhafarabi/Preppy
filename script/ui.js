function createUI(scene) {

    gameState.scoreText = scene.add.text(20, 20, "❤️ 0/8", {
        fontSize: "28px",
        color: "#000000",
        fontStyle: "bold"
    });

    gameState.scoreText.setScrollFactor(0);
    gameState.scoreText.setDepth(100);

    const style = {
        fontSize: "42px",
        backgroundColor: "#333333",
        padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 10
        }
    };

    const left = scene.add.text(30, 380, "◀", style)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(100);

    const right = scene.add.text(120, 380, "▶", style)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(100);

    const jump = scene.add.text(700, 380, "▲", style)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(100);

    function bind(button, key) {

        button.on("pointerdown", () => {
            gameState[key] = true;
        });

        button.on("pointerup", () => {
            gameState[key] = false;
        });

        button.on("pointerupoutside", () => {
            gameState[key] = false;
        });

    }

    bind(left, "leftPressed");
    bind(right, "rightPressed");
    bind(jump, "jumpPressed");

}
