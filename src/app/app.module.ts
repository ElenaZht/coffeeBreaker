import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule, MatIconModule, MatMenuModule} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FrameComponent } from './frame/frame.component';
import { MenuCommonComponent } from './menu-common/menu-common.component';
import { RoutingModule} from './routing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
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
import { LoginComponentComponent } from './login-component/login-component.component';
import {UsersService} from './users.service';
import {UsersArrayService} from './users-array.service';
import { SignupComponent } from './signup/signup.component';
import {ToastrModule, ToastrService, Overlay, OverlayContainer} from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import {ItemsService} from './items.service';
import {ItemsArrayService} from './items-array.service';
import { NewBranchComponent } from './new-branch/new-branch.component';
import {DatePipe} from '@angular/common';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import {OrdersArrayService} from './orders-array.service';
import {OrdersService} from './orders.service';
import { ChooseBranchDialogComponent } from './choose-branch-dialog/choose-branch-dialog.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function playerFactory() {
  return player;
}
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
    NavbarComponent,
    LoginComponentComponent,
    SignupComponent,
    PersonalDataComponent,
    NewBranchComponent,
    AddNewItemComponent,
    AOrdersComponent,
    ChooseBranchDialogComponent,
    OrderDetailsDialogComponent,
    MyOrdersComponent,
    OrderDetailsComponent
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
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]

      }
    }),
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    PayformDialogComponent,
    MenuItemDialogComponent,
    LoginComponentComponent,
    SignupComponent,
    NewBranchComponent,
    AddNewItemComponent,
    ChooseBranchDialogComponent,
    OrderDetailsDialogComponent,
    OrderDetailsComponent
  ],
  providers: [
    {provide: UsersService, useClass: UsersArrayService},
    {provide: ItemsService, useClass: ItemsArrayService},
    {provide: OrdersService, useClass: OrdersArrayService},
    ToastrService,
    Overlay,
    OverlayContainer,
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
