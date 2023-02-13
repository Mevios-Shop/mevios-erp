import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarStatusCompraComponent } from './listar-status-compra/listar-status-compra.component';
import { DetalhesStatusCompraComponent } from './detalhes-status-compra/detalhes-status-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    ListarStatusCompraComponent,
    DetalhesStatusCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class StatusCompraModule { }
