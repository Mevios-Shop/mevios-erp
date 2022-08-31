import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/usuario/usuario.model';
import { AuthService } from '../auth.service';
import { Security } from '../utils/security.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private router: Router,
    private service: AuthService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ])]
    });
  }

  ngOnInit(): void {
    /*
    const token = Security.getToken();
    try {
      if (token) {
        //this.busy = true;
        this.service.refreshToken().subscribe(
          (data: any) => {
            this.setUser(data.customer, data.token);
            //this.busy = false;
          }
        );
      }
    } catch (error) {
      localStorage.clear();
      //this.busy = false;
    }*/

    Security.clear();
  }

  submit() {

    try {
      //this.busy = true;
      const login = { email: this.form.value.email, senha: this.form.value.password };
      this.service.authenticate(login)
        .subscribe((data: any) => {
          //this.busy = false;
          this.setUser(data.usuario, data.token);
          console.log(data.token);
        });

    } catch (error) {
      console.log(error);
      //this.busy = false;
    }
  }

  setUser(user: Usuario, token: any) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
