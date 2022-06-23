import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Produto } from 'src/app/produtos/produto/produto.model';
import { ProdutoService } from 'src/app/produtos/produto/produto.service';
import { VariacaoProduto } from 'src/app/produtos/variacao-produto/variacao-produto.model';
import { VariacaoProdutoService } from 'src/app/produtos/variacao-produto/variacao-produto.service';
import { Compra } from '../../compra/compra.model';
import { CompraService } from '../../compra/compra.service';
import { StatusItemCompra } from '../../status-item-compra/status-item-compra.model';
import { StatusItemCompraService } from '../../status-item-compra/status-item-compra.service';
import { ItemCompra } from '../item-compra.model';
import { ItemCompraService } from '../item-compra.service';

@Component({
  selector: 'app-detalhes-item-compra',
  templateUrl: './detalhes-item-compra.component.html',
  styleUrls: ['./detalhes-item-compra.component.css']
})
export class DetalhesItemCompraComponent implements OnInit {

  id: string | undefined

  itemCompra?: ItemCompra

  idCompra?: number

  compra?: Compra

  variacoes_produto$?: Observable<VariacaoProduto[]>
  lista_status_item_compra$?: Observable<StatusItemCompra[]>

  produtos$?: Observable<Produto[]>


  formularioItemCompra: FormGroup = new FormGroup({
    'produto': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'variacao_produto': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'valor': new FormControl(null, [Validators.required, Validators.min(1)]),
    'status_item_compra': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'link_anuncio': new FormControl(null, [Validators.minLength(3), Validators.maxLength(200)]),
    'quantidade': new FormControl(1, [Validators.minLength(1), Validators.maxLength(10)]),
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemCompraService: ItemCompraService,
    private produtoService: ProdutoService,
    private variacaoProdutoService: VariacaoProdutoService,
    private compraService: CompraService,
    private statusItemCompraService: StatusItemCompraService
  ) {
    //activatedRoute.url.subscribe((url) => {});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.buscarItemCompra(params['id'])
      } else if (params['id_compra']) {
        this.idCompra = params['id_compra']
        this.formularioItemCompra.get('variacao_produto')?.setValue('Selecione a variação do produto', { onlySelf: true })
      }

      if (this.itemCompra == undefined) {
        this.formularioItemCompra.get('produto')?.setValue('Selecione um produto', { onlySelf: true })
        this.formularioItemCompra.get('status_item_compra')?.setValue('Selecione um status', { onlySelf: true })

        //this.formularioItemCompra.get('variacao_produto')?.setValue(this.itemCompra.variacao_produto)
      }
    })

    this.produtos$ = this.produtoService.buscarTodos()
    this.lista_status_item_compra$ = this.statusItemCompraService.buscarTodos()
  }

  compareSelect(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 && obj2
  }

  buscarItemCompra(id: string): any {
    this.itemCompraService.buscarPorId(Number(id))
      .subscribe((itemCompra: ItemCompra) => {
        this.itemCompra = itemCompra
        this.id = String(itemCompra.id)
        this.idCompra = itemCompra.compra.id

        this.formularioItemCompra.get('valor')?.setValue(itemCompra.valor)
        this.formularioItemCompra.get('link_anuncio')?.setValue(itemCompra.link_anuncio)

        this.formularioItemCompra.get('produto')?.setValue(this.itemCompra.variacao_produto.produto)
        this.formularioItemCompra.get('status_item_compra')?.setValue(this.itemCompra.status_item_compra)

        this.variacoes_produto$ = this.variacaoProdutoService.buscarTodas(Number(itemCompra.variacao_produto.produto.id))

        this.formularioItemCompra.get('variacao_produto')?.setValue(this.itemCompra.variacao_produto)


      })
  }

  carregarVariacoesProduto(id_produto: any): void {
    this.variacoes_produto$ = this.variacaoProdutoService.buscarTodas(Number(id_produto))
  }

  vincularVariacoesProduto(): void {
    this.carregarVariacoesProduto(this.formularioItemCompra.get('produto')?.value.id)
  }

  buscarCompra(id: number): void {

    this.compraService.buscarPorId(id)
      .subscribe((compra: Compra) => {
        this.compra = compra
      })
  }

  salvar(): void {

    if (this.formularioItemCompra.status !== 'INVALID') {

      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)

      } else {
        idRegistro = 0
      }


      if (this.itemCompra) {
        const ITEM_COMPRA = new ItemCompra(
          this.formularioItemCompra.value.variacao_produto,
          this.itemCompra?.compra,
          this.formularioItemCompra.value.status_item_compra,
          this.formularioItemCompra.value.valor,
          idRegistro,
          this.formularioItemCompra.value.link_anuncio
        )

        this.itemCompraService.salvar(ITEM_COMPRA, 1)
          .subscribe((resposta: any) => {
            this.id = resposta['id']
            this.ngOnInit()
            alert("Item da compra salva com sucesso!")
            this.router.navigate(['/compras/detalhes-compra/'+this.idCompra])
          })

      } else {

        if (this.activatedRoute.snapshot.params['id_compra']) {

          this.compraService.buscarPorId(Number(this.activatedRoute.snapshot.params['id_compra']))
            .subscribe((compra: Compra) => {

              this.compra = compra

              const ITEM_COMPRA = new ItemCompra(
                this.formularioItemCompra.value.variacao_produto,
                compra,
                this.formularioItemCompra.value.status_item_compra,
                this.formularioItemCompra.value.valor,
                idRegistro,
                this.formularioItemCompra.value.link_anuncio
              )

              this.itemCompraService.salvar(ITEM_COMPRA, this.formularioItemCompra.value.quantidade)
                .subscribe((resposta: any) => {
                  this.id = resposta['id']
    
                  alert("Item da compra salva com sucesso!")

                  this.router.navigate(['/compras/detalhes-compra/'+compra.id])
                })

            })

        }



        if (this.compra) {



        }


      }

    } else {
      alert("Formulário Inválido!")

      this.formularioItemCompra.get('produto')?.markAsTouched()
      this.formularioItemCompra.get('variacao_produto')?.markAsTouched()
      this.formularioItemCompra.get('valor')?.markAsTouched()
      this.formularioItemCompra.get('link_anuncio')?.markAsTouched()
    }
  }
}


