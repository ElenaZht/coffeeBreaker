import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuCommonComponent} from './menu-common/menu-common.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ComminmentComponent} from './comminment/comminment.component';
import {LanguagesDialigComponent} from './languages-dialig/languages-dialig.component';

const routes: Routes = [
  {path: 'homepage', component: HomePageComponent },
  {path: 'menu_common', component: MenuCommonComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'help', component: ComminmentComponent},
  {path: 'lang', component: LanguagesDialigComponent},
  {path: '**', component: HomePageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
