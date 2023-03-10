import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosModule } from './produtos/produtos.module';
import { ComponentesGeraisModule } from './componentes-gerais/componentes-gerais.module';
import { EstoqueModule } from './produtos/estoque/estoque.module';
import { ComprasModule } from './compras/compras.module';
import { PlataformasModule } from './plataformas/plataformas.module';
import { VendasModule } from './vendas/vendas.module';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { MainComponent } from './shared/components/main/main.component';
import { AuthService } from './autenticacao/auth.service';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AutenticacaoModule,
    ProdutosModule,
    ComponentesGeraisModule,
    ComprasModule,
    EstoqueModule,
    PlataformasModule,
    VendasModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
