import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule, MatIconModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FrameComponent } from './frame/frame.component';
import { MenuCommonComponent } from './menu-common/menu-common.component';
import { RoutingModule} from './routing';
import {HttpClientModule} from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { ComminmentComponent } from './comminment/comminment.component';
import { LanguagesDialigComponent } from './languages-dialig/languages-dialig.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FrameComponent,
    MenuCommonComponent,
    ContactsComponent,
    ComminmentComponent,
    LanguagesDialigComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatIconModule,
    FontAwesomeModule,
    RoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
