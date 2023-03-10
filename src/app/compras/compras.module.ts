import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusCompraModule } from './status-compra/status-compra.module';
import { CompraModule } from './compra/compra.module';
import { ItemCompraModule } from './itens-compra/item-compra.module';
import { StatusItemCompraModule } from './status-item-compra/status-item-compra.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompraModule,
    StatusCompraModule,
    ItemCompraModule,
    StatusItemCompraModule
  ],
  exports: []
})
export class ComprasModule { }
