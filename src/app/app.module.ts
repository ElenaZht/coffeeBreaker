import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule, MatIconModule, MatMenuModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FrameComponent } from './frame/frame.component';
import { MenuCommonComponent } from './menu-common/menu-common.component';
import { RoutingModule} from './routing';
import {HttpClientModule} from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { ComminmentComponent } from './comminment/comminment.component';
import { LanguagesDialigComponent } from './languages-dialig/languages-dialig.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchItemComponent } from './branch-item/branch-item.component';
import { AccountComponent } from './account/account.component';
import { AStatisticComponent } from './a-statistic/a-statistic.component';
import { TrayComponent } from './tray/tray.component';
import {FormsModule} from '@angular/forms';
import { PayformDialogComponent } from './payform-dialog/payform-dialog.component';
import { IamnewComponent } from './iamnew/iamnew.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuItemDialogComponent } from './menu-item-dialog/menu-item-dialog.component';
import { AOrdersComponent } from './a-orders/a-orders.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FrameComponent,
    MenuCommonComponent,
    ContactsComponent,
    ComminmentComponent,
    LanguagesDialigComponent,
    BranchesComponent,
    BranchItemComponent,
    AccountComponent,
    AStatisticComponent,
    TrayComponent,
    PayformDialogComponent,
    IamnewComponent,
    MenuCategoryComponent,
    MenuItemDialogComponent,
    AOrdersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatIconModule,
    FontAwesomeModule,
    RoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    MatMenuModule
  ],
  entryComponents: [
    PayformDialogComponent,
    MenuItemDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
