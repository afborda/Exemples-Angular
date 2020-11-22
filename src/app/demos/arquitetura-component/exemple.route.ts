import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './product/produto.component';

const router: Routes = [{ path: '', component: ProdutoComponent }];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
