import { Component, OnInit } from '@angular/core';
import { Plataforma } from '../plataforma.model';
import { PlataformaService } from '../plataforma.service';

@Component({
  selector: 'app-listar-plataformas',
  templateUrl: './listar-plataformas.component.html',
  styleUrls: ['./listar-plataformas.component.css']
})
export class ListarPlataformasComponent implements OnInit {

  plataformas: Plataforma[] = []

  plataformaSelecionada: string = ""

  constructor(private plataformaService: PlataformaService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(): void {
    this.plataformaService.buscarTodos().subscribe((resposta: Plataforma[]) => {
      this.plataformas = resposta
    })
  }

  deletar(id: number = 0): void {
    const ID = this.plataformaSelecionada
    this.plataformaSelecionada = ""
    this.plataformaService.deletar(String(id))
    .subscribe((resposta: any) => {
      this.listar()
      alert('Plataforma removida com sucesso!')
    })
  }

}
