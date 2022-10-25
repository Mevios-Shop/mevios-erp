import { Estoque } from "../produtos/estoque/estoque.model"
import { VariacaoProduto } from "../produtos/variacao-produto/variacao-produto.model"
import { Venda } from "./venda/venda.model"

export class ItemVenda {
    id?: number
    variacao_produto: VariacaoProduto
    valor: number = 0
    estoque: Estoque
    venda: Venda

    constructor(variacao_produto: VariacaoProduto, valor: number, estoque: Estoque, venda: Venda) {
        this.variacao_produto = variacao_produto
        this.valor = valor
        this.estoque = estoque
        this.venda = venda
    }
    
}