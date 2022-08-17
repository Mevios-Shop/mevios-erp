import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVendasComponent } from './listar-vendas/listar-vendas.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarVendasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class VendaModule { }
