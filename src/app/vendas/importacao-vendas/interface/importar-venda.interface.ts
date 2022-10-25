import { ItemVendaInterface } from "./item-venda.interface";

export interface ImportarVendaInterface {
    codigo_pedido: string;
    codigo_rastreamento?: string;
    comissao: number;
    data: Date;
    itensVenda: ItemVendaInterface[];
    plataforma: number;
    status_venda: number;
    transportadora?: string;
    usuario: number;
    valor_frete?: number;
}