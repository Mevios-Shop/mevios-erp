import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StatusCompra } from '../status-compra.model';
import { StatusCompraService } from '../status-compra.service';

@Component({
  selector: 'app-detalhes-status-compra',
  templateUrl: './detalhes-status-compra.component.html',
  styleUrls: ['./detalhes-status-compra.component.css']
})
export class DetalhesStatusCompraComponent implements OnInit {

  id: string | undefined

  statusCompra?: StatusCompra

  formularioStatusCompra: FormGroup = new FormGroup({
    'descricao': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  })

  constructor(private activatedRoute: ActivatedRoute , private statusCompraService: StatusCompraService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.buscarStatusCompra(params['id'])
        
      }
    })
  }

  buscarStatusCompra(id: string): any {
    this.statusCompraService.buscarPorId(Number(id))
    .subscribe((statusCompra: StatusCompra) => {
      this.statusCompra = statusCompra
      this.id = String(statusCompra.id)

      this.formularioStatusCompra.get('descricao')?.setValue(statusCompra.descricao)

    })
  }

  salvar(): void {

    if (this.formularioStatusCompra.status !== 'INVALID') {

      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)
        
      } else {
        idRegistro = 0
      }

      const STATUS_COMPRA = new StatusCompra(
        idRegistro,
        this.formularioStatusCompra.value.descricao
      )

      this.statusCompraService.salvar(STATUS_COMPRA)
      .subscribe((resposta: any) => {
        this.id = resposta['id']
        alert("Status Compra salva com sucesso!")
      })



    }
  }

}
