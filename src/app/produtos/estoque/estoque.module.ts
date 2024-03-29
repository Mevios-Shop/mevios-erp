import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarEstoqueComponent } from './listar-estoque/listar-estoque.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    ListarEstoqueComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class EstoqueModule { }
