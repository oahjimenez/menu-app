import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [

  {
    path: '', component: MenuComponent,
    children: [
      { path: '', redirectTo:'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent }
    ]
  }
];
