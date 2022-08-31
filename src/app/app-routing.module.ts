import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './autenticacao/auth.service';
import { LoginComponent } from './autenticacao/login/login.component';
import { DetalhesCompraComponent } from './compras/compra/detalhes-compra/detalhes-compra.component';
import { ListarComprasComponent } from './compras/compra/listar-compras/listar-compras.component';
import { DetalhesItemCompraComponent } from './compras/itens-compra/detalhes-item-compra/detalhes-item-compra.component';
import { DetalhesStatusCompraComponent } from './compras/status-compra/detalhes-status-compra/detalhes-status-compra.component';
import { ListarStatusCompraComponent } from './compras/status-compra/listar-status-compra/listar-status-compra.component';
import { DetalhesStatusItemCompraComponent } from './compras/status-item-compra/detalhes-status-item-compra/detalhes-status-item-compra.component';
import { ListarStatusItemCompraComponent } from './compras/status-item-compra/listar-status-item-compra/listar-status-item-compra.component';
import { DetalhesPlataformaComponent } from './plataformas/detalhes-plataforma/detalhes-plataforma.component';
import { ListarPlataformasComponent } from './plataformas/listar-plataformas/listar-plataformas.component';
import { ListarEstoqueComponent } from './produtos/estoque/listar-estoque/listar-estoque.component';
import { DetalhesProdutoComponent } from './produtos/produto/detalhes-produto/detalhes-produto.component';
import { ListarProdutosComponent } from './produtos/produto/listar-produtos/listar-produtos.component';
import { DetalhesVariacaoProdutoComponent } from './produtos/variacao-produto/detalhes-variacao-produto/detalhes-variacao-produto.component';
import { MainComponent } from './shared/components/main/main.component';
import { ListarVendasComponent } from './vendas/venda/listar-vendas/listar-vendas.component';

const APP_ROUTES: Routes = [
  {
    path: "",
    canActivate: [AuthService],
    component: MainComponent,
    children: [
      {
        path: "plataformas",
        component: ListarPlataformasComponent
      },
      {
        path: "plataformas/detalhes-plataforma",
        component: DetalhesPlataformaComponent
      },
      {
        path: "plataformas/detalhes-plataforma/:id",
        component: DetalhesPlataformaComponent
      },
      { // Rota dos modulos de produtos e variacoes
        path: "produtos",
        component: ListarProdutosComponent,
      },
      {
        path: "produtos/detalhes-produto",
        component: DetalhesProdutoComponent
      },
      {
        path: "produtos/detalhes-produto/:id_produto/variacao",
        component: DetalhesVariacaoProdutoComponent
      },
      {
        path: "produtos/detalhes-produto/:id_produto",
        component: DetalhesProdutoComponent
      },
      {
        path: "produtos/detalhes-produto/:id_produto/variacao/:id_variacao",
        component: DetalhesVariacaoProdutoComponent
      }, // Fim rotas dos modulos de produtos e variacoes
      {
        path: "estoque",
        component: ListarEstoqueComponent
      },
      {
        path: "vendas",
        component: ListarVendasComponent
      },
      // Compras
      {
        path: "compras",
        component: ListarComprasComponent
      },
      {
        path: "compras/detalhes-compra",
        component: DetalhesCompraComponent
      },
      {
        path: "compras/detalhes-compra/:id_compra",
        component: DetalhesCompraComponent
      },// Fim Compras
      {// Status Compra
        path: "compras/status-item-compra",
        component: ListarStatusItemCompraComponent
      },
      {
        path: "compras/status-item-compra/detalhes-status-item-compra",
        component: DetalhesStatusItemCompraComponent
      },
      {
        path: "compras/status-item-compra/detalhes-status-item-compra/:id_status_item_compra",
        component: DetalhesStatusItemCompraComponent
      }, // Fim Status Compra
      {//Itens Compras
        path: "compras/detalhes-compra/:id_compra/detalhes-item-compra",
        component: DetalhesItemCompraComponent
      },
      {
        path: "compras/detalhes-compra/:id_compra/detalhes-item-compra/:id_item_compra",
        component: DetalhesItemCompraComponent
      },
      {
        path: "compras/detalhes-compra/item-compra/:id",
        component: DetalhesItemCompraComponent
      },// Fim Itens Compras
      {
        path: "compras/status-compra",
        component: ListarStatusCompraComponent
      },
      {
        path: "compras/status-compra/detalhes-status-compra",
        component: DetalhesStatusCompraComponent
      },
      {
        path: "compras/status-compra/detalhes-status-compra/:id",
        component: DetalhesStatusCompraComponent
      }// Fim Status Compras
    ]
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
