import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameLoaderPage } from './game-loader.page';

const routes: Routes = [
  {
    path: '',
    component: GameLoaderPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameLoaderPageRoutingModule {}
