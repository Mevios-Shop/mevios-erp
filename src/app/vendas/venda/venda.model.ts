import { Plataforma } from "src/app/plataformas/plataforma.model"
import { StatusVenda } from "../status-venda/status-venda.model"

export class Venda {
    id?: number
    data: string = ''
    codigo_pedido: string = ''
    status_venda: StatusVenda
    plataforma: Plataforma
    comissao?: number
    valor_frete?: number
    valor_reembolso?: number

    constructor(data: string, codigo_pedido: string, status_venda: StatusVenda, plataforma: Plataforma, comissao: number, valor_frete: number, valor_reembolso: number) {
        this.data = data
        this.codigo_pedido = codigo_pedido
        this.status_venda = status_venda
        this.plataforma = plataforma
        if (comissao > 0) {
            this.comissao = comissao            
        }
        if (valor_frete > 0) {
            this.valor_frete = valor_frete
        }
            
        if (valor_reembolso > 0) {
            this.valor_reembolso = valor_reembolso
        }
    }
}