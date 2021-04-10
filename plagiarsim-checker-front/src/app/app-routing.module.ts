import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckerComponent } from './checker/checker.component';

import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegistercomponentComponent } from './registercomponent/registercomponent.component';

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
    component: CheckerComponent
  },
  {
    path: '',
    redirectTo: '/checker',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
