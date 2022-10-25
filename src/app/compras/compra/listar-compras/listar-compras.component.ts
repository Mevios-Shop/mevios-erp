import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StatusCompra } from '../../status-compra/status-compra.model';
import { StatusCompraService } from '../../status-compra/status-compra.service';
import { Compra } from '../compra.model';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrls: ['./listar-compras.component.css']
})
export class ListarComprasComponent implements OnInit {

  compras: Compra[] = []

  listaStatusCompra$: Observable<StatusCompra[]>

  formSelecaoStatusCompra: FormGroup = new FormGroup({
    'status_compra': new FormControl(null, [Validators.required, Validators.minLength(1)])
  })

  constructor(private compraService: CompraService, private statusCompraService: StatusCompraService) { 
    this.listaStatusCompra$ = this.statusCompraService.buscarTodos()
  }

  ngOnInit(): void {
    this.listar()

    this.formSelecaoStatusCompra.get('status_compra')?.setValue('Todos')

  }

  compareSelect(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 && obj2
  }

  listar(statusCompra?: number): void {
    if (this.formSelecaoStatusCompra.value.status_compra) {
      this.compraService.buscarPorStatusCompraId(this.formSelecaoStatusCompra.value.status_compra.id)
      .subscribe((resposta: Compra[]) => {
        console.log(resposta)
        this.compras = resposta
        
      })
      
    } else {
      this.compraService.buscarTodos().subscribe((resposta: Compra[]) => {
        this.compras = resposta
      })
    }
    
  }

  buscarComprasPorStatusCompraId() {

  }

  deletar(id: number = 0): void {
    this.compraService.deletar(String(id))
    .subscribe((resposta: any) => {
      this.listar()
      alert('Compra removida com sucesso!')
    })
  }

}
