import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { GameLoaderPage } from "./game-loader.page";
import { GameLoaderPageRoutingModule } from "./game-loader-routing.module";
import { MenuScene } from "./scenes/menu.scene";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameLoaderPageRoutingModule,
  ],
  declarations: [GameLoaderPage, MenuScene],
})
export class GameLoaderPageModule {}
