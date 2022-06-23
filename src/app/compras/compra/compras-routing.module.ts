import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesItemCompraComponent } from "../itens-compra/detalhes-item-compra/detalhes-item-compra.component";
import { DetalhesCompraComponent } from "./detalhes-compra/detalhes-compra.component";
import { ListarComprasComponent } from "./listar-compras/listar-compras.component";

const ROUTES: Routes = [
    {
        path: "compras",
        component: ListarComprasComponent
    },
    {
        path: "compras/detalhes-compra",
        component: DetalhesCompraComponent,
    },
    {
        path: "compras/detalhes-compra/:id_compra",
        component: DetalhesCompraComponent
    },
    {
        path: "compras/detalhes-compra/item-compra/:id",
        component: DetalhesItemCompraComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class ComprasRoutingModule {
    
}