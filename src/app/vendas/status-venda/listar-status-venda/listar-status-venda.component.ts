import { Component, OnInit } from '@angular/core';
import { StatusVenda } from '../status-venda.model';
import { StatusVendaService } from '../status-venda.service';

@Component({
  selector: 'app-listar-status-venda',
  templateUrl: './listar-status-venda.component.html',
})
export class ListarStatusVendaComponent implements OnInit {

  listaStatusVenda: StatusVenda[] = []
  statusVendaSelecionado: string = ""

  constructor(private statusVendaService: StatusVendaService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(): void {
    this.statusVendaService.buscarTodos().subscribe((resposta: StatusVenda[]) => {
      this.listaStatusVenda = resposta
    })
  }

  deletar(id: number = 0): void {
    const id_venda = this.statusVendaSelecionado
    this.statusVendaSelecionado = ""
    this.statusVendaService.deletar(String(id_venda))
      .subscribe((resposta: any) => {
        this.listar()
        alert('Status Compra removido com sucesso!')
      })
  }
}
