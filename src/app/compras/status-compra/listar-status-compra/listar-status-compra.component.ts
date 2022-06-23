import { Component, OnInit } from '@angular/core';
import { StatusCompra } from '../status-compra.model';
import { StatusCompraService } from '../status-compra.service';

@Component({
  selector: 'app-listar-status-compra',
  templateUrl: './listar-status-compra.component.html',
  styleUrls: ['./listar-status-compra.component.css']
})
export class ListarStatusCompraComponent implements OnInit {

  listaStatusCompra: StatusCompra[] = []

  statusCompraSelecionado: string = ""

  constructor(private statusCompraService: StatusCompraService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(): void {
    this.statusCompraService.buscarTodos().subscribe((resposta: StatusCompra[]) => {
      this.listaStatusCompra = resposta
    })
  }

  deletar(id: number = 0): void {
    const ID = this.statusCompraSelecionado
    this.statusCompraSelecionado = ""
    this.statusCompraService.deletar(String(id))
    .subscribe((resposta: any) => {
      this.listar()
      alert('Status Compra removido com sucesso!')
    })
  }

}
