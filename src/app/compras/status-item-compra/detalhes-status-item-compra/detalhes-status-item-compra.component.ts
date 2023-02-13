import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StatusItemCompra } from '../status-item-compra.model';
import { StatusItemCompraService } from '../status-item-compra.service';

@Component({
  selector: 'app-detalhes-status-item-compra',
  templateUrl: './detalhes-status-item-compra.component.html',
})
export class DetalhesStatusItemCompraComponent implements OnInit {

  id: string | undefined
  statusItemCompra?: StatusItemCompra

  formularioStatusItemCompra: FormGroup = new FormGroup({
    'descricao': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  })

  constructor(private activatedRoute: ActivatedRoute, private statusItemCompraService: StatusItemCompraService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id_status_item_compra']) {
        this.buscarStatusItemCompra(params['id_status_item_compra'])
      }
    })
  }

  buscarStatusItemCompra(id: string): any {
    this.statusItemCompraService.buscarPorId(Number(id))
      .subscribe((statusItemCompra: StatusItemCompra) => {
        this.statusItemCompra = statusItemCompra
        this.id = String(statusItemCompra.id)

        this.formularioStatusItemCompra.get('descricao')?.setValue(statusItemCompra.descricao)
      })
  }

  salvar(): void {

    if (this.formularioStatusItemCompra.status !== 'INVALID') {

      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)

      } else {
        idRegistro = 0
      }

      const STATUS_ITEM_COMPRA = new StatusItemCompra(
        idRegistro,
        this.formularioStatusItemCompra.value.descricao
      )

      this.statusItemCompraService.salvar(STATUS_ITEM_COMPRA)
        .subscribe((resposta: any) => {
          this.id = resposta['id']
          alert("Status Item Compra salvo com sucesso!")
        })
    }
  }

}
