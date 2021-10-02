import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ContactFormPage } from "./components/contact-form/contact-form.page";

@Component({
  selector: "app-about",
  templateUrl: "about.page.html",
  styleUrls: ["about.page.scss"],
})
export class AboutPage implements OnInit, OnDestroy {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  public async presentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ContactFormPage,
    });
    return await modal.present();
  }

  ngOnDestroy() {}
}
