import Phaser from "phaser";
import { platformHeight, platformWidth } from "../game-loader.page";
import { GAMEPLAY_MUSIC_VOLUME, SOUND_EFFECTS_VOLUME } from "./k-boom.config";
import {
  BACKGROUND_IMG_PATH,
  BACKGROUND_SECTION_NAME,
  BOMB_IMG_PATH,
  BOMB_SECTION_NAME,
  EXPLOSION_SECTION_NAME,
  FLOOR_IMG_PATH,
  GAME_SCENE_NAME,
  KABOOM_ANIM_NAME,
  KABOOM_IMG_PATH,
  FLOOR_SECTION_NAME,
  SCORE_SCENE_NAME,
  EXPLOSION_SOUND_SECTION_NAME,
  EXPLOSION_SOUND_PATH,
  DEAD_SOUND_PATH,
  MAIN_GAME_MUSIC_PATH,
  DEAD_SOUND_SECTION_NAME,
  MAIN_GAME_MUSIC_SECTION_NAME,
  RIP_IMG_PATH,
  RIP_SECTION_NAME,
  BOMB_ATOMIC_IMG_PATH,
  BOMB_ATOMIC_SECTION_NAME,
  BOMB_NUCLEAR_SECTION_NAME,
  BOMB_NUCLEAR_IMG_PATH,
} from "./k-boom.routes";

class Bomb extends Phaser.Physics.Arcade.Image {
  public points?: number = 0;
  public damage?: number = 0;
  public generatedVelocity?: number = 0;
}
interface Sound extends Phaser.Sound.BaseSound {}
interface Background extends Phaser.GameObjects.TileSprite {}
interface Group extends Phaser.GameObjects.Group {}
interface StaticGroup extends Phaser.Physics.Arcade.StaticGroup {}
interface Text extends Phaser.GameObjects.Text {}

const MAX_LIFES: number = 3;
const MAX_BOMBER_TIME: number = 1000;
const MIN_BOMBER_TIME: number = 500;
const REDUCER_BOMBER_TIME: number = 20;
const FLOOR_FRAME_QUANTITY: number = 2;
export class GameScene extends Phaser.Scene {
  private delta: number = MAX_BOMBER_TIME;
  private lastBombTime: number = 0;
  private bombsCaught: number = 0;
  private bombsFallen: number = 0;

  private floor: StaticGroup;
  private score: Text;
  private lifes: Text;

  private explosions: Group;
  private explosionSound: Sound;
  private deadSound: Sound;
  private music: Sound;

  constructor() {
    super({
      key: GAME_SCENE_NAME,
    });
  }

  init(params) {
    this.delta = MAX_BOMBER_TIME;
    this.lastBombTime = 0;
    this.bombsCaught = 0;
    this.bombsFallen = 0;
  }

  preload(): void {
    this.load.audio(EXPLOSION_SOUND_SECTION_NAME, EXPLOSION_SOUND_PATH);
    this.load.audio(DEAD_SOUND_SECTION_NAME, DEAD_SOUND_PATH);
    this.load.audio(MAIN_GAME_MUSIC_SECTION_NAME, MAIN_GAME_MUSIC_PATH);
    this.load.image(BOMB_SECTION_NAME, BOMB_IMG_PATH);
    this.load.image(BOMB_ATOMIC_SECTION_NAME, BOMB_ATOMIC_IMG_PATH);
    this.load.image(BOMB_NUCLEAR_SECTION_NAME, BOMB_NUCLEAR_IMG_PATH);
    this.load.image(FLOOR_SECTION_NAME, FLOOR_IMG_PATH);
    this.load.image(BACKGROUND_SECTION_NAME, BACKGROUND_IMG_PATH);
    this.load.image(RIP_SECTION_NAME, RIP_IMG_PATH);
    this.load.spritesheet(EXPLOSION_SECTION_NAME, KABOOM_IMG_PATH, {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  public create(): void {
    this.createSounds();
    this.createBackground();
    this.createFloor();
    this.createAnimations();
    this.music.play();

    const destroyedBombs = this.add.image(25, 25, BOMB_SECTION_NAME);
    destroyedBombs.setScale(0.07);

    const lifes = this.add.image(100, 30, RIP_SECTION_NAME);
    lifes.setScale(0.15);

    this.score = this.add.text(50, 20, "", {
      font: "16px Minecraft",
      color: "#FBFBAC",
    });

    this.lifes = this.add.text(125, 20, "", {
      font: "16px Minecraft",
      color: "#FBFBAC",
    });
  }

  private createSounds(): void {
    this.music = this.sound.add(MAIN_GAME_MUSIC_SECTION_NAME, {
      volume: GAMEPLAY_MUSIC_VOLUME,
      loop: true,
    });
    this.explosionSound = this.sound.add(EXPLOSION_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.deadSound = this.sound.add(DEAD_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }

  private createBackground(): void {
    const background: Background = this.add.tileSprite(
      0,
      platformHeight / 2,
      platformWidth * 2,
      platformHeight * 2,
      BACKGROUND_SECTION_NAME
    );
    background.setAngle(90);
  }

  private createFloor(): void {
    this.floor = this.physics.add.staticGroup({
      key: FLOOR_SECTION_NAME,
      frameQuantity: FLOOR_FRAME_QUANTITY,
    });
    Phaser.Actions.PlaceOnLine(
      this.floor.getChildren(),
      new Phaser.Geom.Line(
        25,
        platformHeight - 50,
        platformWidth + 200,
        platformHeight - 50
      )
    );
    this.floor.refresh();
  }

  private createAnimations(): void {
    this.anims.create({
      key: KABOOM_ANIM_NAME,
      frames: this.anims.generateFrameNumbers(EXPLOSION_SECTION_NAME, {
        start: 0,
        end: 15,
      }),
      frameRate: 16,
      repeat: 0,
      hideOnComplete: true,
    });

    this.explosions = this.add.group({
      defaultKey: EXPLOSION_SECTION_NAME,
      maxSize: -1,
    });
  }

  public update(time: number): void {
    const diff: number = time - this.lastBombTime;
    if (diff > this.delta) {
      this.lastBombTime = time;
      if (this.delta > MIN_BOMBER_TIME) this.delta -= REDUCER_BOMBER_TIME;
      this.emitBomb();
    }
    this.updateScoreText();
    this.updateLifesText();
  }

  private updateScoreText(): void {
    this.score.text = String(this.bombsCaught);
  }

  private updateLifesText(): void {
    this.lifes.text = String(MAX_LIFES - this.bombsFallen);
  }

  private emitBomb(): void {
    const bomb: Bomb = this.buildBomb();
    this.physics.add.collider(bomb, this.floor, this.onFall(bomb), null, this);
  }

  private buildBomb(): Bomb {
    const randomBombType: number = this.generateRandomBetween(0, 100);
    const randomBombWidth: number = this.generateRandomBetween(0.17, 0.25);
    const x: number = this.generateRandomBetween(25, platformWidth - 25);
    const y: number = 25;
    let bomb: Bomb;
    if (randomBombType < 85) {
      bomb = this.physics.add.image(x, y, BOMB_SECTION_NAME);
      bomb.generatedVelocity = this.generateRandomBetween(100, 200);
      bomb.points = 1;
      bomb.damage = 1;
    } else if (randomBombType > 85 && randomBombType < 98) {
      bomb = this.physics.add.image(x, y, BOMB_NUCLEAR_SECTION_NAME);
      bomb.generatedVelocity = this.generateRandomBetween(150, 200);
      bomb.points = 10;
      bomb.damage = 2;
    } else {
      bomb = this.physics.add.image(x, y, BOMB_ATOMIC_SECTION_NAME);
      bomb.generatedVelocity = this.generateRandomBetween(200, 230);
      bomb.points = 100;
      bomb.damage = 3;
    }
    bomb.setDisplaySize(platformWidth * randomBombWidth, platformHeight * 0.15);
    bomb.setVelocity(0, bomb.generatedVelocity);
    bomb.setInteractive();
    bomb.on("pointerdown", this.onClick(bomb), this);
    return bomb;
  }

  private generateRandomBetween(first: number, second: number): number {
    return Phaser.Math.FloatBetween(first, second);
  }

  private onClick(bomb: Bomb): () => void {
    return async function () {
      bomb.setVelocity(0, 0);
      this.bombsCaught += bomb.points;
      this.time.delayedCall(100, this.onTouchedBomb(bomb), [bomb], this);
    };
  }

  private onFall(bomb: Bomb): () => void {
    return async function () {
      this.bombsFallen += bomb.damage;
      this.isGameOver();
      this.time.delayedCall(100, this.onTouchedBomb(bomb), [bomb], this);
    };
  }

  private isGameOver(): void {
    if (this.bombsFallen > MAX_LIFES) {
      this.gameOver();
    }
  }

  private onTouchedBomb(bomb: Bomb): () => void {
    return async function () {
      this.explosionEffect(bomb);
      bomb.destroy();
    };
  }

  private gameOver(): void {
    this.music.destroy();
    this.deadSound.play();
    this.scene.start(SCORE_SCENE_NAME, {
      bombsCaught: this.bombsCaught,
    });
  }

  private explosionEffect(bomb: Bomb): void {
    const explosion = this.explosions.get().setActive(true);
    explosion.setOrigin(0.5, 0.5);
    explosion.x = bomb.x;
    explosion.y = bomb.y;
    this.explosionSound.play();
    explosion.play(KABOOM_ANIM_NAME);
  }
}
