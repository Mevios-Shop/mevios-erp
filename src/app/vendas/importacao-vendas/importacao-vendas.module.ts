import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportacaoVendasComponent } from './importacao-vendas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ImportacaoVendasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImportacaoVendasModule { }
