import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Platform } from "@ionic/angular";
import { Subscription } from "rxjs";
import { User } from "./commons/interfaces/user/user.class";
import { UserService } from "./commons/services/user/user.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private subUser: Subscription;
  public user: User = new User();

  constructor(private platform: Platform, private router: Router) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.router.navigate(["/home"]);
    });
    this.platform.backButton.subscribeWithPriority(-1, () => {
      App.exitApp();
    });
  }

  ngOnInit(): void {
    this.subUser = UserService.getCurrent().subscribe((user) =>
      this.user.assign(user)
    );
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
