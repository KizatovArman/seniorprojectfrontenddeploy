import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckerComponent } from './checker/checker.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistercomponentComponent } from './registercomponent/registercomponent.component';

import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: "login",
    component: LoginpageComponent
  },
  {
    path: "register",
    component: RegistercomponentComponent
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
