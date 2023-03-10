import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Estoque } from 'src/app/produtos/estoque/estoque.model';
import { EstoqueService } from 'src/app/produtos/estoque/estoque.service';
import { Compra } from '../../compra/compra.model';
import { CompraService } from '../../compra/compra.service';
import { StatusCompra } from '../../status-compra/status-compra.model';
import { StatusCompraService } from '../../status-compra/status-compra.service';
import { StatusItemCompra } from '../../status-item-compra/status-item-compra.model';
import { StatusItemCompraService } from '../../status-item-compra/status-item-compra.service';
import { ItemCompra } from '../item-compra.model';
import { ItemCompraService } from '../item-compra.service';

@Component({
  selector: 'app-listar-itens-compra',
  templateUrl: './listar-itens-compra.component.html',
})
export class ListarItensCompraComponent implements OnInit {

  idCompra: number = 0
  itensCompra: ItemCompra[] = []
  itemCompraSelecionado: string = ""
  existeItemASerLancadoNoEstoque = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private compraService: CompraService,
    private statusCompraService: StatusCompraService,
    private itemCompraService: ItemCompraService,
    private estoqueService: EstoqueService,
    private statusItemCompraService: StatusItemCompraService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id_compra']) {
        this.idCompra = params['id_compra']
        this.buscarCompras()
      }
    })
  }

  buscarCompras(): void {
    this.itemCompraService.buscarTodos(String(this.idCompra))
      .subscribe((resposta: ItemCompra[]) => {

        this.itensCompra = resposta

        this.itensCompra.forEach(item => {
          if (item.status_item_compra.descricao == "Itens não lançados") {
            this.existeItemASerLancadoNoEstoque = true
          }
        });
      })
  }

  alterarStatusItensCompra(statusItemCompra: StatusItemCompra) {
    this.itensCompra.forEach(item => {
      item.status_item_compra = statusItemCompra

      this.itemCompraService.salvar(item, 1).subscribe((resposta: ItemCompra) => {
      })
    });
  }

  alterarStatusCompraFinalizacao(statusCompra: StatusCompra) {

    this.compraService.buscarPorId(this.idCompra).subscribe((compra: Compra) => {
      let compra2 = compra
      compra2.status_compra = statusCompra

      this.compraService.salvar(compra2).subscribe((resposta: Compra) => {
        window.location.reload()
      })
    })
  }

  lancarItensEstoque() {
    this.estoqueService.lancarItensPorCompraId(this.itensCompra)
      .subscribe((resposta: Estoque[]) => {
        if (resposta) {
          this.statusItemCompraService.buscarPorId(5).subscribe((statusItemCompra: StatusItemCompra) => {
            this.alterarStatusItensCompra(statusItemCompra)
            if (statusItemCompra) {
              this.statusCompraService.buscarPorId(5).subscribe((statusCompra: StatusCompra) => {
                this.alterarStatusCompraFinalizacao(statusCompra)
              })
            }
          })
        }
      })
  }

  deletar(id: number = 0): void {
    const ID = this.itemCompraSelecionado
    this.itemCompraSelecionado = ""
    this.itemCompraService.deletar(String(id))
      .subscribe((resposta: any) => {
        this.ngOnInit()
        alert('Item da Compra removida com sucesso!')
      })
  }
}
