import { Plataforma } from "src/app/plataformas/plataforma.model";
import { StatusCompra } from "../status-compra/status-compra.model";

export class Compra {
    id?: number
    data: string;
    data_recebimento?: string
    plataforma: Plataforma
    valor_frete?: number | undefined
    desconto?: number | undefined
    codigo_rastreamento?: string | undefined
    codigo_pedido: string
    status_compra: StatusCompra

    constructor(data: string, plataforma: Plataforma, codigo_pedido: string, status_compra: StatusCompra, id?: number, data_recebimento?: string, valor_frete?: number, desconto?: number, codigo_rastreamento?: string) {
        this.data = data
        this.plataforma = plataforma
        this.codigo_pedido = codigo_pedido
        this.status_compra = status_compra
        this.id = id
        this.data_recebimento = data_recebimento
        this.valor_frete = valor_frete
        this.desconto = desconto
        this.codigo_rastreamento = codigo_rastreamento
    }
}