import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuCommonComponent} from './menu-common/menu-common.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ComminmentComponent} from './comminment/comminment.component';
import {LanguagesDialigComponent} from './languages-dialig/languages-dialig.component';
import {BranchesComponent} from './branches/branches.component';
import {BranchItemComponent} from './branch-item/branch-item.component';
import {AccountComponent} from './account/account.component';
import {AStatisticComponent} from './a-statistic/a-statistic.component';
import {TrayComponent} from './tray/tray.component';
import {MenuCategoryComponent} from './menu-category/menu-category.component';
import {AOrdersComponent} from './a-orders/a-orders.component';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {AuthGuard} from '../../server/auth.guard';


const routes: Routes = [
  {path: 'homepage', component: HomePageComponent },
  {path: 'menu_common', component: MenuCommonComponent},
  {path: 'menu_category/:category_name', component: MenuCategoryComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'help', component: ComminmentComponent},
  {path: 'lang', component: LanguagesDialigComponent},
  {path: 'branches', component: BranchesComponent},
  {path: 'branch', component: BranchItemComponent},
  {path: 'account', component: AccountComponent,  canActivate: [AuthGuard], children: []},
  {path: 'statistic', component: AStatisticComponent,  canActivate: [AuthGuard], children: []},
  {path: 'orders_control', component: AOrdersComponent,  canActivate: [AuthGuard], children: []},
  {path: 'tray', component: TrayComponent},
  {path: 'personal_data', component: PersonalDataComponent, canActivate: [AuthGuard], children: []},
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
