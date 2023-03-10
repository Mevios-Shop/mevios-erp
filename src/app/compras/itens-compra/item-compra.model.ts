import { VariacaoProduto } from "src/app/produtos/variacao-produto/variacao-produto.model"
import { Compra } from "../compra/compra.model"
import { StatusItemCompra } from "../status-item-compra/status-item-compra.model"

export class ItemCompra {
    id?: number
    variacao_produto: VariacaoProduto
    compra: Compra
    status_item_compra: StatusItemCompra
    valor: number
    link_anuncio?: string

    constructor(variacao_produto: VariacaoProduto, compra: Compra, status_item_compra: StatusItemCompra, valor: number, id?: number, link_anuncio?: string) {
        this.variacao_produto = variacao_produto
        this.compra = compra
        this.status_item_compra = status_item_compra
        this.valor = valor
        this.id = id
        this.link_anuncio = link_anuncio
    }

}