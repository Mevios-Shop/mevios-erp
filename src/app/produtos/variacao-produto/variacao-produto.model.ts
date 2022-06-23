import { Produto } from "../produto/produto.model"

export class VariacaoProduto {
    id?: number
    descricao: string
    produto: Produto

    constructor(descricao: string, produto: Produto, id?: number) {
        this.id = id
        this.descricao = descricao
        if (produto && produto['id']) {
            this.produto = produto
        } else {
            this.produto = produto
        }
    }
}
