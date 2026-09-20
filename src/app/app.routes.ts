import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Applications } from './pages/applications/applications';
import { AddApplication } from './pages/add-application/add-application';
import { Settings } from './pages/settings/settings';

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
    path: 'add-application',
    component: AddApplication
  },
  {
    path: 'settings',
    component: Settings
  }
];