import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComprasComponent } from './listar-compras/listar-compras.component';
import { DetalhesCompraComponent } from './detalhes-compra/detalhes-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemCompraModule } from '../itens-compra/item-compra.module';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    ListarComprasComponent,
    DetalhesCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ItemCompraModule
  ],
  exports: [
    DetalhesCompraComponent
  ]
})
export class CompraModule { }
