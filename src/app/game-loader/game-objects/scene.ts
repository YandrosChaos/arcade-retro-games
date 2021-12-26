import { EXIT_PRAY } from "@const/pray-name";
import { HolyData } from "@services/holy-data/holy-data.service";

export class Scene extends Phaser.Scene {
  constructor(sceneKey: string) {
    super({ key: sceneKey });
  }

  public preload(): void {}

  public init(params: any): void {}

  public create(): void {}

  public update(time: number): void {}

  protected fadeInScene(): void {
    this.cameras.main.fadeIn(250, 0, 0, 0);
  }

  protected fadeOutScene(nextScene: string, param?: object): void {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start(nextScene, param || {});
      }
    );
  }

  protected runScene(sceneKey: string): void {
    this.scene.start(sceneKey);
  }

  protected killGame(): void {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        HolyData.updatePrayer({ key: EXIT_PRAY, data: "exit" });
      }
    );
  }

  protected animateItems(
    targets: any,
    x: number,
    duration: number = 300
  ): void {
    this.add.tween({
      targets: targets,
      x: x,
      duration: duration,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }
}
