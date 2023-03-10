import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarPlataformasComponent } from './listar-plataformas/listar-plataformas.component';
import { DetalhesPlataformaComponent } from './detalhes-plataforma/detalhes-plataforma.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ListarPlataformasComponent,
    DetalhesPlataformaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlataformasModule { }
