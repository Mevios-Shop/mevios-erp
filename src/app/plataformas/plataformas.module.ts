import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformasRoutingModule } from './plataformas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListarPlataformasComponent } from './listar-plataformas/listar-plataformas.component';
import { DetalhesPlataformaComponent } from './detalhes-plataforma/detalhes-plataforma.component';



@NgModule({
  declarations: [
    ListarPlataformasComponent,
    DetalhesPlataformaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PlataformasRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlataformasModule { }
