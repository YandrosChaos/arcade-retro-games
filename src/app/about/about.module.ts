import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { AboutPage } from "./about.page";
import { AboutPageRoutingModule } from "./about-routing.module";
import { ContactFormPage } from "./components/contact-form/contact-form.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AboutPageRoutingModule,
  ],
  declarations: [AboutPage, ContactFormPage],
})
export class AboutPageModule {}
