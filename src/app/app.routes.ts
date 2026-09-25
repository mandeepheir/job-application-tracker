
import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';

import { Applications } from './pages/applications/applications';

import { ApplicationDetails } from './pages/application-details/application-details';

import { AddApplication } from './pages/add-application/add-application';

import { AiAnalyzer } from './pages/ai-analyzer/ai-analyzer';

import { Settings } from './pages/settings/settings';

import { Login } from './pages/login/login';

import { Signup } from './pages/signup/signup';


export const routes: Routes = [

  {
    path: '',
    component: Dashboard
  },

  {
    path: 'applications',
    component: Applications
  },

  {
    path: 'applications/:id',
    component: ApplicationDetails
  },

  {
    path: 'add-application',
    component: AddApplication
  },

  {
    path: 'ai-analyzer',
    component: AiAnalyzer
  },

  {
    path: 'settings',
    component: Settings
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: Signup
  }

];

