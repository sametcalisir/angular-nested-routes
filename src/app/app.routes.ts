import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Profile } from './components/profile/profile';
import { Settings } from './components/settings/settings';
import { Notifications } from './components/notifications/notifications';
import { canDeactivateGuard } from './guards/can-deactivate-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },

  // Named outlet routes for right sidebar
  { path: 'profile', component: Profile, outlet: 'rightSideNav' },
  {
    path: 'settings',
    component: Settings,
    outlet: 'rightSideNav',
    canDeactivate: [canDeactivateGuard],
  },
  { path: 'notifications', component: Notifications, outlet: 'rightSideNav' },
];
