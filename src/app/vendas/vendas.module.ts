import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaModule } from './venda/venda.module';
import { StatusVendaModule } from './status-venda/status-venda.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VendaModule,
    StatusVendaModule
  ]
})
export class VendasModule { }
