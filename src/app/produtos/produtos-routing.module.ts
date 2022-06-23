import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesProdutoComponent } from "./produto/detalhes-produto/detalhes-produto.component";
import { ListarProdutosComponent } from "./produto/listar-produtos/listar-produtos.component";
import { DetalhesVariacaoProdutoComponent } from "./variacao-produto/detalhes-variacao-produto/detalhes-variacao-produto.component";

const routes: Routes = [
    {
        path: "produtos/",
        component: ListarProdutosComponent
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProdutosRoutingModule { }