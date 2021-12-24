import Phaser from "phaser";
import { Subscription } from "rxjs";
import {
  GAME_PRAY,
  SELECTED_LEVEL_PRAY,
} from "src/app/commons/const/pray-name";
import {
  Level,
  VideoGame,
} from "src/app/commons/interfaces/game/videogame.interface";
import { Payload } from "src/app/commons/interfaces/HolyData/Payload";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
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
  SAFE_PACK_SECTION_NAME,
  SAFE_PACK_IMG_PATH,
  BONUS_SOUND_SECTION_NAME,
  BONUS_SOUND_PATH,
} from "./k-boom.routes";

class ThrowableItem extends Phaser.Physics.Arcade.Image {
  public points?: number = 0;
  public damage?: number = 0;
  public generatedVelocity?: number = 0;
}
interface Bomb extends ThrowableItem {}
interface SafePackage extends ThrowableItem {}
interface Sound extends Phaser.Sound.BaseSound {}
interface Background extends Phaser.GameObjects.TileSprite {}
interface Group extends Phaser.GameObjects.Group {}
interface StaticGroup extends Phaser.Physics.Arcade.StaticGroup {}
interface Text extends Phaser.GameObjects.Text {}

const MAX_LIFES: number = 3;
const FLOOR_FRAME_QUANTITY: number = 2;
export class GameScene extends Phaser.Scene {
  private subLevelConfig: Subscription;
  private subGame: Subscription;

  private levelConfig: Level;
  private videoGame: VideoGame;

  private reducerBomberTime: number = 20;
  private minBomberTime: number = 500;
  private maxBomberTime: number = 1000;
  private delta: number;
  private lastBombTime: number = 0;
  private bombsCaught: number = 0;
  private bombsFallen: number = 0;

  private floor: StaticGroup;
  private score: Text;
  private lifes: Text;

  private explosions: Group;
  private explosionSound: Sound;
  private bonusSound: Sound;
  private deadSound: Sound;
  private music: Sound;

  constructor() {
    super({
      key: GAME_SCENE_NAME,
    });
  }

  init(params) {
    this.initAllSubscriptions();
    this.setLevelInitialConfig();
  }

  private setLevelInitialConfig(): void {
    this.reducerBomberTime = 20 * this.levelConfig.hardnessMultiplicator;
    this.delta = this.maxBomberTime;
    this.lastBombTime = 0;
    this.bombsCaught = 0;
    this.bombsFallen = 0;
  }

  private initAllSubscriptions(): void {
    this.subGame = HolyData.getPrayer(GAME_PRAY).subscribe(
      (payload: Payload) => (this.videoGame = payload.data)
    );
    this.subLevelConfig = HolyData.getPrayer(SELECTED_LEVEL_PRAY).subscribe(
      (payload: Payload) =>
        (this.levelConfig = payload?.data || this.videoGame.levels[0])
    );
  }

  preload(): void {
    this.load.audio(EXPLOSION_SOUND_SECTION_NAME, EXPLOSION_SOUND_PATH);
    this.load.audio(BONUS_SOUND_SECTION_NAME, BONUS_SOUND_PATH);
    this.load.audio(DEAD_SOUND_SECTION_NAME, DEAD_SOUND_PATH);
    this.load.audio(MAIN_GAME_MUSIC_SECTION_NAME, MAIN_GAME_MUSIC_PATH);
    this.load.image(BOMB_SECTION_NAME, BOMB_IMG_PATH);
    this.load.image(BOMB_ATOMIC_SECTION_NAME, BOMB_ATOMIC_IMG_PATH);
    this.load.image(BOMB_NUCLEAR_SECTION_NAME, BOMB_NUCLEAR_IMG_PATH);
    this.load.image(SAFE_PACK_SECTION_NAME, SAFE_PACK_IMG_PATH);
    this.load.image(FLOOR_SECTION_NAME, FLOOR_IMG_PATH);
    this.load.image(BACKGROUND_SECTION_NAME, BACKGROUND_IMG_PATH);
    this.load.image(RIP_SECTION_NAME, RIP_IMG_PATH);
    this.load.spritesheet(EXPLOSION_SECTION_NAME, KABOOM_IMG_PATH, {
      frameWidth: 128,
      frameHeight: 128,
    });
  }

  public create(): void {
    this.cameras.main.fadeIn(1000,0,0,0);
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
    this.bonusSound = this.sound.add(BONUS_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }

  private createBackground(): void {
    const background: Background = this.add.tileSprite(
      0,
      this.renderer.height / 2,
      this.renderer.width * 2,
      this.renderer.height * 2,
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
        this.renderer.height - 50,
        this.renderer.width + 200,
        this.renderer.height - 50
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
      if (this.delta > this.minBomberTime) this.delta -= this.reducerBomberTime;
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
    const bomb: ThrowableItem = this.buildThrowableItem();
    this.physics.add.collider(bomb, this.floor, this.onFall(bomb), null, this);
  }

  private buildThrowableItem(): ThrowableItem {
    const randomBombType: number = this.generateRandomBetween(0, 100);
    const x: number = this.generateRandomBetween(25, this.renderer.width - 25);
    const y: number = 25;
    if (randomBombType < this.levelConfig.ranges[0]) {
      return this.buildBomb(BOMB_SECTION_NAME, x, y, 1, 1, 100, 200);
    } else if (
      randomBombType >= this.levelConfig.ranges[0] &&
      randomBombType < this.levelConfig.ranges[1]
    ) {
      return this.buildBomb(BOMB_NUCLEAR_SECTION_NAME, x, y, 10, 2, 150, 200);
    } else if (
      randomBombType >= this.levelConfig.ranges[1] &&
      randomBombType < this.levelConfig.ranges[2]
    ) {
      return this.buildBomb(BOMB_ATOMIC_SECTION_NAME, x, y, 100, 3, 200, 230);
    } else {
      return this.buildSafePackage(x, y);
    }
  }

  private buildBomb(
    section: string,
    x: number,
    y: number,
    points: number,
    damage: number,
    randomVelocityFrom: number,
    randomVelocityTo: number
  ): Bomb {
    const randomBombWidth: number = this.generateRandomBetween(0.17, 0.25);
    const bomb: Bomb = this.physics.add.image(x, y, section);
    bomb.generatedVelocity = this.generateRandomBetween(
      randomVelocityFrom,
      randomVelocityTo
    );
    bomb.setDisplaySize(
      this.renderer.width * randomBombWidth,
      this.renderer.height * 0.15
    );
    bomb.setVelocity(0, bomb.generatedVelocity);
    bomb.setInteractive();
    bomb.on("pointerdown", this.onBombTouched(bomb), this);
    bomb.points = points;
    bomb.damage = damage;
    return bomb;
  }

  private buildSafePackage(x: number, y: number): SafePackage {
    const randomWidth: number = this.generateRandomBetween(0.17, 0.25);
    const safePackage: SafePackage = this.physics.add.image(
      x,
      y,
      SAFE_PACK_SECTION_NAME
    );
    safePackage.generatedVelocity = this.generateRandomBetween(200, 230);
    safePackage.setDisplaySize(
      this.renderer.width * randomWidth,
      this.renderer.height * 0.15
    );
    safePackage.setVelocity(0, safePackage.generatedVelocity);
    safePackage.setInteractive();
    safePackage.on("pointerdown", this.onSafeTouched(safePackage), this);
    safePackage.points = 0;
    safePackage.damage = 0;
    return safePackage;
  }

  private generateRandomBetween(first: number, second: number): number {
    return Phaser.Math.FloatBetween(first, second);
  }

  private onSafeTouched(item: ThrowableItem): () => void {
    return async function () {
      this.bombsFallen--;
      this.time.delayedCall(100, this.safeTouchedEffect(item), [item], this);
    };
  }

  private safeTouchedEffect(item: ThrowableItem): () => void {
    return async function () {
      item.setVelocity(0, 0);
      this.bonusSound.play();
      item.destroy();
    };
  }

  private onBombTouched(bomb: Bomb): () => void {
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
    this.subGame.unsubscribe();
    this.subLevelConfig.unsubscribe();
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start(SCORE_SCENE_NAME, {bombsCaught: this.bombsCaught})
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
