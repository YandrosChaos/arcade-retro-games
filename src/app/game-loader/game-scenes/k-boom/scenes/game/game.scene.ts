import Phaser from "phaser";
import { Subscription } from "rxjs";
import { GAME_PRAY, SELECTED_LEVEL_PRAY } from "@const/pray-name";
import { Level, VideoGame } from "@interfaces/game/videogame.interface";
import { Payload } from "@interfaces/HolyData/Payload";
import { HolyData } from "@services/holy-data/holy-data.service";
import { Scene } from "@game-objects/scene";
import { TileSprite } from "@game-objects/tile-sprite";
import {
  FLOOR_FRAME_QUANTITY,
  GAMEPLAY_MUSIC_VOLUME,
  MAX_LIFES,
  SOUND_EFFECTS_VOLUME,
} from "@k-boom/config/k-boom.config";
import { KABOOM_ANIM_NAME, Scenes } from "@k-boom/config/k-boom.names";
import {
  BACKGROUND_SECTION,
  BOMB_ATOMIC_SECTION,
  BOMB_NUCLEAR_SECTION,
  BOMB_SECTION,
  BONUS_SOUND_SECTION,
  DEAD_SOUND_SECTION,
  EXPLOSION_SECTION,
  EXPLOSION_SOUND_FOUR_SECTION,
  EXPLOSION_SOUND_SECTION,
  EXPLOSION_SOUND_TREE_SECTION,
  EXPLOSION_SOUND_TWO_SECTION,
  FLOOR_SECTION,
  MAIN_GAME_MUSIC_SECTION,
  RIP_SECTION,
  SAFE_PACK_SECTION,
} from "@k-boom/config/k-boom.section";
import {
  getImgPath,
  getMusicPath,
  getSoundPath,
  getSpritesPath,
  getSvgPath,
} from "@k-boom/functions/path.functions";
import {
  Group,
  StaticGroup,
} from "@k-boom/game-objects/groups/group.interface";
import { Sound } from "@game-objects/sound/sound.interface";
import { Text } from "@game-objects/text/text.interface";
import { Bomb } from "@k-boom/game-objects/throwable-item/bomb.interface";
import { SafePackage } from "@k-boom/game-objects/throwable-item/safe-package.interface";
import { ThrowableItem } from "@k-boom/game-objects/throwable-item/throwable-item";
import { GAME_TEXT_STYLES } from "./game.config";
import { PointerEvent } from "@interfaces/events/events.interface";
import { generateRandomBetween } from "@game-scenes/k-boom/functions/random.functions";
import { BombFactory } from "@game-scenes/k-boom/game-objects/throwable-item/bomb-factory.class";
import { BoundElementProperty } from "@angular/compiler";
import {
  isBomb,
  isSafePackage,
} from "@game-scenes/k-boom/functions/check-type.functions";
export class GameScene extends Scene {
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
  private primaryExplosionSound: Sound;
  private secondaryExplosionSound: Sound;
  private tertiaryExplosionSound: Sound;
  private forthyExplosionSound: Sound;
  private bonusSound: Sound;
  private deadSound: Sound;
  private music: Sound;

  private bombFactory: BombFactory;

  constructor() {
    super(Scenes.Game);
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
      (payload: Payload) => (this.videoGame = { ...payload.data })
    );
    this.subLevelConfig = HolyData.getPrayer(SELECTED_LEVEL_PRAY).subscribe(
      (payload: Payload) =>
        (this.levelConfig = payload?.data || this.videoGame.levels[0])
    );
  }

  preload(): void {
    this.preloadMusic();
    this.preloadSoundEffect();
    this.preloadImages();
    this.preloadSvg();
    this.preloadSprites();
    this.preloadBombFactory();
  }

  private preloadBombFactory(): void {
    this.bombFactory = new BombFactory(this, this.levelConfig?.ranges);
  }

  private preloadMusic(): void {
    this.load.audio(
      MAIN_GAME_MUSIC_SECTION,
      getMusicPath(MAIN_GAME_MUSIC_SECTION)
    );
  }

  private preloadSoundEffect(): void {
    this.load.audio(
      EXPLOSION_SOUND_SECTION,
      getSoundPath(EXPLOSION_SOUND_SECTION)
    );
    this.load.audio(
      EXPLOSION_SOUND_TWO_SECTION,
      getSoundPath(EXPLOSION_SOUND_TWO_SECTION)
    );
    this.load.audio(
      EXPLOSION_SOUND_TREE_SECTION,
      getSoundPath(EXPLOSION_SOUND_TREE_SECTION)
    );
    this.load.audio(
      EXPLOSION_SOUND_FOUR_SECTION,
      getSoundPath(EXPLOSION_SOUND_FOUR_SECTION)
    );
    this.load.audio(BONUS_SOUND_SECTION, getSoundPath(BONUS_SOUND_SECTION));
    this.load.audio(DEAD_SOUND_SECTION, getSoundPath(DEAD_SOUND_SECTION));
  }

  private preloadImages(): void {
    this.load.image(FLOOR_SECTION, getImgPath(FLOOR_SECTION));
    this.load.image(BACKGROUND_SECTION, getImgPath(BACKGROUND_SECTION));
  }

  private preloadSvg(): void {
    this.load.image(BOMB_SECTION, getSvgPath(BOMB_SECTION));
    this.load.image(BOMB_ATOMIC_SECTION, getSvgPath(BOMB_ATOMIC_SECTION));
    this.load.image(BOMB_NUCLEAR_SECTION, getSvgPath(BOMB_NUCLEAR_SECTION));
    this.load.image(SAFE_PACK_SECTION, getSvgPath(SAFE_PACK_SECTION));
    this.load.image(RIP_SECTION, getSvgPath(RIP_SECTION));
  }

  private preloadSprites(): void {
    this.load.spritesheet(
      EXPLOSION_SECTION,
      getSpritesPath(EXPLOSION_SECTION),
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );
  }

  public create(): void {
    super.fadeInScene();
    this.createSounds();
    this.createBackground();
    this.createFloor();
    this.createAnimations();
    this.music.play();

    const destroyedBombs = this.add.image(25, 25, BOMB_SECTION);
    destroyedBombs.setScale(0.07);

    const lifes = this.add.image(100, 30, RIP_SECTION);
    lifes.setScale(0.15);

    this.score = this.add.text(50, 20, "", GAME_TEXT_STYLES);
    this.lifes = this.add.text(125, 20, "", GAME_TEXT_STYLES);
  }

  private createSounds(): void {
    this.music = this.sound.add(MAIN_GAME_MUSIC_SECTION, {
      volume: GAMEPLAY_MUSIC_VOLUME,
      loop: true,
    });
    this.primaryExplosionSound = this.sound.add(EXPLOSION_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.secondaryExplosionSound = this.sound.add(EXPLOSION_SOUND_TWO_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.tertiaryExplosionSound = this.sound.add(EXPLOSION_SOUND_TREE_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.forthyExplosionSound = this.sound.add(EXPLOSION_SOUND_FOUR_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.deadSound = this.sound.add(DEAD_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.bonusSound = this.sound.add(BONUS_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }

  private createBackground(): void {
    const background: TileSprite = this.add.tileSprite(
      0,
      this.renderer.height / 2,
      this.renderer.width * 2,
      this.renderer.height * 2,
      BACKGROUND_SECTION
    );
    background.setAngle(90);
  }

  private createFloor(): void {
    this.floor = this.physics.add.staticGroup({
      key: FLOOR_SECTION,
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
      frames: this.anims.generateFrameNumbers(EXPLOSION_SECTION, {
        start: 0,
        end: 15,
      }),
      frameRate: 16,
      repeat: 0,
      hideOnComplete: true,
    });

    this.explosions = this.add.group({
      defaultKey: EXPLOSION_SECTION,
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
    const life: number = MAX_LIFES - this.bombsFallen;
    this.lifes.text = String(life >= 0 ? life : 0);
  }

  private emitBomb(): void {
    const bomb: ThrowableItem = this.buildThrowableItem();
    this.physics.add.collider(bomb, this.floor, this.onFall(bomb), null, this);
  }

  private buildThrowableItem(): ThrowableItem {
    const item: ThrowableItem = this.bombFactory.buildThrowableItem();
    if (isBomb(item))
      item.on(PointerEvent.Down, this.onBombTouched(item), this);
    if (isSafePackage(item))
      item.on(PointerEvent.Down, this.onSafeTouched(item), this);
    return item;
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
    this.music?.destroy();
    this.deadSound.play();
    this.subGame.unsubscribe();
    this.subLevelConfig.unsubscribe();
    super.fadeOutScene(Scenes.Score, { bombsCaught: this.bombsCaught });
  }

  private explosionEffect(bomb: Bomb): void {
    const explosion = this.explosions.get().setActive(true);
    explosion.setOrigin(0.5, 0.5);
    explosion.x = bomb.x;
    explosion.y = bomb.y;
    this, this.randomExplosionSound();
    explosion.play(KABOOM_ANIM_NAME);
  }

  private randomExplosionSound(): void {
    const randomValue: number = Math.random() * 100;
    if (randomValue >= 0 && randomValue < 25) this.primaryExplosionSound.play();
    if (randomValue >= 25 && randomValue < 50)
      this.secondaryExplosionSound.play();
    if (randomValue >= 50 && randomValue < 75)
      this.tertiaryExplosionSound.play();
    if (randomValue >= 75) this.forthyExplosionSound.play();
  }
}
