import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Applications } from './pages/applications/applications';
import { ApplicationDetails } from './pages/application-details/application-details';
import { AddApplication } from './pages/add-application/add-application';
import { AiAnalyzer } from './pages/ai-analyzer/ai-analyzer';
import { Settings } from './pages/settings/settings';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'applications',
    component: Applications,
    canActivate: [authGuard]
  },

  {
    path: 'applications/:id',
    component: ApplicationDetails,
    canActivate: [authGuard]
  },

  {
    path: 'add-application',
    component: AddApplication,
    canActivate: [authGuard]
  },

  {
    path: 'ai-analyzer',
    component: AiAnalyzer,
    canActivate: [authGuard]
  },

  {
    path: 'settings',
    component: Settings,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];