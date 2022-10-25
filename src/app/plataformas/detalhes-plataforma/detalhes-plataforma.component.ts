import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Plataforma } from '../plataforma.model';
import { PlataformaService } from '../plataforma.service';

@Component({
  selector: 'app-detalhes-plataforma',
  templateUrl: './detalhes-plataforma.component.html',
  styleUrls: ['./detalhes-plataforma.component.css']
})
export class DetalhesPlataformaComponent implements OnInit {

  id: string | undefined

  plataforma?: Plataforma

  formularioPlataforma: FormGroup = new FormGroup({
    'descricao': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(45)])
  })

  constructor(private activatedRoute: ActivatedRoute , private plataformaService: PlataformaService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.buscarPlataforma(params['id'])
      }
    })
  }

  buscarPlataforma(id: string): any {
    this.plataformaService.buscarPorId(Number(id))
    .subscribe((plataforma: Plataforma) => {
      this.plataforma = plataforma
      this.id = String(plataforma.id)

      this.formularioPlataforma.get('descricao')?.setValue(plataforma.descricao)

    })
  }

  salvar(): void {

    if (this.formularioPlataforma.status !== 'INVALID') {

      let idRegistro: number

      if (Number(this.id) > 0) {
        idRegistro = Number(this.id)
        
      } else {
        idRegistro = 0
      }

      const PLATAFORMA = new Plataforma(
        idRegistro,
        this.formularioPlataforma.value.descricao
      )

      this.plataformaService.salvar(PLATAFORMA)
      .subscribe((resposta: any) => {
        this.id = resposta['id']
        alert("Plataforma salva com sucesso!")
      })



    }
  }

}
