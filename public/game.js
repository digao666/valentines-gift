let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const MAX_FISH_BAR_HEIGH = 0;
const MIN_FISH_BAR_HEIGHT = (347, 570);
const MAX_FISH_BAR_HEIGHT = 0;
const MAX_ROD_BAR_HEIGHT = 0;
const MIN_ROD_BAR_HEIGHT = (397, 612);
const MAX_FISH_HEIGHT = 0;
const MIN_FISH_HEIGHT = (347, 570);

let player;
let fish;
let message;
let fishBar;
let fishingRodBar;

let game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background01.png");
  this.load.image("caughtBackground", "assets/background02.png");
  this.load.image("fishBar", "assets/bar01.png");
  this.load.image("rodBar", "assets/bar02.png");
  this.load.image("caught", "assets/caught01.png");
  this.load.image("fish", "assets/fish01.png");
  this.load.image("fishing", "assets/fishing01.png");
  this.load.image("hit", "assets/hit01.png");
}

function create() {
  // Background image with the "hit animation"
  this.add.image(500, 400, "background");

  let hitImage = this.add.image(525, 430, "hit").setVisible(false);
  this.time.delayedCall(
    1000,
    function () {
      hitImage.setVisible(true);
    },
    [],
    this
  );

  let fishingImage = this.add.image(385, 335, "fishing").setVisible(false);
  let rodBarImage = this.add.image(397, 612, "rodBar").setVisible(false);
  let fishBarImage = this.add.image(347, 570, "fishBar").setVisible(false);
  let fishImage = this.add.image(347, 570, "fish").setVisible(false);

  this.time.delayedCall(
    2000,
    function () {
      hitImage.setVisible(false);
      fishingImage.setVisible(true);
      fishImage.setVisible(true);
      rodBarImage.setVisible(true);
      fishBarImage.setVisible(true);
    },
    [],
    this
  );

  let caughtBackgroundImage = this.add
    .image(500, 400, "caughtBackground")
    .setVisible(false);
  let caughtImage = this.add.image(492, 275, "caught").setVisible(false);
  this.time.delayedCall(
    3000,
    function () {
      fishingImage.setVisible(false);
      fishImage.setVisible(false);
      rodBarImage.setVisible(false);
      fishBarImage.setVisible(false);
      caughtBackgroundImage.setVisible(true);
      caughtImage.setVisible(true);
    },
    [],
    this
  );
}

function update() {}
