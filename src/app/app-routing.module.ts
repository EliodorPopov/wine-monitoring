import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, Route } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DataPageComponent } from './pages/data-page/data-page.component';
import { BarrelPageComponent } from './pages/barrel-page/barrel-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: ':code',
    component: DataPageComponent
  },
  {
    path: ':code/:barrel',
    component: BarrelPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 0],
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
