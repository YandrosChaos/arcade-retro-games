import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import Phaser from 'phaser';
import { GameScene } from './scenes/game.scene';
import { GAME_NAME } from './scenes/k-boom.routes';
import { ScoreScene } from './scenes/score.scene';
import { WelcomeScene } from './scenes/welcome.scene';

export let platformWidth: number = 0;
export let platformHeight: number = 0;

@Component({
  selector: 'app-game-loader',
  templateUrl: 'game-loader.page.html',
  styleUrls: ['game-loader.page.scss'],
})
export class GameLoaderPage implements OnInit, OnDestroy {
  private gameName: string;
  private scenes: Phaser.Scene[];
  private phaserGame: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;

  constructor(private platform: Platform, private router: Router) {
    platformWidth = platform.width();
    platformHeight = platform.height();
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.gameName = state.gameName ? state.gameName : '';
      this.scenes = state.scenes ? state.scenes : '';
    }
    this.config = {
      title: this.gameName,
      width: platformWidth,
      height: platformHeight,
      scale: {
        width: platformWidth,
        height: platformHeight,
      },
      parent: 'game',
      scene: this.scenes,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      backgroundColor: '#000033',
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    this.phaserGame.destroy(true, false);
  }
}
