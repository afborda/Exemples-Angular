import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product.route';
import { ProdutoComponent } from './product/produto.component';
import { ExempleComponent } from './exemple/exemple.component';

@NgModule({
  declarations: [ProdutoComponent, ExempleComponent],
  imports: [CommonModule, ProductRoutingModule],
  exports: [],
})
export class ProductModule {}
