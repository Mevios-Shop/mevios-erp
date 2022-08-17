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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ProdutosModule,
    ComponentesGeraisModule,
    EstoqueModule,
    ComprasModule,
    PlataformasModule,
    VendasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
