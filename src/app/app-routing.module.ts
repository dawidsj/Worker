import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {OwnerBoardsResolver} from './components/dashboard/owner.boards.resolver';
import {ParticipantBoardsResolver} from './components/dashboard/participant.boards.resolver';


const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      ownerBoards: OwnerBoardsResolver,
      participantBoards: ParticipantBoardsResolver,
    }
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ]
})
export class AppRoutingModule { }
