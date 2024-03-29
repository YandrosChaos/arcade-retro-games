import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "game-loader",
    loadChildren: () =>
      import("./game-loader/game-loader.module").then(
        (m) => m.GameLoaderPageModule
      ),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./about/about.module").then((m) => m.AboutPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
