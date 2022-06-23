import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarStatusCompraComponent } from './listar-status-compra/listar-status-compra.component';
import { DetalhesStatusCompraComponent } from './detalhes-status-compra/detalhes-status-compra.component';
import { StatusCompraRoutingModule } from './status-compra-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ListarStatusCompraComponent,
    DetalhesStatusCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    StatusCompraRoutingModule,
    ReactiveFormsModule
  ]
})
export class StatusCompraModule { }
