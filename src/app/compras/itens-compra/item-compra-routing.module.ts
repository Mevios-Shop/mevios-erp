import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarComprasComponent } from "../compra/listar-compras/listar-compras.component";
import { DetalhesItemCompraComponent } from "./detalhes-item-compra/detalhes-item-compra.component";
import { ListarItensCompraComponent } from "./listar-itens-compra/listar-itens-compra.component";

const ROUTES: Routes = [
    {
        path: "compras/detalhes-compra/item-compra",
        component: DetalhesItemCompraComponent
    },
    {
        path: "compras/detalhes-compra/:id_compra/detalhes-item-compra",
        component: DetalhesItemCompraComponent
    },
    {
        path: "compras/detalhes-compra/:id_compra/detalhes-item-compra/id_item_compra",
        component: DetalhesItemCompraComponent
    },
    {
        path: "compras/detalhes-compra/:id_compra",
        component: ListarComprasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class ItemCompraRoutingModule {

}