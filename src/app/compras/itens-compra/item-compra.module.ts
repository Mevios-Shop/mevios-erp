import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListarItensCompraComponent } from "./listar-itens-compra/listar-itens-compra.component";
import { DetalhesItemCompraComponent } from './detalhes-item-compra/detalhes-item-compra.component';
import { ItemCompraRoutingModule } from "./item-compra-routing.module";

@NgModule({
    declarations: [
      ListarItensCompraComponent,
      DetalhesItemCompraComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      ItemCompraRoutingModule
    ],
    exports: [
      ListarItensCompraComponent
    ]
  })
export class ItemCompraModule {}