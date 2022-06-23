import { ItemCompra } from "src/app/compras/itens-compra/item-compra.model"
import { VariacaoProduto } from "src/app/produtos/variacao-produto/variacao-produto.model"

export class Estoque {
    id?: number
    item_compra: ItemCompra
    variacao_produto: VariacaoProduto
    data: string

    constructor(itemCompra: ItemCompra, variacao_produto: VariacaoProduto, data: string) {
        this.item_compra = itemCompra
        this.variacao_produto = variacao_produto
        this.data = data
    }
}