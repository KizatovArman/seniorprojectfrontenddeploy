import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckerComponent } from './checker/checker.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistercomponentComponent } from './registercomponent/registercomponent.component';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { CheckerGuardService } from './shared/services/checker-guard.service'; 
import { UpdaterComponent } from './updater/updater.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginpageComponent,
    canActivate: [CheckerGuardService]
  },
  {
    path: "register",
    component: RegistercomponentComponent,
    canActivate: [CheckerGuardService]
  },
  {
    path: 'checker',
    component: CheckerComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'very/secret/path/to/update/google/token/because/we/can/not',
    component: UpdaterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
