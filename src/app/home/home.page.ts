import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameScene } from '../game-loader/scenes/game.scene';
import { ScoreScene } from '../game-loader/scenes/score.scene';
import { WelcomeScene } from '../game-loader/scenes/welcome.scene';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit() {}

  public onNavigateTo(): void {
    this.router.navigate(['/game-loader'], {
      state: {
        gameName: 'K-BOOM!',
        scenes: [WelcomeScene, GameScene, ScoreScene],
      },
    });
  }

  ngOnDestroy() {}
}
