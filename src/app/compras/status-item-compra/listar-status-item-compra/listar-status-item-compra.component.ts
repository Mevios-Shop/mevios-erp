import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusItemCompra } from '../status-item-compra.model';
import { StatusItemCompraService } from '../status-item-compra.service';

@Component({
  selector: 'app-listar-status-item-compra',
  templateUrl: './listar-status-item-compra.component.html',
  styleUrls: ['./listar-status-item-compra.component.css']
})
export class ListarStatusItemCompraComponent implements OnInit {

  listaStatusItemCompra$?: Observable<StatusItemCompra[]>

  statusCompraSelecionado: string = ""

  constructor(private statusItemCompraService: StatusItemCompraService) { }

  ngOnInit(): void {

    this.listaStatusItemCompra$ = this.statusItemCompraService.buscarTodos()

  }

  deletar(id: number = 0): void {
    this.statusItemCompraService.deletar(String(id))
    .subscribe((resposta: any) => {
      this.ngOnInit()
      alert('Status item compra removido com sucesso!')
    })
  }

}
