import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuCommonComponent} from './menu-common/menu-common.component';

const routes: Routes = [
  {path: 'homepage', component: HomePageComponent },
  {path: 'menu_common', component: MenuCommonComponent },
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
