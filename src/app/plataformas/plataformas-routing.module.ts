import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetalhesPlataformaComponent } from "./detalhes-plataforma/detalhes-plataforma.component";
import { ListarPlataformasComponent } from "./listar-plataformas/listar-plataformas.component";

const ROUTES: Routes = [
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class PlataformasRoutingModule {

}