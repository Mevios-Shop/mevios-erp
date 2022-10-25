import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UsuarioModule } from '../usuario/usuario.module';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsuarioModule,
    AppRoutingModule
  ],
  providers: [AuthService]
})
export class AutenticacaoModule { }
