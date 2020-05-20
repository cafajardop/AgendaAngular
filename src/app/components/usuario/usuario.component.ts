import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/userFirebase.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  usuario= new UserModel();

  constructor(private usuariosService: UsuarioService, 
              private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'nuevo'){
      this.usuariosService.getUsuario(id).subscribe((resp:UserModel)=>{
        this.usuario = resp;
        this.usuario.id = id;
      })
    }
  }

  guardar(form: NgForm){
    if(form.invalid){return}
    
    //Importamos la libreria de swal
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // Declaramos esta variable de tipo let observable para ya sea recibir la informacion de actualizar heroe o crear heroe
    let peticion: Observable<any>;
    let mensaje: boolean;

    if (this.usuario.id) {
      peticion = this.usuariosService.actualizarUsuario(this.usuario);
      mensaje = true;
    } else {
      peticion = this.usuariosService.crearUsuario(this.usuario);
      mensaje = false;
    }

    // En este punto la peticion nos retorna algo ya sea si actualizo o creo el heroe
    peticion.subscribe((resp) => {
      console.log(resp);
      if (mensaje) {
        Swal.fire({
          title: this.usuario.nombre,
          text: 'Se actualizó correctamente',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: this.usuario.nombre,
          text: 'Se creo correctamente',
          icon: 'success',
        });
      }

    });
  }
}
