import { Component, OnInit } from '@angular/core';
import { faBox, faBoxes, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { Security } from 'src/app/autenticacao/utils/security.util';
import { Usuario } from 'src/app/usuario/usuario.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {

  UsuarioLogado: Usuario | undefined
  faBox = faBox;
  faBox2 = faBoxes;
  faWarehouse = faWarehouse;

  constructor() { }

  ngOnInit(): void {
    this.UsuarioLogado = Security.getUser()
  }
}
