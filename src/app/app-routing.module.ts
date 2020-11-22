import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './navigation/footer/footer.component';
import { HomeComponent } from './navigation/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./demos/arquitetura-componentes/product.module').then(
        (m) => m.ProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
