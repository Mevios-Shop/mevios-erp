import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/autenticacao/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
