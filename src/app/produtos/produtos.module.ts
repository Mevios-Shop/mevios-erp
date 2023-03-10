import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarProdutosComponent } from './produto/listar-produtos/listar-produtos.component';
import { DetalhesProdutoComponent } from './produto/detalhes-produto/detalhes-produto.component';
import { ListarVariacoesProdutoComponent } from './variacao-produto/listar-variacoes-produto/listar-variacoes-produto.component';
import { DetalhesVariacaoProdutoComponent } from './variacao-produto/detalhes-variacao-produto/detalhes-variacao-produto.component';
import { ComponentesGeraisModule } from '../componentes-gerais/componentes-gerais.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ListarProdutosComponent,
    DetalhesProdutoComponent,
    ListarVariacoesProdutoComponent,
    DetalhesVariacaoProdutoComponent
  ],
  imports: [
    CommonModule,
    ComponentesGeraisModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProdutosModule { }
