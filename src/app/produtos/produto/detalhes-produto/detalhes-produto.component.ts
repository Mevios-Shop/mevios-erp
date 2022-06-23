import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  id: string | undefined

  produto?: Produto

  formularioProduto: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(45)])
  })

  constructor(private activatedRoute: ActivatedRoute, private produtoService: ProdutoService) { 
    activatedRoute.url.subscribe((url) => {
    })
  }

  ngOnInit(): void {

    
    this.activatedRoute.params.subscribe(params => {
      this.buscarProduto(params['id_produto'])
    })
  }

  buscarProduto(id: string): any {
    this.produtoService.buscarPorId(Number(id))
    .subscribe((produto: Produto) => {
      this.produto = produto
      this.id = String(produto.id)

      this.formularioProduto.get('nome')?.setValue(produto.nome)

      return true
    })
  }

  salvarProduto(): void {

    if (this.formularioProduto.status !== 'INVALID') {

      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)
        
      } else {
        idRegistro = 0
      }

      const PRODUTO = new Produto(
        idRegistro,
        this.formularioProduto.value.nome
      )

      this.produtoService.salvar(PRODUTO)
      .subscribe((resposta: any) => {
        this.id = resposta['id']
        alert("Produto salvo com sucesso!")
      })



    }
  }

}
