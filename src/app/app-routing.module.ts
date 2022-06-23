import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEstoqueComponent } from './produtos/estoque/listar-estoque/listar-estoque.component';
import { ListarProdutosComponent } from './produtos/produto/listar-produtos/listar-produtos.component';

const APP_ROUTES: Routes = [
  {
    path: "produtos",
    component: ListarProdutosComponent,
  },
  {
    path: "estoque",
    component: ListarEstoqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
