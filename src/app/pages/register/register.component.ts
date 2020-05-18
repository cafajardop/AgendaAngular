import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  loginUsuario: LoginModel;
  recordarme = false;

  constructor(private auth:AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginUsuario = new LoginModel();
  }


  onSubmit(form:NgForm){
     if(form.invalid){return};

     Swal.fire({
       allowOutsideClick:false,
       icon:'info',
       text:'Espere por favor...'
     });
     Swal.showLoading();

     this.auth.nuevoUsuario(this.loginUsuario)
     .subscribe(resp =>{
       Swal.close();

       if(this.recordarme){
         localStorage.setItem('email',this.loginUsuario.email);
       }
       this.router.navigateByUrl('/home');
     },(err)=>{
       Swal.fire({
          allowOutsideClick:false,
          icon:'error',
          title:'Error al Registrarse',
          text: err.error.error.message
       });
     })
  }
}
