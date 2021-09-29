import Phaser from 'phaser';
import { platformHeight, platformWidth } from '../game-loader.page';
import { GAMEPLAY_MUSIC_VOLUME, SOUND_EFFECTS_VOLUME } from './k-boom.config';
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
} from './k-boom.routes';

export class GameScene extends Phaser.Scene {
  private delta: number;
  private lastBombTime: number;
  private bombsCaught: number;
  private bombsFallen: number;

  private floor: Phaser.Physics.Arcade.StaticGroup;
  private info: Phaser.GameObjects.Text;

  private explosions: Phaser.GameObjects.Group;
  private explosionSound: Phaser.Sound.BaseSound;
  private deadSound: Phaser.Sound.BaseSound;
  private music: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: GAME_SCENE_NAME,
    });
  }

  init(params): void {
    this.delta = 1000;
    this.lastBombTime = 0;
    this.bombsCaught = 0;
    this.bombsFallen = 0;
  }

  preload(): void {
    this.load.audio(EXPLOSION_SOUND_SECTION_NAME, EXPLOSION_SOUND_PATH);
    this.load.audio(DEAD_SOUND_SECTION_NAME, DEAD_SOUND_PATH);
    this.load.audio(MAIN_GAME_MUSIC_SECTION_NAME, MAIN_GAME_MUSIC_PATH);
    this.load.image(BOMB_SECTION_NAME, BOMB_IMG_PATH);
    this.load.image(FLOOR_SECTION_NAME, FLOOR_IMG_PATH);
    this.load.image(BACKGROUND_SECTION_NAME, BACKGROUND_IMG_PATH);
    this.load.spritesheet(EXPLOSION_SECTION_NAME, KABOOM_IMG_PATH, {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  create(): void {
    this.music = this.sound.add(MAIN_GAME_MUSIC_SECTION_NAME, {
      volume: GAMEPLAY_MUSIC_VOLUME,
      loop: true,
    });
    this.music.play();
    this.explosionSound = this.sound.add(EXPLOSION_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.deadSound = this.sound.add(DEAD_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    const background: Phaser.GameObjects.TileSprite = this.add.tileSprite(
      0,
      platformHeight / 2,
      platformWidth * 2,
      platformHeight * 2,
      BACKGROUND_SECTION_NAME
    );
    background.setAngle(90);
    this.floor = this.physics.add.staticGroup({
      key: FLOOR_SECTION_NAME,
      frameQuantity: 2,
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
    this.info = this.add.text(10, 10, '', {
      font: '24px Minecraft Bold',
      color: '#FBFBAC',
    });

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

  update(time: number): void {
    const diff: number = time - this.lastBombTime;
    if (diff > this.delta) {
      this.lastBombTime = time;
      if (this.delta > 500) {
        this.delta -= 20;
      }
      this.emitBomb();
    }
    this.info.text =
      this.bombsCaught + ' caught - ' + this.bombsFallen + ' fallen (max 3)';
  }

  private onClick(bomb: Phaser.Physics.Arcade.Image): () => void {
    return async function () {
      bomb.setVelocity(0, 0);
      this.bombsCaught += 1;
      this.time.delayedCall(
        100,
        async function (bomb) {
          this.explosionEffect(bomb);
          bomb.destroy();
        },
        [bomb],
        this
      );
    };
  }

  private onFall(bomb: Phaser.Physics.Arcade.Image): () => void {
    return async function () {
      this.bombsFallen += 1;
      this.time.delayedCall(
        100,
        async function (bomb) {
          this.explosionEffect(bomb);
          bomb.destroy();
          if (this.bombsFallen > 2) {
            this.gameOver();
          }
        },
        [bomb],
        this
      );
    };
  }

  private emitBomb(): void {
    const randomVelocity: number = Phaser.Math.Between(100, 200);
    const randomBombWidth: number = Phaser.Math.FloatBetween(0.12, 0.17);
    const x: number = Phaser.Math.Between(25, platformWidth - 25);
    const y: number = 25;
    const bomb: Phaser.Physics.Arcade.Image = this.physics.add.image(
      x,
      y,
      BOMB_SECTION_NAME
    );
    bomb.setAngle(180);
    bomb.setDisplaySize(platformWidth * randomBombWidth, platformHeight * 0.15);
    bomb.setVelocity(0, randomVelocity);
    bomb.setInteractive();
    bomb.on('pointerdown', this.onClick(bomb), this);
    this.physics.add.collider(bomb, this.floor, this.onFall(bomb), null, this);
  }

  private gameOver(): void {
    this.music.destroy();
    this.deadSound.play();
    this.scene.start(SCORE_SCENE_NAME, {
      bombsCaught: this.bombsCaught,
    });
  }

  private explosionEffect(obj): void {
    const explosion = this.explosions.get().setActive(true);
    explosion.setOrigin(0.5, 0.5);
    explosion.x = obj.x;
    explosion.y = obj.y;
    this.explosionSound.play();
    explosion.play(KABOOM_ANIM_NAME);
  }
}
