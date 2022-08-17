import { Plataforma } from "src/app/plataformas/plataforma.model"
import { StatusVenda } from "../status-venda/status-venda.model"

export class Venda {
    id?: number
    data: string
    codigo_pedido: string
    status_venda: StatusVenda
    plataforma?: Plataforma
    valor_frete?: number
    valor_reembolso?: number


    constructor(data: string, codigo_pedido: string, status_venda: StatusVenda, plataforma?: Plataforma, valor_frete?: number, valor_reembolso?: number) {
        this.data = data
        this.codigo_pedido = codigo_pedido
        this.status_venda = status_venda
        this.plataforma = plataforma
        this.valor_frete = valor_frete
        this.valor_reembolso = valor_reembolso
    }
}