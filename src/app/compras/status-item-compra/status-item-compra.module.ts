import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarStatusItemCompraComponent } from './listar-status-item-compra/listar-status-item-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetalhesStatusItemCompraComponent } from './detalhes-status-item-compra/detalhes-status-item-compra.component';
import { StatusItemCompraRoutingModule } from './status-item-compra-routing.module';



@NgModule({
  declarations: [
    ListarStatusItemCompraComponent,
    DetalhesStatusItemCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StatusItemCompraRoutingModule
  ]
})
export class StatusItemCompraModule { }
