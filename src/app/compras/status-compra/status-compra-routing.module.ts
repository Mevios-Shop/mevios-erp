import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesStatusCompraComponent } from "./detalhes-status-compra/detalhes-status-compra.component";
import { ListarStatusCompraComponent } from "./listar-status-compra/listar-status-compra.component";

const ROUTES: Routes = [
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class StatusCompraRoutingModule {

}