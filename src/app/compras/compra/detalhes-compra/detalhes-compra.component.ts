import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plataforma } from 'src/app/plataformas/plataforma.model';
import { PlataformaService } from 'src/app/plataformas/plataforma.service';
import { StatusCompra } from '../../status-compra/status-compra.model';
import { StatusCompraService } from '../../status-compra/status-compra.service';
import { Compra } from '../compra.model';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-detalhes-compra',
  templateUrl: './detalhes-compra.component.html',
})
export class DetalhesCompraComponent implements OnInit {

  id: string | undefined
  compra?: Compra
  plataformas?: Observable<Plataforma[]>
  listaStatusCompra?: Observable<StatusCompra[]>


  formularioCompra: FormGroup = new FormGroup({
    'codigo_pedido': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]),
    'codigo_rastreamento': new FormControl(null, [Validators.minLength(3), Validators.maxLength(45)]),
    'data': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    'data_recebimento': new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
    'desconto': new FormControl(null),
    'plataforma': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'status_compra': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'valor_frete': new FormControl(null)
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private compraService: CompraService,
    private plataformaService: PlataformaService,
    private statusCompraService: StatusCompraService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id_compra']) {
        this.id = String(params['id_compra'])
        this.buscarCompra(params['id_compra'])

      }

      if (this.compra == undefined) {
        this.formularioCompra.get('plataforma')?.setValue('Selecione uma plataforma', { onlySelf: true })
        this.formularioCompra.get('status_compra')?.setValue('Selecione o status', { onlySelf: true })
      }
    })

    this.plataformas = this.plataformaService.buscarTodos2()
    this.listaStatusCompra = this.statusCompraService.buscarTodos2()
  }

  compararPlataformas(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 && obj2
  }

  buscarCompra(id: string): any {
    this.compraService.buscarPorId(Number(id))
      .subscribe((compra: Compra) => {
        this.compra = compra

        this.formularioCompra.get('codigo_pedido')?.setValue(compra.codigo_pedido)
        this.formularioCompra.get('codigo_rastreamento')?.setValue(compra.codigo_rastreamento)

        const DATA_COMPRA = new Date(compra.data);
        const DATA_COMPRA_FORMATADA = new Intl.DateTimeFormat("pt-BR").format(DATA_COMPRA);
        this.formularioCompra.get('data')?.setValue(DATA_COMPRA_FORMATADA)

        if (compra.data_recebimento) {
          const DATA_RECEBIMENTO = new Date(compra.data_recebimento);
          const DATA_RECEBIMENTO_FORMATADA = new Intl.DateTimeFormat("pt-BR").format(DATA_RECEBIMENTO);
          this.formularioCompra.get('data_recebimento')?.setValue(DATA_RECEBIMENTO_FORMATADA)
        }

        this.formularioCompra.get('desconto')?.setValue(compra.desconto)
        this.formularioCompra.get('status_compra')?.setValue(this.compra.status_compra)
        this.formularioCompra.get('valor_frete')?.setValue(compra.valor_frete)
        this.formularioCompra.get('plataforma')?.setValue(this.compra.plataforma)

      })
  }

  formataStringDataBd(data: string) {

    if (data.length == 10) {
      const DIA = data.split("/")[0];
      var MES = data.split("/")[1];
      var ANO = data.split("/")[2];

      const NOVA_DATA = ANO + '-' + ("0" + MES).slice(-2) + '-' + ("0" + DIA).slice(-2)

      return NOVA_DATA;
      // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
    }
    return data
  }

  formataStringDataBr(data: string) {

    const DIA = data.split("/")[0];
    var MES = data.split("/")[1];
    var ANO = data.split("/")[2];

    return ANO + '/' + ("0" + MES).slice(-2) + '/' + ("0" + DIA).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  salvar(): void {

    if (this.formularioCompra.status !== 'INVALID') {

      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)

      } else {
        idRegistro = 0
      }

      let data_recebimento_formatada = ''

      const DATA_RECEBIMENTO = this.formularioCompra.value.data_recebimento


      if (String(this.formularioCompra.value.data_recebimento).length == 10) {
        data_recebimento_formatada = this.formataStringDataBd(DATA_RECEBIMENTO)
      }

      const COMPRA: Compra = new Compra(
        this.formataStringDataBd(this.formularioCompra.value.data),
        this.formularioCompra.value.plataforma,
        this.formularioCompra.value.codigo_pedido,
        this.formularioCompra.value.status_compra,
        idRegistro,
        data_recebimento_formatada,
        this.formularioCompra.value.valor_frete,
        this.formularioCompra.value.desconto,
        this.formularioCompra.value.codigo_rastreamento,
      )

      this.compraService.salvar(COMPRA)
        .subscribe((resposta: any) => {
          this.id = resposta['id']

          alert("Compra salva com sucesso!")
          this.router.navigate(['/compras/detalhes-compra/' + this.id])
        })

    } else {

      alert("Formulário Inválido!")

      this.formularioCompra.get('codigo_pedido')?.markAsTouched()
      this.formularioCompra.get('data')?.markAsTouched()
      this.formularioCompra.get('plataforma')?.markAsTouched()
      this.formularioCompra.get('status_compra')?.markAsTouched()
    }
  }

}
