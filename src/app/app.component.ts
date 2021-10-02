import { Component } from "@angular/core";
import { App } from "@capacitor/app";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      App.exitApp();
    });
  }
}
