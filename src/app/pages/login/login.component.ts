import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuarioLogin: LoginModel;
  recordarme = false;

  constructor(private auth: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.usuarioLogin = new LoginModel();
    if(localStorage.getItem('email')){
      this.usuarioLogin.email = localStorage.getItem('email');
      this.recordarme = true;
    }

    console.log( `Esta autenticado? ${this.auth.estaAutenticado()}` );
  }

  login(form: NgForm){
    if(form.invalid){return;}
    console.log( `Nuevamente Esta autenticado? ${this.auth.estaAutenticado()}` );

    console.log(this.usuarioLogin);
    // console.log(form);
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuarioLogin)
    .subscribe(resp =>{
        Swal.close();
        
        if(this.recordarme){
          localStorage.setItem('email', this.usuarioLogin.email);
        }
        this.router.navigateByUrl('/home');

        setTimeout(function () {
          location.reload();
        }, 2000);

    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        icon:'error',
        title:'Error al autenticar',
        text: err.error.error.message
      });
    })
  }

}
