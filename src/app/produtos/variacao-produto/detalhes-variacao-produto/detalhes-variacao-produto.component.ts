import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../produto/produto.model';
import { ProdutoService } from '../../produto/produto.service';
import { VariacaoProduto } from '../variacao-produto.model';
import { VariacaoProdutoService } from '../variacao-produto.service';

@Component({
  selector: 'app-detalhes-variacao-produto',
  templateUrl: './detalhes-variacao-produto.component.html',
})
export class DetalhesVariacaoProdutoComponent implements OnInit {

  id: string | undefined

  formularioVariacaoProduto: FormGroup = new FormGroup({
    'descricao': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(45)])
  })

  variacaoProduto?: VariacaoProduto

  id_produto: number = 0
  produto?: Produto

  constructor(
    private activatedRoute: ActivatedRoute,
    private variacaoProdutoService: VariacaoProdutoService,
    private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.buscarProduto(params['id_produto'])

      if (params['id_variacao']) {
        this.buscarVariacao(params['id_variacao'])
      }
    });
  }

  buscarProduto(id: string): any {
    this.produtoService.buscarPorId(Number(id))
      .subscribe((produto: Produto) => {
        this.produto = produto
      })
  }

  buscarVariacao(id: string): any {
    this.variacaoProdutoService.buscarPorId(Number(id))
      .subscribe((variacaoProduto: VariacaoProduto) => {
        this.variacaoProduto = variacaoProduto
        this.id = String(this.variacaoProduto.id)

        this.formularioVariacaoProduto.get('descricao')?.setValue(this.variacaoProduto.descricao)

        return true
      })
  }

  salvarVariacaoProduto(): void {

    if (this.formularioVariacaoProduto.status !== 'INVALID') {
      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)

      } else {
        idRegistro = 0
      }

      if (this.produto) {
        const VARIACAO_PRODUTO: VariacaoProduto = new VariacaoProduto(
          this.formularioVariacaoProduto.value.descricao,
          this.produto,
          idRegistro
        )

        this.variacaoProdutoService.salvar(VARIACAO_PRODUTO)
          .subscribe((resposta: any) => {
            if (resposta != 'erro ao cadastrar produto') {
              //this.listar(this.idProduto)
              alert('Variação do produto salvo com sucesso!')
            } else {
              alert('Erro ao salvar variação do Produto!')
            }
          })
      }
    } else {
      this.formularioVariacaoProduto.get('descricao')?.markAsTouched()
    }
  }
}
