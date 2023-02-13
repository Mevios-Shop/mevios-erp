import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarStatusVendaComponent } from './listar-status-venda/listar-status-venda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    ListarStatusVendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class StatusVendaModule { }
