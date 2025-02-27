let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const FISHING_ROD_BOTTOM_X = 347;
const FISHING_ROD_TOP_Y = 100;
const FISHING_ROD_BAR_BOTTOM_Y = 570;
const MAX_FISH_BAR_COORDINATES = [FISHING_ROD_BOTTOM_X, FISHING_ROD_TOP_Y];
const MIN_FISH_BAR_COORDINATES = [
  FISHING_ROD_BOTTOM_X,
  FISHING_ROD_BAR_BOTTOM_Y,
];
const MIN_ROD_BAR_COORDINATES = [397, 623];
const MAX_FISH_COORDINATES = [FISHING_ROD_BOTTOM_X, FISHING_ROD_TOP_Y];
const MIN_FISH_COORDINATES = [FISHING_ROD_BOTTOM_X, FISHING_ROD_BAR_BOTTOM_Y];
const MAX_FISHING_BAR_VALUE = 100;
const MIN_FISHING_BAR_VALUE = 5;
const SPEED = 2.5;
const X = 0;
const Y = 1;

let player;
let fish;
let message;
let fishBar;
let fishingRod;
let rodBar;
let background;
let caughtBackground;
let isMousePressed = false;
let fishingBarValue = MIN_FISHING_BAR_VALUE;
let loveText;
let catchSound;  // Declare variable for sound

let game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background01.png");
  this.load.image("caughtBackground", "assets/background02.png");
  this.load.image("fishBar", "assets/bar01.png");
  this.load.image("caught", "assets/ruby.jpeg");
  this.load.image("fish", "assets/fish01.png");
  this.load.image("fishing", "assets/fishing01.png");
  this.load.image("hit", "assets/hit01.png");
  this.load.image("rodForeground", "assets/rodForeground01.png");

  // Load the sound using Phaser's sound system
  this.load.audio('catchSound', 'assets/di.mp3');
}

function create() {
  background = this.add.image(500, 400, "background");
  fishingRod = this.add.image(385, 335, "fishing");
  rodBar = this.add
    .image(
      MIN_ROD_BAR_COORDINATES[X],
      MIN_ROD_BAR_COORDINATES[Y],
      "rodForeground"
    )
    .setOrigin(0.5, 1)
    .setScale(1, fishingBarValue / MAX_FISHING_BAR_VALUE);
  fishBar = this.add.image(
    MIN_FISH_BAR_COORDINATES[X],
    MIN_FISH_BAR_COORDINATES[Y],
    "fishBar"
  );
  fish = this.add.image(
    MIN_FISH_COORDINATES[X],
    Math.random() * (MIN_FISH_COORDINATES[Y] - MAX_FISH_COORDINATES[Y] + 1),
    "fish"
  );
  caughtBackground = this.add
    .image(500, 400, "caughtBackground")
    .setVisible(false);
  message = this.add.image(492, 275, "caught").setVisible(false);

  // Allow interactivity with the background
  background.setInteractive();
  background.on("pointerdown", function () {
    isMousePressed = true;
  });
  background.on("pointerup", function () {
    isMousePressed = false;
  });

  // Access the sound we loaded in the preload function
  catchSound = this.sound.add('catchSound');
}

function update() {
  // Move the fish
  var direction = Phaser.Math.Between(0, 1);

  if (direction === 0 && fish.y > MAX_FISH_COORDINATES[Y]) {
    fish.y -= SPEED;
  } else if (fish.y < MIN_FISH_COORDINATES[Y]) {
    fish.y += SPEED;
  }

  // Move the fish bar
  if (isMousePressed && fishBar.y > MAX_FISH_BAR_COORDINATES[Y]) {
    fishBar.y -= SPEED;
  } else if (fishBar.y < MIN_FISH_BAR_COORDINATES[Y]) {
    fishBar.y += SPEED;
  }

  // Adjust the fishing bar
  if (fish.y > fishBar.y - 48 && fish.y < fishBar.y + 48) {
    fishingBarValue += 0.1;
  } else if (fishingBarValue > MIN_FISHING_BAR_VALUE) {
    fishingBarValue -= 0.1;
  }
  rodBar.setScale(1, fishingBarValue / MAX_FISHING_BAR_VALUE);

  if (fishingBarValue >= MAX_FISHING_BAR_VALUE) {
    setTimeout(function () {}, 1000);

    // Play the catch sound using Phaser's sound system
    catchSound.play();

    fishingRod.setVisible(false);
    rodBar.setVisible(false);
    fishBar.setVisible(false);
    fish.setVisible(false);
    
    // Make the caught background and message visible
    caughtBackground.setVisible(true);
    message.setVisible(true);

    // Get the aspect ratio of the 'caught' image
    let aspectRatio = message.width / message.height;

    // Calculate the scaling factor to preserve aspect ratio
    let scaleWidth = config.width / message.width;
    let scaleHeight = config.height / message.height;

    // Use the smaller scaling factor to preserve aspect ratio
    let scaleFactor = Math.min(scaleWidth, scaleHeight);

    // Scale the image while maintaining aspect ratio
    message.setScale(scaleFactor);

    // Center the image after scaling
    message.setPosition(config.width / 2, config.height / 2);

    // Add the text "Ruby I love you" below the image
    let textWidth = message.width;
    let textHeight = 50; // Set fixed height for the text
    loveText = this.add.text(
      config.width / 2, 
      message.y + message.height / 2 + textHeight / 2, 
      "Ruby I love you", 
      {
        fontSize: '32px',
        color: '#ff66cc',  // Pink color
        fontStyle: 'bold',
        align: 'center'
      }
    ).setOrigin(0.5, 0.5);

    loveText.setDepth(999);
  }
}
