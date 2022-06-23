import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesStatusItemCompraComponent } from "./detalhes-status-item-compra/detalhes-status-item-compra.component";
import { ListarStatusItemCompraComponent } from "./listar-status-item-compra/listar-status-item-compra.component";

const ROUTES: Routes = [
    {
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class StatusItemCompraRoutingModule {

}